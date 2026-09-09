const API_URL = `${import.meta.env.VITE_API_URL}/projects`;

function getToken() {
  return localStorage.getItem("access_token");
}

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Request failed");
  }

  return data;
}

export async function getProjects() {
  const response = await fetch(`${API_URL}/`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return handleResponse(response);
}

export async function createProject(project) {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(project),
  });

  return handleResponse(response);
}

export async function updateProject(projectId, project) {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(project),
  });

  return handleResponse(response);
}

export async function deleteProject(projectId) {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return handleResponse(response);
}