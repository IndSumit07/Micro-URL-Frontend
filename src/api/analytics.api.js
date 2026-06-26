/**
 * @file analytics.api.js
 * @description Placeholder analytics API layer.
 * Extend once the analytics module is built in the backend.
 */

import axiosClient from "./axiosClient";

const BASE = "/api/analytics";

/** Fetch click analytics for a specific link */
export async function getLinkAnalytics(linkId, { period = "7d" } = {}) {
  const { data } = await axiosClient.get(`${BASE}/${linkId}`, {
    params: { period },
  });
  return data.data;
}

/** Fetch overall analytics summary for the authenticated user */
export async function getUserAnalytics({ days = 7, linkIds = "" } = {}) {
  const { data } = await axiosClient.get(`${BASE}/overview`, { params: { days, linkIds } });
  return data.data;
}
