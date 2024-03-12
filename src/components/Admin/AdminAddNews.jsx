import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CommonFooter from '../Common/CommonFooter';
import AdminNavbar from './AdminNavbar';

const AdminAddNews = () => {
    const navigate = useNavigate();
    const initialNewsData = {
        adminId: sessionStorage.getItem('adminId'),
        footballNewsTitle: '',
        footballNewsContent: '',
        footballNewsImage: null
    };
    const [newsData, setNewsData] = useState(initialNewsData);
    const [isLoading, setIsLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewsData({ ...newsData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewsData({ ...newsData, footballNewsImage: file });
    };

    const resetForm = () => {
        setNewsData(initialNewsData);
    };

    const createFormData = () => {
        const formData = new FormData();
        Object.entries(newsData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        return formData;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token');
            const formData = createFormData();
            const response = await axios.post(
                'http://localhost:4040/api/admin/adminAddnews',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        token
                    }
                }
            );
            if (response.status === 200) {
                alert('Football news added successfully');
                resetForm();
                navigate('/adminViewAllNews');
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                switch (status) {
                    case 400:
                        setValidationErrors(data.results || {});
                        break;
                    case 401:
                    case 403:
                        alert(data.message || 'Unauthorized access. Please login again.');
                        navigate('/adminLogin');
                        break;
                    case 422:
                        alert(data.error || 'An error occurred while adding football news.');
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AdminNavbar />
            <div className="container-fluid" style={{ flex: 1, paddingTop: '56px', paddingBottom: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="row" style={{ width: '100%' }}>
                    <div className="col-lg-12 d-flex align-items-center justify-content-center">
                        <div className="container py-5">
                            <div className="card" style={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius: '5px', ...(validationErrors && Object.keys(validationErrors).length > 0 ? { border: '1px solid #dc3545' } : {}) }}>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="footballNewsTitle" className="form-label">Title</label>
                                            <input type="text" className={`form-control ${validationErrors.footballNewsTitle ? 'is-invalid' : ''}`} id="footballNewsTitle" name="footballNewsTitle" value={newsData.footballNewsTitle} onChange={handleInputChange} />
                                            {validationErrors.footballNewsTitle && <div className="invalid-feedback">{validationErrors.footballNewsTitle}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="footballNewsContent" className="form-label">Content</label>
                                            <textarea className={`form-control ${validationErrors.footballNewsContent ? 'is-invalid' : ''}`} id="footballNewsContent" name="footballNewsContent" value={newsData.footballNewsContent} onChange={handleInputChange} rows="10" style={{ width: '100%', minHeight: '200px' }}></textarea>
                                            {validationErrors.footballNewsContent && <div className="invalid-feedback">{validationErrors.footballNewsContent}</div>}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="footballNewsImage" className="form-label">Image</label>
                                            <input type="file" className={`form-control ${validationErrors.footballNewsImage ? 'is-invalid' : ''}`} id="footballNewsImage" name="footballNewsImage" onChange={handleFileChange} />
                                            {validationErrors.footballNewsImage && <div className="invalid-feedback">{validationErrors.footballNewsImage}</div>}
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary" disabled={isLoading}>{isLoading ? 'Adding...' : 'Add News'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CommonFooter />
        </div>
    );
};

export default AdminAddNews;
