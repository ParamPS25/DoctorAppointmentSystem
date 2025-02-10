import React from 'react';
import { Route, Router, Routes } from 'react-router';
import Home from './components/Home';
import Appointment from './components/Templets/Appointment';
import Doctor from './components/Templets/Doctor';
import Symptoms from './components/Symptomses/Symptoms';
import Messages from './components/Templets/Messages';
import Signup from './components/Templets/Signup';
import FirstPage from './components/FirstPage/FirstPage';
import SigninInfo from './components/FirstPage/SigninInfo';
import AppointmentPatientSide from './components/Templets/AppointmentPatientSide';
import AllPage from './components/FirstPage/AllPage';
import QrScan from './components/Templets/QrScan';
import DoctorCalendar from './components/Templets/DoctorCalendar';
import Profile from './components/Profile';
import ProfileOfDoctor from './components/ProfileOfDoctor';

const App = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Routes>
        <Route path='/' element={<FirstPage />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/SigninInfo' element={<SigninInfo />} />
        <Route path="/AppointmentPatientSide/:doctorId" element={<AppointmentPatientSide />} />
        <Route path='/AllPage/*' element={<AllPage />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Appointments' element={<Appointment />} />
        <Route path='/Doctor' element={<Doctor />} />
        <Route path='/Symptoms/*' element={<Symptoms />} />
        <Route path='/Messages' element={<Messages />} />
        <Route path='/calendar' element={<DoctorCalendar />} />
        <Route path ='/QrScan' element={<QrScan />} />
        <Route path='/Profile' element={<Profile/>} />
        <Route path='/ProfileOfDoctor' element={<ProfileOfDoctor/>} />
      </Routes>
    </div>
  )
};

export default App;

