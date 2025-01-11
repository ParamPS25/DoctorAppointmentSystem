



import React from "react";
import BookMyDoc from "./BookMyDoc";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const FirstPage = () => {
  // Inline styles
  const styles = {
    app: {
      fontFamily: "Arial, sans-serif",
      lineHeight: 1.6,
      backgroundColor: "#f9f9f9",
      margin: 0,
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#6e8dae",
      color: "#fff",
      padding: "15px 30px",
    },
    logo: {
      fontSize: "1.8em",
      fontWeight: "bold",
      color: "#fff",
    },
    loginBtn: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1em",
    },
    hero: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "50px 30px",
      backgroundColor: "#e3f2fd",
      flexWrap: "wrap",
    },
    heroContent: {
      maxWidth: "45%",
    },
    heroHeading: {
      fontSize: "2.8em",
      marginBottom: "20px",
      color: "#333",
    },
    heroParagraph: {
      marginBottom: "20px",
      color: "#555",
      fontSize: "1.2em",
    },
    heroButtons: {
      display: "flex",
      gap: "20px",
      marginTop: "10px",
    },
    getStartedBtn: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "12px 25px",
      borderRadius: "5px",
      fontSize: "1.1em",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    learnMoreLink: {
      fontSize: "1em",
      color: "#007bff",
      fontWeight: "bold",
    },
    heroImage: {
      maxWidth: "100%",
      height: "auto",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      marginTop: "20px",
    },
    footer: {
      backgroundColor: "#6e8dae",
      color: "white",
      padding: "40px 20px",
    },
    footerContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
      padding: "0 20px",
    },
    footerSection: {
      flex: 1,
      minWidth: "250px",
    },
    footerHeading: {
      marginBottom: "15px",
      color: "white",
    },
    footerParagraph: {
      color: "#aad1f5",
      lineHeight: 1.5,
    },
    footerLink: {
      color: "#aad1f5",
      textDecoration: "none",
    },
    footerBottom: {
      textAlign: "center",
      marginTop: "20px",
      borderTop: "1px solid #aad1f5",
      paddingTop: "15px",
      fontSize: "0.9em",
      color: "#aad1f5",
    },
  };

  return (
    <div style={styles.app}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>BookMyDoc</div>
        <Link to="./SigninInfo">
          <button style={styles.loginBtn}>Log In</button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroHeading}>Find Your Doctor and Make an Appointment</h1>
          <p style={styles.heroParagraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/Signup">
              <button style={styles.getStartedBtn}>Get Started</button>
            </Link>
            <a href="#learn-more" style={styles.learnMoreLink}>
              Learn More →
            </a>
          </div>
        </div>
        <div>
          <img
            style={styles.heroImage}
            src="https://thumbs.dreamstime.com/b/doctor-holding-digital-tablet-meeting-room-portrait-beautiful-mature-woman-looking-camera-confident-female-using-164999229.jpg"
            alt="Doctor consultation illustration"
          />
        </div>
      </section>

      <BookMyDoc />

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          {/* About Section */}
          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>Doctor Appointment System</h3>
            <p style={styles.footerParagraph}>
              Your trusted platform for booking appointments with top-rated doctors.
              Convenient, secure, and reliable healthcare access at your fingertips.
            </p>
          </div>

          {/* Contact Section */}
          <div style={styles.footerSection}>
            <h4 style={styles.footerHeading}>Contact Us</h4>
            <p style={styles.footerParagraph}>
              Email: <a href="purv9@doc.com" style={styles.footerLink}>purv9@doc.com</a>
            </p>
            <p style={styles.footerParagraph}>
              Phone: <a href="tel:+1234567890" style={styles.footerLink}>+1 (234) 567-890</a>
            </p>
            <p style={styles.footerParagraph}>Address: 123 Health, Gandhinagar Sector 2</p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div style={styles.footerBottom}>
          <p>© 2025 Doctor Appointment System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FirstPage;

