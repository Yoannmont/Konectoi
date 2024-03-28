        


def getById(connection, user_id):
    try:
        cursor = connection.cursor()
        query = "SELECT id FROM \"Konectoi\".\"User\" WHERE id = %s"
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
        query = "SELECT * FROM \"Konectoi\".\"User\" WHERE username = %s AND password = %s"
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
