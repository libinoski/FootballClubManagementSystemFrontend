import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import PlayerNavbar from './PlayerNavbar';

const PlayerUpdateProfile = () => {
    const navigate = useNavigate();
    const [playerProfile, setPlayerProfile] = useState({
        playerName: '',
        playerAge: '',
        playerMobile: '',
        playerCountry: '',
        playerPosition: '',
        playerAddress: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const playerId = sessionStorage.getItem('playerId');
                const response = await axios.post(
                    'http://localhost:4040/api/player/playerViewProfile',
                    { playerId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    const { playerName, playerAge, playerMobile, playerCountry, playerPosition, playerAddress } = response.data.data;
                    setPlayerProfile({
                        playerName,
                        playerAge,
                        playerMobile,
                        playerCountry,
                        playerPosition,
                        playerAddress,
                    });
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/playerLogin');
                            break;
                        case 422:
                            const errorMessage422 = data.error || "An error occurred during profile view.";
                            alert(errorMessage422);
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

        fetchProfile();
    }, [navigate]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPlayerProfile({ ...playerProfile, [name]: value });
        if (errorMessages[name]) {
            setErrorMessages({ ...errorMessages, [name]: '' });
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMessages({});
        try {
            const token = sessionStorage.getItem('token');
            const playerId = sessionStorage.getItem('playerId');
            const response = await axios.post('http://localhost:4040/api/player/playerUpdateProfile', { ...playerProfile, playerId }, {
                headers: {
                    'token': token,
                },
            });
            if (response.status === 200) {
                alert(response.data.message);
                navigate('/playerViewProfile');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setErrorMessages(data.results || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/playerLogin');
                        break;
                    case 422:
                        const errorMessage = data.error || "An error occurred during profile update.";
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

    const handleConfirmation = () => {
        const hasErrors = Object.keys(errorMessages).length > 0;
        if (!hasErrors) {
            setShowConfirmation(true);
        } else {
            handleSubmit();
        }
    };

    const handleConfirmSubmit = () => {
        setShowConfirmation(false);
        handleSubmit();
    };

    return (
        <div>
            <PlayerNavbar />
            <div className="container-fluid" style={{ paddingTop: '56px', paddingBottom: '80px' }}>
                <div className="row">
                    <div className="col-12 d-flex align-items-center justify-content-center">
                        <div className="card" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.5)', border: Object.keys(errorMessages).length > 0 ? '1px solid red' : 'none' }}>
                            <div className="card-body">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="mb-3">
                                        <label htmlFor="playerName" className="form-label">Player Name:</label>
                                        <input
                                            type="text"
                                            name="playerName"
                                            value={playerProfile.playerName}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.playerName ? 'is-invalid' : ''}`}
                                            id="playerName"
                                            required
                                        />
                                        {errorMessages.playerName && <div className="invalid-feedback">{errorMessages.playerName}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="playerAge" className="form-label">Player Age:</label>
                                        <input
                                            type="text"
                                            name="playerAge"
                                            value={playerProfile.playerAge}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.playerAge ? 'is-invalid' : ''}`}
                                            id="playerAge"
                                            required
                                        />
                                        {errorMessages.playerAge && <div className="invalid-feedback">{errorMessages.playerAge}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="playerMobile" className="form-label">Mobile:</label>
                                        <input
                                            type="text"
                                            name="playerMobile"
                                            value={playerProfile.playerMobile}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.playerMobile ? 'is-invalid' : ''}`}
                                            id="playerMobile"
                                            required
                                        />
                                        {errorMessages.playerMobile && <div className="invalid-feedback">{errorMessages.playerMobile}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="playerCountry" className="form-label">Country:</label>
                                        <select
                                            name="playerCountry"
                                            value={playerProfile.playerCountry}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.playerCountry ? 'is-invalid' : ''}`}
                                            id="playerCountry"
                                            required
                                        >
                                            <option value="">Select Country *</option>
                                            <option value="India">India</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="Argentina">Argentina</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Germany">Germany</option>
                                        </select>
                                        {errorMessages.playerCountry && <div className="invalid-feedback">{errorMessages.playerCountry}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="playerPosition" className="form-label">Position:</label>
                                        <select
                                            name="playerPosition"
                                            value={playerProfile.playerPosition}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.playerPosition ? 'is-invalid' : ''}`}
                                            id="playerPosition"
                                            required
                                        >
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
                                        {errorMessages.playerPosition && <div className="invalid-feedback">{errorMessages.playerPosition}</div>}
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="playerAddress" className="form-label">Address:</label>
                                        <input
                                            type="text"
                                            name="playerAddress"
                                            value={playerProfile.playerAddress}
                                            onChange={handleInputChange}
                                            className={`form-control ${errorMessages.playerAddress ? 'is-invalid' : ''}`}
                                            id="playerAddress"
                                            required
                                        />
                                        {errorMessages.playerAddress && <div className="invalid-feedback">{errorMessages.playerAddress}</div>}
                                    </div>

                                    <div className="text-center">
                                        {showConfirmation ? (
                                            <div>
                                                <p>Are you sure you want to update the player profile?</p>
                                                <button type="button" className="btn btn-secondary mr-2" onClick={() => setShowConfirmation(false)}>Cancel</button>
                                                <button type="button" className="btn btn-success" onClick={handleConfirmSubmit}>Confirm</button>
                                            </div>
                                        ) : (
                                            <button type="button" className={`btn btn-${Object.keys(errorMessages).length ? 'danger' : 'success'}`} disabled={isLoading} onClick={handleConfirmation} style={{ width: '100px' }}>
                                                {isLoading ? 'Updating Profile...' : 'Update'}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default PlayerUpdateProfile;
