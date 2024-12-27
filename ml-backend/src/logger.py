import logging
import os
from datetime import datetime

# direactory for logs
logs_dir = os.path.join(os.getcwd(),"logs")
os.makedirs(logs_dir,exist_ok=True)

# log file name
LOG_FILE = f"{datetime.now().strftime('%m_%d_%Y_%H_%M_%S')}.log"
LOG_FILE_PATH = os.path.join(logs_dir,LOG_FILE)

# Logging configuration
logging.basicConfig(
    filename=LOG_FILE_PATH,
    format="[ %(asctime)s ] %(lineno)d %(name)s -%(levelname)s - %(message)s",
    level=logging.INFO,
)

# if __name__ == "__main__":
#     logging.info("This is an info message")