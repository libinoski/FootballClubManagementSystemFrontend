import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonFooter from '../Common/CommonFooter';
import PlayerNavbar from './PlayerNavbar';


const PlayerViewOneNotification = () => {
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchNotification = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const playerId = sessionStorage.getItem('playerId');
                const notificationId = sessionStorage.getItem('notificationId');
                const response = await axios.post(
                    'http://localhost:4040/api/player/playerViewOneNotification',
                    { playerId, notificationId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setNotification(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            // Redirect to login page
                            break;
                        case 422:
                            alert(data.message || 'Notification not found.');
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

        fetchNotification();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <PlayerNavbar />
            <div style={{ flex: '1', background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', paddingTop: '20px', paddingBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <div className="container">
                        <div className="row">
                            {isLoading ? (
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : notification ? (
                                <div className="card mb-3 shadow-sm border-primary">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold text-primary mb-3">Notification Details:</h5>
                                        <p className="card-text mb-0">{notification.message}</p>
                                        <p className="card-text mt-2">
                                            <small className="text-muted">Date: {new Date(notification.sendDate).toLocaleString()}</small>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-center mt-4">No notification found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default PlayerViewOneNotification;
