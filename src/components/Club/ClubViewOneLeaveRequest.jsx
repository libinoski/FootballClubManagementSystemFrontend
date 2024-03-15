import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import CommonFooter from '../Common/CommonFooter';
import ClubNavbar from './ClubNabvar';
import { useNavigate } from 'react-router-dom';

const ClubViewOneLeaveRequest = () => {
    const [leaveRequest, setLeaveRequest] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleErrors = useCallback((error) => {
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 401:
                case 403:
                    alert(data.message || 'Unauthorized access. Please login again.');
                    navigate('/ClubLogin');
                    break;
                case 422:
                    alert(data.message || 'Leave Request not found.');
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

    const fetchLeaveRequest = useCallback(async () => {
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const clubId = sessionStorage.getItem('clubId');
            const leaveRequestId = sessionStorage.getItem('leaveRequestId');
            const response = await axios.post(
                'http://localhost:4040/api/club/clubViewOneLeaveRequest',
                { clubId, leaveRequestId },
                {
                    headers: {
                        token
                    }
                }
            );
            if (response.status === 200) {
                setLeaveRequest(response.data.data);
            }
        } catch (error) {
            handleErrors(error);
        } finally {
            setIsLoading(false);
        }
    }, [handleErrors]);

    useEffect(() => {
        fetchLeaveRequest();
    }, [fetchLeaveRequest]);

    const handleApproveLeaveRequest = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const clubId = sessionStorage.getItem('clubId');
            const leaveRequestId = sessionStorage.getItem('leaveRequestId');
            const response = await axios.post(
                'http://localhost:4040/api/club/clubApproveOneLeaveRequest',
                { clubId, leaveRequestId },
                {
                    headers: {
                        token
                    }
                }
            );
            if (response.status === 200) {
                alert(response.data.message)
                navigate('/clubViewAllLeaveRequests');
            }
        } catch (error) {
            console.error('Error approving leave request:', error);
            handleErrors(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ClubNavbar />
            <div style={{
                flex: '1',
                background: 'linear-gradient(to right, #000000, #000000)',
                color: '#fff',
                paddingTop: '20px',
                paddingBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {isLoading ? (
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : leaveRequest ? (
                    <div className="card mb-3 shadow-sm border-primary" style={{
                        width: '300px',
                        height: '300px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: '#ffffff',
                        color: '#000'
                    }}>
                        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <h5 className="card-title fw-bold text-primary mb-3">Leave Request Details:</h5>
                            <p className="card-text mb-0" style={{ textAlign: 'center' }}>Player Name: {leaveRequest.playerName}</p>
                            <p className="card-text mb-0" style={{ textAlign: 'center' }}>Message: {leaveRequest.message}</p>
                            <p className="card-text mb-0" style={{ textAlign: 'center' }}>Send Date: {new Date(leaveRequest.sendDate).toLocaleString()}</p>
                            <button className="btn btn-success mt-3" onClick={handleApproveLeaveRequest}>Approve Leave Request</button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center mt-4">No leave request found.</p>
                )}
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubViewOneLeaveRequest;
