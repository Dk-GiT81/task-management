import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import GlassCard from "../components/GlassCard";
import KanbanBoard from "../components/KanbanBoard";

import {
  getTasks,
  createTask,
} from "../services/taskService";

import { getProjects } from "../services/projectService";



function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project_id: "",
    priority: "medium",
    due_date: "",
  });


  // =========================================
  // LOAD TASKS
  // =========================================

  const loadTasks = useCallback(async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);


  // =========================================
  // LOAD TASKS WHEN PAGE OPENS
  // =========================================

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);


  // =========================================
  // LOAD PROJECTS WHEN PAGE OPENS
  // =========================================

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadProjects();
  }, []);


  // =========================================
  // HANDLE FORM CHANGES
  // =========================================

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }


  // =========================================
  // CREATE TASK
  // =========================================

  async function handleCreate(event) {
    event.preventDefault();

    try {
      await createTask({
        ...form,
        due_date: form.due_date || null,
      });

      // Reset form
      setForm({
        title: "",
        description: "",
        project_id: "",
        priority: "medium",
        due_date: "",
      });

      // Close form
      setShowForm(false);

      // Reload tasks
      await loadTasks();

    } catch (error) {
      alert(error.message);
    }
  }


  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <div className="loading-screen">
        Loading tasks...
      </div>
    );
  }


  // =========================================
  // PAGE
  // =========================================

  return (
    <div className="page-container">

      {/* =====================================
          PAGE HEADER
      ====================================== */}

      <div className="page-header">

        <div>
          <h1>
            My Tasks
          </h1>

          <p>
            Manage your tasks and track your progress.
          </p>
        </div>


        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />

          New Task
        </button>

      </div>


      {/* =====================================
          CREATE TASK FORM
      ====================================== */}

      {showForm && (

        <GlassCard className="task-form-card">

          <form onSubmit={handleCreate}>

            {/* Title */}

            <div className="form-group">

              <label>
                Task Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter task title"
                required
              />

            </div>


            {/* Description */}

            <div className="form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter task description"
              />

            </div>


            {/* Project / Priority / Due Date */}

            <div className="form-row">

              {/* Project */}

              <div className="form-group">

                <label>
                  Project
                </label>

                <select
                  name="project_id"
                  value={form.project_id}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select a project
                  </option>

                  {projects.map((project) => (

                    <option
                      key={project.id}
                      value={project.id}
                    >
                      {project.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* Priority */}

              <div className="form-group">

                <label>
                  Priority
                </label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                >

                  <option value="low">
                    Low
                  </option>

                  <option value="medium">
                    Medium
                  </option>

                  <option value="high">
                    High
                  </option>

                </select>

              </div>


              {/* Due Date */}

              <div className="form-group">

                <label>
                  Due Date
                </label>

                <input
                  type="date"
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                />

              </div>

            </div>


            {/* Create */}

            <button
              className="primary-button"
              type="submit"
            >
              Create Task
            </button>

          </form>

        </GlassCard>

      )}


      {/* =====================================
          KANBAN BOARD
      ====================================== */}

      <KanbanBoard
        tasks={tasks}
        onTasksChange={loadTasks}
      />

    </div>
  );
}


export default Tasks;