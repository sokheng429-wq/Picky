// =====================================================================
// Central place that reads build-time environment variables.
// Vite only exposes variables prefixed with VITE_ to client code, and
// only through import.meta.env (see .env.example).
// =====================================================================

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://pinky-backend.onrender.com/api,https://pinky-backend.onrender.com,https://pinky-backend.onrender.com/api/products";

// True once the person has actually pointed the app at a backend
// (either via .env or the default above). Kept as its own flag in case
// we want to change the "no backend configured" behaviour later.
export const IS_BACKEND_CONFIGURED = true;

export const IS_DEV = import.meta.env.DEV;
