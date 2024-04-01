import sys
import subprocess
import pkg_resources

required = {'flask', 'psycopg2', 'flask_cors', 'flask_bcrypt'}
installed = {pkg.key for pkg in pkg_resources.working_set}
missing = required - installed

if missing:
    python = sys.executable
    subprocess.check_call([python, '-m', 'pip', 'install', *missing], stdout=subprocess.DEVNULL)

import psycopg2
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify
from psycopg2 import extras
from tools import getById, getByUsernamePassword,checkField, format_form, generateToken,decodeToken
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

try:
    connection = psycopg2.connect(
        dbname="Konectoi",
        user="konectoi",
        password="konectoi",
        host="34.133.84.136"
    )
    print("Database connection successful")
except Exception as e:
    print("Error:", e)


@app.route("/signin", methods=['POST'])
def signin():
    if request.method == 'POST':
        data = format_form(request.form)
        required_fields = ['username', 'password']
        
        if checkField(data, required_fields):
            username = data.get('username')
            password = data.get('password')
            user = getByUsernamePassword(connection, username, password)
            if user:
                token = generateToken(user)
                return jsonify({"token":token }), 200
            else:
                return jsonify({"error": "User not found or incorrect credentials"}), 404
        else:
            return jsonify({"error": "Missing required fields"}), 400
    else:
        return jsonify({"error": "Method not allowed"}), 405


@app.route("/signup", methods=['POST'])
def signup():
    if request.method == 'POST':
        data = format_form(request.form)
        
        required_fields = ['username', 'email', 'phonenumber', 'password', 'birthdate']
        if checkField(data, required_fields):
            username = data.get('username')
            email = data.get('email')
            phonenumber = data.get('phonenumber')
            password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
            birthdate = data.get('birthdate')
            
            try:
                cursor = connection.cursor()
                query = "INSERT INTO Konectoi.User (username, email, phonenumber, password, birthdate) VALUES (%s, %s, %s, %s, %s);"
                cursor.execute(query, (username, email, phonenumber, password, birthdate))
                connection.commit()
                return jsonify({"message": "User signed up successfully!"}), 201
            
            except Exception as e:
                print("Error:", e)
                return jsonify({"error": "An error occurred while signing up"}), 500
            
            finally:
                if cursor:
                    cursor.close()
        else:
            return jsonify({"error": "Missing required information"}), 400
    else:
        return jsonify({"error": "Method not allowed"}), 405


@app.route("/getAll", methods=['GET'])
def get_users():
    try:
        cursor = connection.cursor(cursor_factory=extras.RealDictCursor)
        query = "SELECT * FROM Konectoi.User;"
        cursor.execute(query)
        users = cursor.fetchall()
        cursor.close()
        return ({"AllUser": users}), 200
    
    except Exception as e:
        print("Error:", e)
        
        return ({"error": "An error occurred while fetching users"}), 500
    
    finally:
        if cursor:
            cursor.close()


@app.route("/delete/<int:id>", methods=['DELETE'])
def delete_user(id):
    try:
        if getById(connection, id):
            cursor = connection.cursor()
            query = "DELETE FROM Konectoi.User WHERE id = %s"
            cursor.execute(query, (id,))
            connection.commit()
            cursor.close()
            return jsonify({"message": f"User with ID {id} deleted successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred while deleting user"}), 500


@app.route("/update/<int:id>", methods=['PUT'])
def update_user(id):
    if request.method == 'PUT':
        data = request.form
        required_fields = ['username', 'email', 'phonenumber', 'birthdate', 'password']
        
        if checkField(data, required_fields):
            fields_to_update = {key: data[key] for key in data if key in required_fields}
            
            try:
                cursor = connection.cursor()
                set_clause = ", ".join([f"{field} = %s" for field in fields_to_update])
                query = f"UPDATE Konectoi.User SET {set_clause} WHERE id = %s"
                cursor.execute(query, (*fields_to_update.values(), id))
                connection.commit()
                cursor.close()
                return jsonify({"message": f"User with ID {id} updated successfully"}), 200
            except Exception as e:
                return jsonify({"error": f"An error occurred while updating user: {e}"}), 500
        else:
            return jsonify({"error": "Missing required fields"}), 400
    else:
        return jsonify({"error": "Invalid request method"}), 405



if __name__ == "__main__":
    app.run(debug=True)
