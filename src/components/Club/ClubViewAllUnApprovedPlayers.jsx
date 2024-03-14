import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from './ClubNabvar';
import CommonFooter from '../Common/CommonFooter';


const ClubViewAllUnapprovedPlayers = () => {
    const navigate = useNavigate();
    const [unapprovedPlayers, setUnapprovedPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUnapprovedPlayers = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewAllUnapprovedPlayers',
                    { clubId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setUnapprovedPlayers(response.data.data);
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
                            alert(data.error || 'Club not found.');
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

        fetchUnapprovedPlayers();
    }, [navigate]);

    const handleViewDetails = (playerId) => {
        sessionStorage.setItem('playerId', playerId);
        navigate('/clubViewOneUnapprovedPlayer');
    };

    return (
<div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh' }}>
            <ClubNavbar />
            <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa', padding: '70px 0' }}>
                <div className="container">
                    {isLoading ? (
                        <div className="text-center" style={{ minHeight: '300px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : unapprovedPlayers.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                            {unapprovedPlayers.map((player, index) => (
                                <div key={index} className="col">
                                    <div
                                        className="card shadow h-100" style={{ cursor: 'pointer' }}
                                        onClick={() => handleViewDetails(player.playerId)}
                                    >
                                        <div className="card-body d-flex align-items-center">
                                            <img
                                                src={player.playerImage}
                                                className="rounded-circle me-3"
                                                alt="Player Avatar"
                                                style={{ width: '60px', height: '60px', objectFit: 'cover', border: '3px solid #eff2f7' }}
                                            />
                                            <div>
                                                <h5 className="card-title text-primary">{player.playerName}</h5>
                                                <p className="card-text"><strong>Email:</strong> {player.playerEmail}</p>
                                                <p className="card-text"><strong>Phone:</strong> {player.playerMobile}</p>
                                                <p className="card-text"><strong>Position:</strong> {player.playerPosition}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-4 alert alert-warning">No unapproved players available.</div>
                    )}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubViewAllUnapprovedPlayers;
