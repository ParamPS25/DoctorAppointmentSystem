import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../reusables/LoadinSpinner';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      const response = await fetch(NODE_ENV+'/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if(result.user.role === "doctor"){
          navigate('/AllPage/Appointments');
        } else {
          navigate('/AllPage/Doctor');
        }
      } else {
        setErrorMessage(result.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="p-2 mb-2 h-10 w-full rounded-md outline-none bg-transparent placeholder-[#212529] border border-black font-semibold focus:outline-[#0077b6] focus:border-none"
          disabled={isLoading}
          {...register('email')}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="mt-4 p-2 h-10 w-full placeholder-[#212529] rounded-md outline-none bg-transparent border border-black text-black font-semibold focus:outline-[#0077b6] focus:border-none"
          disabled={isLoading}
          {...register('password')}
        />
    {/*    <div className="text-right"> 
           <a href="#" className="text-blue-700"> 
            Forgot Password? 
           </a>
         </div>  */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-3 ml-[30%] p-2 w-48 text-zinc-200 bg-[#0077b6] placeholder-[#212529] rounded-md hover:bg-[#0096c7] font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <LoadingSpinner small= "true"/>
              Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      {errorMessage && (
        <div className="mt-4 text-red-600 font-semibold">
          {errorMessage}
        </div>
      )}
    </>
  );
};

export default Login;
