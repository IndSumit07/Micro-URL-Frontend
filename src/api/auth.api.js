/**
 * @file auth.api.js
 * @description Auth API — all auth is handled via Supabase client SDK directly
 * in AuthContext. This file exists as the place to add any backend /api/auth
 * endpoints if needed (e.g., server-side profile management).
 */

import axiosClient from "./axiosClient";

/** Fetch the authenticated user's profile from the backend (if needed) */
export async function getProfile() {
  const { data } = await axiosClient.get("/api/auth/profile");
  return data.data;
}
