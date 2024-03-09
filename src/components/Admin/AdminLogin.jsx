import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../Images/AdminImages/Admin.jpeg'; // Import the background image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ adminEmail: '', adminPassword: '' });
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
            const response = await axios.post('http://localhost:4040/api/admin/adminLogin', loginData);
            if (response.status === 200) {
                // alert(response.data.message);
                sessionStorage.setItem('AdminId', response.data.data.admin.adminId);
                sessionStorage.setItem('token', response.data.data.token);
                navigate('/AdminViewProfile');
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

    // Define navigateToSignUp function here
    const navigateToSignUp = () => {
        navigate('/adminRegistration'); // Change '/signup' to the path you use for your signup page
    };


    const hasErrors = Object.keys(errorMessages).length > 0;


    return (
<div>
            {/* Navbar */}
            <nav className="navbar navbar-dark" style={{ background: '#f2f2f2' }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-dark d-block mx-auto font-weight-bold" style={{ fontFamily: 'Arial, sans-serif' }}>MedInsCare Admin Login</span>
                </div>
            </nav>

            <div className="container-fluid d-flex flex-column min-vh-100">
                <div className="row flex-grow-1">
                    {/* Background Image Container */}
                    <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center p-0 bg-cover bg-center bg-no-repeat" style={{
                        backgroundImage: `url(${backgroundImage})`,
                        minHeight: '100vh',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    </div>

                    {/* Login Form Card */}
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center p-0">
                        <div className={`card mx-auto mb-3 shadow ${hasErrors ? 'border border-danger' : ''}`} style={{
                            width: '90%',
                            maxWidth: '400px',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            boxShadow: '0 0.5rem 1rem rgba(0, 0, 255, 0.15), 0 0.5rem 1rem rgba(0, 0, 255, 0.3)',
                            marginTop: '20px',
                            borderRadius: '15px'
                        }}>
                            <div className="card-body">
                                {/* Login Form */}
                                <h2 className="card-title text-center">Login</h2>
                                <form onSubmit={handleSubmit} noValidate>
                                    {/* Email Field */}
                                    <div className="mb-3">
                                        <label htmlFor="adminEmail" className="form-label">Email:</label>
                                        <input
                                            type="email"
                                            name="adminEmail"
                                            value={loginData.adminEmail}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.adminEmail ? 'is-invalid' : ''}`}
                                            required
                                        />
                                        {errorMessages.adminEmail && <div className="invalid-feedback">{errorMessages.adminEmail}</div>}
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-3">
                                        <label htmlFor="adminPassword" className="form-label">Password:</label>
                                        <div className="input-group">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="adminPassword"
                                                value={loginData.adminPassword}
                                                onChange={handleInputChange}
                                                className={`form-control ${errorMessages.adminPassword ? 'is-invalid' : ''}`}
                                                required
                                            />
                                            <button type="button" onClick={togglePasswordVisibility} className="btn btn-outline-secondary">
                                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                            </button>
                                            {errorMessages.adminPassword && <div className="invalid-feedback" style={{ display: 'block' }}>{errorMessages.adminPassword}</div>}
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
                                        width: '100%',
                                        background: 'linear-gradient(to right, #4169E1, #0000FF)',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                                        borderRadius: '8px',
                                        border: 'none',
                                        color: '#fff',
                                        transition: 'all 0.3s ease',
                                        outline: 'none'
                                    }}>
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer component */}
            <footer >
            </footer>
        </div>


    );
};

export default AdminLogin;
