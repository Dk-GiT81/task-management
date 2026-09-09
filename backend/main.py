from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.database import client
from routers.auth import router as auth_router

from fastapi import Depends
from utils.dependencies import get_current_user

from database.database import database
from bson import ObjectId
from fastapi import Depends, FastAPI, HTTPException
from routers.projects import router as projects_router
from routers.tasks import router as tasks_router
from routers.dashboard import router as dashboard_router

app = FastAPI(
    title="Task Management API",
    description="Backend API for the Task Management Application",
    version="1.0.0",
)


# -------------------------
# CORS
# -------------------------

origins = [
    "http://localhost:5173",
    "https://task-management-lemon-three.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    tasks_router,
    prefix="/tasks",
    tags=["Tasks"],
)

app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

# -------------------------
# Authentication Routes
# -------------------------

app.include_router(auth_router)

app.include_router(
    projects_router,
    prefix="/projects",
    tags=["Projects"],
)


# -------------------------
# Routes
# -------------------------

@app.get("/")
async def root():
    return {
        "message": "Task Management API is running"
    }


@app.get("/health")
async def health_check():
    try:
        await client.admin.command("ping")

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception:
        return {
            "status": "unhealthy",
            "database": "disconnected",
        }
        
@app.get("/auth/me")
async def get_my_account(
    current_user=Depends(get_current_user),
):
    user = await database.users.find_one(
        {"_id": ObjectId(current_user["user_id"])}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "user_id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
    }