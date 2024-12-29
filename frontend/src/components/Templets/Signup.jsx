import React from 'react'
import { useNavigate } from 'react-router'
const Signup = () => {
    const navigate=useNavigate();
  return (
    <div className='w-full h-full bg-zinc-300 '>
        <div className='w-full h-12 bg-[#212529]'>
            <h1 className='text-zinc-200 text-2xl font-bold p-2'>
            <i onClick={()=>navigate(-1)} class="hover:text-[#0077b6] mr-2 font-normal ri-arrow-left-line"></i> 
                BookMyDoc</h1>
        </div>
        <div className='w-full h-[88%] flex justify-center items-center'>
        <div className='w-[40%] h-[80%] bg-zinc-300 text-center rounded-lg drop-shadow-md'>
<h1 className='font-bold text-3xl mb-10 mt-5 text-[#0077b6]'> Sign-up  with Us</h1>
<form>
<input type='text' placeholder='First Name' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md bg-transparent bg-tranparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
<input type='text' placeholder='Last Name' className='w-[60%] h-10 m-3 pl-2 border-2 border-black rounded-md bg-transparent bg-tranparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
<input type='Email' placeholder='Enter Your E-mail' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md bg-transparent placeholder:text-black font-semibold   outline-none focus:outline-[#0077b6] focus:border-none'/>
<input type='password' placeholder='Create Password' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md  bg-transparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
<input type='password' placeholder='Confirm Password' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md bg-transparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
<input type='submit'  className='w-[40%] h-10 mt-8 text-zinc-200 rounded-lg font-semibold bg-[#0077b6] hover:bg-[#0096c7]'/>
</form>
      </div>
      </div>
    </div>
  )
}

export default Signup
