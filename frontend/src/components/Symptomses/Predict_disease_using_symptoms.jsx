import React from "react";
import { Link } from "react-router-dom";

const Predict_disease_using_symptoms = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Page 2</h1>
      <p>Welcome to Page 2!</p>
      <Link to="/" style={{ color: "#007BFF", textDecoration: "none", fontSize: "18px" }}>
        Go Back
      </Link>
    </div>
  );
  
};

export default Predict_disease_using_symptoms;
