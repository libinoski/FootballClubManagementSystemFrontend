import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegistration from './components/Admin/AdminRegistration';
import Footer from './components/Admin/Common/Footer';




function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/adminRegistration' element={<AdminRegistration />} />
        <Route path='/Footer' element={<Footer />} />

        
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


