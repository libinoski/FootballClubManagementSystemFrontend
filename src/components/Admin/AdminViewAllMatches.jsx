import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavbar from './AdminNavbar';
import CommonFooter from '../Common/CommonFooter';

const AdminViewAllMatches = () => {
    const navigate = useNavigate();
    const [allMatches, setAllMatches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchAllMatches = async () => {
            setIsLoading(true);
            try {
                const token = sessionStorage.getItem('token');
                const adminId = sessionStorage.getItem('adminId');
                const response = await axios.post(
                    'http://localhost:4040/api/admin/adminViewAllMatches',
                    { adminId },
                    {
                        headers: {
                            token
                        }
                    }
                );
                if (response.status === 200) {
                    setAllMatches(response.data.data);
                }
            } catch (error) {
                if (error.response) {
                    const { status, data } = error.response;
                    switch (status) {
                        case 401:
                        case 403:
                            alert(data.message || 'Unauthorized access. Please login again.');
                            navigate('/adminLogin');
                            break;
                        case 422:
                            alert(data.error || 'Admin not found.');
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

        fetchAllMatches();
    }, [navigate]);

    const handleViewMatch = (matchId) => {
        sessionStorage.setItem('matchId', matchId);
        navigate('/adminViewOneMatch');
    };

    return (
<div style={{ background: 'linear-gradient(to right, #000000, #000000)', color: '#fff', minHeight: '100vh' }}>
  <AdminNavbar />
  <div className="container-fluid py-4" style={{ minHeight: '100vh', position: 'relative' }}>
    <div className="container px-4 py-5" style={{ overflowY: 'auto', maxHeight: 'calc(100% - 100px)' }}>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          {allMatches.length > 0 ? (
            allMatches.map((match, index) => (
              <div className="col" key={index}>
                <div className="card bg-dark text-white h-100 border-0" style={{ borderRadius: '15px', cursor: 'pointer', transition: 'transform .2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} onClick={() => handleViewMatch(match.matchId)}>
                  <div className="card-body p-4">
                    <h5 className="card-title bg-light text-dark rounded-pill p-2 text-center">{match.matchName}</h5>

                    <p className="card-text mt-3 text-center"><i className="fas fa-calendar-alt me-2"></i>Date: {match.matchDate}</p>
                    <p className="card-text text-center"><i className="fas fa-map-marker-alt me-2"></i>Location: {match.matchLocation}</p>
                    <p className="card-text text-center"><i className="fas fa-trophy me-2"></i>Prize: {match.matchPrize}</p>
                    <div className="d-flex justify-content-around align-items-center mt-4">
                      <div className="text-center">
                        <img src={match.homeTeamImage} alt={match.homeTeamName} className="img-fluid rounded-circle" style={{ width: '60px', height: '60px' }} />
                        <p className="mt-2">{match.homeTeamName}</p>
                      </div>
                      <div className="text-center fw-bold">VS</div>
                      <div className="text-center">
                        <img src={match.awayTeamImage} alt={match.awayTeamName} className="img-fluid rounded-circle" style={{ width: '60px', height: '60px' }} />
                        <p className="mt-2">{match.awayTeamName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center w-100">No matches available.</p>
          )}
        </div>
      )}
    </div>
  </div>
  <CommonFooter />
</div>


    );
};

export default AdminViewAllMatches;
