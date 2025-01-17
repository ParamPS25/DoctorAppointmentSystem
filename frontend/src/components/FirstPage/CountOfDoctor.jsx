import React, { useEffect, useState } from "react";

const CountOfDoctor = () => {
  const [statsInView, setStatsInView] = useState(false);
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    specialists: 0,
  });

  const statsTarget = {
    patients: 1000,
    doctors: 250,
    specialists: 75,
  };

  // Function to animate the count
  useEffect(() => {
    if (statsInView) {
      const interval = 30; // Speed of animation
      const increments = {
        patients: Math.ceil(statsTarget.patients / 100),
        doctors: Math.ceil(statsTarget.doctors / 100),
        specialists: Math.ceil(statsTarget.specialists / 100),
      };

      const timer = setInterval(() => {
        setCounts((prev) => {
          const updatedCounts = {
            patients:
              prev.patients < statsTarget.patients
                ? prev.patients + increments.patients
                : statsTarget.patients,
            doctors:
              prev.doctors < statsTarget.doctors
                ? prev.doctors + increments.doctors
                : statsTarget.doctors,
            specialists:
              prev.specialists < statsTarget.specialists
                ? prev.specialists + increments.specialists
                : statsTarget.specialists,
          };

          // Clear interval when all counts reach their targets
          if (
            updatedCounts.patients === statsTarget.patients &&
            updatedCounts.doctors === statsTarget.doctors &&
            updatedCounts.specialists === statsTarget.specialists
          ) {
            clearInterval(timer);
          }

          return updatedCounts;
        });
      }, interval);

      return () => clearInterval(timer); // Clean up interval on unmount
    }
  }, [statsInView, statsTarget]);

  // Use IntersectionObserver to detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    const element = document.getElementById("statistics-section");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <div id="statistics-section" style={styles.container}>
      {/* Statistics Section */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <h1 style={styles.statNumber}>{counts.patients}+</h1>
          <p style={styles.statText}>Satisfied Patients</p>
        </div>
        <div style={styles.statItem}>
          <h1 style={styles.statNumber}>{counts.doctors}+</h1>
          <p style={styles.statText}>Verified Doctors</p>
        </div>
        <div style={styles.statItem}>
          <h1 style={styles.statNumber}>{counts.specialists}+</h1>
          <p style={styles.statText}>Specialist Doctors</p>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f5f9ff",
  },
  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "40px",
  },
  statItem: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "50%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
    width: "180px",
    height: "180px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    margin: 0,
    color: "#007bff",
    fontSize: "24px",
    fontWeight: "700", // Bold font for numbers
  },
  statText: {
    margin: "5px 0 0",
    fontSize: "14px",
    color: "#555",
    fontWeight: "700", // Bold font for description text
  },
};


export default CountOfDoctor;
