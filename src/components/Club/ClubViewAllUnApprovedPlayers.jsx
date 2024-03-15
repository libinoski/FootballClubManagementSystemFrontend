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
<div>
    <ClubNavbar />
    <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh', paddingTop: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {isLoading ? (
            <div className="text-center" style={{ minHeight: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : unapprovedPlayers.length > 0 ? (
            <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {unapprovedPlayers.map((player, index) => (
                    <div key={index} className="card shadow h-100 bg-transparent" onClick={() => handleViewDetails(player.playerId)} 
                        style={{ 
                            cursor: 'pointer', 
                            backdropFilter: 'blur(10px)', 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                            transition: 'all 0.3s ease-in-out',
                            borderRadius: '10px',
                            flex: '1 1 300px', // Adjust the card width as needed
                            maxWidth: '300px',
                            border: '1px solid #fff'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}>
                        <div className="card-body" style={{ color: '#fff' }}>
                            <img
                                src={player.playerImage}
                                alt="Player Avatar"
                                className="img-fluid rounded-circle mb-3"
                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                            <h5 className="card-title text-primary">{player.playerName}</h5>
                            <p className="card-text"><strong>Email:</strong> {player.playerEmail}</p>
                            <p className="card-text"><strong>Phone:</strong> {player.playerMobile}</p>
                            <p className="card-text"><strong>Position:</strong> {player.playerPosition}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center mt-4 alert alert-warning">No unapproved players available.</div>
        )}
    </div>
    <CommonFooter />
</div>


    );
};

export default ClubViewAllUnapprovedPlayers;
