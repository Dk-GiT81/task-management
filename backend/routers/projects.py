from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from database.database import database
from schemas.project_schema import ProjectCreate, ProjectUpdate
from utils.dependencies import get_current_user


router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_project(
    project: ProjectCreate,
    current_user=Depends(get_current_user),
):
    new_project = {
        "name": project.name,
        "description": project.description,
        "created_by": current_user["user_id"],
        "created_at": datetime.now(timezone.utc),
    }

    result = await database.projects.insert_one(new_project)

    return {
        "message": "Project created successfully",
        "project_id": str(result.inserted_id),
    }


@router.get("/")
async def get_projects(
    current_user=Depends(get_current_user),
):
    projects = []

    cursor = database.projects.find(
        {
            "created_by": current_user["user_id"]
        }
    )

    async for project in cursor:
        projects.append(
            {
                "id": str(project["_id"]),
                "name": project["name"],
                "description": project["description"],
                "created_by": project["created_by"],
                "created_at": project["created_at"],
            }
        )

    return projects


@router.get("/{project_id}")
async def get_project(
    project_id: str,
    current_user=Depends(get_current_user),
):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid project ID",
        )

    project = await database.projects.find_one(
        {
            "_id": ObjectId(project_id),
            "created_by": current_user["user_id"],
        }
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return {
        "id": str(project["_id"]),
        "name": project["name"],
        "description": project["description"],
        "created_by": project["created_by"],
        "created_at": project["created_at"],
    }


@router.put("/{project_id}")
async def update_project(
    project_id: str,
    project: ProjectUpdate,
    current_user=Depends(get_current_user),
):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid project ID",
        )

    result = await database.projects.update_one(
        {
            "_id": ObjectId(project_id),
            "created_by": current_user["user_id"],
        },
        {
            "$set": {
                "name": project.name,
                "description": project.description,
            }
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return {
        "message": "Project updated successfully"
    }


@router.delete("/{project_id}")
async def delete_project(
    project_id: str,
    current_user=Depends(get_current_user),
):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid project ID",
        )

    result = await database.projects.delete_one(
        {
            "_id": ObjectId(project_id),
            "created_by": current_user["user_id"],
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    return {
        "message": "Project deleted successfully"
    }