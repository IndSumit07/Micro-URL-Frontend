import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import {
  Home,
  TrendingUp,
  Link2,
  Settings,
  Info,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { icon: Home, path: "/dashboard", label: "Overview" },
  { icon: Link2, path: "/dashboard/links", label: "My Links" },
  { icon: TrendingUp, path: "/dashboard/analytics", label: "Analytics" },
  { icon: Settings, path: "/dashboard/settings", label: "Settings" },
];

export default function DashboardLayout() {
  const { user, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  const displayName =
    user?.user_metadata?.full_name ??
    user?.email?.split("@")[0] ??
    "User";
  const avatarLetter = displayName.charAt(0).toUpperCase();
  const email = user?.email ?? "";

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden selection:bg-primary/30">
      {/* ── Sidebar ─────────────────────────────────────────────────────── */}
      <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col transition-all duration-300 z-20 shrink-0">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-white/5">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#80001a] flex items-center justify-center shadow-[0_0_15px_rgba(255,0,51,0.5)]">
              <span className="font-bold text-white text-lg">X</span>
            </div>
            <span className="font-bold text-xl tracking-tight hidden lg:block">
              Micro
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-8 flex flex-col gap-2 px-3 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded-xl transition-all
                 ${
                   isActive
                     ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(255,0,51,0.1)]"
                     : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                 }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium hidden lg:block">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Help + User */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <NavLink
            to="/dashboard/help"
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-3 rounded-xl transition-all
               ${isActive ? "bg-primary/10 text-primary border border-primary/20" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"}`
            }
          >
            <Info className="w-5 h-5 shrink-0" />
            <span className="font-medium hidden lg:block">Help & Support</span>
          </NavLink>

          {/* User mini profile */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                {avatarLetter}
              </div>
              <div className="hidden lg:block text-left flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-500 hidden lg:block shrink-0 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute bottom-full left-0 right-0 mb-2 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
                >
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      navigate("/dashboard/settings");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden lg:block">Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:block">Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col relative overflow-hidden bg-[#050505]">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[500px] bg-gradient-to-b from-[#ff0033]/15 to-transparent blur-[120px] pointer-events-none z-0" />

        {/* Topbar */}
        <header className="h-20 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white hidden md:block">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search links..."
                className="bg-[#111] border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary/50 text-white w-56 lg:w-72 placeholder:text-gray-500 transition-all focus:shadow-[0_0_15px_rgba(255,0,51,0.1)]"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-full border border-white/5 hover:bg-white/5 hover:text-white text-gray-400 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_6px_rgba(255,0,51,0.8)]" />
            </button>

            {/* Avatar */}
            <div
              onClick={() => setUserMenuOpen((v) => !v)}
              className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-sm cursor-pointer hover:border-primary/60 transition-colors shadow-[0_0_10px_rgba(255,0,51,0.2)]"
            >
              {avatarLetter}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 z-10 relative custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
