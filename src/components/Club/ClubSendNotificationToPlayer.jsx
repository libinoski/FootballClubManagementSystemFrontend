import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from './ClubNabvar';
import CommonFooter from '../Common/CommonFooter';

const ClubSendNotificationToPlayer = () => {
    const [notificationMessage, setNotificationMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const clubId = sessionStorage.getItem('clubId');
            const playerId = sessionStorage.getItem('playerId');
            const response = await axios.post(
                'http://localhost:4040/api/club/clubSendNotificationToPlayer',
                { clubId, playerId, message: notificationMessage },
                {
                    headers: {
                        'token': token,
                        'Content-Type': 'application/json'
                    },
                }
            );
            if (response.status === 200) {
                // alert(response.data.message);
                navigate('/clubViewOnePlayer', { state: { playerId } }); // Navigate to the view one player page with state
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setError(data.error || 'Validation failed.');
                        break;
                    case 401:
                    case 403:
                        setError(data.message || 'Unauthorized access. Please log in again.');
                        break;
                    case 422:
                        setError(data.error || 'Club not found or player not active.');
                        break;
                    case 500:
                        setError(data.message || 'Internal server error. Please try again later.');
                        break;
                    default:
                        setError('An error occurred. Please try again.');
                        break;
                }
            } else {
                setError('An error occurred. Please check your connection and try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <ClubNavbar />
            <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '56px' }}>
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="card bg-transparent border-0" style={{ backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: '15px', maxWidth: '100%' }}>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
                                        <div className="mb-4">
                                            <label htmlFor="notificationMessage" className="form-label" style={{ fontWeight: '500', color: '#fff' }}>Message:</label>
                                            <textarea
                                                value={notificationMessage}
                                                onChange={(e) => setNotificationMessage(e.target.value)}
                                                className="form-control"
                                                id="notificationMessage"
                                                rows="5"
                                                style={{ borderRadius: '15px', boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06)', background: 'transparent', color: '#fff' }}
                                            ></textarea>
                                        </div>
                                        {error && <div className="alert alert-danger" style={{ borderRadius: '15px' }}>{error}</div>}
                                        <div className="text-center">
                                            <button type="submit" className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'}`} disabled={isLoading} style={{ borderRadius: '25px', padding: '10px 30px', transition: 'background-color .3s', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundImage: 'linear-gradient(45deg, #007bff, #6610f2)', border: 'none' }}>
                                                {isLoading ? 'Sending...' : 'Send Notification'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>

    );
};

export default ClubSendNotificationToPlayer;
