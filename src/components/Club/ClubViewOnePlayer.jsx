import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from './ClubNabvar';
import CommonFooter from '../Common/CommonFooter';

const ClubViewOnePlayer = () => {
    const navigate = useNavigate();
    const [playerDetails, setPlayerDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRequestError = useCallback((error) => {
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                case 403:
                    alert(data.message || 'Unauthorized access. Please login again.');
                    navigate('/clubLogin');
                    break;
                case 422:
                    alert(data.error || 'Player not found for this club.');
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
    }, [navigate]);

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewOnePlayer',
                    { clubId, playerId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setPlayerDetails(response.data.data);
                }
            } catch (error) {
                handleRequestError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlayerDetails();
    }, [handleRequestError]);

    const handleDeletePlayer = async () => {
        if (window.confirm("Are you sure you want to delete this player?")) {
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubDeleteOnePlayer',
                    { clubId, playerId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                handleResponse(response);
            } catch (error) {
                handleRequestError(error);
            }
        }
    };

    const handleSuspendPlayer = async () => {
        if (window.confirm("Are you sure you want to suspend this player?")) {
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubSuspendOnePlayer',
                    { clubId, playerId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                handleResponse(response);
            } catch (error) {
                handleRequestError(error);
            }
        }
    };

    const handleSendNotification = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const clubId = sessionStorage.getItem('clubId');
            const playerId = sessionStorage.getItem('playerId');
            const response = await axios.post(
                'http://localhost:4040/api/club/clubSendNotificationToPlayer',
                { clubId, playerId },
                {
                    headers: {
                        token
                    }
                }
            );
            handleResponse(response);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleAddInjuryUpdate = async (injuryData) => {
        try {
            const token = sessionStorage.getItem('token');
            const clubId = sessionStorage.getItem('clubId');
            const playerId = sessionStorage.getItem('playerId');
            const response = await axios.post(
                'http://localhost:4040/api/club/clubAddOneInjuryUpdate',
                { clubId, playerId, injuryData },
                {
                    headers: {
                        token
                    }
                }
            );
            handleResponse(response);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleResponse = (response) => {
        switch (response.status) {
            case 200:
                alert('Operation successful.');
                break;
            default:
                alert('An unexpected error occurred. Please try again.');
                break;
        }
    };

    return (
<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <div>
        <ClubNavbar />
        <div className="container-fluid py-5" style={{ paddingTop: '56px', paddingBottom: '80px', backgroundColor: '#f0f2f5', flex: 1 }}>
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-8 d-flex align-items-start justify-content-center">
                    {isLoading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading player details...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="col-lg-12">
                            {playerDetails ? (
                                <div className="card profile-card shadow border-0 w-100 h-100" style={{ borderRadius: '20px' }}>
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center mb-5">
                                            <div className="profile-picture bg-light rounded-circle shadow" style={{ width: '200px', height: '200px', overflow: 'hidden', border: '5px solid white' }}>
                                                <img src={playerDetails.playerImage} alt="Player" className="img-fluid" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                            </div>
                                            <h3 className="mt-4 fs-4" style={{ fontSize: '1.5rem' }}>{playerDetails.playerName}</h3> 
                                        </div>
                                        <div className="text-left">
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Club:</strong> {playerDetails.clubName}</p>
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Email:</strong> {playerDetails.playerEmail}</p>
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Mobile:</strong> {playerDetails.playerMobile}</p>
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Address:</strong> {playerDetails.playerAddress}</p>
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Age:</strong> {playerDetails.playerAge}</p>
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Country:</strong> {playerDetails.playerCountry}</p>
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Position:</strong> {playerDetails.playerPosition}</p>
                                            <p className="mb-2" style={{ fontSize: '1.125rem' }}><strong>Manager Name:</strong> {playerDetails.managerName}</p>
                                        </div>
                                    </div>
                                    <div className="card-footer d-flex justify-content-center bg-transparent border-top-0">
                                        <button className="btn me-3" onClick={handleSendNotification} style={{ borderRadius: '50px', padding: '10px 30px', boxShadow: '0 4px 8px rgba(0,0,0,.1)', background: 'linear-gradient(135deg, #007BFF, #00DBDE)', border: 'none', color: 'white' }}>Send Notification</button>
                                        <button className="btn me-3" onClick={handleDeletePlayer} style={{ borderRadius: '50px', padding: '10px 30px', boxShadow: '0 4px 8px rgba(0,0,0,.1)', background: 'linear-gradient(135deg, #FC466B, #FF7E5F)', border: 'none', color: 'white' }}>Delete</button>
                                        <button className="btn me-3" onClick={handleSuspendPlayer} style={{ borderRadius: '50px', padding: '10px 30px', boxShadow: '0 4px 8px rgba(0,0,0,.1)', background: 'linear-gradient(135deg, #FFC837, #FF8008)', border: 'none', color: 'white' }}>Suspend</button>
                                        <button className="btn" onClick={handleAddInjuryUpdate} style={{ borderRadius: '50px', padding: '10px 30px', boxShadow: '0 4px 8px rgba(0,0,0,.1)', background: 'linear-gradient(135deg, #24FF72, #9AFC98)', border: 'none', color: 'white' }}>Add Injury Update</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center">No player details found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    <div style={{ marginTop: 'auto' }}> 
        <CommonFooter />
    </div>
</div>



    );
};

export default ClubViewOnePlayer;
