import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faNewspaper, faSignOutAlt, faKey } from '@fortawesome/free-solid-svg-icons'; // Add faKey to the imports

const AdminNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(120deg, #303030, #212121)', borderBottom: '1px solid #e0e0e0' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/" style={{ fontSize: '1.2rem', color: '#fff' }}>Footro</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownProfile" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff' }}>
                                <FontAwesomeIcon icon={faKey} className="me-2 text-success" /> {/* Changed icon to faKey */}
                                Authentication {/* Changed text to Authentication */}
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownProfile">
                                <li><Link className="dropdown-item" to="/adminChangePassword">Change Password</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMatches" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff' }}>
                                <FontAwesomeIcon icon={faFutbol} className="me-2 text-warning" />
                                Match Management
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMatches">
                                <li><Link className="dropdown-item" to="/adminAddMatch">Add Match</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewAllMatches">View All Matches</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewAllEndedMatches">View All Ended Matches</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewAllMatchPoints">View All Match Points</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownNews" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: '#fff' }}>
                                <FontAwesomeIcon icon={faNewspaper} className="me-2 text-warning" />
                                News Management
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownNews">
                                <li><Link className="dropdown-item" to="/adminAddNews">Add News</Link></li>
                                <li><Link className="dropdown-item" to="/adminViewAllNews">View All News</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/" style={{ color: '#fff' }}>
                                <FontAwesomeIcon icon={faSignOutAlt} className="me-2 text-danger" />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
