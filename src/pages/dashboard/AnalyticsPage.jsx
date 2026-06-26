import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart2, Globe, Clock, Target } from "lucide-react";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function AnalyticsPage() {
  const { data: analytics, loading } = useAnalytics(7);

  const totalClicks = analytics?.totalClicks || 0;
  const uniqueVisitors = analytics?.uniqueVisitors || 0;
  const topLink = analytics?.topLink || "None";
  const timeSeries = analytics?.timeSeries || Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return { date: d.toISOString(), clicks: 0 };
  });
  const maxClicks = Math.max(...timeSeries.map((d) => d.clicks), 10);

  const stats = [
    { label: "Total Clicks (7d)", value: loading ? "—" : totalClicks.toLocaleString(), icon: BarChart2 },
    { label: "Unique Visitors", value: loading ? "—" : uniqueVisitors.toLocaleString(), icon: Globe },
    { label: "Avg. Click Time", value: loading ? "—" : "< 50ms", icon: Clock },
    { label: "Top Link", value: loading ? "—" : topLink, icon: Target },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Analytics</h2>
        <p className="text-sm text-gray-400">
          Detailed breakdown of your traffic and engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 shadow-lg group hover:border-primary/30 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                {stat.label}
              </span>
              <stat.icon className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-3xl font-semibold text-white tracking-tight truncate block">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-[#111]/50 border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden group shadow-lg min-h-[400px] flex flex-col">
        <div className="flex justify-between items-center mb-12">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            7-Day Traffic Overview
          </h3>
        </div>
        
        <div className="flex-1 relative flex items-end justify-between space-x-2 sm:space-x-8 px-2 sm:px-6 mt-8">
          {loading ? (
            Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="w-full bg-white/5 rounded-t-sm h-1/2 animate-pulse" />
            ))
          ) : (
            timeSeries.map((day, i) => {
              const height = Math.max((day.clicks / maxClicks) * 100, 2);
              const dateObj = new Date(day.date);
              const label = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
              
              return (
                <div key={i} className="flex flex-col items-center justify-end w-full h-full group/bar relative">
                  <div className="absolute -top-12 bg-[#222] text-white text-sm py-1.5 px-3 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-2xl border border-white/10 font-medium">
                    {day.clicks} clicks
                  </div>
                  
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: i * 0.05, type: "spring" }}
                    className="w-full bg-gradient-to-t from-[#80001a] to-primary rounded-t-lg relative hover:brightness-125 transition-all cursor-pointer opacity-80 group-hover/bar:opacity-100 shadow-[0_0_15px_rgba(255,0,51,0.2)]"
                  />
                  
                  <span className="text-xs text-gray-400 mt-4 absolute -bottom-8 whitespace-nowrap">
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
