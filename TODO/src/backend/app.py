import os
from flask import Flask
from flask_cors import CORS
from config.sqllite import SQLiteConfig
from api.v1.task import bp as task_bp

app = Flask(__name__)
CORS(app)  # ✅ enable CORS for all routes

# ✅ absolute DB path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'tasks.db')

app.config['DATABASE'] = DB_PATH

app.register_blueprint(task_bp, url_prefix='/api/v1/tasks')

if __name__ == '__main__':
    sqlite_config = SQLiteConfig(app.config['DATABASE'])
    print(f"Using database at: {app.config['DATABASE']}")  # ✅ log DB path
    conn = sqlite_config.connect()

    if conn:
        sqlite_config.create_table(conn)   # ✅ ensure table exists
        conn.close()
    print(app.url_map)
    app.run('0.0.0.0', 50000, debug=True)
