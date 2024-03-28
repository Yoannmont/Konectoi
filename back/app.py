from flask import Flask, request, jsonify
import psycopg2
from psycopg2 import extras
from dotenv import load_dotenv
from tools import user_exists, get_user_by_username_password

load_dotenv()

app = Flask(__name__)

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


@app.route("/signup", methods=['POST'])
def signup():
    data = request.form
    if request.method == 'POST':
        username = data.get('username')
        email = data.get('email')
        phonenumber = data.get('phonenumber')
        password = data.get('password')
        birthdate = data.get('birthdate')

        if username and email and phonenumber and password and birthdate:
            try:
                cursor = connection.cursor()
                query = "INSERT INTO \"Konectoi\".\"User\" (username, email, phonenumber, password, birthdate) VALUES (%s, %s, %s, %s, %s)"
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


@app.route("/users", methods=['GET'])
def get_users():
    try:
        cursor = connection.cursor(cursor_factory=extras.RealDictCursor)
        query = "SELECT * FROM \"Konectoi\".\"User\""
        cursor.execute(query)
        users = cursor.fetchall()
        cursor.close()
        return ({"AllUser": users}), 200
    
    except Exception as e:
        print("Error:", e)
        return ({"error": "An error occurred while fetching users"}), 500


@app.route("/signin", methods=['POST'])
def signin():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username and password:
            user = get_user_by_username_password(connection, username, password)
            if user:
                return jsonify({"user": user}), 200
            else:
                return jsonify({"error": "User not found or incorrect credentials"}), 404
        else:
            return jsonify({"error": "Missing username or password"}), 400
    else:
        return jsonify({"error": "Method not allowed"}), 405

@app.route("/users/<int:id>", methods=['DELETE'])
def delete_user(id):
    try:
        if user_exists(connection, id):
            cursor = connection.cursor()
            query = "DELETE FROM \"Konectoi\".\"User\" WHERE id = %s"
            cursor.execute(query, (id,))
            connection.commit()
            cursor.close()
            return jsonify({"message": f"User with ID {id} deleted successfully"}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "An error occurred while deleting user"}), 500



@app.route("/users/<int:id>", methods=['PUT'])
def update_user(id):
    data = request.form
    if request.method == 'PUT' and data:
        fields_to_update = {key: data[key] for key in data if key in ['username', 'email', 'phonenumber', 'birthdate', 'password']}
        if fields_to_update:
            try:
                cursor = connection.cursor()
                set_clause = ", ".join([f"{field} = %s" for field in fields_to_update])
                query = f"UPDATE \"Konectoi\".\"User\" SET {set_clause} WHERE id = %s"
                cursor.execute(query, (*fields_to_update.values(), id))
                connection.commit()
                cursor.close()
                return jsonify({"message": f"User with ID {id} updated successfully"}), 200
            except Exception as e:
                return jsonify({"error": f"An error occurred while updating user: {e}"}), 500
        else:
            return jsonify({"error": "No valid fields provided for update"}), 400
    else:
        return jsonify({"error": "Invalid request or no data provided"}), 400


if __name__ == "__main__":
    app.run(debug=True)
