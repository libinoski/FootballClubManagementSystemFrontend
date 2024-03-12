import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faHome, faUserEdit, faBell, faFutbol, faPaperPlane,faNewspaper } from '@fortawesome/free-solid-svg-icons';

const PlayerNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ color: '#495057' }}>
                    <span style={{ fontSize: '1.2rem' }}>PlayerZone</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/playerViewProfile" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faUserCircle} className="me-2" />
                                View Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/playerUpdateProfile" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faUserEdit} className="me-2" />
                                Update Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/playerViewAllNotifications" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faBell} className="me-2" />
                                Notifications
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownNews" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faNewspaper} className="me-2" style={{ color: '#ffc107' }} />
                                News Management
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownNews">
                                <li><Link className="dropdown-item" to="/playerViewAllNews">View All News</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/playerViewAllMatches" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faFutbol} className="me-2" />
                                View Matches
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/playerViewAllClubs" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faHome} className="me-2" />
                                View Clubs
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/playerSendLeaveRequestToClub" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                                Leave Request
                            </Link>
                        </li>
                        {/* Additional player navbar items as needed */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default PlayerNavbar;
