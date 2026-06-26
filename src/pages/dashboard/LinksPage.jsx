import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter } from "lucide-react";
import { useLinks } from "../../hooks/useLinks";
import CreateLinkForm from "../../components/links/CreateLinkForm";
import LinkList from "../../components/links/LinkList";

export default function LinksPage() {
  const { links, loading, creating, deletingId, totalCount, createLink, deleteLink } = useLinks();
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? links.filter(
        (l) =>
          l.short_code?.toLowerCase().includes(query.toLowerCase()) ||
          l.long_url?.toLowerCase().includes(query.toLowerCase()) ||
          l.title?.toLowerCase().includes(query.toLowerCase())
      )
    : links;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My Links</h2>
          <p className="text-sm text-gray-400">
            {loading ? "Loading…" : `${totalCount.toLocaleString()} total links`}
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#cc0022] hover:from-[#ff1a4b] hover:to-primary text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-all shadow-[0_0_15px_rgba(255,0,51,0.3)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)] w-fit"
        >
          <Plus className="w-4 h-4" />
          New Link
        </button>
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showForm && (
          <CreateLinkForm
            onSubmit={async (payload) => {
              await createLink(payload);
              setShowForm(false);
            }}
            creating={creating}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>

      {/* Search bar */}
      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search links by URL, alias, or title…"
          className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      {/* Links panel */}
      <div className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-4 shadow-lg">
        <LinkList
          links={filtered}
          onDelete={deleteLink}
          deletingId={deletingId}
          loading={loading}
        />
      </div>
    </motion.div>
  );
}
