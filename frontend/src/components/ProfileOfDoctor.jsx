import {React,useState,useEffect} from "react";
import Sidenav from "./Sidenav";
import axios from "axios";

const ProfileOfDoctor = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/me", {
          withCredentials: true,
        });

        if (response.data && response.data.data && response.data.data.user && response.data.data.profile) { 
          setDoctor(response.data.data); // Set the entire data object
        } else {
          setError("Invalid data structure received from the server.");
        }

      } catch (err) {
        console.error("Failed to fetch doctor:", err);
        setError("Failed to load doctor data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {  
    return <div>Error: {error}</div>; // Display the error message
  }

  if (!doctor) {
    return <div>Doctor data not available.</div>;
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
              <img src="/doctor2.jpg" alt={doctor.user.firstname} style={styles.image} /> 
            </div>
          </div>

          <div style={styles.profileDetails}>
            <div style={styles.nameSection}>
              <h2 style={styles.doctorName}>{`${doctor.user.firstname} ${doctor.user.lastname}`}</h2> 
              <p style={styles.age}> Age : {doctor.user.age}</p>
            </div>

            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.label}>Experience:</span>
                <span>{doctor.profile.experience} Years</span> 
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Fees:</span>
                <span>{doctor.profile.fees} Rs</span> 
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Contact:</span>
                <span>{doctor.user.phoneNumber}</span> 
              </div>
              <div style={styles.infoItem}>
                <span style={styles.label}>Email:</span>
                <span>{doctor.user.email}</span>
              </div>
            </div>

            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Specialization</h3>
              <div style={styles.specialties}>
                <span style={styles.specialtyTag}>{doctor.profile.specialization}</span>
              </div>
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
  onlineIndicator: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    width: "12px",
    height: "12px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    border: "2px solid white",
  },
  profileDetails: {
    flex: 1,
  },
  nameSection: {
    marginBottom: "24px",
  },
  doctorName: {
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
  hospital: {
    fontSize: "16px",
    color: "#6b7280",
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
  specialties: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  specialtyTag: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    padding: "6px 12px",
    borderRadius: "16px",
    fontSize: "14px",
    fontWeight: "500",
  },
  achievements: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  achievement: {
    padding: "8px 16px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    color: "#4b5563",
  },
  location: {
    color: "#4b5563",
    lineHeight: "1.5",
  },
};

export default ProfileOfDoctor;