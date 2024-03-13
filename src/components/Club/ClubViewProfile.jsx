import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import ClubNavbar from './ClubNabvar';

const ClubViewProfile = () => {
    const navigate = useNavigate();
    const [clubProfile, setClubProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const clubId = sessionStorage.getItem('clubId');
                const response = await axios.post(
                    'http://localhost:4040/api/club/clubViewProfile',
                    { clubId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setClubProfile(response.data.data);
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
                            const errorMessage422 = data.error || "An error occurred during profile view.";
                            alert(errorMessage422);
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

        fetchProfile();
    }, [navigate]);

    return (
<div style={{ background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)', color: '#fff', minHeight: '100vh' }}>
    <ClubNavbar/>
    <div className="container" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-12 col-md-10 col-lg-8">
                <div className="card shadow-lg mb-5 bg-transparent border-0 rounded" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    {isLoading ? (
                        <div className="card-body d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : clubProfile ? (
                        <div className="card-body">
                            <div className="row g-4 align-items-center">
                                <div className="col-12 col-md-5 d-flex justify-content-center">
                                    <img
                                        src={clubProfile.clubImage}
                                        alt="Club"
                                        className="img-thumbnail"
                                        style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #f8f9fa' }}
                                    />
                                </div>
                                <div className="col-12 col-md-7">
                                    <div className="mb-3">
                                        <label className="text-primary fw-bold mb-0">Manager Name:</label>
                                        <p className="mb-2" style={{ color: '#fff', fontWeight: 'bold' }}>{clubProfile.managerName}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-primary fw-bold mb-0">Club Email:</label>
                                        <p className="mb-2" style={{ color: '#fff', fontWeight: 'bold' }}>{clubProfile.clubEmail}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-primary fw-bold mb-0">Club Address:</label>
                                        <p className="mb-2" style={{ color: '#fff', fontWeight: 'bold' }}>{clubProfile.clubAddress}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-primary fw-bold mb-0">Manager Email:</label>
                                        <p className="mb-2" style={{ color: '#fff', fontWeight: 'bold' }}>{clubProfile.managerEmail}</p>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-primary fw-bold mb-0">Manager Mobile:</label>
                                        <p className="mb-0" style={{ color: '#fff', fontWeight: 'bold' }}>{clubProfile.managerMobile}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center mt-4">
                                <div className="col-12 col-md-7 d-flex justify-content-center">
                                    <img
                                        src={clubProfile.managerImage}
                                        alt="Manager"
                                        className="img-thumbnail"
                                        style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #f8f9fa' }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <Link to="/clubUpdateProfile" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>Update Details</Link>
                                {/* Add the same button for changing image here */}
                            </div>
                        </div>
                    ) : (
                        <div className="card-body d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                            <p>No profile found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
    <CommonFooter />
</div>




    );
};

export default ClubViewProfile;
