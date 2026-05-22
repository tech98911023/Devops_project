import os

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# from config.connector import db
from api.v1.task import bp as task_bp

load_dotenv()

app = Flask(__name__)

CORS(app)

# Register Blueprint
app.register_blueprint(
    task_bp,
    url_prefix='/api/v1/tasks'
)



if __name__ == '__main__':

    app.run(
        host=os.getenv('FLASK_HOST'),
        port=int(os.getenv('FLASK_PORT')),
        debug=os.getenv('FLASK_DEBUG') == 'True'
    )