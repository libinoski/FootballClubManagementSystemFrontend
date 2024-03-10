import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
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
    const [selectedClub, setSelectedClub] = useState('');
    const [playerData, setPlayerData] = useState(initialPlayerData);
    const [validationErrors, setValidationErrors] = useState({});
    const [submitFailed, setSubmitFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [playerImageFileName, setPlayerImageFileName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClubs();
    }, []);

    const fetchClubs = async () => {
        try {
            const response = await axios.post('http://localhost:4040/api/player/playerViewAllClubs');
            setClubs(response.data.data);
        } catch (error) {
            console.error('Error fetching Clubs:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPlayerData({ ...playerData, [name]: value });
    };

    const handleClubChange = (clubId) => {
        setSelectedClub(clubId);
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

        try {
            const formData = new FormData();
            Object.entries(playerData).forEach(([key, value]) => {
                formData.append(key, value);
            });

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
                    setSelectedClub('');
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
    <nav className="navbar navbar-dark" style={{ background: '#f2f2f2' }}>
        <div className="container-fluid">
            <span className="navbar-brand mb-0 h1 text-dark d-block mx-auto font-weight-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Player Registration</span>
        </div>
    </nav>

    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <form onSubmit={handleSubmit} noValidate className="needs-validation" style={{ maxWidth: '500px', width: '100%' }}>
            <div className="mb-3">
                <input type="text" className={`form-control ${validationErrors.playerName ? 'is-invalid' : ''}`} id="playerName" name="playerName" placeholder="Name *" value={playerData.playerName} onChange={handleInputChange} required />
                {validationErrors.playerName && <div className="invalid-feedback">{validationErrors.playerName}</div>}
            </div>
            <div className="mb-3 position-relative">
                <select className={`form-select ${validationErrors.selectedClub ? 'is-invalid' : ''}`} id="clubDropdown" name="clubId" value={selectedClub} onChange={handleClubChange} required>
                    <option value="">Select Club *</option>
                    {clubs.map(club => (
                        <option key={club.clubId} value={club.clubId}>{club.clubName}</option>
                    ))}
                </select>
                {validationErrors.selectedClub && <div className="invalid-feedback">{validationErrors.selectedClub}</div>}
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
                    <option value="Italy">Italy</option>
                    <option value="Germany">Germany</option>
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
                        {/* Assuming FontAwesomeIcon is properly imported */}
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {validationErrors.playerPassword && <div className="invalid-feedback" style={{ display: 'block' }}>{validationErrors.playerPassword}</div>}
            </div>
            <div className="mb-3 d-flex justify-content-end">
                <button type="submit" className={`btn ${submitFailed ? 'btn-danger' : 'btn-success'}`} disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Register'}
                </button>
            </div>
            <div className="mb-3 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-primary" onClick={() => navigate('/playerLogin')}>
                    Login
                </button>
            </div>
        </form>
    </div>

    <CommonFooter/>
</div>










    );
};

export default PlayerRegistration;