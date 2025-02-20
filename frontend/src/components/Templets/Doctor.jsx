import React from 'react'
import Cards from './Cards';
import { useNavigate } from 'react-router';
import Sidenav from '../../components/Sidenav';
const Doctor = () => {
  const navigate=useNavigate();
  return (
    // <div className='w-screen h-full flex'>
    //   <div className='w-[25%] h-full'>
    //     <Sidenav/>
    //   </div>
    //   <div className='w-[75%]  h-full text-center text-3xl'>
    //   <h1 className='p-2 text-[#0077b6]'>Meet Our Doctors</h1>
    //    <Cards/>
    // </div>
    // </div>

    <div className='h-full text-center text-3xl'>
        <h1 className='p-2 text-[#0077b6]'>Meet Our Doctors</h1>
        <Cards/>
     </div>
  )
}

export default Doctor
