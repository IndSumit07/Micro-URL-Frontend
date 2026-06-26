import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Sparkles, Calendar, Tag, ChevronDown, Check, Copy } from "lucide-react";

/**
 * CreateLinkForm — modal-style or inline-style form to shorten a URL.
 * Now features an inline mode option for sidebars.
 */
export default function CreateLinkForm({ onSubmit, creating, onClose, isInline = false }) {
  const [form, setForm] = useState({
    longUrl: "",
    title: "",
    customCode: "",
    expiresAt: "",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [successLink, setSuccessLink] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.longUrl.trim()) return;

    const payload = {
      longUrl: form.longUrl.trim(),
      ...(form.title.trim() && { title: form.title.trim() }),
      ...(form.customCode.trim() && { customCode: form.customCode.trim() }),
      ...(form.expiresAt && { expiresAt: new Date(form.expiresAt).toISOString() }),
    };

    try {
      const newLink = await onSubmit(payload);
      if (newLink) {
        setSuccessLink(newLink);
      }
    } catch (err) {
      // Error handled by useLinks toast
    }
  };

  const handleCopy = async () => {
    if (!successLink?.short_url) return;
    try {
      await navigator.clipboard.writeText(successLink.short_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const resetForm = () => {
    setForm({ longUrl: "", title: "", customCode: "", expiresAt: "" });
    setSuccessLink(null);
    setShowAdvanced(false);
  };

  const inputClass =
    "w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm";

  return (
    <motion.div
      initial={isInline ? {} : { opacity: 0, scale: 0.96, y: -10 }}
      animate={isInline ? {} : { opacity: 1, scale: 1, y: 0 }}
      exit={isInline ? {} : { opacity: 0, scale: 0.96 }}
      className={`${isInline ? 'w-full bg-[#111]/30 hover:bg-[#111]/45 border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-colors' : 'bg-[#0e0e0e] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden'}`}
    >
      <AnimatePresence mode="wait">
        {successLink ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col items-center justify-center py-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Link Created!</h3>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              Your tiny URL is ready to share. Watch the clicks roll in!
            </p>
            
            <div className="w-full bg-[#111] border border-white/10 rounded-xl p-1 pl-4 flex items-center justify-between mb-8 shadow-inner group">
              <span className="text-primary font-medium truncate pr-4 text-xs">
                {successLink.short_url.replace(/^https?:\/\//, "")}
              </span>
              <button
                onClick={handleCopy}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-2 shrink-0 group-hover:border-primary/50 group-hover:text-primary group-hover:bg-primary/10"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>

            <div className="flex gap-3 w-full">
              {!isInline && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Done
                </button>
              )}
              <button
                type="button"
                onClick={resetForm}
                className={`${isInline ? 'w-full' : 'flex-1'} bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl py-3 text-sm transition-all`}
              >
                Shorten Another
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={isInline ? {} : { opacity: 0, x: -20 }}
            animate={isInline ? {} : { opacity: 1, x: 0 }}
            exit={isInline ? {} : { opacity: 0, x: 20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white">Shorten URL</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Paste your long URL and we'll make it tiny.
                </p>
              </div>
              {!isInline && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-500 hover:text-white transition-colors text-2xl leading-none"
                >
                  ×
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Long URL */}
              <div className="relative">
                <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="url"
                  id="longUrl"
                  value={form.longUrl}
                  onChange={set("longUrl")}
                  required
                  placeholder="https://your-long-url.com"
                  className={inputClass}
                />
              </div>

              {/* Advanced toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? "rotate-180" : ""}`}
                />
                Advanced options
              </button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {/* Title */}
                    <div className="relative">
                      <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={form.title}
                        onChange={set("title")}
                        placeholder="Title (optional)"
                        className={inputClass}
                      />
                    </div>

                    {/* Custom Code */}
                    <div className="relative">
                      <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={form.customCode}
                        onChange={set("customCode")}
                        placeholder="Custom alias (e.g. my-link)"
                        className={inputClass}
                      />
                    </div>

                    {/* Expiry */}
                    <div className="relative pb-2">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="datetime-local"
                        value={form.expiresAt}
                        onChange={set("expiresAt")}
                        className={`${inputClass} cursor-pointer [color-scheme:dark]`}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <div className="flex gap-3 pt-2">
                {!isInline && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={creating || !form.longUrl.trim()}
                  className={`${isInline ? 'w-full' : 'flex-1'} bg-gradient-to-r from-primary to-[#cc0022] hover:from-[#ff1a4b] hover:to-primary text-white font-semibold rounded-xl py-3 text-sm transition-all shadow-[0_0_20px_rgba(255,0,51,0.3)] hover:shadow-[0_0_30px_rgba(255,0,51,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {creating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating…
                    </>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
