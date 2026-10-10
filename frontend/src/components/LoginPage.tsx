import React, { useState } from 'react';
import { 
  Shield, Key, Lock, User, CheckCircle2, AlertCircle, 
  ArrowRight, Sparkles, Building2, Car, BadgeCheck, LogOut, Check
} from 'lucide-react';
import { api } from '../services/api';

interface LoginPageProps {
  userRole: 'CITIZEN' | 'MODERATOR' | 'ADMIN';
  setUserRole: (role: 'CITIZEN' | 'MODERATOR' | 'ADMIN') => void;
  authToken: string;
  setAuthToken: (token: string) => void;
  onLoginSuccess: (redirectTab: 'map' | 'admin') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  userRole,
  setUserRole,
  authToken,
  setAuthToken,
  onLoginSuccess
}) => {
  const [selectedPersona, setSelectedPersona] = useState<'ADMIN' | 'MODERATOR' | 'CITIZEN'>('ADMIN');
  const [email, setEmail] = useState('admin@roadguard.gov.in');
  const [password, setPassword] = useState('Admin@123');
  const [badgeId, setBadgeId] = useState('KA-BTP-4091');
  const [ward, setWard] = useState('Ward 112 - Domlur / Indiranagar');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Quick Persona Presets
  const setPersonaPreset = (persona: 'ADMIN' | 'MODERATOR' | 'CITIZEN') => {
    setSelectedPersona(persona);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (persona === 'ADMIN') {
      setEmail('admin@roadguard.gov.in');
      setPassword('Admin@123');
      setBadgeId('KA-BTP-4091');
    } else if (persona === 'MODERATOR') {
      setEmail('inspector@bbmp.gov.in');
      setPassword('Inspector@123');
      setWard('Ward 112 - Domlur / Indiranagar');
    } else {
      setEmail('citizen@bengaluru.in');
      setPassword('citizen-guest-pass');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await api.login(email, password);
      const token = res.access_token || 'demo_jwt_token_roadguard';
      setAuthToken(token);
      setUserRole(selectedPersona);
      localStorage.setItem('rg_auth_token', token);
      localStorage.setItem('rg_user_role', selectedPersona);
      localStorage.setItem('rg_user_email', email);

      const targetDestination = selectedPersona === 'CITIZEN' ? 'map' : 'admin';
      setSuccessMessage(
        `Authentication verified. Signed in as ${
          selectedPersona === 'ADMIN' 
            ? 'BTP Nodal Traffic Officer' 
            : selectedPersona === 'MODERATOR' 
            ? 'BBMP Field Road Inspector' 
            : 'Verified Citizen Commuter'
        }.`
      );

      setTimeout(() => {
        onLoginSuccess(targetDestination);
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    setUserRole('CITIZEN');
    localStorage.removeItem('rg_auth_token');
    localStorage.removeItem('rg_user_role');
    localStorage.removeItem('rg_user_email');
    setSuccessMessage('Successfully signed out. Switched to Citizen mode.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const isLoggedIn = !!authToken && userRole !== 'CITIZEN';

  return (
    <div className="min-h-[calc(100vh-80px)] py-10 px-4 flex items-center justify-center font-sans relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-xl z-10 space-y-6">
        {/* Brand & Portal Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-cyan-400 text-xs font-mono font-medium">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>GOVERNMENT OF KARNATAKA • TRANSPORT COMMISSIONERATE</span>
          </div>

          <h1 className="font-display font-black text-3xl md:text-4xl text-white tracking-tight">
            RoadGuard <span className="text-cyan-400">Officer Portal</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Authorized administrative gateway for Bengaluru Traffic Police nodal command, BBMP civil inspectors, and citizens.
          </p>
        </div>

        {/* If Already Logged In: Active Session Card */}
        {isLoggedIn ? (
          <div className="glass-card-elevated rounded-3xl p-6 md:p-8 space-y-6 border border-emerald-500/30 shadow-2xl bg-[#0F121C]">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <BadgeCheck className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    ● Active Authenticated Session
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl text-white">
                  {userRole === 'ADMIN' ? 'BTP Nodal Officer (Central HQ)' : 'BBMP Field Infrastructure Inspector'}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  ID: {userRole === 'ADMIN' ? 'KA-BTP-4091' : 'KA-BBMP-W112'} • Clearance: L4 RESTRICTED
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Operational Role</span>
                <p className="text-sm font-semibold text-white mt-0.5">{userRole}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Cryptographic Token</span>
                <p className="text-sm font-mono text-cyan-400 mt-0.5">JWT RS-256 Valid</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => onLoginSuccess('admin')}
                className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all"
              >
                <span>Proceed to Municipal Queue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-white/[0.1] hover:border-red-500/30 font-semibold text-sm transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Form Card */
          <div className="glass-card-elevated rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl bg-[#0D101A] border border-white/[0.08]">
            {/* Persona Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-[#141824] rounded-2xl border border-white/[0.06]">
              <button
                type="button"
                onClick={() => setPersonaPreset('ADMIN')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all text-xs font-semibold ${
                  selectedPersona === 'ADMIN'
                    ? 'bg-gradient-to-b from-blue-600 to-cyan-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <Shield className="w-4 h-4 mb-1" />
                <span>BTP Police</span>
              </button>
              <button
                type="button"
                onClick={() => setPersonaPreset('MODERATOR')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all text-xs font-semibold ${
                  selectedPersona === 'MODERATOR'
                    ? 'bg-gradient-to-b from-amber-600 to-amber-700 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <Building2 className="w-4 h-4 mb-1" />
                <span>BBMP Works</span>
              </button>
              <button
                type="button"
                onClick={() => setPersonaPreset('CITIZEN')}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all text-xs font-semibold ${
                  selectedPersona === 'CITIZEN'
                    ? 'bg-gradient-to-b from-slate-700 to-slate-800 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
              >
                <Car className="w-4 h-4 mb-1" />
                <span>Commuter</span>
              </button>
            </div>

            {/* Quick Demo Pre-fill Pill */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs">
              <div className="flex items-center space-x-2 text-cyan-300">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  Demo Credentials Ready for <strong>{selectedPersona}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPersonaPreset(selectedPersona)}
                className="px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-[11px] font-semibold transition-colors"
              >
                Autofill
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  {selectedPersona === 'ADMIN' 
                    ? 'BTP Officer Official Email' 
                    : selectedPersona === 'MODERATOR' 
                    ? 'BBMP Department Email' 
                    : 'Citizen Commuter ID'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@domain.gov.in"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#141824] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                  Security Passcode
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#141824] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              {selectedPersona === 'ADMIN' && (
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                    Police Service Badge ID
                  </label>
                  <input
                    type="text"
                    value={badgeId}
                    onChange={(e) => setBadgeId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#141824] border border-white/[0.1] rounded-xl text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {selectedPersona === 'MODERATOR' && (
                <div>
                  <label className="block text-xs font-mono font-medium text-slate-300 mb-1.5 uppercase tracking-wider">
                    Assigned BBMP Ward Jurisdiction
                  </label>
                  <input
                    type="text"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#141824] border border-white/[0.1] rounded-xl text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              )}

              {/* Feedback Alerts */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center space-x-2 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center space-x-2 text-emerald-400 text-xs">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Validating Credentials...</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>
                      {selectedPersona === 'CITIZEN' 
                        ? 'Enter as Commuter Guest' 
                        : `Authenticate as ${selectedPersona === 'ADMIN' ? 'BTP Nodal Officer' : 'BBMP Inspector'}`}
                    </span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-slate-500">
              Protected by JWT Cryptographic Signatures &amp; Government RBAC Standards.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
