import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock3,
  Trash2,
} from "lucide-react";

import GlassCard from "./GlassCard";
import {
  updateTask,
  deleteTask,
} from "../services/taskService";

function KanbanBoard({ tasks, onTasksChange }) {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const columns = [
    {
      id: "todo",
      title: "To Do",
    },
    {
      id: "in_progress",
      title: "In Progress",
    },
    {
      id: "done",
      title: "Done",
    },
  ];

  function handleDragStart(event, task) {
    console.log("DRAG START:", task);

    setDraggedTask(task);

    event.dataTransfer.effectAllowed = "move";

    event.dataTransfer.setData(
      "text/plain",
      task.id
    );
  }

  function handleDragEnd() {
    console.log("DRAG END");

    setDraggedTask(null);
    setDragOverColumn(null);
  }

  function handleDragOver(event, columnId) {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";

    setDragOverColumn(columnId);
  }

  function handleDragEnter(event, columnId) {
    event.preventDefault();

    setDragOverColumn(columnId);
  }

  function handleDragLeave(event) {
    // Don't clear the highlight when moving
    // between elements inside the drop area.
    if (
      event.currentTarget.contains(
        event.relatedTarget
      )
    ) {
      return;
    }

    setDragOverColumn(null);
  }

  async function handleDrop(event, status) {
    event.preventDefault();
    event.stopPropagation();

    console.log("DROP:", status);
    console.log("TASK:", draggedTask);

    if (!draggedTask) {
      console.log("No dragged task");
      return;
    }

    if (draggedTask.status === status) {
      setDraggedTask(null);
      setDragOverColumn(null);
      return;
    }

    try {
      console.log(
        `Changing ${draggedTask.title} -> ${status}`
      );

      await updateTask(draggedTask.id, {
        title: draggedTask.title,
        description: draggedTask.description,
        priority: draggedTask.priority,
        status: status,
        due_date: draggedTask.due_date
          ? draggedTask.due_date.substring(0, 10)
          : null,
      });

      console.log("TASK UPDATED SUCCESSFULLY");

      setDraggedTask(null);
      setDragOverColumn(null);

      await onTasksChange();
    } catch (error) {
      console.error("DROP ERROR:", error);

      alert(error.message);

      setDraggedTask(null);
      setDragOverColumn(null);
    }
  }

  async function handleDelete(taskId) {
    if (!window.confirm("Delete this task?")) {
      return;
    }

    try {
      await deleteTask(taskId);
      await onTasksChange();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="kanban-board">

      {columns.map((column) => {
        const columnTasks = tasks.filter(
          (task) => task.status === column.id
        );

        const isDropTarget =
          dragOverColumn === column.id;

        return (
          <div
            key={column.id}
            className={`kanban-column ${
              isDropTarget
                ? "kanban-column-drag-over"
                : ""
            }`}
          >

            {/* Column Header */}
            <div className="kanban-column-header">
              <div>
                <h2>{column.title}</h2>

                <span>
                  {columnTasks.length}{" "}
                  {columnTasks.length === 1
                    ? "task"
                    : "tasks"}
                </span>
              </div>
            </div>

            {/* DROP AREA */}
            <div
              className="kanban-tasks"
              onDragEnter={(event) =>
                handleDragEnter(
                  event,
                  column.id
                )
              }
              onDragOver={(event) =>
                handleDragOver(
                  event,
                  column.id
                )
              }
              onDragLeave={handleDragLeave}
              onDrop={(event) =>
                handleDrop(
                  event,
                  column.id
                )
              }
            >

              {columnTasks.length === 0 ? (
                <div className="kanban-empty">
                  {draggedTask
                    ? "Drop task here"
                    : "No tasks"}
                </div>
              ) : (
                columnTasks.map((task) => (
                  <GlassCard
                    key={task.id}
                    className="kanban-task"
                    draggable={true}
                    onDragStart={(event) =>
                      handleDragStart(
                        event,
                        task
                      )
                    }
                    onDragEnd={handleDragEnd}
                  >

                    <div className="kanban-task-top">

                      {task.status === "done" ? (
                        <CheckCircle2 size={19} />
                      ) : (
                        <Circle size={19} />
                      )}

                      <button
                        type="button"
                        className="kanban-delete"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleDelete(task.id);
                        }}
                      >
                        <Trash2 size={16} />
                      </button>

                    </div>

                    <h3>
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="kanban-description">
                        {task.description}
                      </p>
                    )}

                    <div className="kanban-task-footer">

                      <span className="kanban-priority">
                        {task.priority}
                      </span>

                      {task.due_date && (
                        <span className="kanban-due-date">
                          <Clock3 size={13} />

                          {task.due_date.substring(
                            0,
                            10
                          )}
                        </span>
                      )}

                    </div>

                  </GlassCard>
                ))
              )}

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default KanbanBoard;