import sqlite3

class SQLiteConfig:
    def __init__(self, db_path):
        self.db_path = db_path

    def connect(self):
        try:
            conn = sqlite3.connect(self.db_path)
            print("Connection to SQLite DB successful")
            return conn
        except sqlite3.Error as e:
            print(f"Error connecting to SQLite DB: {e}")
            return None

    def create_table(self, conn):
        try:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS task (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    description TEXT NOT NULL,
                    category TEXT NOT NULL,
                    due_date TEXT NOT NULL,
                    completed BOOLEAN NOT NULL DEFAULT 0
                )
            ''')
            conn.commit()
            print("Table created successfully")
        except sqlite3.Error as e:
            print(f"Error creating table: {e}")