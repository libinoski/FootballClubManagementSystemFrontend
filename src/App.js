import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegistration from './components/Admin/AdminRegistration';




function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/adminRegistration' element={<AdminRegistration />} />

        
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


