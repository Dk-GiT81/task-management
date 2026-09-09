from datetime import date

from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(min_length=2, max_length=150)
    description: str = Field(default="", max_length=1000)
    project_id: str
    priority: str = "medium"
    due_date: date | None = None


class TaskUpdate(BaseModel):
    title: str = Field(min_length=2, max_length=150)
    description: str = Field(default="", max_length=1000)
    priority: str = "medium"
    status: str = "todo"
    due_date: date | None = None