import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';

const PlayerRegistration = () => {
    const initialPlayerData = {
        playerName: '',
        playerCountry: '',
        playerMobile: '',
        playerEmail: '',
        playerAge: '',
        playerPosition: '',
        playerAddress: '',
        playerImage: null,
        playerPassword: '',
        clubId: ''
    };

    const [clubs, setClubs] = useState([]);
    const [playerData, setPlayerData] = useState(initialPlayerData);
    const [validationErrors, setValidationErrors] = useState({});
    const [submitFailed, setSubmitFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [playerImageFileName, setPlayerImageFileName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const response = await axios.post('http://localhost:4040/api/player/playerViewAllClubs');
                setClubs(response.data.data);
            } catch (error) {
                console.error('Error fetching Clubs:', error);
            }
        };
        fetchClubs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlayerData({ ...playerData, [name]: value });
    };

    const handleClubChange = (e) => {
        const clubId = e.target.value;
        setPlayerData({ ...playerData, clubId });
    };

    const handlePlayerImageUpload = (e) => {
        const file = e.target.files[0];
        setPlayerData({ ...playerData, playerImage: file });
        setPlayerImageFileName(file.name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setValidationErrors({});
        setSubmitFailed(false);

        const formData = new FormData();
        Object.entries(playerData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await axios.post('http://localhost:4040/api/player/playerRegistration', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            switch (response.status) {
                case 200:
                    alert(response.data.message || 'Player registered successfully');
                    navigate('/playerLogin');
                    resetForm();
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
                        const validationErrors400 = data.results || {};
                        setValidationErrors(validationErrors400);
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
                        alert(data.message || 'An error occurred. Please try again.');
                        break;
                }
            } else {
                alert('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setPlayerData(initialPlayerData);
        setValidationErrors({});
        setPlayerImageFileName('');
    };

    return (
        <div>


            <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh' }}>
                <nav className="navbar navbar-dark" style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderRadius: '10px',
                    marginBottom: '20px',
                }}>
                    <div className="container-fluid">
                        <span className="navbar-brand mb-0 h1 text-light d-block mx-auto font-weight-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Player Registration</span>
                        <Link to="/" className="btn btn-outline-light" style={{
                            borderColor: '#ffffff',
                            color: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(5px)',
                            WebkitBackdropFilter: 'blur(5px)',
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                            borderRadius: '30px',
                            padding: '10px 20px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease',
                        }}>
                            Home
                        </Link>
                    </div>
                </nav>

                <div className="container mt-5 mb-5">
                    <div className="row justify-content-center">
                        <form onSubmit={handleSubmit} noValidate className="needs-validation col-md-6">
                            <div className="mb-3">
                                <input type="text" className={`form-control ${validationErrors.playerName ? 'is-invalid' : ''}`} id="playerName" name="playerName" placeholder="Name *" value={playerData.playerName} onChange={handleInputChange} required />
                                {validationErrors.playerName && <div className="invalid-feedback">{validationErrors.playerName}</div>}
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="clubDropdown" className="form-label">Choose a Club</label>
                                <div className="dropdown">
                                    <button
                                        className="btn dropdown-toggle"
                                        type="button"
                                        id="clubDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{
                                            backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)', // Gradient effect
                                            color: 'white', // Text color for better visibility
                                            border: 'none', // Remove border for a modern look
                                            borderRadius: '0.375rem', // Rounded corners for the button
                                            padding: '0.5rem 1rem', // Padding for the button
                                            fontSize: '1rem', // Font size for the button
                                            boxShadow: '0 4px 6px rgba(0,0,0,.1)' // Shadow for depth
                                        }}>
                                        {playerData.clubId ? clubs.find(club => club.clubId === playerData.clubId)?.clubName : 'Select Club *'}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="clubDropdown" style={{
                                        borderRadius: '0.375rem', // Rounded corners for the dropdown
                                        boxShadow: '0 4px 6px rgba(0,0,0,.1)', // Shadow for depth
                                        marginTop: '0.25rem' // Space between the button and dropdown
                                    }}>
                                        {clubs.map(club => (
                                            <li key={club.clubId} onClick={() => handleClubChange({ target: { value: club.clubId } })} className="dropdown-item" style={{
                                                padding: '0.5rem 1rem', // Padding for each dropdown item
                                                display: 'flex', // Flex display for aligning image and text
                                                alignItems: 'center' // Align items vertically
                                            }}>
                                                <img src={club.clubImage} alt={club.clubName} className="club-image rounded-circle me-2" style={{ width: '30px', height: '30px' }} />
                                                <span className="club-name">{club.clubName}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {validationErrors.clubId && <div className="invalid-feedback d-block">{validationErrors.clubId}</div>}
                            </div>

                            <div className="mb-3">
                                <input type="email" className={`form-control ${validationErrors.playerEmail ? 'is-invalid' : ''}`} id="playerEmail" name="playerEmail" placeholder="Email *" value={playerData.playerEmail} onChange={handleInputChange} required />
                                {validationErrors.playerEmail && <div className="invalid-feedback">{validationErrors.playerEmail}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="text" className={`form-control ${validationErrors.playerAddress ? 'is-invalid' : ''}`} id="playerAddress" name="playerAddress" placeholder="Address *" value={playerData.playerAddress} onChange={handleInputChange} required />
                                {validationErrors.playerAddress && <div className="invalid-feedback">{validationErrors.playerAddress}</div>}
                            </div>
                            <div className="mb-3">
                                <select className={`form-select ${validationErrors.playerCountry ? 'is-invalid' : ''}`} id="playerCountry" name="playerCountry" value={playerData.playerCountry} onChange={handleInputChange} required>
                                    <option value="">Select Country *</option>
                                    <option value="India">India</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Spain">Spain</option>
                                    <option value="France">France</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Netherlands">Netherlands</option>

                                </select>
                                {validationErrors.playerCountry && <div className="invalid-feedback">{validationErrors.playerCountry}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="tel" className={`form-control ${validationErrors.playerMobile ? 'is-invalid' : ''}`} id="playerMobile" name="playerMobile" placeholder="Mobile Number *" value={playerData.playerMobile} onChange={handleInputChange} required />
                                {validationErrors.playerMobile && <div className="invalid-feedback">{validationErrors.playerMobile}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="number" className={`form-control ${validationErrors.playerAge ? 'is-invalid' : ''}`} id="playerAge" name="playerAge" placeholder="Age *" value={playerData.playerAge} onChange={handleInputChange} required />
                                {validationErrors.playerAge && <div className="invalid-feedback">{validationErrors.playerAge}</div>}
                            </div>
                            <div className="mb-3">
                                <select className={`form-select ${validationErrors.playerPosition ? 'is-invalid' : ''}`} id="playerPosition" name="playerPosition" value={playerData.playerPosition} onChange={handleInputChange} required>
                                    <option value="">Select Position *</option>
                                    <option value="Goalkeeper">Goalkeeper (GK)</option>
                                    <option value="Right Back">Right Back (RB)</option>
                                    <option value="Left Back">Left Back (LB)</option>
                                    <option value="Center Back">Center Back (CB)</option>
                                    <option value="Defensive Midfielder">Defensive Midfielder (DM)</option>
                                    <option value="Central Midfielder">Central Midfielder (CM)</option>
                                    <option value="Attacking Midfielder">Attacking Midfielder (AM)</option>
                                    <option value="Striker">Striker (ST)</option>
                                    <option value="Winger">Winger</option>
                                </select>
                                {validationErrors.playerPosition && <div className="invalid-feedback">{validationErrors.playerPosition}</div>}
                            </div>
                            <div className="mb-3">
                                <input type="file" id="playerImage" name="playerImage" onChange={handlePlayerImageUpload} style={{ display: 'none' }} accept=".jpg, .jpeg, .png" required />
                                <label htmlFor="playerImage" className="btn w-100" style={{ marginBottom: '5px', backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,.1)', borderRadius: '20px', border: 'none' }}>
                                    Upload Profile Image
                                </label>
                                {playerImageFileName && <div>Selected profile image file: {playerImageFileName}</div>}
                                {validationErrors.playerImage && <div className="text-danger">{validationErrors.playerImage}</div>}
                            </div>
                            <div className="mb-3">
                                <div className="input-group">
                                    <input type={showPassword ? "text" : "password"} className={`form-control ${validationErrors.playerPassword ? 'is-invalid' : ''}`} id="playerPassword" name="playerPassword" placeholder="Password *" value={playerData.playerPassword} onChange={handleInputChange} required />
                                    <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                                    </button>
                                </div>
                                {validationErrors.playerPassword && <div className="invalid-feedback" style={{ display: 'block' }}>{validationErrors.playerPassword}</div>}
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className={`btn ${submitFailed ? 'btn-danger' : ''}`} // Removed 'btn-success' to override with gradient
                                    disabled={isLoading}
                                    style={{
                                        backgroundImage: submitFailed ? 'none' : 'linear-gradient(to right, #00b09b, #96c93d)', // Conditional gradient
                                        color: 'white', // Ensures text visibility
                                        border: 'none', // Modern look without borders
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Material design shadow for depth
                                        padding: '10px 20px', // Comfortable padding
                                        borderRadius: '30px', // Smooth, rounded corners
                                        fontWeight: '600', // Slightly bolder text for clarity
                                        cursor: 'pointer', // Change cursor on hover to indicate action
                                        width: 'auto', // Auto width based on content
                                        display: 'inline-block', // Allows for text alignment and custom width
                                        transition: 'box-shadow 0.2s ease', // Smooth shadow transition for interactive feedback
                                        opacity: isLoading ? 0.7 : 1, // Lower opacity when loading for feedback
                                        pointerEvents: isLoading ? 'none' : 'auto' // Prevent interaction when loading
                                    }}>
                                    {isLoading ? 'Submitting...' : 'Register'}
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

export default PlayerRegistration;
