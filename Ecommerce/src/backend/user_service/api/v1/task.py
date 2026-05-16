from flask import Blueprint, request, jsonify
from controller.create_task import createUser, get_all_user, loginUser

bp = Blueprint('tasks', __name__)

# CREATE USER
@bp.route('/createUser', methods=['POST'])
def create_user_api():

    data = request.get_json()
    print(f"Received data: {data}")

    result = createUser(data)

    return jsonify(result), 201


# GET ALL USERS
@bp.route('/all-users', methods=['GET'])
def get_users_api():

    result = get_all_user()

    return jsonify(result), 200

@bp.route('/login', methods=['POST'])
def login_user_api():

    data = request.get_json()

    result = loginUser(data)

    if result['success']:
        return jsonify(result), 200
    else:
        return jsonify(result), 401