import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import PlayerNavbar from './PlayerNavbar';

const PlayerViewAllApprovedLeaveRequests = () => {
    const navigate = useNavigate();
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleErrorResponse = (error) => {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/playerLogin');
                        break;
                    case 404:
                        alert(data.message || 'No approved leave requests found for this player.');
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

        const fetchApprovedLeaveRequests = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/player/playerViewAllApprovedLeaveRequests',
                    { playerId },
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
                handleErrorResponse(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApprovedLeaveRequests();
    }, [navigate]);

    return (
<div>
    <PlayerNavbar />
    <div className="pt-5 min-vh-100 d-flex flex-column align-items-center" style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff' }}>
        {isLoading ? (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : (
            leaveRequests.length > 0 ? (
                <div className="d-flex flex-wrap justify-content-center gap-4">
                    {leaveRequests.map((request, index) => (
                        <div key={index} className="card text-white shadow" style={{ minWidth: '300px', maxWidth: '300px', background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.2)', textShadow: '0 0 3px #000' }}>
                            <div className="card-body">
                                <h5 className="card-title">{request.playerName}</h5>
                                <p className="card-text">{request.message}</p>
                                <p className="card-text" style={{ color: '#ADD8E6' }}><small>Sent on {request.sendDate}</small></p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="alert alert-warning" role="alert">
                    No approved leave requests available.
                </div>
            )
        )}
    </div>
    <CommonFooter />
</div>

    );
};

export default PlayerViewAllApprovedLeaveRequests;
