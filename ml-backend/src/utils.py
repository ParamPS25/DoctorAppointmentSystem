import os
import sys
import numpy as np
import pandas as pd
import dill
from src.exception import CustomException
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score, roc_auc_score

def save_object(file_path,obj):
    try:
        dir_path = os.path.dirname(file_path)

        os.makedirs(dir_path,exist_ok=True)

        with open(file_path,"wb") as file_obj:
            dill.dump(obj,file_obj)

    except Exception as e:
        raise CustomException(e,sys)
    
def load_object(file_path):
    try:
        with open(file_path,"rb") as file_obj:
            return dill.load(file_obj)
    except Exception as e:
        raise CustomException(e,sys)
    
def evaluate_models(X_train, y_train, X_test, y_test, models, hyperparameters):
    try:
        report = {}
        best_model = None
        best_score = -1

        for i in range(len(list(models))):
            model = list(models.values())[i]
            params = list(hyperparameters.values())[i]

            gs = GridSearchCV(estimator=model, param_grid=params, cv=3)
            gs.fit(X_train, y_train)

            y_test_pred = gs.predict(X_test)
            accuracy_test = accuracy_score(y_test, y_test_pred)

            model_name = list(models.keys())[i]
            report[model_name] = accuracy_test

            # Track the best model
            if accuracy_test > best_score:
                best_score = accuracy_test
                best_model = gs.best_estimator_

        return report, best_model
    except Exception as e:
        raise CustomException(e, sys)

