import React from 'react'
import Sidenav from './Sidenav'
const Profile = () => {
  const patient = {
    firstName: "John",
    lastName: "Doe",
    age: "35",
    email: "johndoe@example.com",
    contact: "+1 234 567 890",
    address: "123 Main St, Springfield, USA",
    medicalConditions: ["Diabetes", "Hypertension"],
    image: "doctor1.jpg", // Replace with actual image URL
  };

  return (
    <div className='w-screen h-full flex'>
      <div className='w-[25%] h-full'>
        <Sidenav/>
      </div>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img src={patient.image} alt={`${patient.firstName} ${patient.lastName}`} style={styles.image} />
        </div>
        <div style={styles.profileDetails}>
          <h2 style={styles.profileTitle}>PATIENT PROFILE</h2>
          <h3 style={styles.patientName}>{`${patient.firstName} ${patient.lastName}`}</h3>
          <p style={styles.text}><strong>Age:</strong> {patient.age}</p>
          <p style={styles.text}><strong>Email:</strong> {patient.email}</p>
          <p style={styles.text}><strong>Contact:</strong> {patient.contact}</p>
          <h4 style={styles.sectionTitle}>ADDRESS</h4>
          <p style={styles.text}>{patient.address}</p>
          <h4 style={styles.sectionTitle}>MEDICAL CONDITIONS</h4>
          <div style={styles.conditions}>
            {patient.medicalConditions.map((condition, index) => (
              <span key={index} style={styles.conditionTag}>{condition}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  image: {
    width: "150px", 
    height: "150px",
    borderRadius: "50%",  
    objectFit: "cover",
    border: "5px solid #2c3e50", 
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
  patientName: {
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
  conditions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  conditionTag: {
    backgroundColor: "#16a085",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "14px",
  },
};
export default Profile
