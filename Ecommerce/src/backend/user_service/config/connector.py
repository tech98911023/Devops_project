import mysql.connector
from mysql.connector import Error

class MySQLConfig:

    def __init__(self, host, user, password, port, database):
        self.host = host
        self.user = user
        self.password = password
        self.port = port
        self.database = database
        self.connection = None

    def connect(self):
        try:
            conn = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )

            if conn.is_connected():
                print("Connection to MySQL DB successful")

            return conn

        except Error as e:
            print(f"Error connecting to MySQL DB: {e}")
            return None

    def create_table(self, conn):
        try:
            cursor = conn.cursor()

            cursor.execute("""
    CREATE TABLE IF NOT EXISTS pusers (

        id INT AUTO_INCREMENT PRIMARY KEY,

        username VARCHAR(100) UNIQUE NOT NULL,

        email VARCHAR(150) UNIQUE NOT NULL,

        password VARCHAR(255) NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

            conn.commit()

            print("Table created successfully")

        except Error as e:
            print(f"Error creating table: {e}")

        finally:
            cursor.close()