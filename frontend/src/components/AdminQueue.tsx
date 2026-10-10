import React, { useEffect, useState } from 'react';
import { CheckSquare, CheckCircle, XCircle, Copy, AlertTriangle, Filter, RefreshCw, ShieldCheck } from 'lucide-react';
import { api, CitizenReport } from '../services/api';

interface AdminQueueProps {
  userRole: 'CITIZEN' | 'MODERATOR' | 'ADMIN';
  authToken: string;
}

export const AdminQueue: React.FC<AdminQueueProps> = ({ userRole, authToken }) => {
  const [reports, setReports] = useState<CitizenReport[]>([]);
  const [statusFilter, setStatusFilter] = useState('PENDING_REVIEW');
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await api.getReports(statusFilter);
      setReports(data);
    } catch (e) {
      console.error("Failed to load reports", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter]);

  const handleModerate = async (reportId: number, newStatus: string) => {
    if (!authToken && userRole === 'CITIZEN') {
      setActionMessage("Notice: Switch your role to 'Inspector' or 'Admin' in the top navbar to perform audit actions.");
      return;
    }

    try {
      await api.moderateReport(reportId, newStatus, authToken);
      setActionMessage(`Report #${reportId} updated to ${newStatus}. Public GIS map synchronized.`);
      fetchReports();
      setTimeout(() => setActionMessage(null), 3500);
    } catch (e: any) {
      setActionMessage(`Failed to moderate: ${e.message}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card-elevated rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <CheckSquare className="w-4 h-4 text-cyan-400" />
            <span>Municipal Safety Audit Workflow</span>
          </div>
          <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
            Citizen Hazard Moderation Queue
          </h2>
          <p className="text-slate-400 text-xs max-w-2xl font-light">
            Crowdsourced road safety complaints must undergo municipal validation before calibrating safety performance functions. Moderated approvals synchronize immediately with the public GIS map.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 bg-[#08090D] p-1.5 rounded-2xl border border-white/10 text-xs self-start md:self-center">
          {['PENDING_REVIEW', 'VERIFIED', 'DUPLICATE', 'ALL'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-xl transition-all duration-200 font-semibold ${
                statusFilter === s
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
          <button
            onClick={fetchReports}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Refresh Queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div className="p-4 bg-cyan-950/40 border border-cyan-500/40 rounded-2xl text-cyan-200 text-xs flex items-center justify-between shadow-lg">
          <span className="font-medium">{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-cyan-400 hover:text-white font-bold">✕</button>
        </div>
      )}

      {/* Role Notice if Citizen */}
      {userRole === 'CITIZEN' && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-2xl text-amber-300 text-xs flex items-center space-x-3 shadow-lg">
          <ShieldCheck className="w-5 h-5 flex-shrink-0 text-amber-400" />
          <span className="font-light">
            You are currently viewing in <strong className="text-white">Citizen Mode (Read-Only)</strong>. To test approving or rejecting reports during your review, switch to <strong className="text-amber-200">Inspector</strong> or <strong className="text-purple-200">Admin</strong> in the top navbar!
          </span>
        </div>
      )}

      {/* Table Container */}
      <div className="glass-card rounded-3xl shadow-2xl overflow-hidden border border-white/[0.08]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#08090D] border-b border-white/[0.08] text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Hazard Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-center">Severity</th>
                <th className="py-3 px-4 text-center">Corroboration</th>
                <th className="py-3 px-4">Coordinates</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-slate-400 font-mono">
                    Loading municipal audit observations...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-slate-400 font-light">
                    No reports found matching the selected filter state.
                  </td>
                </tr>
              ) : (
                reports.map((r) => (
                  <tr key={r.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4 font-mono text-cyan-400 font-bold">#{r.id}</td>
                    <td className="py-3.5 px-4 font-display font-bold text-white text-xs">{r.hazard_type}</td>
                    <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate text-[11px] font-light">
                      {r.description}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-mono font-bold text-[10px] ${
                        r.severity_rating >= 4
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : r.severity_rating === 3
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {r.severity_rating} / 5
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-semibold text-slate-300">
                      {r.corroboration_count} reports
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400">
                      {r.latitude.toFixed(4)}, {r.longitude.toFixed(4)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-md font-mono text-[9px] font-bold ${
                        r.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : r.status === 'DUPLICATE'
                          ? 'bg-slate-700/40 text-slate-400 border border-slate-700'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleModerate(r.id, 'VERIFIED')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold transition-all active:scale-95"
                          title="Verify Hazard"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleModerate(r.id, 'DUPLICATE')}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 text-[10px] font-medium transition-all active:scale-95"
                          title="Flag as Spatial Duplicate"
                        >
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleModerate(r.id, 'REJECTED')}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-medium transition-all active:scale-95"
                          title="Reject Report"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
