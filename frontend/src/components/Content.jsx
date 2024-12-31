import React from 'react'
import Loginfo from './Loginfo'
const Content = () => {
  return (
    <div className='w-full h-full bg-zinc-100 flex gap-12 justify-center items-center'>
      <Loginfo/>
      <div className='w-[40%] h-[80%] bg-[#212529] flex flex-col rounded-lg'>
        <div className='flex flex-col mt-32'>
            <h1 className='text-center text-3xl font-bold text-[#fff]'>Welcome to BookMyDoc</h1>
            <p className='text-center text-sm text-zinc-400'>Sign up and explore our amazing features</p>
        </div>
        <div className='flex flex-col mt-12 ml-[20%] text-white border w-fit p-5 border-zinc-400 rounded-lg'>

        <div className='mb-2  w-fit '>
            <h1 className='mb-3 text-[#0077b6] font-semibold text-xl'>Key Features</h1>
            <h1>
            <i class="bg-zinc-600 p-1 rounded-full mr-2 ri-check-double-line"></i>Schedule Appointments</h1>
            <p className='text-zinc-400 text-xs ml-8'>Schedule appointments with AI assistance</p>
           </div>

           <div> <h1>
            <i class="bg-zinc-600 p-1 rounded-full mr-2 ri-check-double-line"></i>Diseases Prediction</h1>
            <p className='text-zinc-400 text-xs ml-8'>AI-powered symptom analysis</p>
           </div>
           
            <div className='mt-2'>
            <h1>
            <i class="bg-zinc-600 p-1 rounded-full mr-2 ri-check-double-line"></i>Medical Record</h1>
            <p className='text-zinc-400 text-xs ml-8'>Secure digital health records</p>
        </div>
        </div>
</div>
    </div>
  )
}

export default Content
