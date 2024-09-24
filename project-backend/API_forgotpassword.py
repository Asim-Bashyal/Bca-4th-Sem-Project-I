from fastapi import FastAPI, HTTPException, Depends, Form
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import bcrypt
from jose import JWTError, jwt
from datetime import datetime, timedelta

# JWT secret key and algorithm
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
RESET_PASSWORD_EXPIRE_MINUTES = 15  # Token expires in 15 minutes

# Database connection setup
def get_db_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="reservation"
    )
    return connection

# Run a query helper function
def run_query(query: str):
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(query)
    result = cursor.fetchall()
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

# Helper function to generate a password reset token
def create_reset_token(email: str):
    expire = datetime.utcnow() + timedelta(minutes=RESET_PASSWORD_EXPIRE_MINUTES)
    payload = {"sub": email, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# Helper function to verify a password reset token
def verify_reset_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None

# Route to request password reset (sends reset token)
@app.post("/forgotpassword")
def forgot_password(email: str = Form(...)):
    connection = get_db_connection()
    cursor = connection.cursor()

    # Check if user exists
    cursor.execute("SELECT id FROM user WHERE email = %s", (email,))
    user = cursor.fetchone()

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    # Create reset token
    reset_token = create_reset_token(email)
    reset_link = f"http://localhost:5500/otp.html?token={reset_token}"

    # In a real app, you'd send this link via email to the user
    # Here, we simulate by returning the reset link in the response for testing
    return {"message": "Reset password link has been sent", "reset_link": reset_link}

# Route to reset password using the token
@app.post("/otp")
def reset_password(token: str = Form(...), new_password: str = Form(...)):
    email = verify_reset_token(token)

    if not email:
        raise HTTPException(status_code=400, detail="Invalid or expired token.")

    # Hash the new password
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())

    # Update password in the database
    connection = get_db_connection()
    cursor = connection.cursor()

    try:
        update_query = "UPDATE user SET password = %s WHERE email = %s"
        cursor.execute(update_query, (hashed_password, email))
        connection.commit()

    except mysql.connector.Error as err:
        connection.rollback()
        raise HTTPException(status_code=500, detail=str(err))

    finally:
        cursor.close()
        connection.close()

    return {"message": "Password reset successfully"}

# Route to signup user (as previously implemented)
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

    finally:
        cursor.close()
        connection.close()

    return {"message": "User signed up successfully"}
