import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import CommonFooter from '../Common/CommonFooter';


const AdminViewOneNews = () => {
    const navigate = useNavigate();
    const [newsDetails, setNewsDetails] = useState(null);
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
                    navigate('/adminLogin');
                    break;
                case 422:
                    alert(data.error || "An error occurred while fetching news details.");
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
        const fetchNewsDetails = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const adminId = sessionStorage.getItem('adminId');
                const footballNewsId = sessionStorage.getItem('footballNewsId');
                const response = await axios.post(
                    'http://localhost:4040/api/admin/adminViewOneNews',
                    { adminId, footballNewsId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setNewsDetails(response.data.data);
                }
            } catch (error) {
                handleRequestError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNewsDetails();
    }, [navigate, handleRequestError]);

    const handleDeleteNews = async (footballNewsId) => {
        try {
            // Ask for confirmation before deleting news
            const confirmDeletion = window.confirm('Are you sure you want to delete this news?');
            if (!confirmDeletion) {
                return;
            }

            const token = sessionStorage.getItem('token');
            const adminId = sessionStorage.getItem('adminId');
            const response = await axios.post(
                'http://localhost:4040/api/admin/adminDeleteOneNews',
                { adminId, footballNewsId: footballNewsId },
                {
                    headers: {
                        token
                    }
                }
            );
            if (response.status === 200) {
                // alert(response.data.message);
                navigate('/adminViewAllNews');
            }
        } catch (error) {
            handleRequestError(error);
        }
    };


    return (
<div style={{ background:'linear-gradient(to right, #000000, #000000)'   , color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <AdminNavbar />
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ paddingTop: '56px', paddingBottom: '80px', minHeight: '100vh' }}>
        <div className="col-lg-8">
            {isLoading ? (
                <p className="text-center">Loading news details...</p>
            ) : (
                <div className="card" style={{ borderRadius: '10px', background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.125)', color: '#fff' }}>
                    {newsDetails ? (
                        <div className="row g-0">
                            <div className="col-md-6">
                                <div style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <img 
                                        src={newsDetails.footballNewsImage} 
                                        className="img-fluid rounded-end" 
                                        alt="News" 
                                        style={{ objectFit: 'contain' }} 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 d-flex flex-column justify-content-between">
                                <div className="card-body">
                                    <h5 className="card-title text-center mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>{newsDetails.footballNewsTitle}</h5>
                                    <p className="card-text" style={{ fontSize: '18px', lineHeight: '1.6' }}>{newsDetails.footballNewsContent}</p>
                                    <p className="card-text" style={{ backgroundColor: 'yellow', padding: '5px', borderRadius: '5px', color: '#333' }}>Published on: {formatDate(newsDetails.addedDate)}</p>
                                </div>
                                <div className="d-flex justify-content-center pb-4">
                                    <button className="btn btn-danger me-2" onClick={() => handleDeleteNews(newsDetails.footballNewsId)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-center">No news details found.</p>
                    )}
                </div>
            )}
        </div>
    </div>
    <CommonFooter />
</div>

    );
};

export default AdminViewOneNews;
