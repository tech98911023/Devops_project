import logging
from flask import jsonify
# Ensure this matches where you initialized your MySQLConfig (e.g., from database_setup import db_manager as mysql)
from config.db import mysql

# Setup logging
logging.basicConfig(level=logging.INFO)

def createUser(data):

    try:

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        conn = mysql.connect()

        if conn is None:
            return {
                "success": False,
                "message": "Database connection failed"
            }, 500

        cursor = conn.cursor(dictionary=True)

        # Check existing username or email
        check_query = """
        SELECT * FROM pusers
        WHERE username = %s OR email = %s
        """

        cursor.execute(check_query, (username, email))

        existing_user = cursor.fetchone()

        if existing_user:

            if existing_user['username'] == username:
                return {
                    "success": False,
                    "message": "Username already exists"
                }, 409

            if existing_user['email'] == email:
                return {
                    "success": False,
                    "message": "Email already exists"
                }, 409

        # Insert new user
        insert_query = """
        INSERT INTO pusers(username, email, password)
        VALUES(%s, %s, %s)
        """

        cursor.execute(insert_query, (username, email, password))

        conn.commit()

        cursor.close()
        conn.close()

        return {
            "success": True,
            "message": "User created successfully"
        }, 201

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }, 500
    
def get_all_user():
    """
    Retrieves all users from the database.
    """
    cursor = None
    try:
        conn = mysql.connect()
        if conn is None:
            return {"success": False, "error": "Database connection unavailable"}, 500

        # Using dictionary=True makes results easier to handle (row['id'] vs row)
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT id, username, email FROM pusers")
        users = cursor.fetchall()

        return {
            "success": True,
            "data": users
        }

    except Exception as e:
        logging.error(f"Error in get_all_user: {str(e)}")
        return {"success": False, "error": str(e)}, 500

    finally:
        if cursor:
            cursor.close()

def loginUser(data):
    """
    Validates user credentials.
    """
    cursor = None
    try:
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return {"success": False, "message": "Email and password are required"}, 400

        conn = mysql.connection
        if conn is None:
            return {"success": False, "error": "Database connection unavailable"}, 500

        cursor = conn.cursor(dictionary=True)

        query = "SELECT id, username, email FROM pusers WHERE email = %s AND password = %s"
        cursor.execute(query, (email, password))
        user = cursor.fetchone()

        if user:
            return {
                "success": True,
                "data": user
            }

        return {
            "success": False,
            "message": "Invalid email or password"
        }

    except Exception as e:
        logging.error(f"Error in loginUser: {str(e)}")
        return {"success": False, "error": str(e)}, 500

    finally:
        if cursor:
            cursor.close()