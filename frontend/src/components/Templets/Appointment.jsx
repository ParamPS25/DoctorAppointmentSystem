import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Sidenav from '../../components/Sidenav'
const Appointment = () => {
  const navigate=useNavigate();
  return (
    <div className='w-screen h-screen bg-zinc-300 flex'>
     {/* <div className='px-3 w-full h-[8vh] bg-[#212529] text-zinc-300 font-semibold flex items-center text-xl'>
          <h1 > <i onClick={()=>navigate(-1)} className="hover:text-[#0077b6]  font-normal ri-arrow-left-line"></i> Appointments</h1>   
     </div> */}
     <div className='w-[25%] '>
   <Sidenav/>
   </div>
   <div className='w-[75%] bg-blue-700 h-full text-center text-3xl'>
   <h1 className='text-black'>Appointment section</h1>
   </div>
   </div>
  )
}

export default Appointment
