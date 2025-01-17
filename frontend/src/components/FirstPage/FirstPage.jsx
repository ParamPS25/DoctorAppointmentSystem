



// import React from "react";
// import BookMyDoc from "./BookMyDoc";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import CountOfDoctor from "./CountOfDoctor";
// const FirstPage = () => {
//   // Inline styles
//   const styles = {
//     app: {
//       fontFamily: "Arial, sans-serif",
//       lineHeight: 1.6,
//       backgroundColor: "#f9f9f9",
//       margin: 0,
//     },
//     navbar: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       backgroundColor: "#6e8dae",
//       color: "#fff",
//       padding: "15px 30px",
//     },
//     logo: {
//       fontSize: "1.8em",
//       fontWeight: "bold",
//       color: "#fff",
//     },
//     loginBtn: {
//       backgroundColor: "#007bff",
//       color: "#fff",
//       border: "none",
//       padding: "10px 20px",
//       borderRadius: "5px",
//       cursor: "pointer",
//       fontSize: "1em",
//     },
//     hero: {
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "50px 30px",
//       backgroundColor: "#e3f2fd",
//       flexWrap: "wrap",
//     },
//     heroContent: {
//       maxWidth: "45%",
//     },
//     heroHeading: {
//       fontSize: "2.8em",
//       marginBottom: "20px",
//       color: "#333",
//     },
//     heroParagraph: {
//       marginBottom: "20px",
//       color: "#555",
//       fontSize: "1.2em",
//     },
//     heroButtons: {
//       display: "flex",
//       gap: "20px",
//       marginTop: "10px",
//     },
//     getStartedBtn: {
//       backgroundColor: "#007bff",
//       color: "#fff",
//       border: "none",
//       padding: "12px 25px",
//       borderRadius: "5px",
//       fontSize: "1.1em",
//       cursor: "pointer",
//       transition: "background-color 0.3s ease, transform 0.2s ease",
//     },
//     learnMoreLink: {
//       fontSize: "1em",
//       color: "#007bff",
//       fontWeight: "bold",
//     },
//     heroImage: {
//       maxWidth: "100%",
//       height: "auto",
//       width: "60%",
//       marginLeft: "600px",
//       borderRadius: "10px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       marginTop: "20px",
//     },
//     heroImage3: {
//       maxWidth: "100%",
//       height: "auto",
//       width: "60%",

//       borderRadius: "10px",
//       boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//       marginTop: "20px",
//     },




//     footer: {
//       backgroundColor: "#6e8dae",
//       color: "white",
//       padding: "40px 20px",
//     },
//     footerContainer: {
//       display: "flex",
//       justifyContent: "space-between",
//       flexWrap: "wrap",
//       gap: "20px",
//       padding: "0 20px",
//     },
//     footerSection: {
//       flex: 1,
//       minWidth: "250px",
//     },
//     footerHeading: {
//       marginBottom: "15px",
//       color: "white",
//     },
//     footerParagraph: {
//       color: "#aad1f5",
//       lineHeight: 1.5,
//     },
//     footerLink: {
//       color: "#aad1f5",
//       textDecoration: "none",
//     },
//     footerBottom: {
//       textAlign: "center",
//       marginTop: "20px",
//       borderTop: "1px solid #aad1f5",
//       paddingTop: "15px",
//       fontSize: "0.9em",
//       color: "#aad1f5",
//     },
//   };

//   return (
//     <div style={styles.app}>
//       {/* Navbar */}
//       <nav style={styles.navbar}>
//         <div style={styles.logo}>BookMyDoc</div>
//         <Link to="./SigninInfo">
//           <button style={styles.loginBtn}>Log In</button>
//         </Link>
//       </nav>

//       {/* Hero Section */}
//       <section style={styles.hero}>
//         <div style={styles.heroContent}>
//           <h1 style={styles.heroHeading}>Find Your Doctor and Make an Appointment</h1>
//           <p style={styles.heroParagraph}>
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//           <div style={styles.heroButtons}>
//             <Link to="/Signup">
//               <button style={styles.getStartedBtn}>Get Started</button>
//             </Link>
//             <a href="#learn-more" style={styles.learnMoreLink}>
//               Learn More →
//             </a>
//           </div>
//         </div>
//         <div>
//           <img
//             style={styles.heroImage}
//             src="doctor2.jpg"
//             alt="Doctor consultation illustration"
//           />
//         </div>
//         <div>
//           <img
//             style={styles.heroImage3}
//             src="doctor3.jpg"
//             alt="Doctor consultation illustration"
//           />
//         </div>



//       </section>

//       <BookMyDoc />



//       {/* <div style={styles.container}>

//         <div style={styles.stats}>
//           <div style={styles.statItem}>
//             <h1 style={styles.statNumber}>1000+</h1>
//             <p style={styles.statText}>Satisfied Patients</p>
//           </div>
//           <div style={styles.statItem}>
//             <h1 style={styles.statNumber}>250+</h1>
//             <p style={styles.statText}>Verified Doctors</p>
//           </div>
//           <div style={styles.statItem}>
//             <h1 style={styles.statNumber}>75+</h1>
//             <p style={styles.statText}>Specialist Doctors</p>
//           </div>
//         </div>
//       </div> */}


// <CountOfDoctor/>



//       {/* Footer */}
//       <footer style={styles.footer}>
//         <div style={styles.footerContainer}>
//           {/* About Section */}
//           <div style={styles.footerSection}>
//             <h3 style={styles.footerHeading}>Doctor Appointment System</h3>
//             <p style={styles.footerParagraph}>
//               Your trusted platform for booking appointments with top-rated doctors.
//               Convenient, secure, and reliable healthcare access at your fingertips.
//             </p>
//           </div>

