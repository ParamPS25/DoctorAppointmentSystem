from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd

from src.diabetes.predict_pipeline import PredictPipeline, CustomData

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

@app.route('/predict-diabetes',methods=['POST'])
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
            
        custom_data = CustomData(**data)
        input_df = custom_data.get_data_as_data_frame()
        pipe = PredictPipeline()
        preds = pipe.predict(input_df)

        return jsonify({"prediction": preds.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
    app.run(debug=True)