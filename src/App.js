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
import AdminUpdateProfile from './components/Admin/AdminUpdateProfile';
import ClubUpdateProfile from './components/Club/ClubUpdateProfile';
import PlayerUpdateProfile from './components/Player/PlayerUpdateProfile';
import AdminAddNews from './components/Admin/AdminAddNews';
import AdminViewAllNews from './components/Admin/AdminViewAllNews';
import AdminViewOneNews from './components/Admin/AdminViewOneNews';
import ClubViewAllNews from './components/Club/ClubViewAllNews';
import ClubViewOneNews from './components/Club/ClubViewOneNews';
import PlayerViewAllNews from './components/Player/PlayerViewAllNews';
import PlayerViewOneNews from './components/Player/PlayerViewOneNews';




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
        <Route path='/adminUpdateProfile' element={<AdminUpdateProfile />} />
        <Route path='/adminAddNews' element={<AdminAddNews />} />
        <Route path='/adminViewAllNews' element={<AdminViewAllNews />} />
        <Route path='/adminViewOneNews' element={<AdminViewOneNews />} />
        
        <Route path='/clubRegistration' element={<ClubRegistration />} />
        <Route path='/clubLogin' element={<ClubLogin />} />
        <Route path='/clubNavbar' element={<ClubNavbar />} />
        <Route path='/clubViewProfile' element={<ClubViewProfile />} />
        <Route path='/clubUpdateProfile' element={<ClubUpdateProfile />} />
        <Route path='/clubViewAllNews' element={<ClubViewAllNews />} />
        <Route path='/clubViewOneNews' element={<ClubViewOneNews />} />


        <Route path='/playerRegistration' element={<PlayerRegistration />} />
        <Route path='/playerLogin' element={<PlayerLogin />} />
        <Route path='/playerNavbar' element={<PlayerNavbar />} />
        <Route path='/playerviewProfile' element={<PlayerViewProfile />} />
        <Route path='/playerUpdateProfile' element={<PlayerUpdateProfile />} />
        <Route path='/playerViewAllNews' element={<PlayerViewAllNews />} />
        <Route path='/playerViewOneNews' element={<PlayerViewOneNews />} />

        

        
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


