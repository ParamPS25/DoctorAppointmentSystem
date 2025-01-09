import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This enables the browser to include cookies
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Navigate to AllPage on successful login
        navigate('/AllPage');
      } else {
        // Show error message if login fails
        setErrorMessage(result.message || 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
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
          {...register('email')}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="mt-4 p-2 h-10 w-full placeholder-[#212529] rounded-md outline-none bg-transparent border border-black text-black font-semibold focus:outline-[#0077b6] focus:border-none"
          {...register('password')}
        />
        <div className="text-right">
          <a href="#" className="text-blue-700">
            Forgot Password?
          </a>
        </div>
        <input
          type="submit"
          name="Login"
          value="Sign in"
          className="mt-7 p-2 w-52 text-zinc-200 bg-[#0077b6] placeholder-[#212529] rounded-md hover:bg-[#0096c7] font-semibold cursor-pointer"
        />
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
