import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import AdminNavbar from './AdminNavbar';

const AdminUpdateProfile = () => {
    const navigate = useNavigate();
    const [adminProfile, setAdminProfile] = useState({
        adminName: '',
        adminMobile: '',
        adminAddress: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

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
                    const { adminName, adminMobile, adminAddress } = response.data.data;
                    setAdminProfile({
                        adminName,
                        adminMobile,
                        adminAddress,
                    });
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAdminProfile({ ...adminProfile, [name]: value });
        if (errorMessages[name]) {
            setErrorMessages({ ...errorMessages, [name]: '' });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessages({});
        try {
            const token = sessionStorage.getItem('token');
            const adminId = sessionStorage.getItem('adminId');
            const response = await axios.post('http://localhost:4040/api/admin/adminUpdateProfile', { ...adminProfile, adminId }, {
                headers: {
                    'token': token,
                },
            });
            if (response.status === 200) {
                alert(response.data.message);
                navigate('/adminViewProfile');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setErrorMessages(data.results || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/adminLogin');
                        break;
                    case 422:
                        const errorMessage = data.error || "An error occurred during profile update.";
                        alert(errorMessage);
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

    const handleConfirmation = () => {
        const hasErrors = Object.keys(errorMessages).length > 0;
        if (!hasErrors) {
            setShowConfirmation(true);
        } else {
            handleSubmit();
        }
    };

    const handleConfirmSubmit = () => {
        setShowConfirmation(false);
        handleSubmit();
    };

    return (
<div style={{ background:'linear-gradient(to right, #000000, #000000)'   , color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AdminNavbar />
            <div className="container-fluid flex-grow-1" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="card bg-transparent" style={{ width: '100%', maxWidth: '500px', border: Object.keys(errorMessages).length > 0 ? '1px solid red' : 'none' }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="adminName" className="form-label" style={{ color: '#fff' }}>Admin Name:</label>
                                        <input
                                            type="text"
                                            name="adminName"
                                            value={adminProfile.adminName}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.adminName ? 'is-invalid' : ''}`}
                                            id="adminName"
                                            required
                                        />
                                        {errorMessages.adminName && <div className="invalid-feedback">{errorMessages.adminName}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="adminMobile" className="form-label" style={{ color: '#fff' }}>Mobile:</label>
                                        <input
                                            type="text"
                                            name="adminMobile"
                                            value={adminProfile.adminMobile}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.adminMobile ? 'is-invalid' : ''}`}
                                            id="adminMobile"
                                            required
                                        />
                                        {errorMessages.adminMobile && <div className="invalid-feedback">{errorMessages.adminMobile}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="adminAddress" className="form-label" style={{ color: '#fff' }}>Address:</label>
                                        <input
                                            type="text"
                                            name="adminAddress"
                                            value={adminProfile.adminAddress}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.adminAddress ? 'is-invalid' : ''}`}
                                            id="adminAddress"
                                            required
                                        />
                                        {errorMessages.adminAddress && <div className="invalid-feedback">{errorMessages.adminAddress}</div>}
                                    </div>

                                    <div className="text-center">
                                        {showConfirmation ? (
                                            <div style={{ color: '#fff' }}>
                                                <p>Are you sure you want to update the admin profile?</p>
                                                <button type="button" className="btn btn-secondary mr-2" onClick={() => setShowConfirmation(false)}>Cancel</button>
                                                <button type="button" className="btn btn-success" onClick={handleConfirmSubmit}>Confirm</button>
                                            </div>
                                        ) : (
                                            <button type="button" className={`btn btn-${Object.keys(errorMessages).length ? 'danger' : 'success'}`} disabled={isLoading} onClick={handleConfirmation} style={{ width: '100px' }}>
                                                {isLoading ? 'Updating Profile...' : 'Update'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>



    );
};

export default AdminUpdateProfile;
