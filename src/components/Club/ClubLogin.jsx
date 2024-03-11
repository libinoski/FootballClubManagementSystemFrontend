import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import CommonFooter from '../Common/CommonFooter';

const ClubLogin = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ clubEmail: '', clubPassword: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
        if (errorMessages[name]) {
            setErrorMessages({ ...errorMessages, [name]: '' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessages({});

        try {
            const response = await axios.post('http://localhost:4040/api/club/clubLogin', loginData);
            if (response.status === 200) {
                sessionStorage.setItem('clubId', response.data.data.club.clubId);
                sessionStorage.setItem('token', response.data.data.token);
                navigate('/clubViewProfile');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setErrorMessages(data.results || {});
                        break;
                    case 422:
                        const errorMessage = data.error || "An error occurred during login.";
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

    const navigateToSignUp = () => {
        navigate('/ClubRegistration');
    };

    const hasErrors = Object.keys(errorMessages).length > 0;

    return (
<div>
    <nav className="navbar navbar-dark" style={{ background: '#f2f2f2' }}>
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 text-dark d-block mx-auto font-weight-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Club Login</span>
        </div>
    </nav>

    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className={`card mx-auto mb-3 shadow ${hasErrors ? 'border border-danger' : ''}`} style={{
            width: '90%',
            maxWidth: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15), 0 0.5rem 1rem rgba(0, 0, 0, 0.3)',
            borderRadius: '15px'
        }}>
            <div className="card-body">
                <h2 className="card-title text-center">Login</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="clubEmail" className="form-label">Email:</label>
                        <input
                            type="email"
                            name="clubEmail"
                            value={loginData.clubEmail}
                            onChange={handleInputChange}
                            className={`form-control ${errorMessages.clubEmail ? 'is-invalid' : ''}`}
                            required
                        />
                        {errorMessages.clubEmail && <div className="invalid-feedback">{errorMessages.clubEmail}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="clubPassword" className="form-label">Password:</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="clubPassword"
                                value={loginData.clubPassword}
                                onChange={handleInputChange}
                                className={`form-control ${errorMessages.clubPassword ? 'is-invalid' : ''}`}
                                required
                            />
                            <button type="button" onClick={togglePasswordVisibility} className="btn btn-outline-secondary">
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                            {errorMessages.clubPassword && <div className="invalid-feedback" style={{ display: 'block' }}>{errorMessages.clubPassword}</div>}
                        </div>
                    </div>

                    <div className="text-center">
                        <button type="submit" className={`btn btn-primary ${hasErrors ? 'btn-danger' : ''}`} disabled={isLoading} style={{ width: 'auto', background: 'linear-gradient(to right, #32CD32, #008000)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', transition: 'all 0.3s ease' }}>
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-3">
                    <p>Don't have an account?</p>
                    <button onClick={navigateToSignUp} className="btn btn-primary rounded-pill" style={{
                        background: 'linear-gradient(to right, #4169E1, #0000FF)',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        border: 'none',
                        color: '#fff',
                        transition: 'all 0.3s ease',
                        width: '100%'
                    }}>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    </div>

    <CommonFooter/>
</div>

    );
};

export default ClubLogin;
