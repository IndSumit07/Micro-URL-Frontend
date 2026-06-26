import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  ExternalLink,
  Trash2,
  Check,
  Link2,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

/**
 * LinkCard — displays a single short link with copy, open, and delete actions.
 *
 * Props:
 *  link       object  — link record from API
 *  onDelete   (id) => void
 *  isDeleting boolean
 */
export default function LinkCard({ link, onDelete, isDeleting }) {
  const [copied, setCopied] = useState(false);

  const shortUrl = link.short_url ?? `http://localhost:4000/${link.short_code}`;
  const displayLong =
    link.long_url.length > 50
      ? link.long_url.slice(0, 50) + "…"
      : link.long_url;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  const formattedDate = new Date(link.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const shortCode = link.short_code ?? shortUrl.split("/").pop();
  const initial = shortCode.charAt(0).toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="group flex items-center justify-between p-3.5 hover:bg-white/5 rounded-xl transition-all border border-transparent hover:border-white/5 gap-3"
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,0,51,0.2)]">
        <span className="text-sm font-bold">{initial}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white font-medium group-hover:text-primary transition-colors truncate">
          {shortUrl.replace("http://", "").replace("https://", "")}
        </p>
        <p className="text-xs text-gray-500 truncate mt-0.5">
          {link.title ?? displayLong}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-[10px] text-gray-600 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {formattedDate}
          </span>
          <span className="text-[10px] text-gray-600 flex items-center gap-1">
            <Link2 className="w-2.5 h-2.5" />
            {(link.click_count ?? 0).toLocaleString()} clicks
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Copy */}
        <button
          onClick={handleCopy}
          title="Copy short URL"
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check className="w-4 h-4 text-green-400" />
              </motion.span>
            ) : (
              <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <Copy className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Open */}
        <a
          href={shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open link"
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Delete */}
        <button
          onClick={() => onDelete(link.id)}
          disabled={isDeleting}
          title="Delete link"
          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-40"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
