const TOKEN_KEY = "token";
const API_BASE = "";

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function requireAuth() {
  if (!getToken()) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

export function showMessage(element, type, text) {
  if (!element) return;
  element.textContent = text;
  element.className = `message message--${type} is-visible`;
}

export function hideMessage(element) {
  if (!element) return;
  element.textContent = "";
  element.className = "message";
}

export function setButtonLoading(button, isLoading, loadingLabel) {
  if (!button) return;
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = `<span class="spinner" aria-hidden="true"></span> ${loadingLabel}`;
  } else {
    button.disabled = false;
    button.textContent = button.dataset.originalText ?? button.textContent;
  }
}

function extractToken(data) {
  if (!data || typeof data !== "object") return null;
  if (typeof data.token === "string") return data.token;
  if (data.data?.token) return data.data.token;
  if (data.data?.user?.token) return data.data.user.token;
  return null;
}

function extractErrorMessage(data, fallback) {
  if (!data) return fallback;
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.message ?? e).join(", ");
  }
  return fallback;
}

export async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers ?? {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  let data = null;
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const message = extractErrorMessage(
      data,
      response.statusText || "Request failed",
    );
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return { data, response, extractToken: () => extractToken(data) };
}

export function normalizePosts(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.posts)) return data.posts;
  return [];
}

export function normalizeUser(data) {
  if (!data) return null;
  if (data.email) return data;
  if (data.data?.user) return data.data.user;
  if (data.user) return data.user;
  return data.data ?? null;
}

export function renderPost(post) {
  const title = post.title ?? post.name ?? "Untitled";
  const body = post.body ?? post.content ?? post.description ?? "";
  const meta = post.createdAt ?? post.created_at ?? post.date ?? "";

  const li = document.createElement("li");
  li.className = "post-item";
  li.innerHTML = `
    <h3 class="post-item__title"></h3>
    <p class="post-item__body"></p>
    ${meta ? '<p class="post-item__meta"></p>' : ""}
  `;
  li.querySelector(".post-item__title").textContent = title;
  li.querySelector(".post-item__body").textContent = body;
  if (meta) {
    li.querySelector(".post-item__meta").textContent = new Date(
      meta,
    ).toLocaleString();
  }
  return li;
}
