import os
import sys
import numpy as np
import pandas as pd
import json
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from src.exception import CustomException
from src.logger import logging
from src.utils import load_object
import warnings

# Suppress all warnings
warnings.filterwarnings("ignore")

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

# PredictPipeline Class
class PredictPipeline:
    def __init__(self):
        pass

    def predict(self, symptoms_list):
        try:
            # Validate symptoms count
            if len(symptoms_list) < 3 or len(symptoms_list) > 5:
                raise ValueError("Please provide between 3 and 5 symptoms.")

            # Paths to artifacts
            model_path = os.path.join("artifacts", "Diseases_and_Symptoms_model.pkl")
            preprocessor_path = os.path.join("artifacts", "diseases_and_symptoms_preprocessor.pkl")
            symptoms_path = os.path.join("artifacts", "symptoms.csv")

            # Load model and label encoder
            model = load_object(model_path)
            preprocessor = load_object(preprocessor_path)
            # it have label encoder for diseases

            # Load symptoms mapping
            symptoms_df = pd.read_csv(symptoms_path)
            symptoms = symptoms_df["symptom"].tolist()

            # Create a binary feature vector for symptoms
            feature_vector = np.zeros(len(symptoms))
            for symptom in symptoms_list:
                if symptom in symptoms:
                    feature_vector[symptoms.index(symptom)] = 1

            # Predict disease
            predicted_label = model.predict([feature_vector])[0]
            predicted_disease = preprocessor.inverse_transform([predicted_label])[0]

            return predicted_disease

        except ValueError as ve:
            logging.error(f"Validation Error: {ve}")
            return str(ve)
        except Exception as e:
            logging.error(f"Error in PredictPipeline: {e}")
            raise CustomException(e, sys)

# CustomData Class for Dynamic Input
class CustomData:
    def __init__(self, symptoms):
        self.symptoms = symptoms

    def get_data_as_array(self, all_symptoms):
        try:
            feature_vector = np.zeros(len(all_symptoms))
            for symptom in self.symptoms:
                if symptom in all_symptoms:
                    feature_vector[all_symptoms.index(symptom)] = 1
            return feature_vector
        except Exception as e:
            logging.error(f"Error in CustomData: {e}")
            raise CustomException(e, sys)

# Example Usage
# if __name__ == "__main__":
#     # Example Symptoms Input
#     user_symptoms = ["anxiety and nervousness", "depression", "shortness of breath"]

#     # Initialize Prediction Pipeline
#     pipeline = PredictPipeline()
#     try:
#         # Predict Disease
#         predicted_disease = pipeline.predict(user_symptoms)
#         print(f"Predicted Disease: {predicted_disease}")
#     except Exception as e:
#         print(f"Error: {e}")
