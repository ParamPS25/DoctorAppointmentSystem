import React, { useState, useMemo ,axios} from 'react';

import { diseases } from './diseases';

export default function DiseaseSelector() {
  const [query, setQuery] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [prediction, setPrediction] = useState(null);
  
  const filteredDiseases = useMemo(() => {
    return diseases.filter(disease => disease.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const handleSelect = (disease) => {
    setError("");
    if (selectedDiseases.includes(disease)) {
      setSelectedDiseases(selectedDiseases.filter(d => d !== disease));
    } else if (selectedDiseases.length < 5) {
      setSelectedDiseases([...selectedDiseases, disease]);
    } else {
      setError("Maximum 5 diseases can be selected");
    }
  };

  const handleSubmit = async () => {
    if (selectedDiseases.length < 3) {
        setError("Please select at least 3 diseases");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/predict-disease-using-symptoms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ symptoms: selectedDiseases }),
        });

        const result = await response.json();
        if (response.ok) {
            setSuccess(true);
            console.log("Prediction result:", result.prediction);
            alert(`Predicted disease: ${result.prediction}`);
            setTimeout(() => setSuccess(false), 3000);
        } else {
            setError(result.error || "Failed to predict disease.");
        }
    } catch (error) {
        setError("Error connecting to the server.");
        console.error("Error:", error);
    }
  };


  return (
    <div className="disease-selector">
      <div className="card">
        <div className="card-header">
          <h2>Select your Symptoms(3-5) </h2>
        </div>
        <div className="card-content">
        <div className="search-container">
            <i className="ri-search-line search-icon"></i>
            <input 
              type="text"
              placeholder="Search diseases..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">Diseases submitted successfully!</div>}

          <div className="selected-diseases">
            {selectedDiseases.map(disease => (
              <span key={disease} className="disease-badge" onClick={() => handleSelect(disease)}>
                {disease} <span className="remove-badge">×</span>
              </span>
            ))}
          </div>

          <div className="disease-list">
            {filteredDiseases.map(disease => (
              <div key={disease} onClick={() => handleSelect(disease)}
                   className={`disease-item ${selectedDiseases.includes(disease) ? 'selected' : ''}`}>
                {disease}
              </div>
            ))}
            {filteredDiseases.length === 0 && <div className="no-results">No diseases found matching "{query}"</div>}
          </div>

          <button onClick={handleSubmit} disabled={selectedDiseases.length < 3} className="submit-button">
            Submit Selection ({selectedDiseases.length}/5)
          </button>
          {prediction && <div className="prediction-result">Predicted Condition: {prediction}</div>}
        </div>
      </div>
      <style jsx>{`
        .disease-selector { padding: 1rem; max-width: 600px; margin: auto; }
        .card { background: "linear-gradient(135deg,rgb(161, 183, 228),rgb(107, 219, 219),rgb(67, 234, 234),rgb(16, 107, 225))",
                border-radius:30px ; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden; width: 100%;margin-left: 10px; }
        .card-header { padding: 1.5rem; border-bottom: 1px solid #ddd; background: #f8f9fa;}
        .card-header h2 { display: flex; justify-content: space-between; align-items: center; }
        .search-container {position: relative;display: flex;align-items: center;}
        .search-icon {position: absolute;right: 10px;color: gray;font-size: 1.2rem;}
        .card-content { padding: 1.5rem; }
        .search-input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 5px; font-size: 1rem;color: black; }
        .selected-diseases { display: flex; flex-wrap: wrap; gap: 0.5rem; min-height: 3rem; margin-bottom: 1rem; }
        .disease-badge { background: #d1ecf1; padding: 0.5rem; border-radius: 15px; font-size: 0.9rem; cursor: pointer; }
        .disease-list { height: 300px; overflow-y: auto; border: 1.5px solid black; padding: 0.5rem; }
        .disease-item { color : black; padding: 0.5rem; cursor: pointer; border-radius: 5px; }
        .disease-item:hover { background: #f1f1f1; }
        .selected { background: #007bff; color: white; }
        .submit-button { width: 100%; padding: 0.75rem; background: #007bff; color: white; border: none; border-radius: 5px; font-size: 1rem; cursor: pointer; }
        .submit-button:disabled { background: #ccc; cursor: not-allowed; }
        .alert { padding: 0.75rem; border-radius: 5px; margin-bottom: 1rem; }
        .alert.error { background: #f8d7da; color: #721c24; }
        .alert.success { background: #d4edda; color: #155724; }
        .prediction-result { margin-top: 1rem; padding: 1rem; background: #e2f0d9; border-radius: 5px; }
      `}</style>
    </div>
  );
}
