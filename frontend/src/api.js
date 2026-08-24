const API_BASE = "/api";

export function getToken() {
  return localStorage.getItem("mindmate_token");
}

export function setSession(token, username) {
  if (token) localStorage.setItem("mindmate_token", token);
  else localStorage.removeItem("mindmate_token");

  if (username) localStorage.setItem("mindmate_username", username);
  else localStorage.removeItem("mindmate_username");
}

export function getUsername() {
  return localStorage.getItem("mindmate_username");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export const api = {
  register: (username, password) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  login: (username, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getEntries: () => request("/entries"),

  saveEntry: (entry) =>
    request("/entries", {
      method: "POST",
      body: JSON.stringify(entry),
    }),

  deleteEntry: (date) =>
    request(`/entries/${date}`, {
      method: "DELETE",
    }),

  getStats: () => request("/stats"),

  chat: (text) =>
    request("/ai/chat", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),
};