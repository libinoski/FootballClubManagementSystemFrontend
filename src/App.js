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
import AdminViewProfile from './components/Admin/AdminViewProfile';
import AdminNavbar from './components/Admin/AdminNavbar';
import ClubViewProfile from './components/Club/ClubViewProfile';
import ClubNavbar from './components/Club/ClubNabvar';
import PlayerViewProfile from './components/Player/PlayerViewProfile';
import PlayerNavbar from './components/Player/PlayerNavbar';




function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
        <Route path='/Footer' element={<CommonFooter />} />
        <Route path='/' element={<CommonHomePage />} />

        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/adminRegistration' element={<AdminRegistration />} />
        <Route path='/adminNavbar' element={<AdminNavbar />} />
        <Route path='/adminViewProfile' element={<AdminViewProfile />} />
        
        <Route path='/clubRegistration' element={<ClubRegistration />} />
        <Route path='/clubLogin' element={<ClubLogin />} />
        <Route path='/clubNavbar' element={<ClubNavbar />} />
        <Route path='/ClubViewProfile' element={<ClubViewProfile />} />


        <Route path='/playerRegistration' element={<PlayerRegistration />} />
        <Route path='/playerLogin' element={<PlayerLogin />} />
        <Route path='/playerNavbar' element={<PlayerNavbar />} />
        <Route path='/playerviewProfile' element={<PlayerViewProfile />} />

        

        
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


