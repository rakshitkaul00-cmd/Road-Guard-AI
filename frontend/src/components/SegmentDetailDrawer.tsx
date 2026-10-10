import React, { useEffect, useState } from 'react';
import { 
  X, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Activity, 
  MapPin, Gauge, Lightbulb, Zap, TrendingUp, Sparkles, Navigation
} from 'lucide-react';
import { api, SegmentRiskCard } from '../services/api';

interface SegmentDetailDrawerProps {
  segmentId: number | null;
  onClose: () => void;
}

export const SegmentDetailDrawer: React.FC<SegmentDetailDrawerProps> = ({ segmentId, onClose }) => {
  const [data, setData] = useState<SegmentRiskCard | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!segmentId) {
      setData(null);
      return;
    }

    const fetchCard = async () => {
      setLoading(true);
      try {
        const card = await api.getSegmentRiskCard(segmentId);
        setData(card);
      } catch (e) {
        console.error("Failed to load segment risk card", e);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [segmentId]);

  if (!segmentId) return null;

  const riskPercent = data ? Math.round(data.calibrated_risk_probability * 100) : 0;
  const isHighRisk = data?.risk_tier === 'ELEVATED';
  const isModerateRisk = data?.risk_tier === 'MODERATE';

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950/95 backdrop-blur-2xl border-l border-slate-700/60 shadow-2xl flex flex-col transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
        <div className="flex items-center space-x-2.5">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-lg ${
            isHighRisk 
              ? 'bg-red-500/15 border border-red-500/30 text-red-400'
              : isModerateRisk
              ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
              : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
          }`}>
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm tracking-tight">Segment AI Risk Diagnostics</h3>
            <span className="text-[10px] text-slate-400 font-mono">OpenStreetMap ID #{segmentId}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {loading && (
          <div className="py-28 text-center space-y-3 text-slate-400 font-mono">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Evaluating calibrated ML tree & generating SHAP attribution...</p>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Road Metadata Card */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase block">
                    Corridor Segment
                  </span>
                  <h4 className="font-black text-slate-100 text-base">{data.road_name}</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                  {data.road_class}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800/80">
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] font-medium uppercase">Speed Limit</span>
                  <span className="font-black text-slate-100 text-xs">{data.speed_limit_kmh} km/h</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] font-medium uppercase">Lanes</span>
                  <span className="font-black text-slate-100 text-xs">{data.lane_count} Lanes</span>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[9px] font-medium uppercase">Segment Length</span>
                  <span className="font-black text-slate-100 text-xs">{data.length_meters}m</span>
                </div>
              </div>
            </div>

            {/* Calibrated Risk Gauge & Metrics */}
            <div className={`p-4 rounded-2xl border shadow-xl relative overflow-hidden ${
              isHighRisk
                ? 'bg-gradient-to-br from-red-950/40 to-slate-900 border-red-500/40'
                : isModerateRisk
                ? 'bg-gradient-to-br from-amber-950/40 to-slate-900 border-amber-500/40'
                : 'bg-gradient-to-br from-emerald-950/40 to-slate-900 border-emerald-500/40'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
                    Calibrated Relative Risk Probability
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-3xl font-black text-white tracking-tight">
                      {riskPercent}%
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isHighRisk
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                        : isModerateRisk
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {data.risk_tier} REGIME
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-slate-400 uppercase font-semibold block">Model Confidence</span>
                  <span className="font-black text-emerald-400 text-xs">{data.data_confidence}</span>
                </div>
              </div>

              {/* Visual Probability Bar */}
              <div className="mt-3 w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-700/60 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isHighRisk 
                      ? 'bg-gradient-to-r from-red-600 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.7)]' 
                      : isModerateRisk 
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.7)]' 
                      : 'bg-gradient-to-r from-emerald-600 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.7)]'
                  }`}
                  style={{ width: `${riskPercent}%` }}
                />
              </div>
            </div>

            {/* Official Blackspot Ground Truth Overlap */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-2">
              <div className="flex items-center space-x-2 text-slate-200 font-bold">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Empirical Blackspot Proximity</span>
              </div>
              {data.is_blackspot_corridor ? (
                <div className="space-y-1.5 p-2.5 bg-red-950/30 rounded-xl border border-red-900/40">
                  <p className="text-red-300 text-xs font-semibold">
                    🚨 Designated BTP Blackspot Corridor: {data.official_blackspot_name || 'Chronic Fatal Cluster'}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Proximity to centroid: <strong className="text-slate-200">{data.historical_blackspot_proximity_m} meters</strong> (within MoRTH 500m evaluation buffer).
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 text-xs leading-relaxed">
                  No direct overlap with official BTP 3-year blackspot corridors. Nearest documented blackspot centroid is {data.historical_blackspot_proximity_m}m away.
                </p>
              )}
            </div>

            {/* Local SHAP Waterfall Attribution */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2 text-slate-100 font-bold">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>Explainability: SHAP Feature Attribution</span>
                </div>
                <span className="text-[10px] text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  TreeExplainer
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Quantifies the exact marginal contributions driving this road segment's relative risk score:
              </p>

              <div className="space-y-2 pt-1">
                {data.shap_top_factors.map((factor, idx) => (
                  <div key={idx} className="space-y-1.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 text-xs">{factor.feature}</span>
                      <span className={`font-mono font-black text-xs px-1.5 py-0.2 rounded ${
                        factor.direction === 'increases_risk' 
                          ? 'text-red-400 bg-red-950/40 border border-red-900/50' 
                          : 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/50'
                      }`}>
                        {factor.direction === 'increases_risk' ? '+' : '-'}{factor.impact_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          factor.direction === 'increases_risk' ? 'bg-red-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min(100, factor.impact_percentage * 3)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Citizen Hazard Prioritization */}
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-100 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Citizen Hazard Prioritization</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-black text-[10px] border border-amber-500/30">
                  HPI: {data.hazard_prioritization_score} / 5.0
                </span>
              </div>
              <p className="text-xs text-slate-300">
                <strong>{data.active_hazards_count} active citizen reports</strong> recorded within 300m spatial buffer of this corridor.
              </p>
            </div>

            {/* Actionable Municipal Guidance */}
            <div className="bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border border-blue-700/40 rounded-2xl p-4 shadow-xl space-y-2">
              <div className="flex items-center space-x-2 text-blue-300 font-bold text-xs">
                <Lightbulb className="w-4 h-4 text-blue-400" />
                <span>Recommended Municipal Action</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed font-medium">
                {data.recommended_action}
              </p>
            </div>

            {/* Academic Evaluation Notice */}
            <div className="text-[10px] text-slate-500 leading-normal border-t border-slate-800 pt-2 italic">
              * Note for Academic Evaluation: Predicted risk probability is generated by a Platt-calibrated HistGradientBoosting classifier trained on 36-month historical Bengaluru infrastructure patterns. It provides relative risk ranking for safety audits rather than deterministic crash forecasting.
            </div>
          </>
        )}
      </div>
    </div>
  );
};
