/**
 * @file links.api.js
 * @description API layer for the links module.
 * All requests are made via axiosClient which auto-attaches the JWT.
 */

import axiosClient from "./axiosClient";

const BASE = "/api/links";

/** Create a new short link */
export async function createLink(payload) {
  const { data } = await axiosClient.post(BASE, payload);
  return data.data; // ApiResponse wrapper → .data
}

/** Get all links for the authenticated user (paginated) */
export async function getUserLinks({ page = 1, limit = 20 } = {}) {
  const { data } = await axiosClient.get(BASE, {
    params: { page, limit },
  });
  return data.data;
}

/** Get a single link by UUID */
export async function getLink(id) {
  const { data } = await axiosClient.get(`${BASE}/${id}`);
  return data.data;
}

/** Update mutable fields on a link */
export async function updateLink(id, updates) {
  const { data } = await axiosClient.patch(`${BASE}/${id}`, updates);
  return data.data;
}

/** Delete a link permanently */
export async function deleteLink(id) {
  const { data } = await axiosClient.delete(`${BASE}/${id}`);
  return data.data;
}

/** Get the total link count for the authenticated user */
export async function getLinkCount() {
  const { data } = await axiosClient.get(`${BASE}/count`);
  return data.data; // { count: number }
}
