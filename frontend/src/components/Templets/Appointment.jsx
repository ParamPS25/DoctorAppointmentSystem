import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Sidenav from '../../components/Sidenav'
import AppointmentViewForDoctor from './AppointmentViewForDoctor'
import AppointmentViewForPatient from './AppointmentViewForPatient'
import './AppointmentView.css'
const Appointment = () => {
  const navigate=useNavigate();
  return (
    <div className='w-screen h-screen bg-zinc-300 flex'>
     
     <div className='w-[25%] '>
   <Sidenav/>
   </div>


   <div className='w-[75%] bg-white-700 h-full text-center text-3xl'>
   <AppointmentViewForDoctor/>
   <AppointmentViewForPatient/>

   </div>
   </div>
  )
}

export default Appointment
