import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8080/api/auth/logout', 
      { 
        withCredentials: true 
      });
      // Redirect to login page after successful logout
      navigate('/SigninInfo');
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mb-25 p-2 rounded-md font-semibold bg-red-500 text-white hover:bg-red-600 duration-300 w-full"
    >
      <i className="ri-logout-box-line mr-3"></i> Logout
    </button>
  );
};

export default Logout;
