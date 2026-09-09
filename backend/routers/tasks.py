from datetime import datetime, time, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from database.database import database
from schemas.task_schema import TaskCreate, TaskUpdate
from utils.dependencies import get_current_user


router = APIRouter()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_task(
    task: TaskCreate,
    current_user=Depends(get_current_user),
):
    if not ObjectId.is_valid(task.project_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid project ID",
        )

    project = await database.projects.find_one(
        {
            "_id": ObjectId(task.project_id),
            "created_by": current_user["user_id"],
        }
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    new_task = {
      "title": task.title,
      "description": task.description,
      "project_id": task.project_id,
      "created_by": current_user["user_id"],
      "status": "todo",
      "priority": task.priority,
      "due_date": (
          datetime.combine(
              task.due_date,
              time.min,
              tzinfo=timezone.utc,
          )
          if task.due_date
          else None
      ),
      "created_at": datetime.now(timezone.utc),
    }
    
    result = await database.tasks.insert_one(new_task)

    return {
        "message": "Task created successfully",
        "task_id": str(result.inserted_id),
    }


@router.get("/")
async def get_tasks(
    project_id: str | None = None,
    current_user=Depends(get_current_user),
):
    query = {
        "created_by": current_user["user_id"]
    }

    if project_id:
        if not ObjectId.is_valid(project_id):
            raise HTTPException(
                status_code=400,
                detail="Invalid project ID",
            )

        query["project_id"] = project_id

    tasks = []

    cursor = database.tasks.find(query)

    async for task in cursor:
        tasks.append(
            {
                "id": str(task["_id"]),
                "title": task["title"],
                "description": task["description"],
                "project_id": task["project_id"],
                "created_by": task["created_by"],
                "status": task["status"],
                "priority": task["priority"],
                "due_date": (
                    task["due_date"].isoformat()
                    if task["due_date"]
                    else None
                ),
                "created_at": task["created_at"],
            }
        )

    return tasks


@router.get("/{task_id}")
async def get_task(
    task_id: str,
    current_user=Depends(get_current_user),
):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid task ID",
        )

    task = await database.tasks.find_one(
        {
            "_id": ObjectId(task_id),
            "created_by": current_user["user_id"],
        }
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return {
        "id": str(task["_id"]),
        "title": task["title"],
        "description": task["description"],
        "project_id": task["project_id"],
        "created_by": task["created_by"],
        "status": task["status"],
        "priority": task["priority"],
        "due_date": (
            task["due_date"].isoformat()
            if task["due_date"]
            else None
        ),
        "created_at": task["created_at"],
    }


@router.put("/{task_id}")
async def update_task(
    task_id: str,
    task: TaskUpdate,
    current_user=Depends(get_current_user)
):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid task ID"
        )

    result = await database.tasks.update_one(
        {
            "_id": ObjectId(task_id),
            "created_by": current_user["user_id"],
        },
        {
            "$set": {
                "title": task.title,
                "description": task.description,
                "status": task.status,
                "priority": task.priority,
                "due_date": (
                    datetime.combine(
                        task.due_date,
                        time.min,
                        tzinfo=timezone.utc,
                    )
                    if task.due_date
                    else None
                ),
            }
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return {
        "message": "Task updated successfully"
    }


@router.delete("/{task_id}")
async def delete_task(
    task_id: str,
    current_user=Depends(get_current_user),
):
    if not ObjectId.is_valid(task_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid task ID",
        )

    result = await database.tasks.delete_one(
        {
            "_id": ObjectId(task_id),
            "created_by": current_user["user_id"],
        }
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return {
        "message": "Task deleted successfully"
    }