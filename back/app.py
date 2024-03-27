from flask import Flask, request, jsonify
import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

connection = psycopg2.connect(
    dbname = "Konectoi",
    user="konectoi",
    password="konectoi",
    host="34.133.84.136"
)


# Test GET METHOD 
@app.get("/test")
def test_route():
    return jsonify({"message": "This is a test route"})


# Test POST METHOD Form Encode body
@app.post("/post")
def post_encod():
    if request.method == 'POST':
        name = request.form.get('name')
        age = request.form.get('age')
        email = request.form.get('email')
        
        data = {
            "name": name,
            "age": age,
            "email": email
        }
        
        return jsonify(data), 200
    else:
        return jsonify({"error": "Method not allowed"}), 405

if __name__ == "__main__":
    app.run(debug=True)
