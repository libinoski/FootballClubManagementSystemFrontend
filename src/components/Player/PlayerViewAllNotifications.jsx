import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlayerNavbar from './PlayerNavbar';
import CommonFooter from '../Common/CommonFooter';

const PlayerViewAllNotifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });
        return `${formattedDate} ${formattedTime}`;
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/player/playerViewAllNotifications',
                    { playerId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setNotifications(response.data.data);
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
                            alert(data.message || 'No notifications found.');
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

        fetchNotifications();
    }, []);

    const handleViewNotification = (notificationId) => {
        sessionStorage.setItem('notificationId', notificationId);
        navigate('/playerViewOneNotification');
    };

    return (

<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <PlayerNavbar />
  <div style={{
    flex: '1',
    background: 'linear-gradient(to right, #000000, #000000)', // Updated as per your request
    color: '#fff',
    paddingTop: '20px',
    paddingBottom: '20px'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            {isLoading ? (
              <div className="d-flex justify-content-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : notifications.length > 0 ? (
              <ul className="list-group list-group-flush">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="list-group-item mb-3 shadow-sm"
                    style={{
                      borderRadius: '1rem',
                      background: 'linear-gradient(to right, #f0f9ff, #cbebff)', // Attractive background
                      cursor: 'pointer',
                      border: '2px solid #007bff', // Blue border
                      backdropFilter: 'blur(5px)',
                      transition: 'transform 0.2s', // Smooth transition for hover effect
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} // Hover effect: scale up
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} // Hover effect: scale down to original
                    onClick={() => handleViewNotification(notification.notificationId)}
                  >
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
                        <p className="mb-0 fw-bold" style={{
                          fontSize: '1rem',
                          color: '#000', // More readable text color
                          wordBreak: 'break-word',
                          whiteSpace: 'nowrap',
                          textOverflow: 'ellipsis'
                        }}>
                          {notification.message}
                        </p>
                        <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>
                          <span style={{ color: 'red' }}>{formatDate(notification.sendDate)}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center mt-4">No notifications found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  <CommonFooter />
</div>



    );
};

export default PlayerViewAllNotifications;
