import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus,  faUsers, faClinicMedical, faGamepad } from '@fortawesome/free-solid-svg-icons';

const ClubNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ color: '#495057' }}>
                    <span style={{ fontSize: '1.2rem' }}>ClubManager</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/clubRegistration" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                Club Registration
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/clubLogin" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                Club Login
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownPlayerManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                Player Management
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownPlayerManagement">
                                <li><Link className="dropdown-item" to="/clubViewAllPlayers">View All Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllUnapprovedPlayers">View Unapproved Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllSuspendedPlayers">View Suspended Players</Link></li>
                                {/* Additional player management links */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMatchManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faGamepad} className="me-2" />
                                Match Management
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMatchManagement">
                                <li><Link className="dropdown-item" to="/clubViewAllMatches">View All Matches</Link></li>
                                {/* Additional match management links */}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownHealthManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#495057' }}>
                                <FontAwesomeIcon icon={faClinicMedical} className="me-2" />
                                Health & Wellness
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownHealthManagement">
                                <li><Link className="dropdown-item" to="/clubAddOneInjuryUpdate">Injury Updates</Link></li>
                                {/* Additional health management links */}
                            </ul>
                        </li>
                        {/* Additional navbar items as needed */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ClubNavbar;
