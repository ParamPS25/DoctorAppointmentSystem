import { React, useState, useEffect } from "react";
import Sidenav from "./Sidenav";
import axios from "axios";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/me", {
          withCredentials: true,
        });

        if (response.data && response.data.data && response.data.data.user && response.data.data.profile) {
          setPatient(response.data.data);
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
      <div style={styles.sidebar}>
        <Sidenav />
      </div>

      <div style={styles.mainContent}>
        <div style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.imageContainer}>
              <img src="/doctor3.jpg" alt={patient.user.firstname} style={styles.image} />
            </div>
          </div>

          <div style={styles.profileDetails}>
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

          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    display: "flex",
    width: "100vw",
    height: "100vh",
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
  label: {
    fontWeight: "bold",
    color: "#4b5563",
  },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: "16px",
  },
};

export default PatientProfile;