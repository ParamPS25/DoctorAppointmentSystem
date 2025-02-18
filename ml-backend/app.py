from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import os
from src.stroke.predict_pipeline import PredictPipeline as StrokePredictPipeline, CustomData as StrokeCustomData
from src.diabetes.predict_pipeline import PredictPipeline as DiabetesPredictPipeline, CustomData as DiabetesCustomData
from src.diseases_and_symptoms.predict_pipeline import PredictPipeline as DiseasePredictPipeline

app = Flask(__name__)
CORS(app)

# Route for predicting stroke
@app.route('/predict-stroke', methods=['POST'])
def predict_stroke():
    try:
        data = request.get_json()

        # Validate input data
        required_fields = [
            "gender", "age", "hypertension", "heart_disease", 
            "ever_married", "work_type", "Residence_type", 
            "avg_glucose_level", "bmi", "smoking_status"
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
        
        custom_data = StrokeCustomData(**data)
        input_df = custom_data.get_data_as_data_frame()
        pipe = StrokePredictPipeline()
        preds = pipe.predict(input_df)

        return jsonify({"prediction": "Stroke" if preds[0] == 1 else "No Stroke"})
    except Exception as e:
        app.logger.error(f"Error in /predict-stroke: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500

    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500

# Route for predicting diabetes
@app.route('/predict-diabetes', methods=['POST'])
def predict_diabetes():
    try:
        data = request.get_json()

        # Validate input data
        required_fields = [
            "Pregnancies", "Glucose", "BloodPressure", "SkinThickness",
            "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing field: {field}"}), 400
            
        custom_data = DiabetesCustomData(**data)
        input_df = custom_data.get_data_as_data_frame()
        pipe = DiabetesPredictPipeline()
        preds = pipe.predict(input_df)

        return jsonify({"prediction": preds.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Route for predicting diseases based on symptoms
@app.route('/predict-disease-using-symptoms', methods=['POST'])
def predict_disease():
    try:
        data = request.get_json()

        # Validate input data
        if 'symptoms' not in data:
            return jsonify({"error": "Missing field: symptoms"}), 400
        
        symptoms_list = data['symptoms']

        # Validate the number of symptoms
        if not isinstance(symptoms_list, list) or len(symptoms_list) < 3 or len(symptoms_list) > 5:
            return jsonify({"error": "Provide between 3 and 5 symptoms."}), 400

        pipe = DiseasePredictPipeline()
        predicted_disease = pipe.predict(symptoms_list)

        return jsonify({"prediction": predicted_disease})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Render provides a port
    app.run(host="0.0.0.0", port=port)