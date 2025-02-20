import {React,useState,useEffect} from "react";
import Sidenav from "./Sidenav";
import axios from "axios";

const ProfileOfDoctor = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newLocation, setNewLocation] = useState({
    buildingInfo: "",
    streetName: "",
    cityName: "",
    stateName: "",
  });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
        const response = await axios.get(NODE_ENV+"/api/auth/me", {
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

  const handleEditLocation = () => {
    console.log("Edit location button clicked!");  // Debug log
    setIsEditingLocation(true);
    if (doctor && doctor.profile && doctor.profile.location) {  // Pre-fill if location exists
      setNewLocation(doctor.profile.location);
    }
    // Initialize with empty values if no location exists
    else {
      setNewLocation({
        buildingInfo: "",
        streetName: "",
        cityName: "",
        stateName: "",
      });
    };
  }

  const handleLocationInputChange = (e) => {
    const { name, value } = e.target;
    setNewLocation({...newLocation, [name]: value}); // Update the newLocation object , spread the existing values and update the changed value
    setLocationError(null); // Clear any prev error message
  };

  const handleSaveLocation = async () => {
    try {
      if (!newLocation.buildingInfo || !newLocation.streetName || !newLocation.cityName || !newLocation.stateName) {
        setLocationError("Please fill in all location fields.");
        return;
      }

      const docId = doctor.profile._id;
      const NODE_ENV = import.meta.env.VITE_NODE_DOC_API;
      const response = await axios.patch(NODE_ENV+`/api/doctors/location/${docId}`, 
        { location: newLocation }, // Wrap the location data in an object
        {
          withCredentials: true,
        });

      if (response.data && response.data.message) {
        setDoctor({
          ...doctor, 
          profile: {
            ...doctor.profile, 
            location: newLocation
          }}); // Update the doctor object with the new location

        setIsEditingLocation(false);  // Exit edit mode 
      } else {
        setLocationError("Failed to update location. Please try again.");
      }
    } catch (err) {
      console.error("Failed to update location:", err);
      setLocationError("Failed to update location. Please try again.");
    }
  };
  
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
      {/* <div style={styles.sidebar}>
        <Sidenav />
      </div> */}

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

           <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Location</h3>
            {isEditingLocation ? (
              <div>
                <input
                  type="text"
                  name="buildingInfo"
                  placeholder="Building Info"
                  value={newLocation.buildingInfo}
                  onChange={handleLocationInputChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="streetName"
                  placeholder="Street Name"
                  value={newLocation.streetName}
                  onChange={handleLocationInputChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="cityName"
                  placeholder="City Name"
                  value={newLocation.cityName}
                  onChange={handleLocationInputChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="stateName"
                  placeholder="State Name"
                  value={newLocation.stateName}
                  onChange={handleLocationInputChange}
                  style={styles.input}
                />
                {locationError && <p style={styles.error}>{locationError}</p>}
                <button style={styles.saveButton} onClick={handleSaveLocation}>
                  Save Location
                </button>
                <button style={styles.cancelButton} onClick={() => setIsEditingLocation(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                {doctor.profile.location ? (
                  <>
                    <p>
                      {doctor.profile.location.buildingInfo}, {doctor.profile.location.streetName},{" "}
                      {doctor.profile.location.cityName}, {doctor.profile.location.stateName}
                    </p>
                    <button style={styles.editButton} onClick={handleEditLocation}>
                      Edit Location
                    </button>
                  </>
                ) : (
                  <button style={styles.editButton} onClick={handleEditLocation}>
                    Add Location
                  </button>
                )}
              </div>
            )}
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
  editButton: {
    backgroundColor: "#4CAF50", // Green
    border: "none",
    color: "white",
    padding: "8px 16px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  saveButton: {
    backgroundColor: "#007bff", // Blue
    border: "none",
    color: "white",
    padding: "8px 16px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  cancelButton: {
    backgroundColor: "#dc3545", // Red
    border: "none",
    color: "white",
    padding: "8px 16px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    margin: "4px 2px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    boxSizing: "border-box",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    marginTop: "5px",
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