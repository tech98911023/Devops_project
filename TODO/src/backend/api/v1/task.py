from flask import Blueprint, request, jsonify, current_app
from controller.create_task import create_task, get_all_tasks

bp = Blueprint('tasks', __name__)

# 🔹 CREATE TASK
@bp.route('/createTask', methods=['POST'])
def create_task_api():
    data = request.get_json()
    db_path = current_app.config['DATABASE']
    result = create_task(data, db_path)
    return jsonify(result), 201


# 🔹 GET ALL TASKS
@bp.route('/', methods=['GET'])
def fetch_tasks():
    db_path = current_app.config['DATABASE']

    tasks = get_all_tasks(db_path)
    return jsonify(tasks)