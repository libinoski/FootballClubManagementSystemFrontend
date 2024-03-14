import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerNavbar from './PlayerNavbar';
import CommonFooter from '../Common/CommonFooter';



const PlayerViewAllClubs = () => {
    const navigate = useNavigate();
    const [allClubs, setAllClubs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAllClubs = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:4040/api/player/playerViewAllClubs',
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setAllClubs(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/playersLogin');
                            break;
                        case 422:
                            alert(data.message || 'No clubs found.');
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

        fetchAllClubs();
    }, [navigate]);

    return (
        <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <PlayerNavbar />
            <div className="container-fluid py-4" style={{ minHeight: '100vh', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '100%', padding: '0 15px', overflowY: 'auto', maxHeight: 'calc(100% - 100px)' }}>
                    {isLoading ? (
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
                            {allClubs.length > 0 ? (
                                allClubs.map((club, index) => (
                                    <div className="col" key={index} style={{ cursor: 'default' }}>
                                        <div className="card h-100 border-0" style={{ background: 'rgba(255, 255, 255, 0.2)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                            <img src={club.clubImage} className="card-img-top img-fluid" alt="Club Logo" style={{ objectFit: 'contain', maxHeight: '200px' }} />
                                            <div className="card-body text-center" style={{ padding: '20px' }}>
                                                <h5 className="card-title mb-4" style={{ background: 'rgba(255, 255, 255, 0.5)', borderRadius: '5px', padding: '10px', color: '#000', backdropFilter: 'blur(5px)', fontWeight: 'bold' }}>{club.clubName}</h5>
                                                <p className="card-text text-white fw-bold">Email: {club.clubEmail}</p>
                                                <p className="card-text text-white fw-bold">Address: {club.clubAddress}</p>
                                                <p className="card-text text-white fw-bold">Manager: {club.managerName}</p>
                                                <p className="card-text text-white fw-bold">Manager Email: {club.managerEmail}</p>
                                                <p className="card-text text-white fw-bold">Manager Mobile: {club.managerMobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center w-100">No clubs available.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default PlayerViewAllClubs;