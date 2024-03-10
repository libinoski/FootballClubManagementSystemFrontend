import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
        <div>
            <nav className="navbar navbar-dark" style={{background: 'rgba(0, 0, 0, 0.5)'}}>
                <div className="container">
                    <span className="navbar-brand mb-0 h1 text-light d-block mx-auto font-weight-bold">Club Registration</span>
                </div>
            </nav>
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                <div className="card shadow-lg p-4" style={{width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
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
                                <button type="button" className="btn btn-outline-primary" onClick={() => fileInputRef.current.click()}>Upload Club Image</button>
                                <input ref={fileInputRef} type="file" name="clubImage" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                                {clubImageName && <div className="text-muted">{clubImageName}</div>}
                                {validationErrors.clubImage && <div className="invalid-feedback d-block">{validationErrors.clubImage}</div>}
                            </div>
                            <div className="mb-3">
                                <button type="button" className="btn btn-outline-primary" onClick={() => managerFileInputRef.current.click()}>Upload Manager Image</button>
                                <input ref={managerFileInputRef} type="file" name="managerImage" onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
                                {managerImageName && <div className="text-muted">{managerImageName}</div>}
                                {validationErrors.managerImage && <div className="invalid-feedback d-block">{validationErrors.managerImage}</div>}
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <CommonFooter/>
        </div>
    );
};

export default ClubRegistration;
