from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import bcrypt

# Database connection setup (with optional pooling)
def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",    # Replace with your MySQL username
        password="",    # Empty password
        database="reservation"  # Replace with your database name
    )
    return connection

# Run a query helper function
def run_query(query:str):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(query)  # Execute the query
    result = cursor.fetchall()  # Fetch all results
    cursor.close()
    connection.close()
    
    return result

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",  
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://127.0.0.1"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Pydantic model for user input validation
class UserSignup(BaseModel):
    name: str
    email: str
    password: str

# Route to get all users (for testing)
@app.get("/users")
def read_data():
    query = "SELECT * FROM user"
    return {"data": run_query(query)}

# Signup route
@app.post("/signup")
def user_signup(user: UserSignup):
    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        # Check if the email already exists
        check_query = "SELECT id FROM user WHERE email = %s"
        cursor.execute(check_query, (user.email,))
        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(status_code=400, detail="User with this email already exists.")

        # Hash the password before saving
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

        # Insert new user
        insert_query = "INSERT INTO user (name, email, password) VALUES (%s, %s, %s)"
        cursor.execute(insert_query, (user.name, user.email, hashed_password))
        connection.commit()

    except mysql.connector.Error as err:
        connection.rollback()
        raise HTTPException(status_code=500, detail=str(err))
    
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()

    return {"message": "User signed up successfully"}




