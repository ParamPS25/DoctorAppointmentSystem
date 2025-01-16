
import React, { useState } from "react";

const Predict_diabetes = () => {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false); // Added state to track form submission
  const [showCard, setShowCard] = useState(false); // Control visibility of the card

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else if (["pregnancies", "glucose", "bloodPressure", "skinThickness", "insulin", "age"].includes(name)) {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue) || intValue <= 0 || value.includes(".")) {
        error = "Please enter a positive integer";
      }
    } else if (["bmi", "diabetesPedigreeFunction"].includes(name)) {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue) || floatValue <= 0) {
        error = "Please enter a positive number";
      }
    }
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setFormSubmitted(false); // Reset formSubmitted state to false if there are errors
    } else {
      setFormSubmitted(true);
      console.log("Form submitted successfully!", formData);
      alert("Form submitted successfully!");

      // Show success card on successful form submission
      setShowCard(true);

      setFormData({
        pregnancies: "",
        glucose: "",
        bloodPressure: "",
        skinThickness: "",
        insulin: "",
        bmi: "",
        diabetesPedigreeFunction: "",
        age: "",
      });
      setErrors({});
    }
  };

  const formStyle = {
    width: "700px",
    maxWidth: "600px",
    margin: "20px 270px",
    padding: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #f3f4f6, #d1e0e0)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "2px solid #B3C6D8",
    fontSize: "16px",
    backgroundColor: "#fff",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    fontSize: "16px",
    color: "#4A4A4A",
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "12px",
    marginTop: "-8px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    backgroundColor: "#72B7B2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "20px",
  };

  const cardStyle = {
    backgroundColor: "yellow",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    color: "#333",
    fontSize: "16px",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#333", fontSize: "26px", marginBottom: "20px", marginLeft: "20px" }}>
        Doctor Appointment Symptoms Form
      </h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label style={labelStyle}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors[field] && <span style={errorStyle}>{errors[field]}</span>}
          </div>
        ))}
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>

      {showCard && (
        <div style={cardStyle}>
          <h3>Form Submitted Successfully!</h3>
          <p>You can add any result or message here from the backend.</p>
        </div>
      )}
    </div>
  );
};

export default Predict_diabetes;


