import React from 'react';
import { Route, Router, Routes } from 'react-router';
import Home from './components/Home';
import Appointment from './components/Templets/Appointment';
import Doctor from './components/Templets/Doctor';
import Symptoms from './components/Symptomses/Symptoms';
import Messages from './components/Templets/Messages';
import Settings from './components/Templets/Settings';
import Signup from './components/Templets/Signup';
import FirstPage from './components/FirstPage/FirstPage';
import SigninInfo from './components/FirstPage/SigninInfo';
import AppointmentPatientSide from './components/Templets/AppointmentPatientSide';
import AllPage from './components/FirstPage/AllPage';


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
        <Route path='/Settings' element={<Settings />} />
      </Routes>
    </div>
  )
};

export default App;

