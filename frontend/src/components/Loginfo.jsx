import React from 'react'
import { Link } from 'react-router'
import Login from './Login'

const Loginfo = () => {
  return (
    <div className='w-[50%] h-[70%] bg-zinc-300 rounded-lg drop-shadow-md flex justify-center items-center'>
<div className=' w-[80%] h-[80%] text-center pt-20'>
<h1 className='p-1 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-[#0096c7]'>Login To BookMyDoc</h1>
<Login/>
<Link to='/Signup'>
  <h1 className='mt-3 text-blue-700'>Don't have an account? Sign Up</h1> </Link>
</div>
    </div>
  )
}

export default Loginfo
