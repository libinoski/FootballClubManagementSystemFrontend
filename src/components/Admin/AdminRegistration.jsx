import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../Images/AdminImages/Admin.jpeg'; // Import the background image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Footer from './Common/Footer';

const AdminRegistration = () => {
    const initialAdminData = {
        adminName: '',
        adminEmail: '',
        adminAadhar: '',
        adminMobile: '',
        adminAddress: '',
        adminPassword: '',
        adminImage: null,
    };

    const navigate = useNavigate();
    const [adminData, setAdminData] = useState(initialAdminData);
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const fileInputRef = useRef(null);
    const [submitFailed, setSubmitFailed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Define navigateToLogin function
    const navigateToLogin = () => {
        navigate('/AdminLogin'); // Change '/AdminLogin' to the path you use for your Admin login page
    };

    const resetForm = () => {
        setAdminData(initialAdminData);
        setValidationErrors({});
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setSubmitFailed(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setValidationErrors({});

        try {
            const formData = new FormData();
            for (const [key, value] of Object.entries(adminData)) {
                formData.append(key, value);
            }

            const response = await axios.post('http://localhost:4040/api/admin/adminRegistration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            switch (response.status) {
                case 200:
                    alert(response.data.message || 'Admin registered successfully');
                    resetForm();
                    navigate('/AdminLogin');
                    break;
                default:
                    alert('An unexpected response was received from the server');
                    break;
            }
        } catch (error) {
            setSubmitFailed(true);
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setValidationErrors(data.results || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/AdminLogin');
                        break;
                    case 422:
                        if (data && data.error) {
                            let errorMessage = '';
                            Object.entries(data.error).forEach(([field, messages]) => {
                                errorMessage += `${field}: ${messages.join(', ')}\n`;
                            });
                            alert(errorMessage);
                        } else {
                            alert('Validation error during registration');
                        }
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAdminData({ ...adminData, [name]: value });
        if (validationErrors[name]) {
            setValidationErrors({ ...validationErrors, [name]: '' });
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setAdminData({ ...adminData, adminImage: file });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
<div>
    {/* Navbar */}
    <nav className="navbar navbar-dark" style={{ background: '#f2f2f2' }}>
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 text-dark d-block mx-auto font-weight-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Football Club Admin Registration</span>
        </div>
    </nav>

    <div className="row">
        {/* Left Side Image Container */}
        <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-center" style={{ height: '100%', minHeight: '100vh' }}>
                <img src={backgroundImage} className="img-fluid" alt="Background" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
        </div>

        {/* Right Side Registration Card */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="card shadow-lg p-4" style={{ width: '90%' }}>
                <div className="card-body">
                    <h1 className="text-center mb-4">Admin Registration</h1>
                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} noValidate>
                        {/* Name Field */}
                        <div className="mb-3">
                            <input type="text" className={`form-control ${validationErrors.adminName ? 'is-invalid' : ''}`} name="adminName" value={adminData.adminName} onChange={handleInputChange} placeholder="Name *" required />
                            {validationErrors.adminName && <div className="invalid-feedback">{validationErrors.adminName}</div>}
                        </div>
                        {/* Email Field */}
                        <div className="mb-3">
                            <input type="email" className={`form-control ${validationErrors.adminEmail ? 'is-invalid' : ''}`} name="adminEmail" value={adminData.adminEmail} onChange={handleInputChange} placeholder="Email *" required />
                            {validationErrors.adminEmail && <div className="invalid-feedback">{validationErrors.adminEmail}</div>}
                        </div>
                        {/* Aadhar Number Field */}
                        <div className="mb-3">
                            <input type="text" className={`form-control ${validationErrors.adminAadhar ? 'is-invalid' : ''}`} name="adminAadhar" value={adminData.adminAadhar} onChange={handleInputChange} placeholder="Aadhar Number *" required />
                            {validationErrors.adminAadhar && <div className="invalid-feedback">{validationErrors.adminAadhar}</div>}
                        </div>
                        {/* Mobile Number Field */}
                        <div className="mb-3">
                            <input type="tel" className={`form-control ${validationErrors.adminMobile ? 'is-invalid' : ''}`} name="adminMobile" value={adminData.adminMobile} onChange={handleInputChange} placeholder="Mobile Number *" required />
                            {validationErrors.adminMobile && <div className="invalid-feedback">{validationErrors.adminMobile}</div>}
                        </div>
                        {/* Admin Address Field */}
                        <div className="mb-3">
                            <input
                                type="text"
                                className={`form-control ${validationErrors.adminAddress ? 'is-invalid' : ''}`}
                                name="adminAddress"
                                value={adminData.adminAddress}
                                onChange={handleInputChange}
                                placeholder="Address *"
                                required
                            />
                            {validationErrors.adminAddress && <div className="invalid-feedback">{validationErrors.adminAddress}</div>}
                        </div>

                        {/* Password Field */}
                        <div className="mb-3">
                            <div className={`input-group ${validationErrors.adminPassword ? 'is-invalid' : ''}`}>
                                <input type={showPassword ? "text" : "password"} className="form-control" name="adminPassword" value={adminData.adminPassword} onChange={handleInputChange} placeholder="Password *" required />
                                <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                            {validationErrors.adminPassword && <div className="invalid-feedback">{validationErrors.adminPassword}</div>}
                        </div>
                        {/* Admin Image Upload */}
                        <div className="mb-3">
                            <button type="button" className={`btn ${validationErrors.adminImage ? 'btn-danger' : 'btn-outline-primary'} w-100`} onClick={() => fileInputRef.current.click()} style={{ marginBottom: '5px' }}>
                                {adminData.adminImage ? adminData.adminImage.name : 'Upload Admin Image'}
                            </button>
                            <input ref={fileInputRef} type="file" className={`form-control-file ${validationErrors.adminImage ? 'is-invalid' : ''}`} name="adminImage" onChange={handleImageUpload} accept=".jpg, .jpeg, .png" style={{ display: 'none' }} />
                            {validationErrors.adminImage && <div className="invalid-feedback">{validationErrors.adminImage}</div>}
                        </div>

                        <div className="text-center mt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`btn ${submitFailed ? 'btn-danger' : ''} rounded-pill`}
                                style={{
                                    width: '100%',
                                    padding: '10px 0',
                                    fontSize: '1rem',
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    color: '#fff',
                                    border: 'none',
                                    outline: 'none',
                                    background: submitFailed ? '' : 'linear-gradient(to right, #56ab2f, #a8e063)', // Green gradient for success
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                {isLoading ? 'Submitting...' : 'Register'}
                            </button>
                        </div>

                        {submitFailed && <div className="text-danger mt-3">Registration failed. Please try again.</div>}
                    </form>
                    {/* Add Login Button */}
                    <div className="text-center mt-2">
                        <button
                            type="button"
                            onClick={navigateToLogin}
                            className="btn" // Simplified class name
                            style={{
                                padding: '10px 20px', // Adjust padding
                                fontSize: '16px', // Adjust font size
                                letterSpacing: '1px', // Add letter spacing
                                background: 'linear-gradient(to right, #007bff, #4c9cf1)', // Updated gradient colors
                                border: 'none', // No border
                                color: 'white', // Text color
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow for depth
                                transition: 'all 0.3s ease', // Smooth transition for mouse events
                                cursor: 'pointer', // Pointer on hover
                                width: '100%', // Maintain full width
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0062cc, #6699ff)'} // Darker gradient on hover
                            onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #007bff, #4c9cf1)'} // Original gradient on mouse out
                        >
                            Already have an account? Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Footer Component */}
    <Footer />
</div>

    );
};

export default AdminRegistration;
