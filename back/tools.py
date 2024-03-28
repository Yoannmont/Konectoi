        
def user_exists(connection, user_id):
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
    

def get_user_by_username_password(connection, username, password):
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
