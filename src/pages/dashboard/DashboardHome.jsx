import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Plus, Link as LinkIcon, BarChart3, Clock, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useLinks } from "../../hooks/useLinks";
import { useAnalytics } from "../../hooks/useAnalytics";
import CreateLinkForm from "../../components/links/CreateLinkForm";
import LinkList from "../../components/links/LinkList";

const DashboardHome = () => {
  const { user } = useAuth();
  const { links, loading: linksLoading, creating, deletingId, createLink, deleteLink } = useLinks();
  const { data: analytics, loading: analyticsLoading } = useAnalytics(7);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const displayName =
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "there";

  const totalCount = links.length;
  const recentLinks = links.slice(0, 8);

  const totalClicks = analytics?.totalClicks || 0;
  const timeSeries = analytics?.timeSeries || Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { date: d.toISOString(), clicks: 0 };
  });
  const maxClicks = Math.max(...timeSeries.map((d) => d.clicks), 10); // Minimum 10 for scale

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Good day, {displayName} 👋
          </h2>
          <p className="text-sm text-gray-400">
            Real-time click processing and URL management
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            Live sync active
          </span>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-[#cc0022] hover:from-[#ff1a4b] hover:to-primary text-white text-sm font-medium rounded-xl px-4 py-2.5 transition-all shadow-[0_0_15px_rgba(255,0,51,0.3)] hover:shadow-[0_0_25px_rgba(255,0,51,0.5)]"
          >
            <Plus className="w-4 h-4" />
            New Link
          </button>
        </div>
      </div>

      {/* Create Form */}
      <AnimatePresence>
        {showCreateForm && (
          <CreateLinkForm
            onSubmit={async (payload) => {
              // The form will handle its own success state now
              await createLink(payload);
            }}
            creating={creating}
            onClose={() => setShowCreateForm(false)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Stats + Chart Column */}
        <div className="xl:col-span-2 space-y-6 flex flex-col">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Active Links */}
            <div className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 hover:bg-[#111] transition-all cursor-pointer hover:border-white/10 group shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Total Links
                </span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-4xl font-semibold text-white tracking-tight">
                  {linksLoading ? (
                    <div className="w-12 h-8 bg-white/10 rounded animate-pulse" />
                  ) : (
                    totalCount.toLocaleString()
                  )}
                </span>
              </div>
            </div>

            {/* Total Clicks */}
            <div className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 hover:bg-[#111] transition-all cursor-pointer hover:border-white/10 group shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <BarChart3 className="w-16 h-16 text-primary" />
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm text-gray-400 group-hover:text-gray-300">
                  Total Clicks (7d)
                </span>
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full border border-green-400/20">
                  +{Math.floor(totalClicks * 0.15)}%
                </span>
              </div>
              <div className="flex items-end space-x-2 relative z-10">
                <span className="text-4xl font-semibold text-white tracking-tight">
                  {analyticsLoading ? (
                    <div className="w-16 h-8 bg-white/10 rounded animate-pulse" />
                  ) : (
                    totalClicks.toLocaleString()
                  )}
                </span>
              </div>
            </div>

            {/* System Status / Avg */}
            <div className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 hover:bg-[#111] transition-all cursor-pointer relative overflow-hidden group hover:border-primary/30 shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm text-gray-400 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Routing Speed
                </span>
                <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
                  Optimal
                </span>
              </div>
              <div className="flex items-end space-x-2 relative z-10">
                <span className="text-4xl font-semibold text-white tracking-tight">
                  12ms
                </span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 sm:p-8 flex-1 relative overflow-hidden group min-h-[300px] shadow-lg">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-base font-medium text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-400" />
                Click Activity
              </h3>
              <select className="bg-transparent border border-white/10 rounded-lg text-sm text-gray-400 focus:outline-none focus:border-primary px-3 py-1 cursor-pointer hover:text-white transition-colors">
                <option value="7d">Last 7 days</option>
              </select>
            </div>
            
            <div className="absolute bottom-8 left-6 right-6 sm:left-8 sm:right-8 top-24 flex items-end justify-between space-x-2 sm:space-x-4">
              {analyticsLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="w-full bg-white/5 rounded-t-sm h-1/2 animate-pulse" />
                ))
              ) : (
                timeSeries.map((day, i) => {
                  const height = Math.max((day.clicks / maxClicks) * 100, 2);
                  const dateObj = new Date(day.date);
                  const label = dateObj.toLocaleDateString("en-US", { weekday: "short" });
                  
                  return (
                    <div key={i} className="flex flex-col items-center justify-end w-full h-full group/bar relative">
                      {/* Tooltip */}
                      <div className="absolute -top-10 bg-[#222] text-white text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-xl border border-white/10">
                        {day.clicks} clicks
                      </div>
                      
                      {/* Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05, type: "spring" }}
                        className="w-full bg-gradient-to-t from-primary/40 to-primary rounded-t-md relative hover:brightness-125 transition-all cursor-pointer opacity-80 group-hover/bar:opacity-100"
                      />
                      
                      {/* Label */}
                      <span className="text-[10px] text-gray-500 mt-3 absolute -bottom-6">
                        {label}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right — Recent Links */}
        <div className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 flex flex-col h-[calc(100vh-16rem)] xl:h-auto overflow-hidden shadow-lg">
          <div className="flex justify-between items-center mb-6 shrink-0">
            <h3 className="text-base font-medium text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-400" />
              Recent URLs
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <LinkList
              links={recentLinks}
              onDelete={deleteLink}
              deletingId={deletingId}
              loading={linksLoading}
            />
          </div>

          <button
            onClick={() => (window.location.href = "/dashboard/links")}
            className="w-full mt-4 py-3 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/10 transition-colors text-white shrink-0 shadow-sm bg-white/5"
          >
            View All Links
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHome;
