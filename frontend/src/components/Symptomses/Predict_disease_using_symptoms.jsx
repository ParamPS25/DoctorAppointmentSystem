import React, { useState, useMemo ,axios} from 'react';

// Sample diseases array - replace with your 400 diseases
const diseases = [
    "anxiety and nervousness",
    "depression",
    "shortness of breath",
    "depressive or psychotic symptoms",
    "sharp chest pain",
    "dizziness",
    "insomnia",
    "abnormal involuntary movements",
    "chest tightness",
    "palpitations",
    "irregular heartbeat",
    "breathing fast",
    "hoarse voice",
    "sore throat",
    "difficulty speaking",
    "cough",
    "nasal congestion",
    "throat swelling",
    "diminished hearing",
    "lump in throat",
    "throat feels tight",
    "difficulty in swallowing",
    "skin swelling",
    "retention of urine",
    "groin mass",
    "leg pain",
    "hip pain",
    "suprapubic pain",
    "blood in stool",
    "lack of growth",
    "emotional symptoms",
    "elbow weakness",
    "back weakness",
    "pus in sputum",
    "symptoms of the scrotum and testes",
    "swelling of scrotum",
    "pain in testicles",
    "flatulence",
    "pus draining from ear",
    "jaundice",
    "mass in scrotum",
    "white discharge from eye",
    "irritable infant",
    "abusing alcohol",
    "fainting",
    "hostile behavior",
    "drug abuse",
    "sharp abdominal pain",
    "feeling ill",
    "vomiting",
    "headache",
    "nausea",
    "diarrhea",
    "vaginal itching",
    "vaginal dryness",
    "painful urination",
    "involuntary urination",
    "pain during intercourse",
    "frequent urination",
    "lower abdominal pain",
    "vaginal discharge",
    "blood in urine",
    "hot flashes",
    "intermenstrual bleeding",
    "hand or finger pain",
    "wrist pain",
    "hand or finger swelling",
    "arm pain",
    "wrist swelling",
    "arm stiffness or tightness",
    "arm swelling",
    "hand or finger stiffness or tightness",
    "wrist stiffness or tightness",
    "lip swelling",
    "toothache",
    "abnormal appearing skin",
    "skin lesion",
    "acne or pimples",
    "dry lips",
    "facial pain",
    "mouth ulcer",
    "skin growth",
    "eye deviation",
    "diminished vision",
    "double vision",
    "cross-eyed",
    "symptoms of eye",
    "pain in eye",
    "eye moves abnormally",
    "abnormal movement of eyelid",
    "foreign body sensation in eye",
    "irregular appearing scalp",
    "swollen lymph nodes",
    "back pain",
    "neck pain",
    "low back pain",
    "pain of the anus",
    "pain during pregnancy",
    "pelvic pain",
    "impotence",
    "infant spitting up",
    "vomiting blood",
    "regurgitation",
    "burning abdominal pain",
    "restlessness",
    "symptoms of infants",
    "wheezing",
    "peripheral edema",
    "neck mass",
    "ear pain",
    "jaw swelling",
    "mouth dryness",
    "neck swelling",
    "knee pain",
    "foot or toe pain",
    "bowlegged or knock-kneed",
    "ankle pain",
    "bones are painful",
    "knee weakness",
    "elbow pain",
    "knee swelling",
    "skin moles",
    "knee lump or mass",
    "weight gain",
    "problems with movement",
    "knee stiffness or tightness",
    "leg swelling",
    "foot or toe swelling",
    "heartburn",
    "smoking problems",
    "muscle pain",
    "infant feeding problem",
    "recent weight loss",
    "problems with shape or size of breast",
    "underweight",
    "difficulty eating",
    "scanty menstrual flow",
    "vaginal pain",
    "vaginal redness",
    "vulvar irritation",
    "weakness",
    "decreased heart rate",
    "increased heart rate",
    "bleeding or discharge from nipple",
    "ringing in ear",
    "plugged feeling in ear",
    "itchy ear(s)",
    "frontal headache",
    "fluid in ear",
    "neck stiffness or tightness",
    "spots or clouds in vision",
    "eye redness",
    "lacrimation",
    "itchiness of eye",
    "blindness",
    "eye burns or stings",
    "itchy eyelid",
    "feeling cold",
    "decreased appetite",
    "excessive appetite",
    "excessive anger",
    "loss of sensation",
    "focal weakness",
    "slurring words",
    "symptoms of the face",
    "disturbance of memory",
    "paresthesia",
    "side pain",
    "fever",
    "shoulder pain",
    "shoulder stiffness or tightness",
    "shoulder weakness",
    "arm cramps or spasms",
    "shoulder swelling",
    "tongue lesions",
    "leg cramps or spasms",
    "abnormal appearing tongue",
    "ache all over",
    "lower body pain",
    "problems during pregnancy",
    "spotting or bleeding during pregnancy",
    "cramps and spasms",
    "upper abdominal pain",
    "stomach bloating",
    "changes in stool appearance",
    "unusual color or odor to urine",
    "kidney mass",
    "swollen abdomen",
    "symptoms of prostate",
    "leg stiffness or tightness",
    "difficulty breathing",
    "rib pain",
    "joint pain",
    "muscle stiffness or tightness",
    "pallor",
    "hand or finger lump or mass",
    "chills",
    "groin pain",
    "fatigue",
    "abdominal distention",
    "regurgitation.1",
    "symptoms of the kidneys",
    "melena",
    "flushing",
    "coughing up sputum",
    "seizures",
    "delusions or hallucinations",
    "shoulder cramps or spasms",
    "joint stiffness or tightness",
    "pain or soreness of breast",
    "excessive urination at night",
    "bleeding from eye",
    "rectal bleeding",
    "constipation",
    "temper problems",
    "coryza",
    "wrist weakness",
    "eye strain",
    "hemoptysis",
    "lymphedema",
    "skin on leg or foot looks infected",
    "allergic reaction",
    "congestion in chest",
    "muscle swelling",
    "pus in urine",
    "abnormal size or shape of ear",
    "low back weakness",
    "sleepiness",
    "apnea",
    "abnormal breathing sounds",
    "excessive growth",
    "elbow cramps or spasms",
    "feeling hot and cold",
    "blood clots during menstrual periods",
    "absence of menstruation",
    "pulling at ears",
    "gum pain",
    "redness in ear",
    "fluid retention",
    "flu-like syndrome",
    "sinus congestion",
    "painful sinuses",
    "fears and phobias",
    "recent pregnancy",
    "uterine contractions",
    "burning chest pain",
    "back cramps or spasms",
    "stiffness all over",
    "muscle cramps, contractures, or spasms",
    "low back cramps or spasms",
    "back mass or lump",
    "nosebleed",
    "long menstrual periods",
    "heavy menstrual flow",
    "unpredictable menstruation",
    "painful menstruation",
    "infertility",
    "frequent menstruation",
    "sweating",
    "mass on eyelid",
    "swollen eye",
    "eyelid swelling",
    "eyelid lesion or rash",
    "unwanted hair",
    "symptoms of bladder",
    "irregular appearing nails",
    "itching of skin",
    "hurts to breath",
    "nailbiting",
    "skin dryness, peeling, scaliness, or roughness",
    "skin on arm or hand looks infected",
    "skin irritation",
    "itchy scalp",
    "hip swelling",
    "incontinence of stool",
    "foot or toe cramps or spasms",
    "warts",
    "bumps on penis",
    "too little hair",
    "foot or toe lump or mass",
    "skin rash",
    "mass or swelling around the anus",
    "low back swelling",
    "ankle swelling",
    "hip lump or mass",
    "drainage in throat",
    "dry or flaky scalp",
    "premenstrual tension or irritability",
    "feeling hot",
    "feet turned in",
    "foot or toe stiffness or tightness",
    "pelvic pressure",
    "elbow swelling",
    "elbow stiffness or tightness",
    "early or late onset of menopause",
    "mass on ear",
    "bleeding from ear",
    "hand or finger weakness",
    "low self-esteem",
    "throat irritation",
    "itching of the anus",
    "swollen or red tonsils",
    "irregular belly button",
    "swollen tongue",
    "lip sore",
    "vulvar sore",
    "hip stiffness or tightness",
    "mouth pain",
    "arm weakness",
    "leg lump or mass",
    "disturbance of smell or taste",
    "discharge in stools",
    "penis pain",
    "loss of sex drive",
    "obsessions and compulsions",
    "antisocial behavior",
    "neck cramps or spasms",
    "pupils unequal",
    "poor circulation",
    "thirst",
    "sleepwalking",
    "skin oiliness",
    "sneezing",
    "bladder mass",
    "knee cramps or spasms",
    "premature ejaculation",
    "leg weakness",
    "posture problems",
    "bleeding in mouth",
    "tongue bleeding",
    "change in skin mole size or color",
    "penis redness",
    "penile discharge",
    "shoulder lump or mass",
    "polyuria",
    "cloudy eye",
    "hysterical behavior",
    "arm lump or mass",
    "nightmares",
    "bleeding gums",
    "pain in gums",
    "bedwetting",
    "diaper rash",
    "lump or mass of breast",
    "vaginal bleeding after menopause",
    "infrequent menstruation",
    "mass on vulva",
    "jaw pain",
    "itching of scrotum",
    "postpartum problems of the breast",
    "eyelid retracted",
    "hesitancy",
    "elbow lump or mass",
    "muscle weakness",
    "throat redness",
    "joint swelling",
    "tongue pain",
    "redness in or around nose",
    "wrinkles on skin",
    "foot or toe weakness",
    "hand or finger cramps or spasms",
    "back stiffness or tightness",
    "wrist lump or mass",
    "skin pain",
    "low back stiffness or tightness",
    "low urine output",
    "skin on head or neck looks infected",
    "stuttering or stammering",
    "problems with orgasm",
    "nose deformity",
    "lump over jaw",
    "sore in nose",
    "hip weakness",
    "back swelling",
    "ankle stiffness or tightness",
    "ankle weakness",
    "neck weakness"
].sort();

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
          <input
            type="text"
            placeholder="Search diseases..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
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
