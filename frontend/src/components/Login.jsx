import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
const Login = () => {
  const {register, handleSubmit} = useForm();
  const onSubmit = (data) => {
    console.log(data);
  }
return (
  <>
  <form onSubmit={handleSubmit(onSubmit)} className='mt-8  '>
    <input type='email' name='email' placeholder='enter your email' className='p-2 mb-2 h-10 w-full rounded-md outline-none bg-transparent placeholder-[#212529] border border-black font-semibold focus:outline-[#0077b6] focus:border-none'/>
    <input type='password' name='password' placeholder='enter your password' className='mt-4 p-2 h-10 w-full placeholder-[#212529] rounded-md outline-none bg-transparent border border-black text-black font-semibold focus:outline-[#0077b6] focus:border-none'/>
    <Link className=' text-blue-700 '>
    <h1 className='mt-2 ml-60'>Forgot Password?</h1>
    </Link>
    <input type='submit' name='Login' value="Sign in" className='mt-7 p-2 w-52 text-zinc-200 bg-[#0077b6] placeholder-[#212529] rounded-md hover:bg-[#0096c7] font-semibold'/>
  </form>
  </>
)
}

export default Login
