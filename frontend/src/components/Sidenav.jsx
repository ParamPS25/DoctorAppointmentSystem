import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import Logout from './Templets/Logout';

const fetchUser = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/me", {
      withCredentials: true,
    });
    return response.data.data;
  } catch (err) {
    console.error("Failed to fetch user:", err);
    return null;
  }
};

const Sidenav = () => {
  const [userRole, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const fetchedUser = await fetchUser();
        if (!fetchedUser) {
          throw new Error("User data not found");
        }
        setRole(fetchedUser.user.role);
        setProfile(fetchedUser);
      } catch (err) {
        setError("Failed to load user data");
        navigate('/SigninInfo'); // Redirect to login page on error
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [navigate]);

  if (loading) {
    return <div className="text-zinc-400 text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed w-[25%] h-full bg-[#212529] text-zinc-300 text-2xl border-r-2 border-zinc-700 p-3">
      {/* Logo Section */}
      <div className="text-center text-zinc-200 font-bold text-3xl mb-4">
        <i className="ri-stethoscope-line pr-3"></i>
        BookMyDoc
      </div>
      <hr className="border-zinc-700 mb-2" />

      {/* Profile Section */}
      <div className="flex items-center gap-4 p-4 bg-[#1b1e21] rounded-lg mb-6">
        <div className="w-16 h-16 rounded-full bg-zinc-500 flex items-center justify-center text-white text-3xl font-bold">
          <i className="ri-user-line"></i> {/* Profile Icon */}
        </div>
        <div>
          <p className="font-semibold text-zinc-200 text-lg">
            {userProfile.user.firstname} {userProfile.user.lastname}
          </p>
          <p className="text-sm text-zinc-400">{userProfile.user.email}</p>
          <p className="text-sm text-green-500 font-medium">{userRole}</p>
          {/* Smaller Logout Button */}
          <p className="text-sm mt-2 font-bold">
            <Logout />
          </p>
        </div>
      </div>


      {/* Navigation Links */}
      <div className="flex flex-col">
        <Link
          to="/Appointments"
          className={`p-2 rounded-md font-semibold ${
            isActive('/Appointments') ? 'bg-[#ede5fa] text-black' : 'hover:bg-[#ede5fa] hover:text-black'
          } duration-300`}
        >
          <i className="mr-4 ri-calendar-check-line"></i>
          Appointments
        </Link>

        {userRole === "patient" && (<Link
          to="/Symptoms"
          className={`mt-7 p-2 rounded-md font-semibold ${
            isActive('/Symptoms') ? 'bg-[#ede5fa] text-black' : 'hover:bg-[#ede5fa] hover:text-black'
          } duration-300`}
        >
          <i className="mr-4 ri-first-aid-kit-line"></i>
          Symptoms
        </Link>)}

        {userRole === "patient" && (<Link
          to="/Doctor"
          className={`mt-7 p-2 rounded-md font-semibold ${
            isActive('/Doctor') ? 'bg-[#ede5fa] text-black' : 'hover:bg-[#ede5fa] hover:text-black'
          } duration-300`}
        >
          <i className="mr-4 ri-stethoscope-fill"></i>
          Doctors
        </Link>)}

        <Link
          to="/Messages"
          className={`mt-7 p-2 rounded-md font-semibold ${
            isActive('/Messages') ? 'bg-[#ede5fa] text-black' : 'hover:bg-[#ede5fa] hover:text-black'
          } duration-300`}
        >
          <i className="mr-4 ri-message-2-line"></i>
          Notification
        </Link>

        {userRole === "doctor" && ( 
          <Link
            to="/calendar"
            className={`mt-7 p-2 rounded-md font-semibold ${
              isActive('/settings') ? 'bg-[#ede5fa] text-black' : 'hover:bg-[#ede5fa] hover:text-black'
            } duration-300`}
          >
            <i className="mr-4 ri-settings-4-line"></i>
            Calender
          </Link>
        )}

        {userRole === "doctor" && (
          <Link
            to="/QrScan"
            className={`mt-7 p-2 rounded-md font-semibold ${
              isActive('/QrScan') ? 'bg-[#ede5fa] text-black' : 'hover:bg-[#ede5fa] hover:text-black'
            } duration-300`}
          >
            <i className="mr-4 ri-qr-code-line"></i>
            QR Scan
          </Link>
        )}
      </div>

    </div>
  );
};

export default Sidenav;
