const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function createConversation({ title, content }) {
  const response = await fetch(`${API_BASE_URL}/conversations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to process conversation");
  }
  return data;
}

export async function fetchConversations() {
  const response = await fetch(`${API_BASE_URL}/conversations`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch conversations");
  }
  return data.conversations || [];
}

export async function fetchConversationById(id) {
  const response = await fetch(`${API_BASE_URL}/conversations/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch conversation");
  }
  return data.conversation;
}

export async function deleteConversation(id) {
  const response = await fetch(`${API_BASE_URL}/conversations/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete conversation");
  }
  return data;
}

export async function fetchDashboardMetrics() {
  const response = await fetch(`${API_BASE_URL}/dashboard/metrics`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch dashboard metrics");
  }
  return data;
}
