import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, LogOut, Trash2, Save } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function SettingsPage() {
  const { user, signOut } = useAuth();

  const [displayName, setDisplayName] = useState(
    user?.user_metadata?.full_name ?? ""
  );
  const [saved, setSaved] = useState(false);

  const email = user?.email ?? "";

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: call supabase.auth.updateUser({ data: { full_name: displayName } })
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass =
    "w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Settings</h2>
        <p className="text-sm text-gray-400">
          Manage your account profile and preferences.
        </p>
      </div>

      {/* Profile */}
      <section className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-6 shadow-lg space-y-6">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-white">Profile</h3>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">
              Display Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                className={`${inputClass} pl-11`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                value={email}
                disabled
                className={`${inputClass} pl-11 opacity-50 cursor-not-allowed`}
              />
            </div>
            <p className="text-xs text-gray-600 ml-1">
              Email cannot be changed here. Contact support to update it.
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#cc0022] hover:from-[#ff1a4b] hover:to-primary text-white font-medium rounded-xl py-2.5 px-5 text-sm transition-all shadow-[0_0_15px_rgba(255,0,51,0.3)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)]"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Security */}
      <section className="bg-[#0e0e0e] border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-white">Security</h3>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-white font-medium">Password</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Managed by Supabase Auth.
            </p>
          </div>
          <button
            onClick={() =>
              window.open(
                `${import.meta.env.VITE_SUPABASE_URL}/auth/v1/recover`,
                "_blank"
              )
            }
            className="text-sm text-primary hover:underline"
          >
            Reset
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="bg-[#0e0e0e] border border-red-500/20 rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Trash2 className="w-5 h-5 text-red-400" />
          <h3 className="font-semibold text-red-400">Danger Zone</h3>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm text-white font-medium">Sign Out</p>
            <p className="text-xs text-gray-500 mt-0.5">
              Sign out of your account on this device.
            </p>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/60 px-4 py-2 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </section>
    </motion.div>
  );
}
