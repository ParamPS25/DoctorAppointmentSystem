import os
import sys
from dataclasses import dataclass
from src.exception import CustomException
from src.logger import logging
from src.utils import save_object,evaluate_models

from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score, roc_auc_score
from sklearn.ensemble import AdaBoostClassifier

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

@dataclass
class ModelTrainerConfig:
    trained_model_file_path = os.path.join("artifacts", "diabetes_model.pkl")

class ModelTrainer:
    def __init__(self):
        self.model_trainer_config = ModelTrainerConfig()
    
    def initiate_model_trainer(self, train_array, test_array):
        try:
            X_train, y_train, X_test, y_test = (
                train_array[:, :-1],
                train_array[:, -1],
                test_array[:, :-1],
                test_array[:, -1]
            )
            logging.info("Model training initiated")

            models = {
                "AdaBoost": AdaBoostClassifier()
            }
            params = {
                "AdaBoost": {
                    "n_estimators": [60],
                    # "algorithm": ["SAMME"]
                    # No need to specify 'algorithm' as 'SAMME' is the default and it's deprecated
                }
            }

            model_report, best_model = evaluate_models(
                X_train=X_train,
                y_train=y_train,
                X_test=X_test,
                y_test=y_test,
                models=models,
                hyperparameters=params
            )
            logging.info(f"Model Report: {model_report}")

            save_object(
                file_path=self.model_trainer_config.trained_model_file_path,
                obj=best_model
            )
            logging.info("Model saved successfully")

            predictions = best_model.predict(X_test)
            accuracy = accuracy_score(y_test, predictions)
            logging.info(f"Model training completed. Accuracy: {accuracy}")

            return accuracy
        
        except Exception as e:
            raise CustomException(e, sys)
