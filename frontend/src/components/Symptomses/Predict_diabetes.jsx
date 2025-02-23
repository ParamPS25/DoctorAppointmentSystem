import React, { useState,useEffect,useRef } from "react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
import LoadingSpinner from "../../reusables/LoadinSpinner";

const PredictDiabetes = () => {
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [apiError, setApiError] = useState(null);

  const resultRef = useRef(null);
  const formRef = useRef(null); // Ref for the form

  useEffect(() => {
    if (prediction !== null || apiError) {                           // Scroll if prediction or error
      if (resultRef.current) {                                      // if result (prediction) is available, scroll to result 
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });    // Scroll to form if no result yet.
      }
    }
  }, [prediction, apiError]); 


  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = "This field is required";
    } else if (["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "Age"].includes(name)) {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue) || intValue < 0 || value.includes(".")) {
        error = "Please enter a non-negative integer";
      }
    } else if (["BMI", "DiabetesPedigreeFunction"].includes(name)) {
      const floatValue = parseFloat(value);
      if (isNaN(floatValue) || floatValue < 0) {
        error = "Please enter a non-negative number";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setPrediction(null);

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
  
    try {
      const ML_ENV = import.meta.env.VITE_ML_DOC_API;
      const response = await fetch(ML_ENV+'/predict-diabetes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.prediction[0]);

      setFormData({
        Pregnancies: "",
        Glucose: "",
        BloodPressure: "",
        SkinThickness: "",
        Insulin: "",
        BMI: "",
        DiabetesPedigreeFunction: "",
        Age: "",
      });
    } catch (error) {
      setApiError("Failed to get prediction. Please try again later.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Styles from your original code
  const formStyle = {
    width: "700px",
    maxWidth: "600px",
    margin: "20px 270px",
    padding: "40px",
    borderRadius: "10px",
    background: "linear-gradient(135deg,rgb(161, 183, 228),rgb(107, 219, 219),rgb(67, 234, 234),rgb(16, 107, 225))",
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
    backgroundColor: isLoading ? "#B3C6D8" : "blue",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: isLoading ? "not-allowed" : "pointer",
    fontSize: "16px",
    marginTop: "20px",
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
      <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center", color: "#333", fontSize: "26px", marginBottom: "20px", marginLeft: "20px" }}>
          Diabetes Prediction Form
        </h2>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <label style={labelStyle}>
              {field.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              style={{
                ...inputStyle,
                border: errors[field] ? "2px solid #e74c3c" : "2px solid #B3C6D8",
              }}
              disabled={isLoading}
            />
            {errors[field] && <span style={errorStyle}>{errors[field]}</span>}
          </div>
        ))}
        
        <button type="submit" style={buttonStyle} disabled={isLoading}>
          {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Analyzing Data...</span>
                </>
              ) : (
                "Predict"
              )}
        </button>
      </form>

      {apiError && (
        <div ref={resultRef} style={{ ...resultCardStyle, backgroundColor: "#ffe6e6" }}>
          <p>{apiError}</p>
        </div>
      )}

      {prediction !== null && (
        <div ref={resultRef} style={resultCardStyle}>
          <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
            Prediction Result: {prediction === 1 ? "Positive" : "Negative"}
          </h3>
          <p style={{ fontSize: "14px", color: "#666" }}>
            {prediction === 1 
              ? "The system predicts a higher risk of diabetes. Please consult with a healthcare professional."
              : "The system predicts a lower risk of diabetes. However, always maintain a healthy lifestyle."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default PredictDiabetes;