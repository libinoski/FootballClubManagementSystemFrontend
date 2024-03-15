import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGamepad, faNewspaper, faSignOutAlt, faKey, faBuilding, faChartLine } from '@fortawesome/free-solid-svg-icons';

const ClubNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(120deg, #303030, #212121)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ color: '#fff' }}>
                FootPro                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link text-white" to="/clubViewAllNews">
                            <FontAwesomeIcon icon={faNewspaper} className="me-2" />View All News
                        </Link>
                        <Link className="nav-link text-white" to="/clubViewAllMatches">
                            <FontAwesomeIcon icon={faGamepad} className="me-2" />View All Matches
                        </Link>
                        <Link className="nav-link text-white" to="/clubViewAllMatchPoints">
                            <FontAwesomeIcon icon={faChartLine} className="me-2" />View All Match Points
                        </Link>
                        <Link className="nav-link text-white" to="/clubViewAllClubs">
                            <FontAwesomeIcon icon={faBuilding} className="me-2" />View All Clubs
                        </Link>
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdownPlayerManagement" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faUsers} className="me-2" />Player Management
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownPlayerManagement">
                                <li><Link className="dropdown-item" to="/clubViewAllPlayers">View All Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllUnapprovedPlayers">View Unapproved Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllSuspendedPlayers">View Suspended Players</Link></li>
                                <li><Link className="dropdown-item" to="/clubViewAllLeaveRequests">View All Leave Requests</Link></li>
                            </ul>
                        </div>
                        <Link className="nav-link text-white" to="/clubChangePassword">
                            <FontAwesomeIcon icon={faKey} className="me-2" />Change Password
                        </Link>
                        <Link className="nav-link text-white" to="/">
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default ClubNavbar;
