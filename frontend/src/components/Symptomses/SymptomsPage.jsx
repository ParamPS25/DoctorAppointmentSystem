import React from "react";
import { Link } from "react-router-dom";

const SymptomsPage = () => {
  const boxStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "150px",
    width: "1000px",
    margin: "20px",
    border: "2px solid #007BFF",
    borderRadius: "8px",
    backgroundColor: "#E9ECEF",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "none",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",  // Arrange in one column
    height: "100vh",
    backgroundColor: "#f8f9fa",
  };

  return (
    <div style={containerStyle}>
         <Link to="./Predict_disease_using_symptoms" style={boxStyle}>
        Predict Disease Using Symptoms
      </Link>
      <Link to="./Predict_diabetes" style={boxStyle}>
        Predict Diabetes (For womens)
      </Link>
      <Link to="./Predict_stroke" style={boxStyle}>
        Predict Stroke
      </Link>
      {/* <Link to="./Predict_parkinson" style={boxStyle}>
        Predict Parkinson
      </Link> */}
     
    </div>
  );
};

export default SymptomsPage;
