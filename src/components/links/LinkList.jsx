import React from "react";
import { AnimatePresence } from "framer-motion";
import { Link2Off } from "lucide-react";
import LinkCard from "./LinkCard";

/**
 * LinkList — renders a list of LinkCards or an empty state.
 *
 * Props:
 *  links       object[]
 *  onDelete    (id) => void
 *  deletingId  string|null  — id of the link currently being deleted
 *  loading     boolean
 */
export default function LinkList({ links, onDelete, deletingId, loading }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-16 rounded-xl bg-white/5 animate-pulse"
            style={{ opacity: 1 - i * 0.15 }}
          />
        ))}
      </div>
    );
  }

  if (!links.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4">
          <Link2Off className="w-8 h-8 text-gray-600" />
        </div>
        <p className="text-white font-medium mb-1">No links yet</p>
        <p className="text-sm text-gray-500">
          Create your first short link to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <AnimatePresence initial={false}>
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onDelete={onDelete}
            isDeleting={deletingId === link.id}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
