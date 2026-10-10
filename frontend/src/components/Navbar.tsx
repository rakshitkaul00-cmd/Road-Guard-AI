import React from 'react';
import { 
  Shield, MapPin, AlertTriangle, BarChart3, CheckSquare, PhoneCall, 
  Info, UserCheck, Navigation, Radio, Sparkles, Activity
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

  const navItems = [
    { id: 'map', label: 'Safety Radar', icon: MapPin },
    { id: 'routes', label: 'Route Exposure', icon: Navigation },
    { id: 'analytics', label: 'ML Attribution', icon: BarChart3 },
    { id: 'admin', label: 'Municipal Queue', icon: CheckSquare },
    { id: 'overview', label: 'Research Blueprint', icon: Info },
  ] as const;

  return (
    <header className="sticky top-0 z-50 bg-[#08090D]/85 backdrop-blur-2xl border-b border-white/[0.08] text-slate-100 px-4 lg:px-7 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand Identity */}
        <div 
          className="flex items-center space-x-3.5 cursor-pointer group select-none" 
          onClick={() => setCurrentTab('map')}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:shadow-cyan-500/35 transition-all duration-300">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#08090D] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2.5">
              <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                RoadGuard<span className="text-cyan-400">.ai</span>
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-white/[0.06] text-cyan-300 border border-white/[0.08]">
                BBMP URBAN
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal tracking-wide hidden sm:block">
              Autonomous Road Safety &amp; Risk Intelligence
            </p>
          </div>
        </div>

        {/* Floating Pill Navigation Tabs */}
        <nav className="flex items-center p-1 rounded-2xl bg-[#12151E]/90 border border-white/[0.08] shadow-inner text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`relative flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Tactical Controls & Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Segmented Persona / Role Control */}
          <div className="flex items-center bg-[#12151E] border border-white/[0.08] rounded-xl p-1 text-[11px]">
            <span className="text-slate-500 px-2 font-mono text-[10px] uppercase tracking-wider hidden lg:inline">
              Role:
            </span>
            <button
              onClick={() => handleRoleChange('CITIZEN')}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                userRole === 'CITIZEN' 
                  ? 'bg-white/[0.12] text-white shadow-sm font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Citizen
            </button>
            <button
              onClick={() => handleRoleChange('MODERATOR')}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                userRole === 'MODERATOR' 
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Inspector
            </button>
            <button
              onClick={() => handleRoleChange('ADMIN')}
              className={`px-2.5 py-1 rounded-lg transition-all font-medium ${
                userRole === 'ADMIN' 
                  ? 'bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Primary Action Button: + Report Hazard */}
          <button
            onClick={openReportModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
            <span>+ Report Hazard</span>
          </button>

          {/* Emergency Dispatch Drawer Action */}
          <button
            onClick={openEmergencyDrawer}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 font-semibold text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Karnataka Emergency Helplines (112, 108, 103)"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden xl:inline">112 Helpline</span>
          </button>
        </div>
      </div>
    </header>
  );
};
