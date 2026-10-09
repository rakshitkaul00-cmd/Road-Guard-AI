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
      setActionMessage("Notice: Switch your role to 'Moderator' or 'Admin' in the top-right navbar to perform moderation actions.");
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
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0F172A] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <CheckSquare className="w-4 h-4" />
            <span>Municipal Safety Audit Workflow</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">
            Citizen Hazard Moderation Queue
          </h2>
          <p className="text-slate-400 text-xs max-w-2xl">
            Crowdsourced observations must be audited before influencing official safety performance functions. Moderated approvals update public map layers and calculate municipal inspection priorities.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs self-start md:self-center">
          {['PENDING_REVIEW', 'VERIFIED', 'DUPLICATE', 'ALL'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                statusFilter === s
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {s.replace('_', ' ')}
            </button>
          ))}
          <button
            onClick={fetchReports}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            title="Refresh Queue"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div className="p-3 bg-indigo-950/40 border border-indigo-700/50 rounded-xl text-indigo-200 text-xs flex items-center justify-between">
          <span>{actionMessage}</span>
          <button onClick={() => setActionMessage(null)} className="text-indigo-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Role Notice if Citizen */}
      {userRole === 'CITIZEN' && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          <span>
            You are currently viewing in <strong>Citizen Mode (Read-Only)</strong>. To test approving or rejecting reports during your viva demonstration, switch to <strong>Moderator</strong> or <strong>Admin</strong> in the top navbar!
          </span>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Hazard Type</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Corroboration</th>
                <th className="py-3 px-4">Coordinates</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-mono">
                    Loading citizen hazard submissions...
                  </td>
                </tr>
              ) : reports.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No reports found matching the selected filter.
                  </td>
                </tr>
              ) : (
                reports.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 font-mono text-slate-400">#{r.id}</td>
                    <td className="py-3 px-4 font-semibold text-slate-200">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700">
                        {r.hazard_type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300 max-w-xs truncate" title={r.description}>
                      {r.description}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${r.severity_rating >= 4 ? 'text-red-400' : r.severity_rating === 3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {r.severity_rating}/5
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-indigo-400">
                        {r.corroboration_count} votes
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                      {r.latitude}, {r.longitude}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        r.status === 'VERIFIED'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : r.status === 'DUPLICATE'
                          ? 'bg-slate-700 text-slate-300'
                          : r.status === 'REJECTED'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => handleModerate(r.id, 'VERIFIED')}
                          className="px-2 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all font-semibold text-[11px]"
                          title="Verify Observation"
                        >
                          Verify
                        </button>
                        <button
                          onClick={() => handleModerate(r.id, 'DUPLICATE')}
                          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all text-[11px]"
                          title="Mark Duplicate"
                        >
                          Duplicate
                        </button>
                        <button
                          onClick={() => handleModerate(r.id, 'REJECTED')}
                          className="px-2 py-1 rounded bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 transition-all font-semibold text-[11px]"
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
