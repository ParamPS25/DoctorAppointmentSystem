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
    border: "2px solidrgb(11, 62, 116)",
    borderRadius: "8px",
    background: "linear-gradient(135deg,rgb(161, 183, 228),rgb(107, 219, 219),rgb(67, 234, 234),rgb(16, 107, 225))",
    fontSize: "23px",
    fontWeight: "bold",
    color: "rgb(22, 12, 62)",
    cursor: "pointer",
    textDecoration: "none",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",  
    height: "100vh",
    width:"100%",
    backgroundColor: "rgb(200, 239, 221)",
  };

  return (
    <div style={containerStyle}>
         <Link to="./Predict_disease_using_symptoms" style={boxStyle}>
        Predict Disease Using Symptoms
      </Link>
      <Link to="./Predict_diabetes" style={boxStyle}>
        Predict Diabetes (For women)
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