//           {/* Contact Section */}
//           <div style={styles.footerSection}>
//             <h4 style={styles.footerHeading}>Contact Us</h4>
//             <p style={styles.footerParagraph}>
//               Email: <a href="purv@bookmydoc.com" style={styles.footerLink}>purv@bookmydoc.com</a>
//             </p>
//             <p style={styles.footerParagraph}>
//               Phone: <a href="tel:+1234567890" style={styles.footerLink}>+1 (234) 567-890</a>
//             </p>
//             <p style={styles.footerParagraph}>Address: 456 MG Road
//               Koramangala, Bengaluru
//               Karnataka - 560095
//               India</p>
//           </div>
//         </div>

//         {/* Footer Bottom Section */}
//         <div style={styles.footerBottom}>
//           <p>© 2025 Doctor Appointment System. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );




// };

// export default FirstPage;

import React from "react";
import BookMyDoc from "./BookMyDoc";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountOfDoctor from "./CountOfDoctor";

const FirstPage = () => {
  // Improved Inline Styles
  const styles = {
    app: {
      fontFamily: "Arial, sans-serif",
      lineHeight: 1.6,
      backgroundColor: "#f9f9f9",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
    },
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#3b5a8e",
      color: "#fff",
      padding: "20px 30px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    logo: {
      fontSize: "2em",
      fontWeight: "bold",
      color: "#fff",
      letterSpacing: "1px",
    },
    loginBtn: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "12px 25px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "1em",
      transition: "background-color 0.3s ease",
    },
    loginBtnHover: {
      backgroundColor: "#0056b3",
    },
    // hero: {
    //   display: "flex",
    //   alignItems: "center",
    //   justifyContent: "space-between",
    //   padding: "80px 30px",
    //   backgroundColor: "#e3f2fd",
    //   flexWrap: "wrap",
    //   gap: "30px",
    // },
    // heroContent: {
    //   maxWidth: "50%",
    //   paddingRight: "20px",
    // },
    // heroHeading: {
    //   fontSize: "3.5em",
    //   marginBottom: "20px",
    //   color: "#333",
    //   fontWeight: "600",
    //   lineHeight: "1.2",
    // },
    // heroParagraph: {
    //   marginBottom: "20px",
    //   color: "#555",
    //   fontSize: "1.2em",
    //   lineHeight: "1.6",
    // },
    heroButtons: {
      display: "flex",
      gap: "20px",
      marginTop: "20px",
    },
    getStartedBtn: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "15px 30px",
      borderRadius: "5px",
      fontSize: "1.1em",
      cursor: "pointer",
      transition: "background-color 0.3s ease, transform 0.2s ease",
    },
    getStartedBtnHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    learnMoreLink: {
      fontSize: "1.1em",
      color: "#007bff",
      fontWeight: "bold",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    learnMoreLinkHover: {
      color: "#0056b3",
    },
    
    hero: {
      display: "flex", // Aligns content horizontally
      alignItems: "center",
      justifyContent: "space-between", // Distribute space between elements
      padding: "80px 30px",
      backgroundColor: "#e3f2fd",
      flexWrap: "wrap", // Allow wrapping on smaller screens
      gap: "30px", // Space between content
    },
    heroContent: {
      flex: 1, // Take equal space
      maxWidth: "50%", // Restrict width to 50%
      paddingRight: "20px",

    },
    heroImagesContainer: {
      display: "flex",
      flexDirection: "column", // Stack images vertically on small screens
      gap: "20px", // Space between images
      flex: 1, // Allow the image container to take remaining space
      maxWidth: "50%",
    },
    heroHeading: {
      fontSize: "36px",
      color: "black",
    },
    learnMoreLink: {
      display: "flex",
      marginTop: "20px",
    },

    heroImage: {
      maxWidth: "100%",
      height: "auto",
      width: "800px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    heroImage3: {
      maxWidth: "100%",
      height: "auto",
      width: "800px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    footer: {
      backgroundColor: "#3b5a8e",
      color: "white",
      padding: "40px 20px",
    },
    footerContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "20px",
    },
    footerSection: {
      flex: 1,
      minWidth: "250px",
      marginBottom: "20px",
    },
    footerHeading: {
      marginBottom: "15px",
      color: "white",
      fontWeight: "600",
    },
    footerParagraph: {
      color: "#aad1f5",
      lineHeight: 1.6,
      fontSize: "1.1em",
    },
    footerLink: {
      color: "#aad1f5",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    footerLinkHover: {
      color: "#fff",
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            src="doctor1.jpg"
            alt="Doctor consultation illustration"
          />
        </div>
        
      </section>

      <BookMyDoc />

      <CountOfDoctor />

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          {/* About Section */}
          <div style={styles.footerSection}>
            <h3 style={styles.footerHeading}>Doctor Appointment System</h3>
            <p style={styles.footerParagraph}>
              Your trusted platform for booking appointments with top-rated doctors. Convenient, secure, and reliable healthcare access at your fingertips.
            </p>
          </div>

          {/* Contact Section */}
          <div style={styles.footerSection}>
            <h4 style={styles.footerHeading}>Contact Us</h4>
            <p style={styles.footerParagraph}>
              Email: <a href="mailto:purv@bookmydoc.com" style={styles.footerLink}>purv@bookmydoc.com</a>
            </p>
            <p style={styles.footerParagraph}>
              Phone: <a href="tel:+1234567890" style={styles.footerLink}>+1 (234) 567-890</a>
            </p>
            <p style={styles.footerParagraph}>
              Address: 456 MG Road, Koramangala, Bengaluru, Karnataka - 560095, India
            </p>
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
