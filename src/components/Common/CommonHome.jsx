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

  const cardStyle = (key) => ({
    transform: hoveredKey === key ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease',
    boxShadow: hoveredKey === key ? '0 0 0 3px rgba(255,0,0,0.5), 0 4px 12px rgba(0, 0, 0, 0.5)' : '',
    borderColor: hoveredKey === key ? 'red' : '#fff',
    filter: hoveredKey && hoveredKey !== key ? 'blur(1px)' : 'none',
    height: '100%',
    padding: '1rem',
    borderRadius: '15px',
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(120deg, #303030, #212121)',
  });

  return (
    <div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div className="container py-5">
        <div className="row mb-4 justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <img src={logoImage} alt="Logo" style={{ maxHeight: '150px', maxWidth: '80%', objectFit: 'contain' }} className="img-fluid" />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="fw-bold text-warning">Welcome to FootPro: Ultimate Football Gaming</h2>
            <p className="lead text-warning">
              Welcome to the ultimate Football Match Management System, designed to revolutionize the way football clubs and players are managed.
            </p>
          </div>
        </div>
        <div className="row justify-content-center g-4">
          {[{ link: "/adminLogin", image: adminImage, title: "Admin Portal", text: "Manage the game's universe.", key: "admin" },
            { link: "/clubLogin", image: clubImage, title: "Club Management", text: "Oversee your club to victory.", key: "club" },
            { link: "/playerLogin", image: playerImage, title: "Player Career", text: "Live the life of a football star.", key: "player" }]
          .map((card, index) => (
            <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={index}>
              <Link to={card.link} className="text-decoration-none w-100">
                <div className="card border-0" style={cardStyle(card.key)} onMouseEnter={() => handleMouseEnter(card.key)} onMouseLeave={handleMouseLeave}>
                  <img src={card.image} alt={card.title} className="card-img-top" style={{ height: '250px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                  <div className="card-body text-center">
                    <h5 className="card-title text-white fw-bold">{card.title}</h5>
                    <p className="card-text text-white">{card.text}</p>
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
