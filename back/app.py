from flask import Flask, request, jsonify
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# url = os.getenv("DATABASE_URL")

connection = psycopg2.connect(database="konectoi",
                              user="postgre",
                              password="konectoi",
                              host="34.133.84.136", port="5432")

cur = connection.cursor()


@app.get('/get')
def test():

    connection = psycopg2.connect(database="konectoi",
                              user="postgre",
                              password="konectoi",
                              host="34.133.84.136", port="5432")

    cur = connection.cursor()
    
    return "this is a test"




















# @app.route("/signup", methods=['POST'])
# def signup():
#     data = request.form
#     if request.method == 'POST':
#         username = data.get('username')
#         email = data.get('email')
#         phonenumber = data.get('phonenumber')
#         password = data.get('password')
#         birthdate = data.get('birthdate')

#         if username and email and phonenumber and password and birthdate:
#             try:
#                 cursor = connection.cursor()
#                 query = "INSERT INTO KONECTOI.\"User\" (username, email, phonenumber, password, birthdate) VALUES (%s, %s, %s, %s, %s)"
#                 cursor.execute(query, (username, email, phonenumber, password, birthdate))
#                 connection.commit()
#                 cursor.close()
#                 return jsonify({"message": "User signed up successfully!"}), 201
#             except Exception as e:
#                 print("Error:", e)
#                 return jsonify({"error": "An error occurred while signing up"}), 500
#         else:
#             return jsonify({"error": "Missing required information"}), 400
#     else:
#         return jsonify({"error": "Method not allowed"}), 405




if __name__ == "__main__":
    app.run(debug=True)
