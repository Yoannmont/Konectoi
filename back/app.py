from flask import Flask, request, jsonify
import os
import psycopg2
from dotenv import load_dotenv

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
        cursor = connection.cursor()
        query = "SELECT * FROM \"Konectoi\".\"User\""
        cursor.execute(query)
        users = cursor.fetchall()
        cursor.close()
        return ({"AllUser": users}), 200
    
    except Exception as e:
        print("Error:", e)
        return ({"error": "An error occurred while fetching users"}), 500


if __name__ == "__main__":
    app.run(debug=True)
