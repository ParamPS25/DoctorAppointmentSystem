import React, { useState, useMemo ,useRef,useEffect,axios} from 'react';

import { diseases } from './diseases';
import LoadingSpinner from '../../reusables/LoadinSpinner';

export default function DiseaseSelector() {
  const [query, setQuery] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const resultRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (prediction) {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [prediction]);
  
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

    setIsLoading(true);
    setError("");
    setPrediction(null);

    try {
      const ML_ENV = import.meta.env.VITE_ML_DOC_API;
      const response = await fetch(ML_ENV+'/predict-disease-using-symptoms', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptoms: selectedDiseases }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setPrediction(result.prediction);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || "Failed to predict disease.");
      }
    } catch (error) {
      setError("Error connecting to the server.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="disease-selector">
      <div ref={formRef} className="card">
        <div className="card-header">
          <strong><h2>Select your Symptoms(3-5) </h2></strong>
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
              disabled={isLoading}
            />
          </div>
          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">Diseases submitted successfully!</div>}

          <div className="selected-diseases">
            {selectedDiseases.map(disease => (
              <span key={disease} className="disease-badge" onClick={() => !isLoading && handleSelect(disease)}>
                {disease} <span className="remove-badge">×</span>
              </span>
            ))}
          </div>

          <div className="disease-list">
            {filteredDiseases.map(disease => (
              <div 
                key={disease} 
                onClick={() => !isLoading && handleSelect(disease)}
                className={`disease-item ${selectedDiseases.includes(disease) ? 'selected' : ''} ${isLoading ? 'disabled' : ''}`}
              >
                {disease}
              </div>
            ))}
            {filteredDiseases.length === 0 && <div className="no-results">No diseases found matching "{query}"</div>}
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={selectedDiseases.length < 3 || isLoading} 
            className="submit-button"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner />
                <span>Analyzing Symptoms...</span>
              </div>
            ) : (
              `Submit Selection (${selectedDiseases.length}/5)`
            )}
          </button>
          
          {prediction && (
            <div ref={resultRef} className="prediction-result">
              <strong>Predicted Condition: {prediction}</strong>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        .disease-selector { padding: 1rem; max-width: 600px; margin: auto; }
        .card { 
          background: linear-gradient(135deg,rgb(161, 183, 228),rgb(107, 219, 219),rgb(67, 234, 234),rgb(16, 107, 225));
          border-radius: 30px; 
          box-shadow: 0 4px 8px rgba(0,0,0,0.1); 
          overflow: hidden; 
          width: 100%;
          margin-left: 10px;
        }
        .card-header { padding: 0.5rem; border-bottom: 1px solid #ddd; background: transparent; margin-left: 115px; }
        .card-header h2 { display: flex; justify-content: space-between; align-items: center; }
        .search-container { position: relative; display: flex; align-items: center; padding-bottom: 20px; }
        .search-icon { position: absolute; right: 10px; color: gray; font-size: 1.2rem; }
        .card-content { padding: 1.5rem; }
        .search-input { 
          width: 100%; 
          padding: 0.75rem; 
          border: 1px solid #ccc; 
          border-radius: 5px; 
          font-size: 1rem;
          color: black;
          opacity: ${isLoading ? '0.7' : '1'};
        }
        .selected-diseases { display: flex; flex-wrap: wrap; gap: 0.5rem; min-height: 3rem; margin-bottom: 1rem; }
        .disease-badge { 
          background: rgb(122, 180, 241);
          color: black; 
          padding: 0.5rem; 
          border-radius: 15px; 
          font-size: 15px; 
          cursor: ${isLoading ? 'not-allowed' : 'pointer'}; 
          opacity: ${isLoading ? '0.7' : '1'};
        }
        .disease-list { 
          height: 300px; 
          overflow-y: auto; 
          border: 1.5px solid black; 
          padding: 0.5rem;
          opacity: ${isLoading ? '0.7' : '1'};
        }
        .disease-item { 
          color: black; 
          padding: 0.5rem; 
          cursor: ${isLoading ? 'not-allowed' : 'pointer'}; 
          border-radius: 5px;
        }
        .disease-item:hover { background: ${isLoading ? 'none' : '#f1f1f1'}; }
        .disease-item.disabled { pointer-events: none; }
        .selected { background: #007bff; color: white; }
        .submit-button { 
          width: 100%; 
          padding: 0.75rem; 
          background: blue; 
          color: white; 
          border: none; 
          border-radius: 5px; 
          font-size: 1rem; 
          cursor: ${isLoading ? 'not-allowed' : 'pointer'};
          opacity: ${isLoading ? '0.7' : '1'};
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
        }
        .submit-button:disabled { background: #ccc; }
        .alert { padding: 0.75rem; border-radius: 5px; margin-bottom: 1rem; }
        .alert.error { background: #f8d7da; color: #721c24; }
        .alert.success { background: #d4edda; color: #155724; }
        .prediction-result { margin-top: 1rem; padding: 1rem; background: rgb(90, 146, 237); border-radius: 5px; }
      `}</style>
    </div>
  );
}

