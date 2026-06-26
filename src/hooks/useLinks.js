import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import * as linksApi from "../api/links.api";

/**
 * useLinks — manages the user's link list state.
 *
 * Returns:
 *  links        – array of link objects
 *  loading      – initial fetch in progress
 *  creating     – create mutation in progress
 *  deleting     – delete mutation in progress (link id or null)
 *  totalCount   – total link count
 *  refetch      – manually re-fetch links
 *  createLink   – (payload) => Promise<link>
 *  deleteLink   – (id) => Promise<void>
 *  updateLink   – (id, updates) => Promise<link>
 */
export function useLinks() {
  const [links, setLinks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  // ── Fetch ─────────────────────────────────────────────────────────────────
  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const [linkList, countData] = await Promise.all([
        linksApi.getUserLinks({ page: 1, limit: 50 }),
        linksApi.getLinkCount(),
      ]);
      setLinks(linkList ?? []);
      setTotalCount(countData?.count ?? linkList?.length ?? 0);
    } catch (err) {
      // Don't toast on auth errors — those are handled globally
      if (!err.message?.includes("401")) {
        toast.error(err.message ?? "Failed to load links.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  // ── Create ─────────────────────────────────────────────────────────────────
  const createLink = useCallback(async (payload) => {
    setCreating(true);
    try {
      const newLink = await linksApi.createLink(payload);
      setLinks((prev) => [newLink, ...prev]);
      setTotalCount((c) => c + 1);
      toast.success("Short link created!");
      return newLink;
    } catch (err) {
      toast.error(err.message ?? "Failed to create link.");
      throw err;
    } finally {
      setCreating(false);
    }
  }, []);

  // ── Delete ─────────────────────────────────────────────────────────────────
  const deleteLink = useCallback(async (id) => {
    setDeletingId(id);
    try {
      await linksApi.deleteLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
      setTotalCount((c) => Math.max(0, c - 1));
      toast.success("Link deleted.");
    } catch (err) {
      toast.error(err.message ?? "Failed to delete link.");
    } finally {
      setDeletingId(null);
    }
  }, []);

  // ── Update ─────────────────────────────────────────────────────────────────
  const updateLink = useCallback(async (id, updates) => {
    try {
      const updated = await linksApi.updateLink(id, updates);
      setLinks((prev) => prev.map((l) => (l.id === id ? updated : l)));
      toast.success("Link updated.");
      return updated;
    } catch (err) {
      toast.error(err.message ?? "Failed to update link.");
      throw err;
    }
  }, []);

  return {
    links,
    loading,
    creating,
    deletingId,
    totalCount,
    refetch: fetchLinks,
    createLink,
    deleteLink,
    updateLink,
  };
}
