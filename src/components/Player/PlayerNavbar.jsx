import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faFutbol, faChartLine, faBuilding, faBell, faEnvelopeOpenText, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons';

const PlayerNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(120deg, #303030, #212121)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span className="text-white fw-bold">FootPro</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link active text-white" aria-current="page" to="/playerViewAllNews">
                            <FontAwesomeIcon icon={faNewspaper} className="me-2" />News
                        </Link>
                        <Link className="nav-link text-white" to="/playerViewAllMatches">
                            <FontAwesomeIcon icon={faFutbol} className="me-2" />Matches
                        </Link>
                        <Link className="nav-link text-white" to="/playerViewAllMatchPoints">
                            <FontAwesomeIcon icon={faChartLine} className="me-2" />Match Points
                        </Link>
                        <Link className="nav-link text-white" to="/playerViewAllClubs">
                            <FontAwesomeIcon icon={faBuilding} className="me-2" />Clubs
                        </Link>
                        <Link className="nav-link text-white" to="/playerViewAllNotifications">
                            <FontAwesomeIcon icon={faBell} className="me-2" />Notifications
                        </Link>
                        <Link className="nav-link text-white" to="/playerViewAllApprovedLeaveRequests">
                            <FontAwesomeIcon icon={faEnvelopeOpenText} className="me-2" />Leave Requests
                        </Link>
                        {/* Change Password Link */}
                        <Link className="nav-link text-white" to="/playerChangePassword">
                            <FontAwesomeIcon icon={faKey} className="me-2" />Change Password
                        </Link>
                        {/* Logout Link */}
                        <Link className="nav-link text-white" to="/">
                            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default PlayerNavbar;
