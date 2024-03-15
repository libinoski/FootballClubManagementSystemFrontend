import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayerNavbar from './PlayerNavbar';
import CommonFooter from '../Common/CommonFooter';



const PlayerViewAllClubs = () => {
    const navigate = useNavigate();
    const [allClubs, setAllClubs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAllClubs = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.post(
                    'http://localhost:4040/api/player/playerViewAllClubs',
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setAllClubs(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/playersLogin');
                            break;
                        case 422:
                            alert(data.message || 'No clubs found.');
                            break;
                        case 500:
                            alert(data.message || 'Internal server error. Please try again later.');
                            break;
                        default:
                            alert('An error occurred. Please try again.');
                            break;
                    }
                } else {
                    alert('An error occurred. Please check your connection and try again.');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllClubs();
    }, [navigate]);

    return (
<div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
  <PlayerNavbar />
  <div className="container-fluid py-4" style={{ minHeight: 'calc(100vh - 56px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="container" style={{ maxWidth: '100%', padding: '0 15px', overflowY: 'auto' }}>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          {allClubs.length > 0 ? (
            allClubs.map((club, index) => (
              <div className="col" key={index}>
                <div className="card h-100" 
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #fff',
                    transition: 'box-shadow 0.3s ease-in-out',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = '0 0 20px #fff';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={club.clubImage} alt="Club Logo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  </div>
                  <div className="card-body" style={{ color: '#fff' }}>
                    <h5 className="card-title text-center text-primary mb-3" style={{ fontWeight: 'bold' }}>{club.clubName}</h5>
                    <div style={{ fontSize: '0.9rem' }}>
                      <p className="mb-1"><strong>Email:</strong> {club.clubEmail}</p>
                      <p className="mb-1"><strong>Address:</strong> {club.clubAddress}</p>
                      <p className="mb-1"><strong>Manager:</strong> {club.managerName}</p>
                      <p className="mb-1"><strong>Manager Email:</strong> {club.managerEmail}</p>
                      <p className="mb-1"><strong>Manager Mobile:</strong> {club.managerMobile}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No clubs available.</p>
          )}
        </div>
      )}
    </div>
  </div>
  <CommonFooter />
</div>

    );
};

export default PlayerViewAllClubs;
