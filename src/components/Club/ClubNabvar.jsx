import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faClinicMedical, faGamepad, faNewspaper, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const ClubNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: '1px solid #e0e0e0' }}>
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/" style={{ color: '#495057' }}>
                    ClubManager
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/clubViewAllNews">
                            <FontAwesomeIcon icon={faNewspaper} className="me-2 text-success" />
                            View All News
                        </Link>
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownPlayerManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faUsers} className="me-2 text-info" />
                                Player Management
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownPlayerManagement">
                                <li><Link className="dropdown-item" to="/clubViewAllPlayers">View All Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllUnapprovedPlayers">View Unapproved Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllSuspendedPlayers">View Suspended Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllLeaveRequests">View All Leave Requests</Link></li>
                            </ul>
                        </div>
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMatchManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faGamepad} className="me-2 text-warning" />
                                Match Management
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMatchManagement">
                                <li><Link className="dropdown-item" to="/clubViewAllMatches">View All Matches</Link></li>
                                {/* Add the new link here */}
                                <li><Link className="dropdown-item" to="/clubViewAllMatchPoints">View All Match Points</Link></li>
                            </ul>
                        </div>
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownHealthManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faClinicMedical} className="me-2 text-secondary" />
                                Health & Wellness
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownHealthManagement">
                                <li><Link className="dropdown-item" to="/clubAddOneInjuryUpdate">Injury Updates</Link></li>
                            </ul>
                        </div>
                        {/* Add logout link */}
                        <Link className="nav-link" to="/" style={{ color: '#495057' }}>
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2 text-danger" />
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ClubNavbar;
