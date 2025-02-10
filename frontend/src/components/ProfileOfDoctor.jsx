import React from 'react'
import Sidenav from './Sidenav'
const ProfileOfDoctor = () => {
    const doctor = {
        name: "Dr. James Graham",
        qualification: "MBBS",
        hospital: "Appollo Hospitals, Newark, USA",
        specialties: ["Cardiology", "Neurology", "Periodontology", "Psychology"],
        experience: "20+ Years",
        contact: "+41 989 001 989",
        location: "California, City State: IA, Loeprich 880, Zip: 11976-8749",
        image: "doctor1.jpg", // Replace with actual image URL
      };
  return (
    <div className='w-screen h-full flex'>
    <div className='w-[25%] h-full'>
      <Sidenav/>
    </div>
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={doctor.image} alt={doctor.name} style={styles.image} />
        {/* <h3 style={styles.name}>{doctor.name.split(" ")[1].toUpperCase()}</h3> */}
      </div>
      <div style={styles.profileDetails}>
        <h2 style={styles.profileTitle}>PROFILE</h2>
        <h3 style={styles.doctorName}>{doctor.name}</h3>
        <p style={styles.text}>{doctor.qualification}</p>
        <p style={styles.text}>{doctor.hospital}</p>

        <h4 style={styles.sectionTitle}>SPECIALTY</h4>
        <div style={styles.specialties}>
          {doctor.specialties.map((specialty, index) => (
            <span key={index} style={styles.specialtyTag}>
              {specialty}
            </span>
          ))}
        </div>

        <h4 style={styles.sectionTitle}>EXPERIENCE</h4>
        <p style={styles.text}>{doctor.experience}</p>

        <h4 style={styles.sectionTitle}>CONTACT</h4>
        <p style={styles.text}>{doctor.contact}</p>

        <h4 style={styles.sectionTitle}>ADDRESS</h4>
        <p style={styles.text}>{doctor.location}</p>
      </div>
    </div>
  
  </div>
  )
}
const styles = {
    container: {
      display: "flex",
      width: "50%",
      height:"70%",
      margin: "auto",
      backgroundColor: "lightgray",
      borderRadius: "10px",
      padding: "20px",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    // imageContainer: {
    //   textAlign: "center",
    //   flex: 1,
    //   backgroundColor: "#fff",
    //   padding: "20px",
    //   borderRadius: "10px",
    // },
    image: {
      width: "150px", 
      height: "150px",
      borderRadius: "50%",  // Makes the image circular
      objectFit: "cover",
      border: "5px solid #2c3e50", 
     
    },
    name: {
      fontSize: "20px",
      color: "#555",
      marginTop: "10px",
    },
    profileDetails: {
      flex: 2,
      paddingLeft: "20px",
    },
    profileTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      color: "#f39c12",
    },
    doctorName: {
      fontSize: "24px",
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      marginTop: "15px",
      color: "#f39c12",
    },
    text: {
      fontSize: "14px",
      marginBottom: "10px",
    },
    specialties: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    specialtyTag: {
      backgroundColor: "#16a085",
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "14px",
    },
  };
export default ProfileOfDoctor
