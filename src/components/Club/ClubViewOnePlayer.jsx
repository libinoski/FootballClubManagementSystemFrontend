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

    const handleSendNotification = (playerId) => {
        sessionStorage.setItem('playerId', playerId);
        navigate('/clubSendNotificationToPlayer');
    };

    const handleAddInjuryUpdate = (playerId) => {
        sessionStorage.setItem('playerId', playerId);
        navigate('/clubAddOneInjuryUpdate');
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
        <div>
            <ClubNavbar />
            <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh', paddingTop: '70px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            {isLoading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading player details...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="card shadow-lg border-0" style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                                    {playerDetails ? (
                                        <div className="card-body text-center">
                                            <div className="mb-4">
                                                <div className="bg-light rounded-circle mx-auto" style={{ width: '200px', height: '200px', overflow: 'hidden', border: '5px solid white' }}>
                                                    <img src={playerDetails.playerImage} alt="Player" className="img-fluid" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                                </div>
                                                <h3 className="mt-4 fs-4" style={{ color: 'lightblue', fontWeight: 'bold' }}>{playerDetails.playerName}</h3>
                                            </div>
                                            <div className="text-start">
                                                <p className="text-light"><strong className="text-info">Club:</strong> {playerDetails.clubName}</p>
                                                <p className="text-light"><strong className="text-info">Email:</strong> {playerDetails.playerEmail}</p>
                                                <p className="text-light"><strong className="text-info">Mobile:</strong> {playerDetails.playerMobile}</p>
                                                <p className="text-light"><strong className="text-info">Address:</strong> {playerDetails.playerAddress}</p>
                                                <p className="text-light"><strong className="text-info">Age:</strong> {playerDetails.playerAge}</p>
                                                <p className="text-light"><strong className="text-info">Country:</strong> {playerDetails.playerCountry}</p>
                                                <p className="text-light"><strong className="text-info">Position:</strong> {playerDetails.playerPosition}</p>
                                                <p className="text-light"><strong className="text-info">Manager Name:</strong> {playerDetails.managerName}</p>
                                            </div>
                                            <div className="card-footer bg-transparent border-0 d-flex justify-content-around flex-wrap">
                                                <button
                                                    className="btn mx-2 my-1"
                                                    onClick={() => handleSendNotification(playerDetails.playerId)}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #007BFF, #00DBDE)',
                                                        borderRadius: '20px',
                                                        color: 'white',
                                                        padding: '10px 20px',
                                                        border: 'none',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    Send Notification
                                                </button>
                                                <button
                                                    className="btn mx-2 my-1"
                                                    onClick={() => handleAddInjuryUpdate(playerDetails.playerId)}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #24FF72, #9AFC98)',
                                                        borderRadius: '20px',
                                                        color: 'white',
                                                        padding: '10px 20px',
                                                        border: 'none',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    Add Injury Update
                                                </button>

                                                <button
                                                    className="btn mx-2 my-1"
                                                    onClick={handleDeletePlayer}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #FC466B, #FF7E5F)',
                                                        borderRadius: '30px',
                                                        color: 'white',
                                                        padding: '10px 20px',
                                                        border: 'none',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="btn mx-2 my-1"
                                                    onClick={handleSuspendPlayer}
                                                    style={{
                                                        background: 'linear-gradient(135deg, #FFC837, #FF8008)',
                                                        borderRadius: '30px',
                                                        color: 'white',
                                                        padding: '10px 20px',
                                                        border: 'none',
                                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    Suspend
                                                </button>
                                            </div>

                                        </div>
                                    ) : (
                                        <p className="text-center text-light">No player details found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>

    );
};

export default ClubViewOnePlayer;






