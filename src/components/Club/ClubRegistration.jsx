import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import CommonFooter from '../Common/CommonFooter';

const ClubRegistration = () => {
    const navigate = useNavigate();
    const [clubData, setClubData] = useState({
        clubName: '',
        clubEmail: '',
        clubAddress: '',
        managerName: '',
        managerMobile: '',
        managerEmail: '',
        clubPassword: '',
        clubImage: null,
        managerImage: null,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const fileInputRef = useRef(null);
    const managerFileInputRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [clubImageName, setClubImageName] = useState('');
    const [managerImageName, setManagerImageName] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setClubData({ ...clubData, [name]: value });
    };

    const handleImageUpload = (event) => {
        const { name } = event.target;
        const file = event.target.files[0];
        if (name === 'clubImage') {
            setClubData(prev => ({ ...prev, [name]: file }));
            setClubImageName(file.name);
        } else if (name === 'managerImage') {
            setClubData(prev => ({ ...prev, [name]: file }));
            setManagerImageName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(clubData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post('http://localhost:4040/api/club/clubRegistration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                alert('Club registered successfully');
                navigate('/clubLogin');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setValidationErrors(data.results || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/clubLogin');
                        break;
                    case 422:
                        let errorMessage = '';
                        Object.entries(data.error).forEach(([field, messages]) => {
                            errorMessage += `${field}: ${messages.join(', ')}\n`;
                        });
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
<div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh' }}>
            <nav className="navbar navbar-dark" style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light transparent background
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)', // For Safari
            }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-light d-block mx-auto font-weight-bold" style={{
                        fontFamily: 'Arial, sans-serif',
                    }}>Club Registration</span>
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
                <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <input type="text" className={`form-control ${validationErrors.clubName ? 'is-invalid' : ''}`} name="clubName" value={clubData.clubName} onChange={handleInputChange} placeholder="Club Name *" required />
                                {validationErrors.clubName && <div className="invalid-feedback">{validationErrors.clubName}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="email" className={`form-control ${validationErrors.clubEmail ? 'is-invalid' : ''}`} name="clubEmail" value={clubData.clubEmail} onChange={handleInputChange} placeholder="Club Email *" required />
                                {validationErrors.clubEmail && <div className="invalid-feedback">{validationErrors.clubEmail}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" className={`form-control ${validationErrors.clubAddress ? 'is-invalid' : ''}`} name="clubAddress" value={clubData.clubAddress} onChange={handleInputChange} placeholder="Club Address *" required />
                                {validationErrors.clubAddress && <div className="invalid-feedback">{validationErrors.clubAddress}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" className={`form-control ${validationErrors.managerName ? 'is-invalid' : ''}`} name="managerName" value={clubData.managerName} onChange={handleInputChange} placeholder="Manager Name *" required />
                                {validationErrors.managerName && <div className="invalid-feedback">{validationErrors.managerName}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="tel" className={`form-control ${validationErrors.managerMobile ? 'is-invalid' : ''}`} name="managerMobile" value={clubData.managerMobile} onChange={handleInputChange} placeholder="Manager Mobile Number *" required />
                                {validationErrors.managerMobile && <div className="invalid-feedback">{validationErrors.managerMobile}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="email" className={`form-control ${validationErrors.managerEmail ? 'is-invalid' : ''}`} name="managerEmail" value={clubData.managerEmail} onChange={handleInputChange} placeholder="Manager Email *" required />
                                {validationErrors.managerEmail && <div className="invalid-feedback">{validationErrors.managerEmail}</div>}
                            </div>
                            <div className="mb-3">
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className={`form-control ${validationErrors.clubPassword ? 'is-invalid' : ''}`} name="clubPassword" value={clubData.clubPassword} onChange={handleInputChange} placeholder="Password *" required />
                                    <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                                {validationErrors.clubPassword && <div className="invalid-feedback">{validationErrors.clubPassword}</div>}
                            </div>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={() => fileInputRef.current.click()}
                                    style={{
                                        backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient from pink to orange
                                        color: 'white', // Text color for visibility
                                        border: 'none', // Removes the border for a sleek look
                                        width: '100%', // Sets the button to full container width
                                        maxWidth: '200px', // Maximum width to control size on larger screens
                                        height: '50px', // Fixed height for consistency
                                        display: 'block', // Ensures the button is block-level for width control
                                        margin: '0 auto' // Centers the button horizontally
                                    }}>
                                    Upload Club Image
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    name="clubImage"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    style={{ display: 'none' }} />
                                {clubImageName && <div className="text-muted">{clubImageName}</div>}
                                {validationErrors.clubImage && <div className="invalid-feedback d-block">{validationErrors.clubImage}</div>}
                            </div>

                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={() => managerFileInputRef.current.click()}
                                    style={{
                                        backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient from purple to blue
                                        color: 'white', // Text color for visibility
                                        border: 'none', // Removes the border for a sleek look
                                        width: '100%', // Sets the button to full container width
                                        maxWidth: '200px', // Maximum width to control size on larger screens
                                        height: '50px', // Fixed height for consistency
                                        display: 'block', // Ensures the button is block-level for width control
                                        margin: '0 auto' // Centers the button horizontally
                                    }}>
                                    Upload Manager Image
                                </button>
                                <input
                                    ref={managerFileInputRef}
                                    type="file"
                                    name="managerImage"
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    style={{ display: 'none' }} />
                                {managerImageName && <div className="text-muted">{managerImageName}</div>}
                                {validationErrors.managerImage && <div className="invalid-feedback d-block">{validationErrors.managerImage}</div>}
                            </div>


                            <div className="d-inline-block">
    <button 
        type="submit" 
        className="btn btn-primary" // Added 'btn-primary' to apply Bootstrap 5 styles
        disabled={isLoading}
        style={{
            background: 'linear-gradient(to right, #4CAF50, #2E8B57)', // Green gradient background
            color: 'white', // White text color for visibility
            border: 'none', // No border for a sleek look
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2), 0 3px 10px 0 rgba(0,0,0,0.19)', // Material design-inspired shadow
            padding: '0.375rem 0.75rem', // Standard Bootstrap padding for buttons
            borderRadius: '0.25rem', // Standard Bootstrap border-radius for buttons
            fontWeight: '600', // Slightly bolder font weight for text clarity
            cursor: 'pointer', // Ensures the cursor changes on hover to indicate it's clickable
            transition: 'all 0.2s ease-in-out', // Smooth transition for hover effects
            opacity: isLoading ? 0.7 : 1, // Lower opacity when loading for feedback
            pointerEvents: isLoading ? 'none' : 'auto', // Disable interactions when loading
            minWidth: 'fit-content', // Button size adjusts to minimum required width for text
            maxWidth: '100%', // Button size doesn't exceed its container width
        }}>
        {isLoading ? 'Registering...' : 'Register'}
    </button>
</div>


                        </form>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default ClubRegistration;
