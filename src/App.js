import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/Admin/AdminLogin';
import AdminRegistration from './components/Admin/AdminRegistration';
import ClubLogin from './components/Club/ClubLogin';
import ClubRegistration from './components/Club/ClubRegistration';
import PlayerRegistration from './components/Player/PlayerRegistration';
import PlayerLogin from './components/Player/PlayerLogin';
import CommonFooter from './components/Common/CommonFooter';
import CommonHomePage from './components/Common/CommonHome';




function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
        <Route path='/Footer' element={<CommonFooter />} />
        <Route path='/' element={<CommonHomePage />} />

        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/adminRegistration' element={<AdminRegistration />} />
        
        <Route path='/clubLogin' element={<ClubLogin />} />
        <Route path='/clubRegistration' element={<ClubRegistration />} />


        <Route path='/playerRegistration' element={<PlayerRegistration />} />
        <Route path='/playerLogin' element={<PlayerLogin />} />
        

        
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


