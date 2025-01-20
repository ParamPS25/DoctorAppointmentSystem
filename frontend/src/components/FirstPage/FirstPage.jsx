import React, { useRef } from "react";
import { Link } from "react-router-dom";
import BookMyDoc from "./BookMyDoc";
import CountOfDoctor from "./CountOfDoctor";

const FirstPage = () => {
  const bookMyDocRef = useRef(null); // Create a ref for the BookMyDoc component

  const handleScrollToBookMyDoc = () => {
    bookMyDocRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the component
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center">
              <img
                src="/stethoscope.png"
                alt="Stethoscope Logo"
                className="h-10 w-auto mr-3"
              />
              <span className="text-2xl font-bold text-blue-700">BookMyDoc</span>
            </Link>
            <Link to="./SigninInfo">
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
                Log In
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 leading-tight">
                Find Your Doctor and Make an Appointment
              </h1>
              <p className="text-lg text-blue-700">
                Experience healthcare simplified. Connect with top medical
                professionals and schedule appointments with just a few clicks.
                Your health journey begins here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/Signup">
                  <button className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105">
                    Get Started
                  </button>
                </Link>
                <button
                  onClick={handleScrollToBookMyDoc} // Scroll on click
                  className="w-full sm:w-auto inline-flex items-center justify-center text-blue-700 hover:text-blue-800 font-semibold py-3 px-8"
                >
                  Learn More
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="doctor1.jpg"
                  alt="Doctor consultation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BookMyDoc Section */}
      <div ref={bookMyDocRef}>
        <BookMyDoc />
      </div>

      <CountOfDoctor />

      {/* Footer */}
      <footer className="bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Doctor Appointment System</h3>
              <p className="text-blue-200 leading-relaxed">
                Your trusted platform for booking appointments with top-rated
                doctors. Convenient, secure, and reliable healthcare access at
                your fingertips.
              </p>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl font-semibold">Contact Us</h4>
              <div className="space-y-4 text-blue-200">
                <p className="flex items-center text-white">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:purv@bookmydoc.com"
                    className="text-white transition-colors"
                  >
                    purv@bookmydoc.com
                  </a>
                </p>
                <p className="flex items-center text-white">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+1234567890"
                    className="text-white transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </p>
                <p className="flex items-center text-white">
                  <svg
                    className="w-5 h-5 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  456 MG Road, Koramangala, Bengaluru, Karnataka - 560095, India
                </p>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-700 text-center text-blue-200">
            <p className="text-white">
              © 2025 BookMyDoc . All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FirstPage;
