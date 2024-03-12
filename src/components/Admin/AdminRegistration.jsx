import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import CommonFooter from '../Common/CommonFooter';

const AdminRegistration = () => {
    const initialAdminData = {
        adminName: '',
        adminEmail: '',
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
        <div style={{ background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)', color: '#fff', minHeight: '100vh' }}>            {/* Navbar */}
<nav className="navbar navbar-dark" style={{ 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light transparent background
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // For Safari
}}>
    <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 text-light d-block mx-auto font-weight-bold" style={{ 
            fontFamily: 'Arial, sans-serif',
        }}>Admin Registration</span>
        <Link to="/" className="btn btn-outline-light" style={{ 
            position: 'absolute', 
            right: '10px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            borderColor: '#ffffff', // Custom border color
            color: '#ffffff', // Text color
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light transparent background
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)', // For Safari
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)', // Soft glow effect
            borderRadius: '30px', // Rounded edges
            padding: '10px 20px', // Spacing inside the button
            fontSize: '1rem', // Text size
            transition: 'all 0.3s ease', // Smooth transition for hover effects
        }}>
            Home
        </Link>
    </div>
</nav>
<div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
  <div className="card shadow-lg p-4" style={{width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0)'}}>
            <div className="card-body">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <input type="text" className={`form-control ${validationErrors.adminName ? 'is-invalid' : ''}`} name="adminName" value={adminData.adminName} onChange={handleInputChange} placeholder="Name *" required />
                        {validationErrors.adminName && <div className="invalid-feedback">{validationErrors.adminName}</div>}
                    </div>
                    <div className="mb-3">
                        <input type="email" className={`form-control ${validationErrors.adminEmail ? 'is-invalid' : ''}`} name="adminEmail" value={adminData.adminEmail} onChange={handleInputChange} placeholder="Email *" required />
                        {validationErrors.adminEmail && <div className="invalid-feedback">{validationErrors.adminEmail}</div>}
                    </div>
                    <div className="mb-3">
                        <input type="tel" className={`form-control ${validationErrors.adminMobile ? 'is-invalid' : ''}`} name="adminMobile" value={adminData.adminMobile} onChange={handleInputChange} placeholder="Mobile Number *" required />
                        {validationErrors.adminMobile && <div className="invalid-feedback">{validationErrors.adminMobile}</div>}
                    </div>
                    <div className="mb-3">
                        <input type="text" className={`form-control ${validationErrors.adminAddress ? 'is-invalid' : ''}`} name="adminAddress" value={adminData.adminAddress} onChange={handleInputChange} placeholder="Address *" required />
                        {validationErrors.adminAddress && <div className="invalid-feedback">{validationErrors.adminAddress}</div>}
                    </div>
                    <div className="mb-3">
                        <div className="input-group">
                            <input type={showPassword ? "text" : "password"} className="form-control" name="adminPassword" value={adminData.adminPassword} onChange={handleInputChange} placeholder="Password *" required />
                            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        {validationErrors.adminPassword && <div className="invalid-feedback">{validationErrors.adminPassword}</div>}
                    </div>
                    <div className="mb-3">
    <button 
        type="button" 
        className={`btn ${validationErrors.adminImage ? 'btn-danger' : 'btn-outline-primary'} w-100`} 
        onClick={() => fileInputRef.current.click()} 
        style={{ 
            marginBottom: '5px', 
            backgroundImage: 'linear-gradient(to right, #007bff, #6610f2)', // Example gradient from blue to purple
            border: 'none', // Remove border for a more modern look, if desired
            color: 'white' // Change text color to white for better visibility on gradient
        }}>
        {adminData.adminImage ? adminData.adminImage.name : 'Upload Admin Image'}
    </button>
    <input 
        ref={fileInputRef} 
        type="file" 
        className={`form-control-file ${validationErrors.adminImage ? 'is-invalid' : ''}`} 
        name="adminImage" 
        onChange={handleImageUpload} 
        accept=".jpg, .jpeg, .png" 
        style={{ display: 'none' }} />
    {validationErrors.adminImage && <div className="invalid-feedback">{validationErrors.adminImage}</div>}
</div>

                    <div className="text-center mt-4">
                        <button type="submit" disabled={isLoading} className="btn btn-primary" style={{ width: '100%' }}>
                            {isLoading ? 'Submitting...' : 'Register'}
                        </button>
                    </div>
                    {submitFailed && <div className="text-danger mt-3">Registration failed. Please try again.</div>}
                </form>
                <div className="text-center mt-2">
                    <button type="button" onClick={navigateToLogin} className="btn" style={{ padding: '10px 20px', fontSize: '16px', letterSpacing: '1px', background: 'linear-gradient(to right, #007bff, #4c9cf1)', border: 'none', color: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease', cursor: 'pointer', width: '100%' }}>
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    </div>
    <CommonFooter/>
</div>

    );
};

export default AdminRegistration;
