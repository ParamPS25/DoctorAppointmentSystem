import os
import sys
import numpy as np
import pandas as pd
from src.exception import CustomException
from src.logger import logging
from src.utils import load_object

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

class PredictPipeline:
    def __init__(self):
        pass

    def predict(self, features):
        try:
            # Paths to model and preprocessor artifacts
            model_path = os.path.join("artifacts", "stroke_model.pkl")
            preprocessor_path = os.path.join("artifacts", "stroke_preprocessor.pkl")

            # Load model and preprocessor
            model = load_object(model_path)
            preprocessor = load_object(preprocessor_path)

            # Preprocess the input data
            data_scaled = preprocessor.transform(features)

            # Predict using the model
            preds = model.predict(data_scaled)
            return preds

        except Exception as e:
            raise CustomException(e, sys)

class CustomData:
    def __init__(
        self,
        gender: str,
        age: int,
        hypertension: int,
        heart_disease: int,
        ever_married: str,
        work_type: str,
        Residence_type: str,
        avg_glucose_level: float,
        bmi: float,
        smoking_status: str
    ):
        self.gender = gender
        self.age = age
        self.hypertension = hypertension
        self.heart_disease = heart_disease
        self.ever_married = ever_married
        self.work_type = work_type
        self.Residence_type = Residence_type
        self.avg_glucose_level = avg_glucose_level
        self.bmi = bmi
        self.smoking_status = smoking_status

    def get_data_as_data_frame(self):
        try:
            custom_data_input_dict = {
                "gender": [self.gender],
                "age": [self.age],
                "hypertension": [self.hypertension],
                "heart_disease": [self.heart_disease],
                "ever_married": [self.ever_married],
                "work_type": [self.work_type],
                "Residence_type": [self.Residence_type],
                "avg_glucose_level": [self.avg_glucose_level],
                "bmi": [self.bmi],
                "smoking_status": [self.smoking_status],
            }

            return pd.DataFrame(custom_data_input_dict)

        except Exception as e:
            raise CustomException(e, sys)
