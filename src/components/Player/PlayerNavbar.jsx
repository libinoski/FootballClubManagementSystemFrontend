import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faFutbol, faChartLine, faBuilding, faBell, faEnvelopeOpenText, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons';

const PlayerNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(120deg, #303030, #212121)' }}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    <span className="text-white fw-bold">FootPro</span>
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <NavLink className="nav-link active text-white" aria-current="page" to="/playerViewAllNews">
                            <FontAwesomeIcon icon={faNewspaper} className="me-2" />News
                        </NavLink>
                        <NavLink className="nav-link text-white" to="/playerViewAllMatches">
                            <FontAwesomeIcon icon={faFutbol} className="me-2" />Matches
                        </NavLink>
                        <NavLink className="nav-link text-white" to="/playerViewAllMatchPoints">
                            <FontAwesomeIcon icon={faChartLine} className="me-2" />Match Points
                        </NavLink>
                        <NavLink className="nav-link text-white" to="/playerViewAllClubs">
                            <FontAwesomeIcon icon={faBuilding} className="me-2" />Clubs
                        </NavLink>
                        {/* Leave Requests dropdown */}
                        <div className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" />Leave Requests
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><NavLink className="dropdown-item" to="/playerViewAllApprovedLeaveRequests">View Leave Requests</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/playerSendLeaveRequestToClub">Send Leave Request to Club</NavLink></li>
                            </ul>
                        </div>
                        {/* Notifications */}
                        <NavLink className="nav-link text-white" to="/playerViewAllNotifications">
                            <FontAwesomeIcon icon={faBell} className="me-2" />Notifications
                        </NavLink>
                        {/* Change Password Link */}
                        <NavLink className="nav-link text-white" to="/playerChangePassword">
                            <FontAwesomeIcon icon={faKey} className="me-2" />Change Password
                        </NavLink>
                        {/* Logout Link */}
                        <NavLink className="nav-link text-white" to="/">
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Logout
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PlayerNavbar;
