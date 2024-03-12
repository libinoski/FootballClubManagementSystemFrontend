import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import ClubNavbar from './ClubNabvar';

const ClubViewAllPlayers = () => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleErrorResponse = (error) => {
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
        };

        const fetchAllPlayers = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewAllPlayers',
                    { clubId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setPlayers(response.data.data);
                }
            } catch (error) {
                handleErrorResponse(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllPlayers();
    }, [navigate]);

    const handleViewDetails = (playerId) => {
        sessionStorage.setItem('playerId', playerId);
        navigate('/clubViewOnePlayer');
    };

    return (
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
            <ClubNavbar />
            <div className="flex-grow-1 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa', padding: '70px 0' }}>
                <div className="container">
                    {isLoading ? (
                        <div className="text-center" style={{ minHeight: '300px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : players.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
                            {players.map((player, index) => (
                                <div key={index} className="col">
                                    <div className="card shadow h-100" onClick={() => handleViewDetails(player.playerId)} style={{ cursor: 'pointer' }}>
                                        <div className="card-body">
                                            <img
                                                src={player.playerImage}
                                                alt="Player Avatar"
                                                className="img-fluid rounded-circle mb-3"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                            />
                                            <h5 className="card-title">{player.playerName}</h5>
                                            <p className="card-text"><strong>Email:</strong> {player.playerEmail}</p>
                                            <p className="card-text"><strong>Phone:</strong> {player.playerMobile}</p>
                                            <p className="card-text"><strong>Position:</strong> {player.playerPosition}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center mt-4 alert alert-warning">No players available.</div>
                    )}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubViewAllPlayers;
