import { useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";

import GlassCard from "../components/GlassCard";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../services/projectService";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  async function loadProjects() {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  function openCreateForm() {
    setEditingProject(null);
    setForm({
      name: "",
      description: "",
    });
    setShowForm(true);
  }

  function openEditForm(project) {
    setEditingProject(project);
    setForm({
      name: project.name,
      description: project.description || "",
    });
    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (editingProject) {
        await updateProject(editingProject.id, form);
      } else {
        await createProject(form);
      }

      setShowForm(false);
      setEditingProject(null);

      setForm({
        name: "",
        description: "",
      });

      await loadProjects();
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleDelete(projectId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(projectId);
      await loadProjects();
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="loading-screen">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Create and manage your projects.</p>
        </div>

        <button
          className="primary-button"
          onClick={openCreateForm}
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {showForm && (
        <GlassCard className="project-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter project name"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter project description"
              />
            </div>

            <div className="project-form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
              >
                {editingProject
                  ? "Update Project"
                  : "Create Project"}
              </button>
            </div>
          </form>
        </GlassCard>
      )}

      {projects.length === 0 ? (
        <GlassCard className="projects-empty">
          <h2>No projects yet</h2>
          <p>Create your first project to get started.</p>
        </GlassCard>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <GlassCard
              key={project.id}
              className="project-card"
            >
              <div className="project-card-content">
                <h2>{project.name}</h2>

                <p>
                  {project.description ||
                    "No description provided."}
                </p>
              </div>

              <div className="project-card-actions">
                <button
                  className="icon-button"
                  onClick={() => openEditForm(project)}
                  title="Edit project"
                >
                  <Pencil size={17} />
                </button>

                <button
                  className="icon-button danger"
                  onClick={() => handleDelete(project.id)}
                  title="Delete project"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;