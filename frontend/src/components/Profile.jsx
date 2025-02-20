import { React, useState, useEffect} from "react";
import {useNavigate } from 'react-router-dom';
import Sidenav from "./Sidenav";
import axios from "axios";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState(null);
  const [editError, setEditError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
        const response = await axios.get(NODE_ENV+"/api/auth/me", {
          withCredentials: true,
        },);

        if(response.status === 401){
          navigate('/SigninInfo');
        }
        if (response.data && response.data.data && response.data.data.user && response.data.data.profile) {
          setPatient(response.data.data);
          setEditedPatient(response.data.data); // Initialize the edited profile with the current profile
        } else {
          setError("Invalid data structure received from the server.");
        }

      } catch (err) {
        console.error("Failed to fetch patient:", err);
        setError("Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);  
  }

  // Functional Update: (prevPatient) => ({ ... }) is a functional update.  
  // It's a best practice in React when the new state depends on the previous state.  
  // React guarantees that prevPatient will be the most recent state value when the update is applied, 
  // even if there are multiple state updates happening quickly.

  // Let's say editedPatient looks like this:

  // editedPatient = {
  //   user: { firstname: "John", lastname: "Doe", age: 30 },
  //   profile: { medicalHistory: "None" }
  // };

  // And the user changes the "lastname" input field to "Smith".  The handleInputChange function will do the following:

  // 1. Create a shallow copy of editedPatient: { user: { ... }, profile: { ... } }
  // 2. Create a shallow copy of editedPatient.user: { firstname: "John", lastname: "Doe", age: 30 }
  // 3. Update the lastname property: { firstname: "John", lastname: "Smith", age: 30 }
  // 4. Create a shallow copy of editedPatient.profile: { medicalHistory: "None" }
  // 5. Combine everything to create the new editedPatient state

  // {
  //   user: { firstname: "John", lastname: "Smith", age: 30 },
  //   profile: { medicalHistory: "None" }
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prevPatient)=>({
      ...prevPatient,
      user: {
        ...prevPatient.user,
        [name]: value
      },
      profile: {
        ...prevPatient.profile,
        [name]: value
      }
    }));
    setEditError(null);
  }

  const handleSave = async () => {
    try{
      // console.log('Patient ID:', patient.profile._id);
      // console.log('Request URL:', `http://localhost:8080/api/patient/update/${patient.profile._id}`);
      // console.log('Request Data:', editedPatient);

      const dataToUpdate = {  // Create a new object with only the needed fields
        firstname: editedPatient.user.firstname,
        lastname: editedPatient.user.lastname,
        age: editedPatient.user.age,
        gender: editedPatient.user.gender,
        phoneNumber: editedPatient.user.phoneNumber,
        email: editedPatient.user.email,
        medicalHistory: editedPatient.profile.medicalHistory,
      };
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      const response = await axios.patch(
        NODE_ENV+`/api/patient/update/${patient.profile._id}`,
        // editedPatient,
        dataToUpdate, // Send only the data that needs to be updated
        { 
          withCredentials: true ,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Response:', response);

      if(response.data.message === "Patient updated successfully"){
        setPatient(response.data.patient);
        // Update the state of 'editedPatient' using the previous state
        setEditedPatient(prevState => ({
          // Spread the previous state to retain all existing properties
          ...prevState,
          // Update the 'user' property by merging the previous 'user' state with the new data from the response
          user: { ...prevState.user, ...response.data.patient.user },
          // Update the 'profile' property by merging the previous 'profile' state with the new data from the response
          profile: { ...prevState.profile, ...response.data.patient.profile },
        }));
        setIsEditing(false);  // Exit edit mode
        setEditError(null);
        console.log('Patient data updated successfully:', response.data.patient);
      } else{
        setEditError(response.data.message || "Failed to update patient data.");
      }

    } catch (err) {
      console.error("Failed to update patient:", err);
      setEditError("Failed to update patient data.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patient) {
    return <div>Patient data not available.</div>;
  }

  return (
    <div style={styles.profileContainer}>
      {/* <div style={styles.sidebar}>
        <Sidenav />
      </div> */}

      <div style={styles.mainContent}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.imageContainer}>
              <img src="/doctor3.jpg" alt={patient.user.firstname} style={styles.image} />
            </div>
          </div>

          <div style={styles.profileDetails}>
            {isEditing ? (
                  <div>
                    <div style={styles.inputGroup}>
                      <label htmlFor="firstname" style={styles.label}>First Name:</label>
                      <input
                        type="text"
                        id="firstname"        // Add an id for the label
                        name="firstname"
                        placeholder="First Name"
                        value={editedPatient.user.firstname}
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label htmlFor="lastname" style={styles.label}>Last Name:</label>
                      <input
                        type="text"
                        id="lastname"         // Add an id for the label
                        name="lastname"
                        placeholder="Last Name"
                        value={editedPatient.user.lastname}
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label htmlFor="Age" style={styles.label}>Age:</label>
                      <input
                        type="text"
                        name="age"
                        id="Age"              
                        placeholder="Age"
                        value={editedPatient.user.age}
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label htmlFor="Gender" style={styles.label}>Gender:</label>
                      <input
                        type="text"
                        name="gender"
                        id="Gender"
                        placeholder="Gender"
                        value={editedPatient.user.gender}
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        value={editedPatient.user.phoneNumber}
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.inputGroup}>
                      <label htmlFor="email" style={styles.label}>Email:</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={editedPatient.user.email}
                        onChange={handleInputChange}
                        style={styles.input}
                      />
                    </div>

                    {/* <div style={styles.inputGroup}>
                    <label htmlFor="medicalHistory" style={styles.label}>Medical History:</label>
                    <input
                      type="text"
                      name="medicalHistory"
                      id="medicalHistory"
                      placeholder="Medical History"
                      value={editedPatient.profile.medicalHistory || ""} // Handle undefined
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                    </div> */}

                    {editError && <p style={styles.error}>{editError}</p>}
                    <div style={styles.buttonGroup}> 
                        <button style={styles.saveButton} onClick={handleSave}>Save</button>
                        <button style={styles.cancelButton} onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                  </div>
            ) : (
              <div>
                <div style={styles.nameSection}>
                  <h2 style={styles.patientName}>{`${patient.user.firstname} ${patient.user.lastname}`}</h2>
                  <p style={styles.age}> Age : {patient.user.age}</p>
                </div>

                <div style={styles.infoGrid}>
                  <div style={styles.infoItem}>
                    <span style={styles.label}>Gender:</span>
                    <span>{patient.user.gender}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.label}>Contact:</span>
                    <span>{patient.user.phoneNumber}</span>
                  </div>
                  <div style={styles.infoItem}>
                    <span style={styles.label}>Email:</span>
                    <span>{patient.user.email}</span>
                  </div>
                </div>

                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Medical History</h3>
                  <p>{patient.profile.medicalHistory || "No medical history recorded."}</p>
                </div>
                <button style={styles.editButton} onClick={handleEdit}>Edit Profile</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#f4f4f4",
  },
  sidebar: {
    width: "25%",
    backgroundColor: "white",
    boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
  },
  mainContent: {
    flex: 1,
    padding: "32px",
    overflowY: "auto",
  },
  profileCard: {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  profileHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "32px",
  },
  imageContainer: {
    position: "relative",
    marginBottom: "16px",
  },
  image: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "4px solid #3b82f6",
    objectFit: "cover",
  },

  inputGroup: { 
    marginBottom: "16px", // Add spacing between input groups
  },
  label: { 
      display: "block", // Make labels stack on top of inputs
      marginBottom: "4px", // Add spacing between label and input
      fontWeight: "bold",
      color: "#4b5563",
  },
  input: {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      boxSizing: "border-box",
      border: "1px solid #ccc",
      borderRadius: "4px",
  },
  textArea: { 
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      boxSizing: "border-box",
      border: "1px solid #ccc",
      borderRadius: "4px",
      minHeight: "100px", // Set a minimum height
      resize: "vertical"   // Allow vertical resizing
  },
  error: {
    color: "red",
    marginBottom: "16px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "16px",
  },
  saveButton: {
    padding: "8px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "8px 16px",
    backgroundColor: "#ccc",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  profileDetails: {
    flex: 1,
  },
  nameSection: {
    marginBottom: "24px",
  },
  patientName: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "8px",
  },
  age: {
    fontSize: "18px",
    color: "#4b5563",
    marginBottom: "4px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "32px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  // label: {
  //   fontWeight: "bold",
  //   color: "#4b5563",
  // },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "16px",
  },
  editButton: {
    padding: "8px 16px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PatientProfile;

