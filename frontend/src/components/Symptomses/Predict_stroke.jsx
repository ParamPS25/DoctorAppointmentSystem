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
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  // Field options for select inputs
  const fieldOptions = {
    gender: ["Male", "Female"],
    hypertension: ["Yes", "No"],
    heart_disease: ["Yes", "No"],
    ever_married: ["Yes", "No"],
    work_type: ["Private", "Self-employed", "Government", "Children", "Never worked"],
    residence_type: ["Urban", "Rural"],
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
    try {
      const response = await fetch('http://localhost:5000/predict-stroke', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
      backgroundColor: loading ? "#93c5c1" : "#72B7B2",
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

  return (
    <div>
      <div style={{ textAlign: "center", color: "#333", fontSize: "26px", marginBottom: "20px" }}>
        <h2>Stroke Prediction</h2>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/*Object.keys(formData), it returns an array of all the property names (keys) 
          Then, the .map() function iterates over each key to create form fields
          <div key={key}>  -> unique "key" prop for list items*/}
        {Object.keys(formData).map((key) => (               
            <div key={key}>                      
            <label style={styles.label}>{key.replace(/_/g, " ").toUpperCase()}:</label>
              {/* checks if there are predefined options for the field (like gender: ["Male", "Female"]) and 
                renders either a select dropdown or a text input accordingly. 
                If key is "gender", then fieldOptions[key] returns ["Male", "Female"] → render <select>
                If key is "age", then fieldOptions[key] is undefined → render <input>
                key.replace(/_/g, " ") -> This replaces all underscores (_) in a string with spaces ,If key is "work_type" => becomes "work type"*/}
            {fieldOptions[key] ? (
              <select
                name={key}                  // field name
                value={formData[key]}       // current value from state
                onChange={handleChange}     // handle value changes
                style={styles.inputSelect}
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
              />
            )}
            {errors[key] && <div style={styles.error}>{errors[key]}</div>}
          </div>
        ))}
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
      {prediction !== null && (
        <div style={styles.prediction}>
          Prediction Result: {prediction === "Stroke" ? "Positive" : "Negative"}
        </div>
      )}
    </div>
  );
};

export default Predict_stroke;