import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClubNavbar from './ClubNabvar';
import CommonFooter from '../Common/CommonFooter';


const ClubViewAllMatchPoints = () => {
    const navigate = useNavigate();
    const [allMatchPoints, setAllMatchPoints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAllMatchPoints = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewAllMatchPoints',
                    { clubId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setAllMatchPoints(response.data.data);
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

        fetchAllMatchPoints();
    }, [navigate]);

    const handleViewMatchPoint = (matchPointId) => {
        sessionStorage.setItem('matchPointId', matchPointId);
        navigate('/clubViewMatchPoint');
    };

    return (
        <div style={{ background:'linear-gradient(to right, #000000, #000000)'   , color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <ClubNavbar />
            <div className="container-fluid py-4" style={{ minHeight: '100vh' }}>
                <div className="container" style={{ padding: '0', overflowY: 'auto', maxHeight: '100%' }}>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover align-middle mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-center">Match</th>
                                        <th scope="col" className="text-center">Teams</th>
                                        <th scope="col" className="text-center">Score</th>
                                        <th scope="col" className="text-center">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allMatchPoints.length > 0 ? (
                                        allMatchPoints.map((matchPoint, index) => (
                                            <tr key={index} onClick={() => handleViewMatchPoint(matchPoint.matchPointId)} style={{ cursor: 'pointer' }}>
                                                <td className="text-center">{matchPoint.matchName}</td>
                                                <td className="text-center">
                                                    {matchPoint.homeTeamName}
                                                    <span className="mx-2">vs</span>
                                                    {matchPoint.awayTeamName}
                                                </td>
                                                <td className="text-center">{matchPoint.teamOneTotalGoalsInMatch} - {matchPoint.teamTwoTotalGoalsInMatch}</td>
                                                <td className="text-center">{matchPoint.matchLocation}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">No match points available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubViewAllMatchPoints;
