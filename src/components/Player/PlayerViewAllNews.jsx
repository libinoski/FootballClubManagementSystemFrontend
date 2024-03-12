import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerNavbar from './PlayerNavbar';
import CommonFooter from '../Common/CommonFooter';



const PlayerViewAllNews = () => {
    const navigate = useNavigate();
    const [allNews, setAllNews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAllNews = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/Player/PlayerViewAllNews',
                    { playerId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setAllNews(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/PlayerLogin');
                            break;
                        case 422:
                            alert(data.error || 'Player not found or inactive.');
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

        fetchAllNews();
    }, [navigate]);

    // Function to format date and time
    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
        const formattedTime = date.toLocaleTimeString('en-US', { hour12: false }); // Format: HH:MM
        return `${formattedDate} ${formattedTime}`;
    };

    const handleViewNews = (footballNewsId) => {
        sessionStorage.setItem('footballNewsId', footballNewsId);
        navigate('/PlayerViewOneNews');
    };

    return (
        <div>
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
                            {allNews.length > 0 ? (
                                allNews.map((news, index) => (
                                    <div className="col" key={index} onClick={() => handleViewNews(news.footballNewsId)} style={{ cursor: 'pointer' }}>
                                        <div className="card h-100 border-0 shadow">
                                            <img src={news.footballNewsImage} className="card-img-top img-fluid" alt="News" style={{ objectFit: 'contain', height: '200px', maxWidth: '100%' }} />
                                            <div className="card-body" style={{ background: '#f0f0f0', padding: '20px' }}>
                                                <h5 className="card-title" style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px', backdropFilter: 'blur(5px)', padding: '10px', marginBottom: '15px' }}>{news.footballNewsTitle}</h5>
                                                <p className="card-text text-muted" style={{ marginBottom: '10px' }}>{formatDate(news.addedDate)}</p>
                                                <p className="card-text">{news.footballNewsContent}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center w-100">No news available.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default PlayerViewAllNews;
