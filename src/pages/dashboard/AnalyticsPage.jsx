import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BarChart2, Globe, Clock, Target, Filter, Check, ChevronDown, RefreshCw } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useLinks } from "../../hooks/useLinks";

export default function AnalyticsPage() {
  const { links, loading: linksLoading } = useLinks();
  const [selectedLinkIds, setSelectedLinkIds] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [days, setDays] = useState(7);
  
  const { data: analytics, loading: analyticsLoading } = useAnalytics(days, selectedLinkIds);

  const totalClicks = analytics?.totalClicks ?? 0;
  const uniqueVisitors = analytics?.uniqueVisitors ?? 0;
  const topLink = analytics?.topLink ?? "None";
  const timeSeries = analytics?.timeSeries || Array.from({ length: days }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    return { date: d.toISOString(), clicks: 0 };
  });
  const maxClicks = Math.max(...timeSeries.map((d) => d.clicks), 10);

  const stats = [
    { label: "Total Clicks (Selected)", value: analyticsLoading ? "—" : totalClicks.toLocaleString(), icon: BarChart2, color: "text-primary" },
    { label: "Unique Visitors", value: analyticsLoading ? "—" : uniqueVisitors.toLocaleString(), icon: Globe, color: "text-blue-500" },
    { label: "Avg. Click Time", value: analyticsLoading ? "—" : "< 50ms", icon: Clock, color: "text-green-500" },
    { label: "Top Link", value: analyticsLoading ? "—" : topLink, icon: Target, color: "text-purple-500" },
  ];

  const handleToggleLink = (id) => {
    setSelectedLinkIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedLinkIds([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-12"
    >
      {/* Page Title & Controls */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Analytics</h2>
          <p className="text-sm text-gray-400">
            Real-time link redirect speeds, click activities, and geolocations.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex flex-wrap items-center gap-3 z-30">
          {/* Days Filter */}
          <div className="flex bg-[#111]/40 border border-white/5 rounded-xl p-1">
            {[7, 30].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  days === d
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {d} Days
              </button>
            ))}
          </div>

          {/* Custom Link Multi-Select Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-[#111]/40 hover:bg-[#111] border border-white/5 hover:border-white/10 rounded-xl px-4 py-2.5 text-xs text-white transition-all cursor-pointer font-semibold"
            >
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <span>
                {selectedLinkIds.length === 0
                  ? "All Links"
                  : `${selectedLinkIds.length} Selected`}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <>
                  {/* Backdrop to close */}
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-72 bg-[#0e0e0e] border border-white/10 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-2 border-b border-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      <span>Select URLs</span>
                      <button
                        onClick={handleSelectAll}
                        className="text-primary hover:underline text-[10px]"
                      >
                        Reset All
                      </button>
                    </div>

                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-1 space-y-1">
                      {linksLoading ? (
                        <div className="text-center py-4 text-xs text-gray-500">Loading links...</div>
                      ) : links.length === 0 ? (
                        <div className="text-center py-4 text-xs text-gray-500">No links created yet</div>
                      ) : (
                        links.map((link) => {
                          const isSelected = selectedLinkIds.includes(link.id);
                          return (
                            <button
                              key={link.id}
                              onClick={() => handleToggleLink(link.id)}
                              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors hover:bg-white/5 text-gray-300 hover:text-white"
                            >
                              <div className="flex flex-col min-w-0 pr-2">
                                <span className="font-semibold truncate">{link.title || link.short_code}</span>
                                <span className="text-[10px] text-gray-500 truncate">{link.short_url}</span>
                              </div>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'border-primary bg-primary text-white' : 'border-white/20'}`}>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 shadow-lg group hover:border-primary/20 transition-all hover:-translate-y-0.5 duration-300 relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-semibold text-gray-400 group-hover:text-gray-300 transition-colors uppercase tracking-wider">
                {stat.label}
              </span>
              <div className={`p-2 rounded-xl bg-white/5 group-hover:bg-primary/10 transition-colors`}>
                <stat.icon className={`w-4 h-4 ${stat.color} group-hover:text-primary transition-colors`} />
              </div>
            </div>
            <span className="text-3xl font-bold text-white tracking-tight truncate block">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Traffic Chart Container (Fixed height grid area) */}
      <div className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden group shadow-lg min-h-[420px] flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            {days}-Day Click Event Distribution
          </h3>
          {analyticsLoading && (
            <RefreshCw className="w-4 h-4 text-primary animate-spin" />
          )}
        </div>
        
        {/* Fixed height container for graph columns to ensure proper CSS height rendering */}
        <div className="h-64 relative flex items-end justify-between space-x-2 sm:space-x-8 px-2 sm:px-6 mt-8 mb-6 border-b border-white/5 pb-2">
          {analyticsLoading ? (
            Array.from({ length: days }).map((_, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-sm h-1/2 animate-pulse" />
            ))
          ) : totalClicks === 0 ? (
            /* Ambient Empty State Graphic inside the chart */
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                <BarChart2 className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-sm font-medium text-gray-400">No clicks recorded in this range</p>
              <p className="text-xs text-gray-500 mt-1">Select other links or try shortening a new link!</p>
            </div>
          ) : (
            timeSeries.map((day, i) => {
              const height = Math.max((day.clicks / maxClicks) * 100, 2);
              const dateObj = new Date(day.date);
              const label = dateObj.toLocaleDateString("en-US", { weekday: "short", day: "numeric" });
              
              return (
                <div key={i} className="flex flex-col items-center justify-end w-full h-full group/bar relative">
                  {/* Tooltip */}
                  <div className="absolute -top-12 bg-[#222] text-white text-xs py-1.5 px-3 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-2xl border border-white/10 font-semibold">
                    {day.clicks} clicks
                  </div>
                  
                  {/* Visual Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, type: "spring", stiffness: 60 }}
                    className="w-full bg-gradient-to-t from-primary/30 via-primary/80 to-primary rounded-t-lg relative hover:brightness-125 transition-all cursor-pointer opacity-80 group-hover/bar:opacity-100 shadow-[0_0_15px_rgba(255,0,51,0.2)]"
                  />
                  
                  {/* X-Axis Label */}
                  <span className="text-[10px] text-gray-500 mt-4 absolute -bottom-6 whitespace-nowrap">
                    {label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </motion.div>
  );
}
