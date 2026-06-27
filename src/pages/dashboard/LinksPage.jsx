import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Check, Copy, ExternalLink, X } from "lucide-react";
import { useLinks } from "../../hooks/useLinks";
import CreateLinkForm from "../../components/links/CreateLinkForm";
import LinkList from "../../components/links/LinkList";

export default function LinksPage() {
  const { links, loading, creating, deletingId, totalCount, createLink, deleteLink } = useLinks();
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState("");
  const [createdLink, setCreatedLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const getShortUrl = (link) => {
    if (!link) return "";
    return link.short_url ?? `${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000"}/${link.short_code}`;
  };

  const handleCopy = (link) => {
    const url = getShortUrl(link);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreate = async (payload) => {
    const newLink = await createLink(payload);
    setShowForm(false);
    setCreatedLink(newLink);
  };

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
      <div className="flex justify-between items-end gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">My Links</h2>
          <p className="text-sm text-gray-400">
            {loading ? "Loading…" : `${totalCount.toLocaleString()} total links`}
          </p>
        </div>
        
        {/* Toggle form button shown ONLY on mobile/tablet since it's inline on desktop */}
        <button
          onClick={() => setShowForm((v) => !v)}
          className="lg:hidden flex items-center gap-2 bg-gradient-to-r from-primary to-[#cc0022] hover:from-[#ff1a4b] hover:to-primary text-white text-sm font-semibold rounded-xl px-4 py-2.5 transition-all shadow-[0_0_15px_rgba(255,0,51,0.3)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)] w-fit"
        >
          <Plus className="w-4 h-4" />
          Shorten Link
        </button>
      </div>

      {/* Mobile/Tablet toggleable Create Form */}
      <AnimatePresence>
        {showForm && (
          <div className="lg:hidden mb-6">
            <CreateLinkForm
              onSubmit={handleCreate}
              creating={creating}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Side: Dedicated Create Link Form (Always visible on Desktop) */}
        <div className="hidden lg:block lg:col-span-1 sticky top-6">
          <CreateLinkForm
            onSubmit={handleCreate}
            creating={creating}
            isInline={true}
          />
        </div>

        {/* Right Side: Links List & Search */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search links by URL, alias, or title…"
              className="w-full bg-[#111] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            />
          </div>

          {/* Links list panel */}
          <div className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-4 shadow-lg">
            <LinkList
              links={filtered}
              onDelete={deleteLink}
              deletingId={deletingId}
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* Created Link Popup */}
      <AnimatePresence>
        {createdLink && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-6"
            >
              <button
                onClick={() => setCreatedLink(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Link Created!</h3>
                  <p className="text-sm text-gray-400">Your short link is ready.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-xl p-3 mb-6">
                <div className="flex-1 truncate text-white font-medium">
                  {getShortUrl(createdLink)}
                </div>
                <button
                  onClick={() => handleCopy(createdLink)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex gap-3">
                <a
                  href={getShortUrl(createdLink)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl transition-colors font-medium text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Link
                </a>
                <button
                  onClick={() => setCreatedLink(null)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-[#ff1a4b] text-white py-2.5 rounded-xl transition-colors font-medium text-sm shadow-[0_0_15px_rgba(255,0,51,0.3)]"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
