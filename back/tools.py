import json

def getById(connection, user_id):
    try:
        cursor = connection.cursor()
        query = "SELECT id FROM Konectoi.User WHERE id = %s"
        cursor.execute(query, (user_id,))
        user = cursor.fetchone()
        cursor.close()
        return user is not None
    except Exception as e:
        print("Error:", e)
        return False
    

def getByUsernamePassword(connection, username, password):
    try:
        cursor = connection.cursor()
        query = "SELECT * FROM Konectoi.User WHERE username = %s AND password = %s"
        cursor.execute(query, (username, password))
        user = cursor.fetchone()
        cursor.close()
        return user
    except Exception as e:
        print("Error:", e)
        return None


def checkField(data, required_fields):
    for field in required_fields:
        if field not in data or not data[field]:
            return False
    return True

def format_form(data):
    data_keys = [*dict(data).keys()]
    data_values = [*dict(data).values()]
    if len(data_values) == 1 and data_values[0] == '':
        formatted_data = json.loads(data_keys[0])
        return formatted_data
    else :
        return data
