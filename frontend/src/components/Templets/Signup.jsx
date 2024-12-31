// import React from 'react'
// import { useNavigate } from 'react-router'
// const Signup = () => {
//     const navigate=useNavigate();
//   return (
//     <div className='w-full h-full bg-zinc-300 '>
//         <div className='w-full h-12 bg-[#212529]'>
//             <h1 className='text-zinc-200 text-2xl font-bold p-2'>
//             <i onClick={()=>navigate(-1)} class="hover:text-[#0077b6] mr-2 font-normal ri-arrow-left-line"></i> 
//                 BookMyDoc</h1>
//         </div>
//         <div className='w-full h-[88%] flex justify-center items-center'>
//         <div className='w-[40%] h-[80%] bg-zinc-300 text-center rounded-lg drop-shadow-md'>
// <h1 className='font-bold text-3xl mb-10 mt-5 text-[#0077b6]'> Sign-up  with Us</h1>
// <form>
// <input type='text' placeholder='First Name' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md bg-transparent bg-tranparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
// <input type='text' placeholder='Last Name' className='w-[60%] h-10 m-3 pl-2 border-2 border-black rounded-md bg-transparent bg-tranparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
// <input type='Email' placeholder='Enter Your E-mail' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md bg-transparent placeholder:text-black font-semibold   outline-none focus:outline-[#0077b6] focus:border-none'/>
// <input type='password' placeholder='Create Password' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md  bg-transparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
// <input type='password' placeholder='Confirm Password' className='w-[60%] pl-2 h-10 m-3 border-2 border-black rounded-md bg-transparent placeholder:text-black font-semibold outline-none focus:outline-[#0077b6] focus:border-none'/>
// <input type='submit'  className='w-[40%] h-10 mt-8 text-zinc-200 rounded-lg font-semibold bg-[#0077b6] hover:bg-[#0096c7]'/>
// </form>
//       </div>
//       </div>
//     </div>
//   )
// }

// export default Signup
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';

const Signup= () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phoneNumber: '',
    age: '',
    gender: '',
    role: '',
    // Doctor specific fields
    specialization: '',
    experience: '',
    fees: '',
    // Patient specific fields
    medicalHistory: []
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      
      // Handle successful signup
      // Redirect to login or dashboard
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  return (
    <div className="h-full w-full  py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-[#0077b6]">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="h-[50%] bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Basic Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Select role</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>

            {/* Doctor-specific fields */}
            {formData.role === 'doctor' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Experience (years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Consultation Fees
                  </label>
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {errors.submit && (
              <div className="text-red-600 text-sm">{errors.submit}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;