import axios from "axios";
import supabase from "../lib/supabaseClient";

// ─────────────────────────────────────────────────────────────────────────────
// Axios instance
// ─────────────────────────────────────────────────────────────────────────────

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000",
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ── Request interceptor: attach fresh Supabase JWT ───────────────────────────
axiosClient.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: normalise errors ────────────────────────────────────
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Unwrap the API error message if available
    const message =
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred.";
    return Promise.reject(new Error(message));
  }
);

export default axiosClient;
