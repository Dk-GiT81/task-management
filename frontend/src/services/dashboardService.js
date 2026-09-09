const API_URL = "http://localhost:8000/dashboard";

function getToken() {
  return localStorage.getItem("access_token");
}

export async function getDashboardStats() {
  const response = await fetch(`${API_URL}/stats`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to fetch dashboard stats");
  }

  return data;
}