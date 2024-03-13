import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import AdminNavbar from './AdminNavbar';

const AdminAddMatchPoint = () => {
    const navigate = useNavigate();
    const initialMatchPointData = {
        adminId: sessionStorage.getItem('adminId'),
        matchId: sessionStorage.getItem('matchId'),
        teamOneTotalGoalsInMatch: '',
        teamTwoTotalGoalsInMatch: ''
    };
    const [matchPointData, setMatchPointData] = useState(initialMatchPointData);
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMatchPointData({ ...matchPointData, [name]: value });
        // Clear validation error when input value changes
        setValidationErrors({ ...validationErrors, [name]: '' });
    };

    const resetForm = () => {
        setMatchPointData(initialMatchPointData);
        setValidationErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:4040/api/admin/adminAddMatchPoint',
                matchPointData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token
                    }
                }
            );
            if (response.status === 200) {
                alert('Match point added successfully');
                resetForm();
                navigate('/adminViewAllMatchPoints');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setValidationErrors(data.results || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/adminLogin');
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
<div style={{ background:'linear-gradient(to right, #000000, #000000)', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <AdminNavbar />
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ flex: 1, paddingTop: '56px', paddingBottom: '80px' }}>
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
                <div className="container py-5">
                    <div className="card bg-transparent border-0" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius: '0', overflow: 'hidden', position: 'relative', width: '300px', minHeight: '300px' }}>
                        <div className="glass-effect" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.3))', backdropFilter: 'blur(10px)', zIndex: 1 }}></div>
                        <div className="card-body d-flex flex-column justify-content-between" style={{ position: 'relative', zIndex: 2 }}>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="teamOneTotalGoalsInMatch" className="form-label" style={{ color: '#fff' }}>Team One Total Goals</label>
                                        <input type="number" className={`form-control ${validationErrors.teamOneTotalGoalsInMatch ? 'is-invalid' : ''}`} id="teamOneTotalGoalsInMatch" name="teamOneTotalGoalsInMatch" value={matchPointData.teamOneTotalGoalsInMatch} onChange={handleInputChange} style={{ color: '#000' }} />
                                        {validationErrors.teamOneTotalGoalsInMatch && <div className="invalid-feedback">{validationErrors.teamOneTotalGoalsInMatch}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="teamTwoTotalGoalsInMatch" className="form-label" style={{ color: '#fff' }}>Team Two Total Goals</label>
                                        <input type="number" className={`form-control ${validationErrors.teamTwoTotalGoalsInMatch ? 'is-invalid' : ''}`} id="teamTwoTotalGoalsInMatch" name="teamTwoTotalGoalsInMatch" value={matchPointData.teamTwoTotalGoalsInMatch} onChange={handleInputChange} style={{ color: '#000' }} />
                                        {validationErrors.teamTwoTotalGoalsInMatch && <div className="invalid-feedback">{validationErrors.teamTwoTotalGoalsInMatch}</div>}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Match Point'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <CommonFooter />
</div>


    );
};

export default AdminAddMatchPoint;
