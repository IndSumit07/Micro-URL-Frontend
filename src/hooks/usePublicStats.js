/**
 * @file usePublicStats.js
 * @description Hook that fetches real-time public platform stats from the backend
 * (total clicks, active links, avg redirect ms) and returns them with a loading state.
 * Falls back gracefully if the backend is unavailable.
 */

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';
const POLL_INTERVAL_MS = 30_000; // refresh every 30s

/**
 * @returns {{ stats: object|null, loading: boolean, error: string|null }}
 */
const usePublicStats = () => {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const intervalRef           = useRef(null);

  const fetchStats = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/api/stats/public`, {
        timeout: 8000,
      });
      // data shape: { statusCode, success, data: { total_clicks, active_links, avg_redirect_ms } }
      const payload = data?.data ?? data;
      setStats({
        totalClicks:   Number(payload.total_clicks    ?? 0),
        activeLinks:   Number(payload.active_links    ?? 0),
        avgRedirectMs: payload.avg_redirect_ms != null
          ? Number(payload.avg_redirect_ms)
          : null,
      });
      setError(null);
    } catch (err) {
      // Don't wipe existing data on a refresh failure — just mark stale
      if (isInitial) setError(err.message);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(true);
    intervalRef.current = setInterval(() => fetchStats(false), POLL_INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, []);

  return { stats, loading, error };
};

export default usePublicStats;
