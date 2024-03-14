import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from './ClubNabvar';
import CommonFooter from '../Common/CommonFooter';

const ClubAddOneInjuryUpdate = () => {
    const navigate = useNavigate();
    const initialInjuryData = {
        clubId: sessionStorage.getItem('clubId'),
        playerId: sessionStorage.getItem('playerId'),      
        injuryType: '',
        averageRecoveryTime: ''
    };

    const [injuryData, setInjuryData] = useState(initialInjuryData);
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInjuryData({ ...injuryData, [name]: value });
    };

    const resetForm = () => {
        setInjuryData(initialInjuryData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            console.log(injuryData); 
            const response = await axios.post(
                'http://localhost:4040/api/club/clubAddOneInjuryUpdate',
                { ...injuryData },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token
                    }
                }
            );
            if (response.status === 200) {
                alert('Injury update submitted successfully');
                resetForm();
                navigate('/clubDashboard');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setValidationErrors(data.errors || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/clubLogin');
                        break;
                    case 422:
                        alert(data.error || 'An error occurred while submitting the injury update.');
                        break;
                    case 500:
                        alert(data.message || 'Internal server error. Please try again later.');
                        break;
                    default:
                        alert('An error occurred. Please try again.');
                        break;
                }
            } else {
                alert('An error occurred. Please check your connection and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh' }}>
            <ClubNavbar />
            <div className="container-fluid" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="card bg-transparent" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius: '5px' }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="injuryType" className="form-label" style={{ color: '#fff' }}>Injury Type</label>
                                        <input type="text" className={`form-control ${validationErrors.injuryType ? 'is-invalid' : ''}`} id="injuryType" name="injuryType" value={injuryData.injuryType} onChange={handleInputChange} />
                                        {validationErrors.injuryType && <div className="invalid-feedback">{validationErrors.injuryType}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="averageRecoveryTime" className="form-label" style={{ color: '#fff' }}>Average Recovery Time</label>
                                        <input type="text" className={`form-control ${validationErrors.averageRecoveryTime ? 'is-invalid' : ''}`} id="averageRecoveryTime" name="averageRecoveryTime" value={injuryData.averageRecoveryTime} onChange={handleInputChange} />
                                        {validationErrors.averageRecoveryTime && <div className="invalid-feedback">{validationErrors.averageRecoveryTime}</div>}
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Submitting...' : 'Submit Injury Update'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubAddOneInjuryUpdate;
