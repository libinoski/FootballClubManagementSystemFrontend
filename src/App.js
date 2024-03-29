import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminLogin from './components/Admin/AdminLogin';
// import AdminRegistration from './components/Admin/AdminRegistration';
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
import ClubViewAllUnapprovedPlayers from './components/Club/ClubViewAllUnApprovedPlayers';
import ClubViewOneUnapprovedPlayer from './components/Club/ClubViewOneUnApprovedPlayer';
import ClubViewAllPlayers from './components/Club/ClubViewAllPlayers';
import ClubViewOnePlayer from './components/Club/ClubViewOnePlayer';
import AdminAddMatch from './components/Admin/AdminAddMatch';
import AdminViewAllMatches from './components/Admin/AdminViewAllMatches';
import AdminViewOneMatch from './components/Admin/AdminViewOneMatch';
import AdminViewOneEndedMatch from './components/Admin/AdminViewOneEndedMatch';
import AdminAddMatchPoint from './components/Admin/AdminAddMatchPoint';
import AdminViewAllEndedlMatches from './components/Admin/AdminViewAllEndedMatches';
import AdminViewAllMatchPoints from './components/Admin/AdminViewAllMatchPoints';
import AdminChangePassword from './components/Admin/AdminChangePassword';
import ClubSendNotificationToPlayer from './components/Club/ClubSendNotificationToPlayer';
import ClubAddOneInjuryUpdate from './components/Club/ClubAddOneInjuryUpdate';
import ClubViewAllMatches from './components/Club/ClubViewAllMatches';
import ClubViewOneMatch from './components/Club/ClubViewOneMatch';
import PlayerViewAllMatches from './components/Player/PlayerViewAllMatches';
import ClubViewAllMatchPoints from './components/Club/ClubViewAllMatchPoints';
import PlayerViewAllMatchPoints from './components/Player/PlayerViewAllMatchPoints';
import PlayerSendLeaveRequestToClub from './components/Player/PlayerSendLeaveRequestToClub';
import AdminViewAllClubs from './components/Admin/AdminViewAllClubs';
import PlayerViewAllClubs from './components/Player/PlayerViewAllClubs';
import ClubViewAllClubs from './components/Club/ClubViewAllClubs';
import PlayerViewAllNotifications from './components/Player/PlayerViewAllNotifications';
import PlayerViewOneNotification from './components/Player/PlayerViewOneNotification';
import PlayerViewOneMatch from './components/Player/PlayerViewOneMatch';
import ClubViewAllLeaveRequests from './components/Club/ClubViewAllLeaveRequests';
import ClubViewOneLeaveRequest from './components/Club/ClubViewOneLeaveRequest';
import PlayerViewAllApprovedLeaveRequests from './components/Player/PlayerViewAllApprovedLeaveRequests';
import ClubViewAllSuspendedPlayers from './components/Club/ClubViewAllSuspendedPlayers';
import ClubViewOneSuspendedPlayer from './components/Club/ClubViewOneSuspendedPlayer';
import ClubChangePassword from './components/Club/ClubChangePassword';
import PlayerChangePassword from './components/Player/PlayerChangePassword';




function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
        <Route path='/Footer' element={<CommonFooter />} />
        <Route path='/' element={<CommonHomePage />} />

        <Route path='/adminLogin' element={<AdminLogin />} />
        <Route path='/adminChangePassword' element={<AdminChangePassword />} />
        {/* <Route path='/adminRegistration' element={<AdminRegistration />} /> */}
        <Route path='/adminNavbar' element={<AdminNavbar />} />
        <Route path='/adminViewProfile' element={<AdminViewProfile />} />
        <Route path='/adminUpdateProfile' element={<AdminUpdateProfile />} />
        <Route path='/adminAddNews' element={<AdminAddNews />} />
        <Route path='/adminViewAllNews' element={<AdminViewAllNews />} />
        <Route path='/adminViewOneNews' element={<AdminViewOneNews />} />
        <Route path='/adminAddMatch' element={<AdminAddMatch />} />
        <Route path='/adminViewAllMatches' element={<AdminViewAllMatches />} />
        <Route path='/adminViewOneMatch' element={<AdminViewOneMatch />} />
        <Route path='/adminViewAllEndedMatches' element={<AdminViewAllEndedlMatches />} />
        <Route path='/adminViewOneEndedMatch' element={<AdminViewOneEndedMatch />} />
        <Route path='/adminAddMatchPoint' element={<AdminAddMatchPoint />} />
        <Route path='/adminViewAllMatchPoints' element={<AdminViewAllMatchPoints />} />
        <Route path='/adminViewAllClubs' element={<AdminViewAllClubs />} />
        
        <Route path='/clubRegistration' element={<ClubRegistration />} />
        <Route path='/clubLogin' element={<ClubLogin />} />
        <Route path='/clubNavbar' element={<ClubNavbar />} />
        <Route path='/clubViewProfile' element={<ClubViewProfile />} />
        <Route path='/clubUpdateProfile' element={<ClubUpdateProfile />} />
        <Route path='/clubViewAllNews' element={<ClubViewAllNews />} />
        <Route path='/clubViewOneNews' element={<ClubViewOneNews />} />
        <Route path='/clubViewAllUnapprovedPlayers' element={<ClubViewAllUnapprovedPlayers />} />
        <Route path='/clubViewOneUnapprovedPlayer' element={<ClubViewOneUnapprovedPlayer />} />
        <Route path='/clubViewAllPlayers' element={<ClubViewAllPlayers/>} />
        <Route path='/clubViewOnePlayer' element={<ClubViewOnePlayer/>} />
        <Route path='/clubSendNotificationToPlayer' element={<ClubSendNotificationToPlayer/>} />
        <Route path='/clubAddOneInjuryUpdate' element={<ClubAddOneInjuryUpdate/>} />
        <Route path='/clubViewAllMatches' element={<ClubViewAllMatches/>} />
        <Route path='/clubViewOneMatch' element={<ClubViewOneMatch/>} />
        <Route path='/clubViewAllMatchPoints' element={<ClubViewAllMatchPoints/>} />
        <Route path='/ClubViewAllClubs' element={<ClubViewAllClubs/>} />
        <Route path='/clubViewAllLeaveRequests' element={<ClubViewAllLeaveRequests/>} />
        <Route path='/clubViewOneLeaveRequest' element={<ClubViewOneLeaveRequest/>} />
        <Route path='/clubViewAllSuspendedPlayers' element={<ClubViewAllSuspendedPlayers/>} />
        <Route path='/clubViewOneSuspendedPlayer' element={<ClubViewOneSuspendedPlayer/>} />
        <Route path='/clubChangePassword' element={<ClubChangePassword/>} />


        <Route path='/playerRegistration' element={<PlayerRegistration />} />
        <Route path='/playerLogin' element={<PlayerLogin />} />
        <Route path='/playerNavbar' element={<PlayerNavbar />} />
        <Route path='/playerviewProfile' element={<PlayerViewProfile />} />
        <Route path='/playerUpdateProfile' element={<PlayerUpdateProfile />} />
        <Route path='/playerViewAllNews' element={<PlayerViewAllNews />} />
        <Route path='/playerViewOneNews' element={<PlayerViewOneNews />} />
        <Route path='/playerViewAllMatches' element={<PlayerViewAllMatches />} />
        <Route path='/playerViewOneMatch' element={<PlayerViewOneMatch />} />
        <Route path='/playerViewAllMatchPoints' element={<PlayerViewAllMatchPoints />} />
        <Route path='/playerSendLeaveRequestToClub' element={<PlayerSendLeaveRequestToClub />} />
        <Route path='/playerViewAllClubs' element={<PlayerViewAllClubs />} />
        <Route path='/playerViewAllNotifications' element={<PlayerViewAllNotifications />} />
        <Route path='/playerViewOneNotification' element={<PlayerViewOneNotification />} />
        <Route path='/playerViewAllApprovedLeaveRequests' element={<PlayerViewAllApprovedLeaveRequests />} />
        <Route path='/playerChangePassword' element={<PlayerChangePassword />} />

        

        
          


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


