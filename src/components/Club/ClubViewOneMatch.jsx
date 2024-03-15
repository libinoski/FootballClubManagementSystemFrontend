import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClubNavbar from './ClubNabvar';
import CommonFooter from '../Common/CommonFooter';

const ClubViewOneMatch = () => {
    const navigate = useNavigate();
    const [matchDetails, setMatchDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-GB');
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false });
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
                    alert(data.error || "An error occurred while fetching match details.");
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
        const fetchMatchDetails = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const matchId = sessionStorage.getItem('matchId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewOneMatch',
                    { clubId, matchId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setMatchDetails(response.data.data);
                }
            } catch (error) {
                handleRequestError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatchDetails();
    }, [handleRequestError]);

    return (
        <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh' }}>
            <ClubNavbar />
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{ paddingTop: '56px', paddingBottom: '80px', minHeight: '100vh' }}>
                <div className="col-lg-6">
                    {isLoading ? (
                        <p className="text-center" style={{ color: '#fff' }}>Loading match details...</p>
                    ) : (
                        <div className="card border-0" style={{ background: 'rgba(255, 255, 255, 0.1)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(20px)', borderRadius: '10px' }}>
                            {matchDetails ? (
                                <div className="card-body">
                                    <h5 className="card-title text-center mb-4" style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff' }}>{matchDetails.matchName}</h5>
                                    <div className="d-flex justify-content-around align-items-center mb-3">
                                        <img src={matchDetails.homeTeamImage} alt="Home Team" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #007bff' }} />
                                        <p style={{ fontSize: '24px', color: '#fff' }}>vs</p>
                                        <img src={matchDetails.awayTeamImage} alt="Away Team" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', border: '3px solid #6610f2' }} />
                                    </div>
                                    <p className="card-text text-center" style={{ fontSize: '20px', lineHeight: '1.6', color: '#fff' }}>Home Team: {matchDetails.homeTeamName}</p>
                                    <p className="card-text text-center" style={{ fontSize: '20px', lineHeight: '1.6', color: '#fff' }}>Away Team: {matchDetails.awayTeamName}</p>

                                    <p className="card-text text-center" style={{ backgroundColor: 'yellow', padding: '10px', borderRadius: '5px', color: '#000', fontWeight: 'bold' }}>Match Date: {formatDate(matchDetails.matchDate)}</p>
                                    <p className="card-text text-center" style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', color: '#000', fontWeight: 'bold' }}>Match Location: {matchDetails.matchLocation}</p>
                                    <p className="card-text text-center" style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', color: '#000', fontWeight: 'bold' }}>Match Prize: {matchDetails.matchPrize}</p>
                                </div>
                            ) : (
                                <p className="text-center">No match details found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubViewOneMatch;
