import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import Appointment from '../Templets/Appointment';
import Doctor from '../Templets/Doctor';
// import Sysmptoms from '../Templets/Symptoms';
import Messages from '../Templets/Messages';
import DoctorCalendar from '../Templets/DoctorCalendar';
import Signup from '../Templets/Signup';
import Symptoms from '../Templets/Symptoms';

const AllPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Appointments" element={<Appointment />} />
        <Route path="/Doctor" element={<Doctor />} />
        <Route path="/Symptoms" element={<Symptoms />} />
        <Route path="/Messages" element={<Messages />} />
        <Route path="/calendar" element={<DoctorCalendar />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default AllPage;




// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import React from 'react';
// import { Routes } from 'react-router-dom';
// import Home from '../Home';
// import Appointment from '../Templets/Appointment';
// import Doctor from '../Templets/Doctor';
// import Sysmptoms from '../Templets/Symptoms';
// import Messages from '../Templets/Messages';
// import Settings from '../Templets/Settings';
// import Signup from '../Templets/Signup';

// import { Link } from "react-router-dom";


// const AllPage = () => {
//   return <div>
//     <Routes>
//       <Route path='/' element={<Home />} />
//       <Route path='/Appointment' element={<Appointment />} />
//       <Route path='/Doctor' element={<Doctor />} />
//       <Route path='/Symptoms' element={<Sysmptoms />} />
//       <Route path='/Messages' element={<Messages />} />
//       <Route path='/Settings' element={<Settings />} />
//       <Route path='/Signup' element={<Signup />} />

//     </Routes>
//   </div>;
// };

// export default AllPage;