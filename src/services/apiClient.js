// =====================================================================
// Thin fetch wrapper for talking to the Spring Boot backend.
//
// - Prefixes every call with VITE_API_BASE_URL (see src/config/env.js)
// - Attaches "Authorization: Bearer <token>" automatically once the
//   user is logged in (see services/authService.js)
// - Normalizes error handling: any non-2xx response throws an ApiError
//   with the parsed body attached, so callers can read validation
//   messages returned by Spring's @ExceptionHandler / ResponseEntity.
// - Distinguishes "backend unreachable" (NetworkError) from
//   "backend responded with an error" (ApiError) so calling code can
//   decide whether it's safe to fall back to cached/local data.
// =====================================================================

import { API_BASE_URL } from "../config/env.js";

const TOKEN_KEY = "pinky_token";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore storage errors (e.g. private browsing) */
  }
};

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Thrown when the request never reached the server at all (backend down,
// wrong URL, CORS misconfiguration, offline, etc). Kept separate from
// ApiError so UI code and service fallbacks can treat it differently.
export class NetworkError extends Error {
  constructor(message, cause) {
    super(message);
    this.name = "NetworkError";
    this.cause = cause;
  }
}

/**
 * @param {string} path e.g. "/products" (joined onto API_BASE_URL)
 * @param {object} options
 * @param {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"} [options.method]
 * @param {any} [options.body] plain object, will be JSON-encoded
 * @param {boolean} [options.auth] attach the JWT if one is stored (default true)
 * @param {Record<string,string>} [options.headers]
 * @param {AbortSignal} [options.signal]
 */
export async function apiRequest(path, options = {}) {
  const { method = "GET", body, auth = true, headers = {}, signal } = options;

  const finalHeaders = {
    Accept: "application/json",
    ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
    ...headers,
  };

  if (auth) {
    const token = getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (err) {
    // fetch() only throws for network-level failures (DNS, connection
    // refused, CORS block, etc) — never for 4xx/5xx responses.
    throw new NetworkError(
      `Could not reach the backend at ${API_BASE_URL}${path}. Is the Spring Boot server running?`,
      err
    );
  }

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      response.statusText ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data;
}

export const api = {
  get: (path, options) => apiRequest(path, { ...options, method: "GET" }),
  post: (path, body, options) => apiRequest(path, { ...options, method: "POST", body }),
  put: (path, body, options) => apiRequest(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) => apiRequest(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => apiRequest(path, { ...options, method: "DELETE" }),
};
