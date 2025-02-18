import os
import sys
from src.exception import CustomException
from src.logger import logging
import pandas as pd
from sklearn.model_selection import train_test_split
from dataclasses import dataclass

from src.diabetes.data_transformation import DataTransformationConfig
from src.diabetes.data_transformation import DataTransformation

from src.diabetes.model_trainer import ModelTrainerConfig
from src.diabetes.model_trainer import ModelTrainer

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

@dataclass
class DataIngestionConfig:
    train_data_path: str = os.path.join('artifacts_dataset',"diabetes_train.csv")
    test_data_path: str = os.path.join('artifacts_dataset',"diabetes_test.csv")

class DataIngestion:
    def __init__(self):
        self.ingestion_config = DataIngestionConfig()

    def initiate_data_ingestion(self):
        logging.info("Entered the diabetes data ingestion method or component")
        try:
            # df=pd.read_csv('notebooks\datasets\Diabetes.csv')
            df = pd.read_csv('notebooks\\datasets\\Diabetes.csv')
            logging.info("Read the dataset as dataframe")

            os.makedirs(os.path.dirname(self.ingestion_config.train_data_path),exist_ok=True)

            logging.info("Train test split initiated")

            train_set,test_set=train_test_split(df,test_size=0.2,stratify=df['Outcome'],random_state=42)

            train_set.to_csv(self.ingestion_config.train_data_path,index=False,header=True)

            test_set.to_csv(self.ingestion_config.test_data_path,index=False,header=True)

            logging.info("Inagestion of the data is completed")

            return(
                self.ingestion_config.train_data_path,
                self.ingestion_config.test_data_path
            )
        except Exception as e:
            raise CustomException(e,sys)
        
if __name__ == "__main__":
    obj = DataIngestion()
    train_data,test_data = obj.initiate_data_ingestion()

    data_transformation = DataTransformation()
    train_arr, test_arr = data_transformation.initiate_data_transformation(train_data, test_data)

    model_trainer = ModelTrainer()
    print(model_trainer.initiate_model_trainer(train_arr, test_arr))