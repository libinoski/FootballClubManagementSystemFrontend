import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from './ClubNabvar';
import CommonFooter from '../Common/CommonFooter';


const ClubViewAllLeaveRequests = () => {
    const navigate = useNavigate();
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewAllLeaveRequests',
                    { clubId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setLeaveRequests(response.data.data);
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
                            alert(data.message || 'No leave requests found.');
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

        fetchLeaveRequests();
    }, []);

    const handleViewLeaveRequest = (leaveRequestId) => {
        sessionStorage.setItem('leaveRequestId', leaveRequestId);
        navigate('/clubViewOneLeaveRequest');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ClubNavbar />
            <div style={{
                flex: '1',
                background: 'linear-gradient(to right, #000000, #000000)',
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
                                ) : leaveRequests.length > 0 ? (
                                    <ul className="list-group list-group-flush">
                                        {leaveRequests.map((request, index) => (
                                            <li
                                                key={index}
                                                className="list-group-item mb-3 shadow-sm"
                                                style={{
                                                    borderRadius: '1rem',
                                                    background: 'linear-gradient(to right, #f0f9ff, #cbebff)',
                                                    cursor: 'pointer',
                                                    border: '2px solid #007bff',
                                                    backdropFilter: 'blur(5px)',
                                                    transition: 'transform 0.2s',
                                                }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                onClick={() => handleViewLeaveRequest(request.leaveRequestId)}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-grow-1" style={{ overflow: 'hidden' }}>
                                                        <p className="mb-0 fw-bold" style={{
                                                            fontSize: '1rem',
                                                            color: '#000',
                                                            wordBreak: 'break-word',
                                                            whiteSpace: 'nowrap',
                                                            textOverflow: 'ellipsis'
                                                        }}>
                                                            {request.playerName} - {request.message}
                                                        </p>
                                                        <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>
                                                            {request.sendDate}
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-center mt-4">No leave requests found.</p>
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

export default ClubViewAllLeaveRequests;
