// =====================================================================
// Auth service.
//
// Matches a typical Spring Security + JWT setup:
//   POST /api/auth/register  { name, email, password } -> { token, user }
//   POST /api/auth/login     { email, password }        -> { token, user }
//   GET  /api/auth/me                                    -> { id, name, email, role }
//
// The JWT is stored in localStorage and attached to every subsequent
// apiRequest() call automatically (see services/apiClient.js). Adjust
// the endpoint paths/payload shape here if your Spring Boot controller
// uses different field names — this is the only file that needs to change.
// =====================================================================

import { api, setToken, getToken } from "./apiClient.js";

const USER_KEY = "pinky_user";

const persistSession = (data) => {
  if (data?.token) setToken(data.token);
  if (data?.user) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    } catch {
      /* ignore storage errors */
    }
  }
  return data;
};

export const register = async ({ name, email, password }) => {
  const data = await api.post("/auth/register", { name, email, password }, { auth: false });
  return persistSession(data);
};

export const login = async ({ email, password }) => {
  const data = await api.post("/auth/login", { email, password }, { auth: false });
  return persistSession(data);
};

export const fetchCurrentUser = () => api.get("/auth/me");

export const logout = () => {
  setToken(null);
  try {
    localStorage.removeItem(USER_KEY);
  } catch {
    /* ignore */
  }
};

export const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getToken());
