import React from 'react';
import { Home, TrendingUp, Layers, DollarSign, Settings, Info, Search, Bell, Mail, MoreHorizontal, ChevronDown } from 'lucide-react';

const DashboardMockup = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto mt-20 hero-button rounded-3xl p-px">
      <div className="glass-panel w-full rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        {/* Top inner glow red */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        
        {/* Sidebar */}
        <div className="w-20 border-r border-white/5 flex flex-col items-center py-8 space-y-8 bg-black/20">
          <div className="p-3 bg-white/10 rounded-xl cursor-pointer">
            <Home className="w-5 h-5 text-white" />
          </div>
          <div className="space-y-6 flex flex-col items-center pt-4 opacity-50">
            <TrendingUp className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Layers className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <DollarSign className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <Settings className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="mt-auto opacity-50 pb-4">
            <Info className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-[#0a0a0a]/50">
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-xl font-medium text-white mb-1">Link Analytics</h2>
              <p className="text-xs text-muted">Real-time click processing dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input 
                  type="text" 
                  placeholder="Search URLs" 
                  className="bg-black/40 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-white/20 text-white w-64 placeholder:text-muted"
                />
              </div>
              <button className="p-2 rounded-full bg-black/40 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <Bell className="w-4 h-4 text-muted hover:text-white" />
              </button>
              <button className="p-2 rounded-full bg-black/40 border border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-muted hover:text-white" />
              </button>
              <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden ml-2 border border-white/10">
                <img src="https://i.pravatar.cc/100?img=11" alt="User Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Time filter */}
          <div className="flex justify-between items-center mb-6">
            <button className="flex items-center space-x-2 bg-black/40 border border-white/5 rounded-lg px-4 py-2 text-xs text-white hover:bg-white/5 transition-colors cursor-pointer">
              <span>This week</span>
              <ChevronDown className="w-3 h-3 text-muted" />
            </button>
            <span className="text-[10px] text-muted">Redis cache synced moments ago</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-muted">Active Links</span>
                    <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center">14% ↗</span>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-2xl font-semibold text-white">245</span>
                    <span className="text-xs text-muted mb-1">URLs</span>
                  </div>
                </div>
                
                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-muted">Total Clicks</span>
                    <span className="text-[10px] text-green-400 bg-green-400/10 px-2 py-1 rounded-full flex items-center">28% ↗</span>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-2xl font-semibold text-white">4.2M</span>
                    <span className="text-xs text-muted mb-1">Clicks</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs text-muted">BullMQ Queue</span>
                    <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded-full flex items-center">Idle</span>
                  </div>
                  <div className="flex items-end space-x-2">
                    <span className="text-2xl font-semibold text-white">0</span>
                    <span className="text-xs text-muted mb-1">Jobs</span>
                  </div>
                </div>
              </div>

              {/* Chart Area Mockup */}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 h-64 relative overflow-hidden group">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-medium text-white">Hourly Click Events</h3>
                  <MoreHorizontal className="w-5 h-5 text-muted cursor-pointer" />
                </div>
                
                {/* Mock Chart Bars */}
                <div className="absolute bottom-6 left-6 right-6 h-40 flex items-end justify-between space-x-2">
                  {[40, 60, 30, 80, 50, 90, 70, 45, 85, 55, 75, 35, 65, 85, 95, 60].map((height, i) => (
                    <div key={i} className="w-full bg-white/10 rounded-t-sm relative group-hover:bg-white/20 transition-all duration-300" style={{ height: `${height}%` }}>
                       {i === 8 && (
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary/20 border border-primary text-primary text-[10px] px-2 py-1 rounded whitespace-nowrap hidden group-hover:block">
                           +1,250 Clicks
                         </div>
                       )}
                       {i === 8 && (
                         <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-primary/50" />
                       )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-medium text-white">Recent URLs</h3>
                <MoreHorizontal className="w-5 h-5 text-muted cursor-pointer" />
              </div>
              
              <div className="space-y-5">
                {[
                  { name: 'm.url/promo', id: 'https://example.com/promo-q1', status: '12k clicks', active: true },
                  { name: 'm.url/github', id: 'https://github.com/project', status: '3.4k clicks', active: false },
                  { name: 'm.url/twitter', id: 'https://twitter.com/post', status: '850 clicks', active: false },
                  { name: 'm.url/docs', id: 'https://docs.api.dev', status: '2.1k clicks', active: false },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="flex items-center space-x-3 w-3/5">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-white uppercase">{item.name.split('/')[1].charAt(0)}</span>
                      </div>
                      <div className="truncate">
                        <p className="text-sm text-white group-hover:text-primary transition-colors cursor-pointer truncate">{item.name}</p>
                        <p className="text-[10px] text-muted truncate">{item.id}</p>
                      </div>
                    </div>
                    <button className={`text-[10px] px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${item.active ? 'border-primary text-primary bg-primary/10 hover:bg-primary/20' : 'border-white/10 text-muted hover:border-white/30'}`}>
                      {item.status}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
