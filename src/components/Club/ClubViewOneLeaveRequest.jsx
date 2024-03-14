import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from './ClubNavbar';
import CommonFooter from '../Common/CommonFooter';

const ClubViewOneLeaveRequest = () => {
    const navigate = useNavigate();
    const [leaveRequestDetails, setLeaveRequestDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Function to format date and time
    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false }); // Format: HH:MM
        return `${formattedDate} ${formattedTime}`;
    };

    const handleRequestError = useCallback((error) => {
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                case 403:
                    alert(data.message || 'Unauthorized access. Please login again.');
                    navigate('/clubLogin');
                    break;
                case 422:
                    alert(data.message || "An error occurred while fetching leave request details.");
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
    }, [navigate]);

    useEffect(() => {
        const fetchLeaveRequestDetails = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const leaveRequestId = sessionStorage.getItem('leaveRequestId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/viewOneLeaveRequest',
                    { clubId, leaveRequestId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setLeaveRequestDetails(response.data.data);
                }
            } catch (error) {
                handleRequestError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaveRequestDetails();
    }, [navigate, handleRequestError]);

    const handleApproveLeaveRequest = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const clubId = sessionStorage.getItem('clubId');
            const leaveRequestId = sessionStorage.getItem('leaveRequestId');
            const response = await axios.post(
                'http://localhost:4040/api/club/approveOneLeaveRequest',
                { clubId, leaveRequestId },
                {
                    headers: {
                        token
                    }
                }
            );
            if (response.status === 200) {
                alert(response.data.message);
                navigate('/clubViewAllLeaveRequests');
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    return (
        <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ClubNavbar />
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ paddingTop: '56px', paddingBottom: '80px', minHeight: '100vh' }}>
                <div className="col-lg-8">
                    {isLoading ? (
                        <p className="text-center">Loading leave request details...</p>
                    ) : (
                        <div className="card" style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.125)', color: '#fff' }}>
                            {leaveRequestDetails ? (
                                <div className="card-body">
                                    <h5 className="card-title text-center mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>{leaveRequestDetails.playerName}</h5>
                                    <p className="card-text" style={{ fontSize: '18px', lineHeight: '1.6' }}>Leave Type: {leaveRequestDetails.leaveType}</p>
                                    <p className="card-text" style={{ fontSize: '18px', lineHeight: '1.6' }}>Requested On: {formatDate(leaveRequestDetails.requestedDate)}</p>
                                    <p className="card-text" style={{ backgroundColor: 'yellow', padding: '5px', borderRadius: '5px', color: '#333' }}>Status: {leaveRequestDetails.status}</p>
                                </div>
                            ) : (
                                <p className="text-center">No leave request details found.</p>
                            )}
                        </div>
                    )}
                    {leaveRequestDetails && leaveRequestDetails.status === 'Pending' && (
                        <div className="text-center mt-4">
                            <button className="btn btn-success" onClick={handleApproveLeaveRequest}>Approve Leave Request</button>
                        </div>
                    )}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubViewOneLeaveRequest;
