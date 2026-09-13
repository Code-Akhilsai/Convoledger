const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export async function registerUser({ name, email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  if (data.token) localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Invalid email or password");
  }

  if (data.token) localStorage.setItem("token", data.token);
  if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function fetchCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch user");
  }
  return data.user;
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  fetch(`${API_BASE_URL}/auth/logout`, { method: "POST" }).catch(() => {});
}

export function getCurrentUser() {
  try {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export async function createConversation({ title, content }) {
  const response = await fetch(`${API_BASE_URL}/conversations`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, content }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to process conversation");
  }
  return data;
}

export async function fetchConversations() {
  const response = await fetch(`${API_BASE_URL}/conversations`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch conversations");
  }
  return data.conversations || [];
}

export async function fetchConversationById(id) {
  const response = await fetch(`${API_BASE_URL}/conversations/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch conversation");
  }
  return data.conversation;
}

export async function deleteConversation(id) {
  const response = await fetch(`${API_BASE_URL}/conversations/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete conversation");
  }
  return data;
}

export async function fetchDashboardMetrics() {
  const response = await fetch(`${API_BASE_URL}/dashboard/metrics`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch dashboard metrics");
  }
  return data;
}
