import React, { useState } from "react";

const Predict_stroke = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required.";
        } else if (["age", "bmi", "avg_glucose_level"].includes(name)) {
  const floatValue = parseFloat(value);
  if (isNaN(floatValue) || floatValue <= 0) {
    error = "Please enter a positive number.";
  } else {
    // Setting the formData to ensure the value is stored as a string representation of the float
    setFormData({ ...formData, [name]: floatValue.toString() });
  }
}

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
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
      setFormSubmitted(false);
    } else {
      setFormSubmitted(true);
      console.log("Form submitted successfully!", formData);
      alert("Form submitted successfully!");
      setFormData({
        gender: "",
        age: "",
        hypertension: "",
        heart_disease: "",
        ever_married: "",
        work_type: "",
        residence_type: "",
        avg_glucose_level: "",
        bmi: "",
        smoking_status: "",
      });
      setErrors({});
    }
  };

  const styles = {
    form: {
      width: "700px",
    maxWidth: "600px",
    margin: "20px 270px",
    padding: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #f3f4f6, #d1e0e0)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
},
    label: {
      marginTop: "10px",
      fontWeight: "600",
      fontSize: "16px",
      color: "#4f4f4f",
    },
    inputSelect: {
      display: "block",
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ddd",
      fontSize: "16px",
      backgroundColor: "#f1f1f1",
      transition: "border-color 0.3s ease, background-color 0.3s ease",
    },
    error: {
      color: "#e74c3c",
      fontSize: "14px",
      marginTop: "-8px",
    },
    button: {
      width:"100%",
      padding: "12px 20px",
      backgroundColor: "#72B7B2",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "20px",
      
      fontSize: "16px",
      transition: "background-color 0.3s ease",

    },
    buttonHover: {
      backgroundColor: "#4caf50",
    },
    successCard: {
      marginTop: "20px",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      textAlign: "center",
      color: "#28a745",
      fontSize: "18px",
    },
    planCard: {
      backgroundColor:"yellow",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      color: "#333",
      fontSize: "16px",
    },
    planHeader: {
      fontWeight: "bold",
      fontSize: "20px",
    },
    planContent: {
      fontSize: "16px",
      marginTop: "10px",
    },
  };

  return (
    <div>
       <div style={{ textAlign: "center", color: "#333", fontSize: "26px", marginBottom: "20px",marginLeft:"20px"}}><h2>stroke prediction</h2></div>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Gender */}

       
        <label style={styles.label}>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          style={styles.inputSelect}
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <div style={styles.error}>{errors.gender}</div>}

        {/* Age */}
        <label style={styles.label}>Age:</label>
        <input
          type="text"
          name="age"
          value={formData.age}
          onChange={handleChange}
          style={styles.inputSelect}
        />
        {errors.age && <div style={styles.error}>{errors.age}</div>}

        {/* Hypertension */}
        <label style={styles.label}>Hypertension:</label>
        <select
          name="hypertension"
          value={formData.hypertension}
          onChange={handleChange}
          style={styles.inputSelect}
        >
          <option value="">Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        {errors.hypertension && <div style={styles.error}>{errors.hypertension}</div>}

        {/* Heart Disease */}
        <label style={styles.label}>Heart Disease:</label>
        <select
          name="heart_disease"
          value={formData.heart_disease}
          onChange={handleChange}
          style={styles.inputSelect}
        >
          <option value="">Select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
        {errors.heart_disease && <div style={styles.error}>{errors.heart_disease}</div>}

        {/* Ever Married */}
        <label style={styles.label}>Ever Married:</label>
        <select
          name="ever_married"
          value={formData.ever_married}
          onChange={handleChange}
          style={styles.inputSelect}
        >
          <option value="">Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
        {errors.ever_married && <div style={styles.error}>{errors.ever_married}</div>}

        {/* Work Type */}
        <label style={styles.label}>Work Type:</label>
        <select
          name="work_type"
          value={formData.work_type}
          onChange={handleChange}
          style={styles.inputSelect}
        >
          <option value="">Select</option>
          <option value="children">Children</option>
          <option value="Govt_job">Govt Job</option>
          <option value="Never_worked">Never Worked</option>
          <option value="Private">Private</option>
          <option value="Self-employed">Self-employed</option>
        </select>
        {errors.work_type && <div style={styles.error}>{errors.work_type}</div>}

        {/* Residence Type */}
        <label style={styles.label}>Residence Type:</label>
        <select
          name="residence_type"
          value={formData.residence_type}
          onChange={handleChange}
          style={styles.inputSelect}
        >
          <option value="">Select</option>
          <option value="Rural">Rural</option>
          <option value="Urban">Urban</option>
        </select>
        {errors.residence_type && <div style={styles.error}>{errors.residence_type}</div>}

        {/* Avg Glucose Level */}
        <label style={styles.label}>Avg Glucose Level:</label>
        <input
          type="text"
          name="avg_glucose_level"
          value={formData.avg_glucose_level}
          onChange={handleChange}
          style={styles.inputSelect}
        />
        {errors.avg_glucose_level && <div style={styles.error}>{errors.avg_glucose_level}</div>}

        {/* BMI */}
        <label style={styles.label}>BMI:</label>
        <input
          type="text"
          name="bmi"
          value={formData.bmi}
          onChange={handleChange}
          style={styles.inputSelect}
        />
        {errors.bmi && <div style={styles.error}>{errors.bmi}</div>}

        {/* Smoking Status */}
        <label style={styles.label}>Smoking Status:</label>
        <select
          name="smoking_status"
          value={formData.smoking_status}
          onChange={handleChange}
          style={styles.inputSelect}
        >
          <option value="">Select</option>
          <option value="formerly smoked">Formerly Smoked</option>
          <option value="never smoked">Never Smoked</option>
          <option value="smokes">Smokes</option>
          <option value="Unknown">Unknown</option>
        </select>
        {errors.smoking_status && <div style={styles.error}>{errors.smoking_status}</div>}

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      {/* Success Message Card */}
      {formSubmitted && (
        <div style={styles.planCard}>
          <div style={styles.planHeader}>Congratulations!</div>
          <div style={styles.planContent}>
            Your form has been submitted successfully. We will analyze your data and provide insights.
          <h1>hello</h1>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Predict_stroke;



