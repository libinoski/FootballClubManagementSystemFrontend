import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import adminImage from '../../Images/AdminImages/Admin.jpg';
import clubImage from '../../Images/ClubImages/Club.jpg';
import playerImage from '../../Images/PlayerImages/Player.jpg'; 
import logoImage from '../../Images/AdminImages/logo.jpg'; 
import CommonFooter from './CommonFooter';

const CommonHomePage = () => {
    const [hoveredKey, setHoveredKey] = useState(null);

    const handleMouseEnter = (key) => {
        setHoveredKey(key);
    };

    const handleMouseLeave = () => {
        setHoveredKey(null);
    };

    const cardStyle = (key) => {
        let boxShadow = '';

        if (hoveredKey === key) {
            boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        }

        return {
            transform: hoveredKey === key ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease, border-color 0.3s ease',
            boxShadow: boxShadow,
            borderWidth: '4px',
            borderStyle: 'solid',
            filter: hoveredKey && hoveredKey !== key ? 'blur(4px)' : 'none',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1rem',
            borderRadius: '15px',
        };
    };

    return (
        <div>
            <div className="container py-5">
                {/* First Row: Logo */}
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <img src={logoImage} alt="Logo" style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>
                </div>
                {/* Second Row: Introduction Text */}
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h2 className="fw-bold">Welcome to EliteFootPro: Premier League Management System</h2>
                        <p className="lead text-center">
                            Welcome to the ultimate Football Match Management System, designed to revolutionize the way football clubs and players are managed. Our platform offers a seamless and intuitive interface for administrators to effortlessly coordinate fixtures, manage player profiles, and oversee club operations with unparalleled efficiency.
                        </p>
                        <p className="lead text-center">
                            At the heart of our system is the belief that managing the beautiful game should be as fluid and dynamic as the sport itself. Whether you're updating player statistics, organizing match schedules, or communicating with club managers, our comprehensive suite of tools ensures that every aspect of football management is covered.
                        </p>
                        <p className="lead text-center">
                            For administrators, our platform simplifies the complexities of football management, enabling you to focus on what truly matters—nurturing talent and fostering the competitive spirit of your clubs and players. With our system, you can ensure that every player is given the opportunity to shine and every club operates at its peak potential.
                        </p>
                        <p className="lead text-center">
                            Join us in shaping the future of football. Embrace efficiency, embrace excellence—welcome to your Football Match Management System.
                        </p>
                    </div>
                </div>

                {/* Third Row: Cards */}
                <div className="row justify-content-center g-4">
                    {[
                        { link: "/adminLogin", image: adminImage, title: "Admin Login", text: "Are you an administrator?", key: "admin" },
                        { link: "/clubLogin", image: clubImage, title: "Club Login", text: "Are you a club manager?", key: "club" },
                        { link: "/playerLogin", image: playerImage, title: "Player Login", text: "Are you a professional player?", key: "player" },
                    ].map((card, index) => (
                        <div className="col-12 col-md-6 col-lg-3 d-flex align-items-stretch" key={index}>
                            <Link to={card.link} className="text-decoration-none w-100">
                                <div className="card border-0 shadow h-100" 
                                    style={cardStyle(card.key)}
                                    onMouseEnter={() => handleMouseEnter(card.key)}
                                    onMouseLeave={handleMouseLeave}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderRadius: '15px', height: '400px', width: '100%' }}>
                                        <img src={card.image} style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover' // This ensures the images cover the space, might crop if the aspect ratio is different
                                        }} className="card-img-top" alt={card.title} />
                                    </div>
                                    <div className="text-center" style={{ margin: '0.5rem', padding: '1rem', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', textAlign: 'center', fontWeight: 'bold', borderRadius: '10px', transition: 'background-color 0.3s ease' }}>
                                        <h5 className="card-title">{card.title}</h5>
                                        <p className="card-text">{card.text}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <CommonFooter />
        </div>
    );
}

export default CommonHomePage;
