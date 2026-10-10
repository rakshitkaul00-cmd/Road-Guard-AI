import React from 'react';
import { 
  Shield, MapPin, AlertTriangle, BarChart3, CheckSquare, PhoneCall, 
  Info, UserCheck, Navigation, Radio, Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'map' | 'routes' | 'analytics' | 'admin' | 'overview';
  setCurrentTab: (tab: 'map' | 'routes' | 'analytics' | 'admin' | 'overview') => void;
  openReportModal: () => void;
  openEmergencyDrawer: () => void;
  userRole: 'CITIZEN' | 'MODERATOR' | 'ADMIN';
  setUserRole: (role: 'CITIZEN' | 'MODERATOR' | 'ADMIN') => void;
  authToken: string;
  setAuthToken: (token: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openReportModal,
  openEmergencyDrawer,
  userRole,
  setUserRole,
  authToken,
  setAuthToken
}) => {
  const handleRoleChange = async (newRole: 'CITIZEN' | 'MODERATOR' | 'ADMIN') => {
    setUserRole(newRole);
    if (newRole === 'ADMIN') {
      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'admin@roadguard.ai', password: 'Admin@RoadGuard2026' })
        });
        const d = await res.json();
        setAuthToken(d.access_token);
      } catch (e) {
        console.error(e);
      }
    } else if (newRole === 'MODERATOR') {
      try {
        const res = await fetch('/api/v1/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'moderator@roadguard.ai', password: 'Moderator@RoadGuard2026' })
        });
        const d = await res.json();
        setAuthToken(d.access_token);
      } catch (e) {
        console.error(e);
      }
    } else {
      setAuthToken('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 text-slate-100 px-4 lg:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg">
      {/* Brand & Region Badge */}
      <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setCurrentTab('map')}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-all">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              RoadGuard AI
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              BBMP LIVE
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
            Bengaluru Road Safety &amp; Risk Intelligence
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium shadow-inner">
        <button
          onClick={() => setCurrentTab('map')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentTab === 'map'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Safety Map</span>
        </button>

        <button
          onClick={() => setCurrentTab('routes')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentTab === 'routes'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Route Evaluator</span>
        </button>

        <button
          onClick={() => setCurrentTab('analytics')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>ML Benchmarks</span>
        </button>

        <button
          onClick={() => setCurrentTab('admin')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentTab === 'admin'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          <span>Municipal Queue</span>
        </button>

        <button
          onClick={() => setCurrentTab('overview')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
            currentTab === 'overview'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Overview</span>
        </button>
      </nav>

      {/* Actions & Role Switcher */}
      <div className="flex items-center space-x-2">
        {/* Viva Demonstration Role Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-[11px]">
          <span className="text-slate-500 px-2 flex items-center gap-1 font-mono hidden md:flex">
            <UserCheck className="w-3 h-3 text-slate-400" /> Mode:
          </span>
          <button
            onClick={() => handleRoleChange('CITIZEN')}
            className={`px-2 py-1 rounded-lg transition-all ${
              userRole === 'CITIZEN' ? 'bg-slate-800 text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Citizen
          </button>
          <button
            onClick={() => handleRoleChange('MODERATOR')}
            className={`px-2 py-1 rounded-lg transition-all ${
              userRole === 'MODERATOR' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Inspector
          </button>
          <button
            onClick={() => handleRoleChange('ADMIN')}
            className={`px-2 py-1 rounded-lg transition-all ${
              userRole === 'ADMIN' ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Report Hazard Action */}
        <button
          onClick={openReportModal}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-slate-950" />
          <span>+ Report Hazard</span>
        </button>

        {/* Emergency Help Button */}
        <button
          onClick={openEmergencyDrawer}
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-xs transition-all"
          title="Official Karnataka & Bengaluru Emergency Helplines"
        >
          <PhoneCall className="w-3.5 h-3.5 text-red-400" />
          <span className="hidden lg:inline">112 Hotlines</span>
        </button>
      </div>
    </header>
  );
};
