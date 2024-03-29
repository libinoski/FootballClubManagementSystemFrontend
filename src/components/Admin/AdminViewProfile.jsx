import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import AdminNavbar from './AdminNavbar';

const AdminViewProfile = () => {
    const navigate = useNavigate();
    const [adminProfile, setAdminProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const adminId = sessionStorage.getItem('adminId');
                const response = await axios.post(
                    'http://localhost:4040/api/admin/adminViewProfile',
                    { adminId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setAdminProfile(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/adminLogin');
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
<div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <AdminNavbar />
    <div className="container-fluid py-4" style={{ minHeight: '100vh', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '100%', padding: '0 15px', overflowY: 'auto', maxHeight: 'calc(100% - 100px)' }}>
            <div className="row justify-content-center align-items-center" style={{ marginTop: '80px', minHeight: 'calc(100vh - 160px)' }}>
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card shadow-lg mb-5 bg-transparent border-0 rounded" style={{ borderRadius: '15px', overflow: 'hidden', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', color: '#fff' }}>
                        {isLoading ? (
                            <div className="card-body d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : adminProfile ? (
                            <div className="card-body">
                                <div className="row g-4 align-items-center">
                                    <div className="col-12 col-md-5 d-flex justify-content-center">
                                        <img
                                            src={adminProfile.adminImage}
                                            alt="Admin"
                                            className="img-thumbnail"
                                            style={{ width: '250px', height: '250px', objectFit: 'cover', borderRadius: '50%', border: '5px solid #f8f9fa' }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-7">
                                        <h3 className="mb-3" style={{ color: '#fff', fontWeight: 'bold' }}>{adminProfile.adminName}</h3>
                                        <p className="mb-2" style={{ color: '#fff', fontWeight: 'bold' }}>{adminProfile.adminEmail}</p>
                                        <p className="mb-2" style={{ color: '#fff', fontWeight: 'bold' }}>{adminProfile.adminMobile}</p>
                                        <p className="mb-2" style={{ color: '#fff', fontWeight: 'bold' }}>{adminProfile.adminAddress}</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center gap-3 mt-4">
                                    <Link to="/adminUpdateProfile" className="btn btn-primary" style={{ padding: '10px 20px', borderRadius: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>Update Details</Link>
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
    </div>
    <CommonFooter />
</div>

    );
};

export default AdminViewProfile;
