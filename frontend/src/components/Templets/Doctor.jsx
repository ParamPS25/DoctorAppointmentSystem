import React from 'react'
import Cards from './Cards';
import { useNavigate } from 'react-router';
const Doctor = () => {
  const navigate=useNavigate();
  return (
    <div className='w-full h-full bg-zinc-200 '>
      <div className=' mt-1 w-full h-[8vh]   font-semibold text-2xl'>
<h1 className='p-2 text-[#0077b6]'><i onClick={()=>navigate(-1)} class="mr-2 hover:text-[#0077b6] text-[#212529]  font-normal ri-arrow-left-line"></i>Meet Our Doctors</h1>
      </div>
      <Cards/>
    </div>
  )
}

export default Doctor
