import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import adminImage from '../../Images/AdminImages/Admin.jpg';
import clubImage from '../../Images/ClubImages/Club.jpg';
import playerImage from '../../Images/PlayerImages/Player.jpg';
import logoImage from '../../Images/AdminImages/logonobg.png';
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
    let boxShadow = hoveredKey === key ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '';
    return {
      transform: hoveredKey === key ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
      boxShadow,
      borderColor: '#fff',
      filter: hoveredKey && hoveredKey !== key ? 'blur(2px)' : 'none',
      height: '100%',
      padding: '1rem',
      borderRadius: '15px',
      backgroundColor: '#ffffff', // White background color
    };
  };

  const pageStyle = {
    background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
    color: '#fff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };

  const textStyle = {
    color: '#fff', // White text color
    fontWeight: 'bold',
    textShadow: '1px 1px  #000', // Add black shadow
  };
  
  const cardTextStyle = {
    color: '#000', // Black text color
    fontWeight: 'bold',
  };

  return (
    <div style={pageStyle}>
      <div className="container py-5">
        <div className="row mb-4 justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <img src={logoImage} alt="Logo" style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 style={textStyle}>Welcome to EliteFootPro: Ultimate Football Gaming</h2>
            <p className="lead" style={textStyle}>
              Welcome to the ultimate Football Match Management System, designed to revolutionize the way football clubs and players are managed.
            </p>
          </div>
        </div>
        <div className="row justify-content-center g-4">
          {[{ link: "/adminLogin", image: adminImage, title: "Admin Portal", text: "Manage the game's universe.", key: "admin" },
            { link: "/clubLogin", image: clubImage, title: "Club Management", text: "Oversee your club to victory.", key: "club" },
            { link: "/playerLogin", image: playerImage, title: "Player Career", text: "Live the life of a football star.", key: "player" },
          ].map((card, index) => (
            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={index}>
              <Link to={card.link} className="text-decoration-none w-100">
                <div className="card border-0 shadow"
                  style={cardStyle(card.key)}
                  onMouseEnter={() => handleMouseEnter(card.key)}
                  onMouseLeave={handleMouseLeave}>
                  <img src={card.image} alt={card.title} className="card-img-top" style={{
                    height: '250px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '15px',
                    borderTopRightRadius: '15px',
                  }} />
                  <div className="card-body text-center" style={{ padding: '1rem' }}>
                    <h5 className="card-title" style={cardTextStyle}>{card.title}</h5>
                    <p className="card-text" style={cardTextStyle}>{card.text}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <CommonFooter />
      </div>
    </div>
  );
}

export default CommonHomePage;
