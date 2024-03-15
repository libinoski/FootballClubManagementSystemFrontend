import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import AdminNavbar from './AdminNavbar';

const AdminAddMatch = () => {
    const navigate = useNavigate();
    const initialMatchData = {
        adminId: sessionStorage.getItem('adminId'),
        matchName: '',
        homeTeamName: '',
        awayTeamName: '',
        matchLocation: '',
        matchPrize: '',
        matchDate: '',
        homeTeamImage: null,
        awayTeamImage: null
    };
    const [matchData, setMatchData] = useState(initialMatchData);
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMatchData({ ...matchData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMatchData({ ...matchData, [e.target.name]: file });
    };

    const resetForm = () => {
        setMatchData(initialMatchData);
    };

    const createFormData = () => {
        const formData = new FormData();
        Object.entries(matchData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        return formData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const formData = createFormData();
            const response = await axios.post(
                'http://localhost:4040/api/admin/adminAddMatch',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token
                    }
                }
            );
            if (response.status === 200) {
                alert('Match added successfully');
                resetForm();
                navigate('/adminViewAllMatches');
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
                    case 422:
                        alert(data.error || 'An error occurred while adding the match.');
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
    <AdminNavbar />
    <div className="container-fluid" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
        <div className="row justify-content-center">
            <div className="col-12 col-md-6">
                <div className="card bg-transparent" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius: '5px' }}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="matchName" className="form-label" style={{ color: '#fff' }}>Match Name</label>
                                <input type="text" className={`form-control ${validationErrors.matchName ? 'is-invalid' : ''}`} id="matchName" name="matchName" value={matchData.matchName} onChange={handleInputChange} />
                                {validationErrors.matchName && <div className="invalid-feedback">{validationErrors.matchName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="homeTeamName" className="form-label" style={{ color: '#fff' }}>Home Team Name</label>
                                <input type="text" className={`form-control ${validationErrors.homeTeamName ? 'is-invalid' : ''}`} id="homeTeamName" name="homeTeamName" value={matchData.homeTeamName} onChange={handleInputChange} />
                                {validationErrors.homeTeamName && <div className="invalid-feedback">{validationErrors.homeTeamName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="awayTeamName" className="form-label" style={{ color: '#fff' }}>Away Team Name</label>
                                <input type="text" className={`form-control ${validationErrors.awayTeamName ? 'is-invalid' : ''}`} id="awayTeamName" name="awayTeamName" value={matchData.awayTeamName} onChange={handleInputChange} />
                                {validationErrors.awayTeamName && <div className="invalid-feedback">{validationErrors.awayTeamName}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="matchLocation" className="form-label" style={{ color: '#fff' }}>Location</label>
                                <input type="text" className={`form-control ${validationErrors.matchLocation ? 'is-invalid' : ''}`} id="matchLocation" name="matchLocation" value={matchData.matchLocation} onChange={handleInputChange} />
                                {validationErrors.matchLocation && <div className="invalid-feedback">{validationErrors.matchLocation}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="matchPrize" className="form-label" style={{ color: '#fff' }}>Prize</label>
                                <input type="text" className={`form-control ${validationErrors.matchPrize ? 'is-invalid' : ''}`} id="matchPrize" name="matchPrize" value={matchData.matchPrize} onChange={handleInputChange} />
                                {validationErrors.matchPrize && <div className="invalid-feedback">{validationErrors.matchPrize}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="matchDate" className="form-label" style={{ color: '#fff' }}>Date</label>
                                <input type="date" className={`form-control ${validationErrors.matchDate ? 'is-invalid' : ''}`} id="matchDate" name="matchDate" value={matchData.matchDate} onChange={handleInputChange} />
                                {validationErrors.matchDate && <div className="invalid-feedback">{validationErrors.matchDate}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="homeTeamImage" className="form-label" style={{ color: '#fff' }}>Home Team Image</label>
                                <input type="file" className={`form-control ${validationErrors.homeTeamImage ? 'is-invalid' : ''}`} id="homeTeamImage" name="homeTeamImage" onChange={handleFileChange} />
                                {validationErrors.homeTeamImage && <div className="invalid-feedback">{validationErrors.homeTeamImage}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="awayTeamImage" className="form-label" style={{ color: '#fff' }}>Away Team Image</label>
                                <input type="file" className={`form-control ${validationErrors.awayTeamImage ? 'is-invalid' : ''}`} id="awayTeamImage" name="awayTeamImage" onChange={handleFileChange} />
                                {validationErrors.awayTeamImage && <div className="invalid-feedback">{validationErrors.awayTeamImage}</div>}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Adding...' : 'Add Match'}</button>
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

export default AdminAddMatch;
