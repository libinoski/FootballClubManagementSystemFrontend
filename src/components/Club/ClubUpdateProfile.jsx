import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import ClubNavbar from './ClubNabvar';

const ClubUpdateProfile = () => {
    const navigate = useNavigate();
    const [clubProfile, setClubProfile] = useState({
        clubName: '',
        managerMobile: '',
        clubAddress: '',
        managerName: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewProfile',
                    { clubId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    const { clubName, managerMobile, clubAddress, managerName } = response.data.data;
                    setClubProfile({
                        clubName,
                        managerMobile,
                        clubAddress,
                        managerName,
                    });
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/clubLogin');
                            break;
                        case 422:
                            const errorMessage422 = data.error || "An error occurred during profile view.";
                            alert(errorMessage422);
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

        fetchProfile();
    }, [navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setClubProfile({ ...clubProfile, [name]: value });
        if (errorMessages[name]) {
            setErrorMessages({ ...errorMessages, [name]: '' });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessages({});
        try {
            const token = sessionStorage.getItem('token');
            const clubId = sessionStorage.getItem('clubId');
            const response = await axios.post('http://localhost:4040/api/club/clubUpdateProfile', { ...clubProfile, clubId }, {
                headers: {
                    'token': token,
                },
            });
            if (response.status === 200) {
                alert(response.data.message);
                navigate('/clubViewProfile');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setErrorMessages(data.results || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/clubLogin');
                        break;
                    case 422:
                        const errorMessage = data.error || "An error occurred during profile update.";
                        alert(errorMessage);
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

    const handleConfirmation = () => {
        const hasErrors = Object.keys(errorMessages).length > 0;
        if (!hasErrors) {
            setShowConfirmation(true);
        } else {
            handleSubmit();
        }
    };

    const handleConfirmSubmit = () => {
        setShowConfirmation(false);
        handleSubmit();
    };

    return (
<div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh' }}>
            <ClubNavbar />
            <div className="container-fluid" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="card bg-transparent" style={{ width: '100%', maxWidth: '500px', border: Object.keys(errorMessages).length > 0 ? '1px solid red' : 'none' }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="clubName" className="form-label" style={{ color: '#fff' }}>Club Name:</label>
                                        <input
                                            type="text"
                                            name="clubName"
                                            value={clubProfile.clubName}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.clubName ? 'is-invalid' : ''}`}
                                            id="clubName"
                                            required
                                        />
                                        {errorMessages.clubName && <div className="invalid-feedback">{errorMessages.clubName}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="managerMobile" className="form-label" style={{ color: '#fff' }}>Manager Mobile:</label>
                                        <input
                                            type="text"
                                            name="managerMobile"
                                            value={clubProfile.managerMobile}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.managerMobile ? 'is-invalid' : ''}`}
                                            id="managerMobile"
                                            required
                                        />
                                        {errorMessages.managerMobile && <div className="invalid-feedback">{errorMessages.managerMobile}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="clubAddress" className="form-label" style={{ color: '#fff' }}>Address:</label>
                                        <input
                                            type="text"
                                            name="clubAddress"
                                            value={clubProfile.clubAddress}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.clubAddress ? 'is-invalid' : ''}`}
                                            id="clubAddress"
                                            required
                                        />
                                        {errorMessages.clubAddress && <div className="invalid-feedback">{errorMessages.clubAddress}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="managerName" className="form-label" style={{ color: '#fff' }}>Manager Name:</label>
                                        <input
                                            type="text"
                                            name="managerName"
                                            value={clubProfile.managerName}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.managerName ? 'is-invalid' : ''}`}
                                            id="managerName"
                                            required
                                        />
                                        {errorMessages.managerName && <div className="invalid-feedback">{errorMessages.managerName}</div>}
                                    </div>

                                    <div className="text-center">
                                        {showConfirmation ? (
                                            <div>
                                                <p>Are you sure you want to update the club profile?</p>
                                                <button type="button" className="btn btn-secondary mr-2" onClick={() => setShowConfirmation(false)}>Cancel</button>
                                                <button type="button" className="btn btn-success" onClick={handleConfirmSubmit}>Confirm</button>
                                            </div>
                                        ) : (
                                            <button type="button" className={`btn btn-${Object.keys(errorMessages).length ? 'danger' : 'success'}`} disabled={isLoading} onClick={handleConfirmation} style={{ width: '100px' }}>
                                                {isLoading ? 'Updating Profile...' : 'Update'}
                                            </button>
                                        )}
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

export default ClubUpdateProfile;
