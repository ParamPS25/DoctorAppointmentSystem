import React, { useEffect, useState, useRef } from "react";
import LoadingSpinner from "../../reusables/LoadinSpinner";

const Predict_stroke = () => {
  const [formData, setFormData] = useState({
    gender: "",
    age: "",
    hypertension: "",
    heart_disease: "",
    ever_married: "",
    work_type: "",
    Residence_type: "",
    avg_glucose_level: "",
    bmi: "",
    smoking_status: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const resultRef = useRef(null); // Create a ref for the result div

  useEffect(() => {
    if(prediction !== null) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [prediction]);   // Scroll to the result div when prediction is available

  // Field options for select inputs
  const fieldOptions = {
    gender: ["Male", "Female"],
    hypertension: ["Yes", "No"],
    heart_disease: ["Yes", "No"],
    ever_married: ["Yes", "No"],
    work_type: ["Private", "Self-employed", "Government", "children", "Never worked"],
    Residence_type: ["Urban", "Rural"],
    smoking_status: ["formerly smoked", "never smoked", "smokes", "Unknown"],
  };

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required.";
    } else {
      switch (name) {
        case "age":
          if (isNaN(value) || parseFloat(value) <= 0 || parseFloat(value) > 120) {
            error = "Please enter a valid age between 1 and 120.";
          }
          break;
        case "bmi":
          if (isNaN(value) || parseFloat(value) < 10 || parseFloat(value) > 50) {
            error = "Please enter a valid BMI between 10 and 50.";
          }
          break;
        case "avg_glucose_level":
          if (isNaN(value) || parseFloat(value) < 50 || parseFloat(value) > 400) {
            error = "Please enter a valid glucose level between 50 and 400.";
          }
          break;
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const prepareFormData = (data) => {
    const prepared = { ...data };
    
    // Convert Yes/No to 1/0 for hypertension and heart_disease
    if (prepared.hypertension === "Yes") prepared.hypertension = "1";
    if (prepared.hypertension === "No") prepared.hypertension = "0";
    
    if (prepared.heart_disease === "Yes") prepared.heart_disease = "1";
    if (prepared.heart_disease === "No") prepared.heart_disease = "0";

    // Convert string numbers to actual numbers
    prepared.age = parseFloat(prepared.age);
    prepared.bmi = parseFloat(prepared.bmi);
    prepared.avg_glucose_level = parseFloat(prepared.avg_glucose_level);

    return prepared;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setPrediction(null);

    try {
      // Prepare the data before sending
      const preparedData = prepareFormData(formData);

      const ML_ENV = import.meta.env.VITE_ML_DOC_API;
      const response = await fetch( ML_ENV+'/predict-stroke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    form: {
      width: "700px",
      maxWidth: "600px",
      margin: "20px auto",
      padding: "40px",
      borderRadius: "10px",
      background: "linear-gradient(135deg,rgb(161, 183, 228),rgb(107, 219, 219),rgb(67, 234, 234),rgb(16, 107, 225))",
       // background: "linear-gradient(135deg, #f3f4f6, #d1e0e0)",
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
      backgroundColor: "#fff",
    },
    error: {
      color: "#e74c3c",
      fontSize: "14px",
      marginTop: "-8px",
      marginBottom: "10px",
    },
    button: {
      width: "100%",
      padding: "12px 20px",
      backgroundColor: loading ? "#93c5c1" : "blue",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: loading ? "not-allowed" : "pointer",
      marginTop: "20px",
      fontSize: "16px",
    },
    prediction: {
      marginTop: "20px",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#fff",
      textAlign: "center",
      fontWeight: "bold",
    },
  };

  const resultCardStyle = {
    backgroundColor: prediction === 1 ? "#ffe6e6" : "#e6ffe6",
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
      <form onSubmit={handleSubmit} style={styles.form}>
      <div style={{ textAlign: "center", color: "#333", fontSize: "26px", marginBottom: "20px" }}>
        <h2>Stroke Prediction</h2>
      </div>
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label style={styles.label}>{key.replace(/_/g, " ").toUpperCase()}:</label>
            {fieldOptions[key] ? (
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={styles.inputSelect}
                disabled={loading}
              >
                <option value="">Select {key.replace(/_/g, " ")}</option>
                {fieldOptions[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                style={styles.inputSelect}
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
                disabled={loading}
              />
            )}
            {errors[key] && <div style={styles.error}>{errors[key]}</div>}
          </div>
        ))}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? (
              <>
                <LoadingSpinner />
                <span>Analyzing Data...</span>
              </>
            ) : (
              "Predict"
            )}
        </button>
      </form>
      {/* {prediction !== null && (
        <div style={styles.prediction}>
          Prediction Result: {prediction === "Stroke" ? "Positive" : "Negative"}
        </div>

      )} */}

        {prediction !== null && (
        <div ref={resultRef} style={resultCardStyle}>              
          <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
            Prediction Result: {prediction === 1 ? "Positive" : "Negative"}
          </h3>
          <p style={{ fontSize: "14px", color: "#666" }}>
            {prediction === 1 
              ? "The system predicts a higher risk of stroke. Please consult with a healthcare professional."
              : "The system predicts a lower risk of stroke. However, always maintain a healthy lifestyle."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Predict_stroke;