import React from 'react';
import { Link } from 'react-router-dom'; // Corrected import for Link from react-router-dom

const Sidenav = () => {
  return (
    <div className='fixed w-[25%] h-full text-zinc-400 text-2xl bg-[#212529] border-r-2 border-zinc-700 p-3'>
      <h1 className='font-bold font-sans text-center text-zinc-200'>
        <i className="ri-stethoscope-line pr-3 font-normal"></i>
        BookMyDoc
      </h1>
      <hr className='mt-2 border-0.2 border-zinc-200' />
      <div className='flex flex-col mt-10'>
        <Link to="/appointment" className='p-2 rounded-md font-semibold hover:bg-[#ede5fa] hover:text-black duration-300'>
          <i className="mr-4 ri-calendar-check-line font-normal"></i>
          Appointments
        </Link>
        <Link to='/Symptoms' className='mt-7 p-2 rounded-md font-semibold hover:bg-[#ede5fa] hover:text-black duration-300'>
          <i className="mr-4 ri-first-aid-kit-line font-normal"></i>
          Symptoms
        </Link>
        <Link to='/Doctor' className='mt-7 p-2 rounded-md font-semibold hover:bg-[#ede5fa] hover:text-black duration-300'>
          <i className="mr-4 ri-stethoscope-fill font-normal"></i>
          Doctors
        </Link>
        <Link to='/Messages' className='mt-7 p-2 rounded-md font-semibold hover:bg-[#ede5fa] hover:text-black duration-300'>
          <i className="mr-4 ri-message-2-line font-normal"></i>
          Notification
        </Link>
        <Link to='/settings' className='mt-7 p-2 rounded-md font-semibold hover:bg-[#ede5fa] hover:text-black duration-300'>
          <i className="mr-4 ri-settings-4-line font-normal"></i>
          Settings
        </Link>
        <div className='mt-52'>
          <hr className='mt-2 border-0.2 border-zinc-200 mb-5' />
          <Link className='rounded-md font-semibold bg-[#0077b6] text-white duration-300 p-3 ml-12'>
            <i className="ri-shield-user-line mr-2 font-normal"></i>
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
