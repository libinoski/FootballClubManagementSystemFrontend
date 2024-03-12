import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import CommonFooter from '../Common/CommonFooter';

const PlayerLogin = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ playerEmail: '', playerPassword: '' });
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
            const response = await axios.post('http://localhost:4040/api/player/playerLogin', loginData);
            if (response.status === 200) {
                sessionStorage.setItem('playerId', response.data.data.player.playerId);
                sessionStorage.setItem('token', response.data.data.token);
                navigate('/playerViewProfile');
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
        navigate('/playerRegistration');
    };

    const hasErrors = Object.keys(errorMessages).length > 0;

    return (
        <div style={{ background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)', color: '#fff', minHeight: '100vh' }}>
<nav className="navbar navbar-dark" style={{ 
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light transparent background
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)', // For Safari
}}>
    <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 text-light d-block mx-auto font-weight-bold" style={{ 
            fontFamily: 'Arial, sans-serif',
        }}>Player Login</span>
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
                <div className={`card mx-auto mb-3 shadow ${hasErrors ? 'border border-danger' : ''}`} style={{
                    width: '90%',
                    maxWidth: '400px',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15), 0 0.5rem 1rem rgba(0, 0, 0, 0.3)',
                    borderRadius: '15px'
                }}>
                    <div className="card-body">
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label htmlFor="playerEmail" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    name="playerEmail"
                                    value={loginData.playerEmail}
                                    onChange={handleInputChange}
                                    className={`form-control ${errorMessages.playerEmail ? 'is-invalid' : ''}`}
                                    required
                                />
                                {errorMessages.playerEmail && <div className="invalid-feedback">{errorMessages.playerEmail}</div>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="playerPassword" className="form-label">Password:</label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="playerPassword"
                                        value={loginData.playerPassword}
                                        onChange={handleInputChange}
                                        className={`form-control ${errorMessages.playerPassword ? 'is-invalid' : ''}`}
                                        required
                                    />
                                    <button type="button" onClick={togglePasswordVisibility} className="btn btn-outline-secondary">
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                    {errorMessages.playerPassword && <div className="invalid-feedback" style={{ display: 'block' }}>{errorMessages.playerPassword}</div>}
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" className={`btn btn-primary ${hasErrors ? 'btn-danger' : ''}`} disabled={isLoading} style={{
                                    width: 'auto', background: 'linear-gradient(to right, #32CD32, #008000)', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', transition: 'all 0.3s ease'
                                }}>
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>

                        <div className="text-center mt-3">
                            <p>Don't have an account?</p>
                            <button onClick={navigateToSignUp} className="btn btn-primary rounded-pill" style={{
                                width: '100%', background: 'linear-gradient(to right, #4169E1, #0000FF)', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)', borderRadius: '8px', border: 'none', color: '#fff', transition: 'all 0.3s ease', outline: 'none'
                            }}>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <CommonFooter />
        </div>


    );
};

export default PlayerLogin;
