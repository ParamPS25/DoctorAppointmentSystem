import os
import sys
from dataclasses import dataclass
from src.exception import CustomException
from src.logger import logging
from src.utils import save_object

import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import LabelEncoder

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

@dataclass
class DataTransformationConfig:
    preprocessor_obj_file_path = os.path.join("artifacts", "diseases_and_symptoms_preprocessor.pkl")

class DataTransformation:
    def __init__(self):
        self.data_transformation_config = DataTransformationConfig()

    def initiate_data_transformation(self, train_path, test_path):
        try:
            # Load the datasets
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)
            logging.info("Data loaded successfully")

            # Target column
            target_column_name = "diseases"

            # Split into input and target features
            input_feature_train_df = train_df.drop(columns=[target_column_name])
            target_feature_train_df = train_df[target_column_name]

            input_feature_test_df = test_df.drop(columns=[target_column_name])
            target_feature_test_df = test_df[target_column_name]

            # Encode target column using LabelEncoder
            label_encoder = LabelEncoder()
            target_feature_train_arr = label_encoder.fit_transform(target_feature_train_df)
            target_feature_test_arr = label_encoder.transform(target_feature_test_df)

            logging.info("Target column encoded successfully")

            # Combine input features and target labels
            train_arr = np.c_[input_feature_train_df.to_numpy(), target_feature_train_arr]
            test_arr = np.c_[input_feature_test_df.to_numpy(), target_feature_test_arr]

            # Save LabelEncoder object
            save_object(
                file_path=self.data_transformation_config.preprocessor_obj_file_path,
                obj=label_encoder
            )

            logging.info("Preprocessor object saved successfully")

            return train_arr, test_arr
        except Exception as e:
            raise CustomException(e, sys)
