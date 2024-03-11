import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import PlayerNavbar from './PlayerNavbar'; // Import PlayerNavbar component

const PlayerViewProfile = () => {
    const navigate = useNavigate();
    const [playerProfile, setPlayerProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/player/playerViewProfile',
                    { playerId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setPlayerProfile(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/playerLogin');
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

    return (
        <div>
            <PlayerNavbar /> {/* Include PlayerNavbar component */}
            <div className="container" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
                <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card shadow-lg mb-5 bg-body rounded" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                            <div className="bg-primary" style={{ borderRadius: '15px 15px 0 0', padding: '20px', color: '#ffffff' }}>
                                <h2 className="text-center">Player Profile</h2>
                            </div>
                            {isLoading ? (
                                <div className="card-body d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : playerProfile ? (
                                <div className="card-body">
                                    <div className="row g-4 align-items-center">
                                        <div className="col-12 col-md-5 d-flex justify-content-center">
                                            <img
                                                src={playerProfile.playerImage}
                                                alt="Player"
                                                className="img-thumbnail"
                                                style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #f8f9fa' }}
                                            />
                                        </div>
                                        <div className="col-12 col-md-7">
                                            <h3 className="mb-3 text-primary">{playerProfile.playerName}</h3>
                                            <p className="mb-2"><strong>Email:</strong> {playerProfile.playerEmail}</p>
                                            <p className="mb-2"><strong>Age:</strong> {playerProfile.playerAge}</p>
                                            <p className="mb-2"><strong>Country:</strong> {playerProfile.playerCountry}</p>
                                            <p className="mb-2"><strong>Position:</strong> {playerProfile.playerPosition}</p>
                                            <p className="mb-2"><strong>Address:</strong> {playerProfile.playerAddress}</p>
                                            {/* Display club name and manager name */}
                                            <p className="mb-2"><strong>Club:</strong> {playerProfile.clubName}</p>
                                            <p className="mb-2"><strong>Manager:</strong> {playerProfile.managerName}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center gap-3 mt-4">
                                        <Link to="/playerUpdateProfile" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>Update Details</Link>
                                        {/* Add the same button for changing image here */}
                                    </div>
                                </div>
                            ) : (
                                <div className="card-body d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                    <p>No profile found.</p>
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

export default PlayerViewProfile;
