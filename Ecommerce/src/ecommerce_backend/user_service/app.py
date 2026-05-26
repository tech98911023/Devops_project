import os

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from config.connector import MySQLConfig
from api.v1.task import bp as task_bp

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS
CORS(app)

# Register Blueprint
app.register_blueprint(
    task_bp,
    url_prefix='/api/v1/tasks'
)

# Health check route
@app.route('/')
def home():
    return {
        "status": "success",
        "message": "Flask server is running"
    }


if __name__ == '__main__':

    # try:
    #     mysql_config = MySQLConfig(
    #         host=os.getenv('MYSQL_HOST'),
    #         user=os.getenv('MYSQL_USER'),
    #         password=os.getenv('MYSQL_PASSWORD'),
    #         database=os.getenv('MYSQL_DB'),
    #         port=int(os.getenv('MYSQL_PORT', 3306))
    #     )

    #     conn = mysql_config.connect()

    #     if conn:
    #         print("✅ Database connected successfully")
    #         mysql_config.create_table(conn)
    #     else:
    #         print("❌ Database connection failed")

    # except Exception as e:
    #     print(f"❌ Database Error: {e}")

    app.run(
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_PORT', 5000)),
        debug=os.getenv('FLASK_DEBUG', 'False') == 'True'
    )