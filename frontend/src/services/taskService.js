const API_URL = "http://localhost:8000/tasks";

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getTasks(projectId = null) {
  const url = projectId
    ? `${API_URL}/?project_id=${projectId}`
    : `${API_URL}/`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch tasks");
  }

  return data;
}

export async function createTask(task) {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to create task");
  }

  return data;
}

export async function updateTask(taskId, task) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(task),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to update task");
  }

  return data;
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to delete task");
  }

  return data;
}