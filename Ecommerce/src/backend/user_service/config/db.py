import os
from config.connector import MySQLConfig
from dotenv import load_dotenv


load_dotenv()
# MySQL Configuration
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_PORT = int(os.getenv('MYSQL_PORT'))
MYSQL_DB = os.getenv('MYSQL_DB')

# Initialize MySQL Config
mysql = MySQLConfig(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_DB)
