from fastapi import APIRouter, Depends

from database.database import database
from utils.dependencies import get_current_user


router = APIRouter()


@router.get("/stats")
async def get_dashboard_stats(
    current_user=Depends(get_current_user)
):
    user_id = current_user["user_id"]

    total_tasks = await database.tasks.count_documents({
        "created_by": user_id
    })

    todo_tasks = await database.tasks.count_documents({
        "created_by": user_id,
        "status": "todo"
    })

    in_progress_tasks = await database.tasks.count_documents({
        "created_by": user_id,
        "status": "in_progress"
    })

    completed_tasks = await database.tasks.count_documents({
        "created_by": user_id,
        "status": "done"
    })

    total_projects = await database.projects.count_documents({
        "created_by": user_id
    })

    return {
        "total_tasks": total_tasks,
        "todo_tasks": todo_tasks,
        "in_progress_tasks": in_progress_tasks,
        "completed_tasks": completed_tasks,
        "total_projects": total_projects,
    }