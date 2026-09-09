from fastapi import APIRouter, HTTPException, status

from database.database import database
from schemas.user_schema import UserCreate, UserLogin
from utils.jwt import create_access_token
from utils.password import hash_password, verify_password


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
)
async def register_user(user: UserCreate):

    # Check whether email already exists
    existing_user = await database.users.find_one(
        {"email": user.email}
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email is already registered",
        )

    # Hash password
    hashed_password = hash_password(user.password)

    # Public registration always creates a normal user
    user_document = {
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "role": "user",
    }

    # Insert user
    result = await database.users.insert_one(
        user_document
    )

    return {
        "message": "User registered successfully",
        "user_id": str(result.inserted_id),
    }


@router.post("/login")
async def login_user(user: UserLogin):

    # Find user by email
    existing_user = await database.users.find_one(
        {"email": user.email}
    )

    if not existing_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Verify password
    password_is_valid = verify_password(
        user.password,
        existing_user["password"],
    )

    if not password_is_valid:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Create JWT
    access_token = create_access_token(
        user_id=str(existing_user["_id"]),
        role=existing_user["role"],
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }