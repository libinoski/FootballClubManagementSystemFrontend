import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import CommonFooter from '../Common/CommonFooter';
import AdminNavbar from './AdminNavbar';

const AdminChangePassword = () => {
    const navigate = useNavigate();
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPasswordData({ ...passwordData, [name]: value });
        if (errorMessages[name]) {
            setErrorMessages({ ...errorMessages, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prompt user for confirmation
        const confirmed = window.confirm("Are you sure you want to change the password?");
        if (!confirmed) return;

        setIsLoading(true);
        setErrorMessages({});

        try {
            const adminId = sessionStorage.getItem('adminId');
            const response = await axios.post('http://localhost:4040/api/admin/adminChangePassword', { ...passwordData, adminId }, {
                headers: {
                    'token': sessionStorage.getItem('token'),
                },
            });
            if (response.status === 200) {
                alert(response.data.message);
                navigate('/adminLogin');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setErrorMessages(data.results || {});
                        break;
                    case 401:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        break; // Do not navigate
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/adminLogin');
                        break;
                    case 422:
                        const errorMessage = data.error || "An error occurred during password change.";
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
                setErrorMessages({ ...errorMessages, general: 'An error occurred. Please check your connection and try again.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
<div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <AdminNavbar />
    <div className="container-fluid d-flex flex-column min-vh-100">
        <div className="row justify-content-center align-items-center flex-grow-1">
            <div className="col-12 col-md-6 p-0 order-md-2">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="card mb-3 shadow" style={{
                        width: '90%',
                        maxWidth: '400px',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(0, 0, 0, 0.125)',
                        borderRadius: '0.5rem',
                        marginTop: '20px'
                    }}>
                        <div className="card-body">
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="oldPassword" className="form-label">Old Password:</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="oldPassword"
                                            value={passwordData.oldPassword}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.oldPassword ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        <button type="button" onClick={togglePasswordVisibility} className="btn btn-outline-secondary">
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                        {errorMessages.oldPassword && <div className="invalid-feedback">{errorMessages.oldPassword}</div>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">New Password:</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.newPassword ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        <button type="button" onClick={togglePasswordVisibility} className="btn btn-outline-secondary">
                                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                        </button>
                                        {errorMessages.newPassword && <div className="invalid-feedback">{errorMessages.newPassword}</div>}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className={`btn ${Object.keys(errorMessages).length ? 'btn-danger' : 'btn-primary'} ${isLoading ? 'disabled' : ''}`} disabled={isLoading}>
                                        {isLoading ? 'Changing Password...' : 'Change Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <CommonFooter />
</div>

    );
};

export default AdminChangePassword;
