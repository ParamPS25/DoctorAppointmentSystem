import React, { useState } from 'react'
import { useNavigate } from 'react-router'
const Appointment = () => {
  const navigate=useNavigate();
  return (
    <div className='w-screen h-screen bg-zinc-300'>
     <div className='px-3 w-full h-[8vh] bg-[#212529] text-zinc-300 font-semibold flex items-center text-xl'>
          <h1 > <i onClick={()=>navigate(-1)} className="hover:text-[#0077b6]  font-normal ri-arrow-left-line"></i> Appointments</h1>
     </div>
    </div>
  )
}

export default Appointment
