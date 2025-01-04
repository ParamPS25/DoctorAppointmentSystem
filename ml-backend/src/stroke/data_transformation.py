import os
import sys
from dataclasses import dataclass
from src.exception import CustomException
from src.logger import logging
from src.utils import save_object

import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.base import BaseEstimator, TransformerMixin

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

@dataclass
class DataTransformationConfig:
    preprocessor_obj_file_path = os.path.join("artifacts", "stroke_preprocessor.pkl")

class GenderBasedImputer(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        self.avg_bmi_male = X.loc[X['gender'] == 'Male', 'bmi'].mean()
        self.avg_bmi_female = X.loc[X['gender'] == 'Female', 'bmi'].mean()
        self.avg_bmi_overall = X['bmi'].mean()
        return self

    def transform(self, X):
        X['bmi'] = X.apply(lambda row: self._fill_bmi(row), axis=1)
        return X[['bmi']].values  # Return only the bmi column as numpy array

    def _fill_bmi(self, row):
        gender = row.get('gender', None)
        if pd.isnull(row['bmi']):
            if gender == 'Male':
                return self.avg_bmi_male
            elif gender == 'Female':
                return self.avg_bmi_female
            else:
                return self.avg_bmi_overall
        return row['bmi']

class DataTransformation:
    def __init__(self):
        self.data_transformation_config = DataTransformationConfig()

    def get_data_transformer_object(self):
        try:
            numerical_cols = ['age', 'avg_glucose_level']
            bmi_cols = ['bmi']
            binary_cols = ['hypertension', 'heart_disease']
            categorical_cols = ['gender', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']

            # Preprocessing for BMI feature
            bmi_transformer = Pipeline(steps=[
                ('bmi_imputer', GenderBasedImputer()),
                ('scaler', StandardScaler())
            ])

            # Preprocessing for numerical features
            numerical_transformer = Pipeline(steps=[
                ('imputer', SimpleImputer(strategy='median')),
                ('scaler', StandardScaler())
            ])

            # Preprocessing for binary features (No scaling needed)
            binary_transformer = 'passthrough'

            # Preprocessing for categorical features
            categorical_transformer = Pipeline(steps=[
                ('imputer', SimpleImputer(strategy='most_frequent')),
                ('onehot', OneHotEncoder(handle_unknown='ignore'))
            ])

            # Combine preprocessors
            preprocessor = ColumnTransformer(
                transformers=[
                    ('num', numerical_transformer, numerical_cols),
                    ('bmi', bmi_transformer, bmi_cols + ['gender']),
                    ('binary', binary_transformer, binary_cols),
                    ('cat', categorical_transformer, categorical_cols)
                ])
            
            return preprocessor
        
        except Exception as e:
            raise CustomException(e, sys)
        
    def initiate_data_transformation(self, train_path, test_path):
        try:
            train_df = pd.read_csv(train_path)
            test_df = pd.read_csv(test_path)

            preprocessing_obj = self.get_data_transformer_object()

            target_column_name = "stroke"

            input_feature_train_df = train_df.drop(target_column_name, axis=1)
            target_feature_train_df = train_df[target_column_name]

            input_feature_test_df = test_df.drop(target_column_name, axis=1)
            target_feature_test_df = test_df[target_column_name]

            input_feature_train_arr = preprocessing_obj.fit_transform(input_feature_train_df)
            input_feature_test_arr = preprocessing_obj.transform(input_feature_test_df)

            train_arr = np.c_[
                input_feature_train_arr, np.array(target_feature_train_df)
            ]
            test_arr = np.c_[
                input_feature_test_arr, np.array(target_feature_test_df)
            ]

            # Ensure the directory for saving the object exists
            dir_path = os.path.dirname(self.data_transformation_config.preprocessor_obj_file_path)
            if not os.path.exists(dir_path):
                os.makedirs(dir_path)

            save_object(
                file_path=self.data_transformation_config.preprocessor_obj_file_path,
                obj=preprocessing_obj
            )

            return train_arr, test_arr
        
        except Exception as e:
            raise CustomException(e, sys)
