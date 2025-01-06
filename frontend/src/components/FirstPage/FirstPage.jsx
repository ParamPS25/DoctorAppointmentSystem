import React from "react";
import "./FirstPage.css";
import BookMyDoc from "./BookMyDoc";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const FirstPage = () => {
  return (
    <div className="app">
      {/* Navbar */}

      <nav className="navbar">
        <div className="logo">Health</div>
        <Link to="./SigninInfo">
          <button className="login-btn">Log In</button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your doctor and make an appointment</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="hero-buttons">
            <Link to="/Signup">
              <button className="get-started-btn">Get Started</button></Link>
            <a href="#learn-more" className="learn-more-link">
              Learn More →
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://thumbs.dreamstime.com/b/doctor-holding-digital-tablet-meeting-room-portrait-beautiful-mature-woman-looking-camera-confident-female-using-164999229.jpg"
            alt="Doctor consultation illustration"
          />
        </div>
      </section>



      <BookMyDoc />





      <footer className="footer">
        <div className="footer-container">
          {/* About Section */}
          <div className="footer-about">
            <h3>Doctor Appointment System</h3>
            <p>
              Your trusted platform for booking appointments with top-rated doctors.
              Convenient, secure, and reliable healthcare access at your fingertips.
            </p>
          </div>

         

          
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Email: <a href="purv9@doc.com">purv9@doc.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
            <p>Address: 123 Health ,gandhinagar sector 2</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>© 2025 Doctor Appointment System. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default FirstPage;
