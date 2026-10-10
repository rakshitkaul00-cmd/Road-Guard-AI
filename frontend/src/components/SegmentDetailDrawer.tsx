import React, { useEffect, useState } from 'react';
import { 
  X, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Activity, 
  MapPin, Gauge, Lightbulb, Zap, TrendingUp, Sparkles, Navigation,
  CornerDownRight, Check
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

  // SVG Radial Ring Calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskPercent / 100) * circumference;

  const ringColor = isHighRisk 
    ? '#FF2E5B' 
    : isModerateRisk 
    ? '#FFB800' 
    : '#00F59B';

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0D0F15]/96 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col transition-all duration-300 animate-drawer-in font-sans">
      {/* Header */}
      <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#12151E]/60">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-cyan-400 shadow-inner">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-sm tracking-tight">Segment AI Diagnostics</h3>
            <span className="text-[10px] text-slate-400 font-mono">OpenStreetMap ID #{segmentId}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {loading && (
          <div className="py-28 text-center space-y-3 text-slate-400 font-mono">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs">Generating calibrated SHAP feature attributions...</p>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Road Overview Card */}
            <div className="glass-card rounded-3xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wider uppercase block">
                    Corridor Geometry
                  </span>
                  <h4 className="font-display font-black text-white text-base mt-0.5">{data.road_name}</h4>
                </div>
                <span className="px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold bg-white/[0.06] text-slate-300 border border-white/10 uppercase">
                  {data.road_class}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2.5 border-t border-white/[0.08]">
                <div className="bg-[#08090D] p-2 rounded-2xl border border-white/[0.06]">
                  <span className="text-slate-400 block text-[9px] uppercase font-mono">Speed Limit</span>
                  <span className="font-display font-bold text-white text-xs">{data.speed_limit_kmh} km/h</span>
                </div>
                <div className="bg-[#08090D] p-2 rounded-2xl border border-white/[0.06]">
                  <span className="text-slate-400 block text-[9px] uppercase font-mono">Lanes</span>
                  <span className="font-display font-bold text-white text-xs">{data.lane_count} Lanes</span>
                </div>
                <div className="bg-[#08090D] p-2 rounded-2xl border border-white/[0.06]">
                  <span className="text-slate-400 block text-[9px] uppercase font-mono">Length</span>
                  <span className="font-display font-bold text-white text-xs">{data.length_meters}m</span>
                </div>
              </div>
            </div>

            {/* Calibrated Risk Gauge (Designer Radial Progress Ring) */}
            <div className={`p-5 rounded-3xl border relative overflow-hidden transition-all ${
              isHighRisk
                ? 'bg-gradient-to-br from-rose-950/40 via-[#0D0F15] to-[#0D0F15] border-rose-500/30'
                : isModerateRisk
                ? 'bg-gradient-to-br from-amber-950/40 via-[#0D0F15] to-[#0D0F15] border-amber-500/30'
                : 'bg-gradient-to-br from-emerald-950/40 via-[#0D0F15] to-[#0D0F15] border-emerald-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Calibrated Relative Risk
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-black text-3xl text-white tracking-tight">
                      {riskPercent}%
                    </span>
                    <span className={`text-[10px] font-mono font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isHighRisk
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : isModerateRisk
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}>
                      {data.risk_tier} REGIME
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Confidence: <strong className="text-emerald-400 font-mono">{data.data_confidence}</strong>
                  </p>
                </div>

                {/* SVG Radial Gauge Meter */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="text-white/[0.08]"
                      strokeWidth="7"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      stroke={ringColor}
                      strokeWidth="7"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-display font-black text-sm text-white">
                    {riskPercent}%
                  </div>
                </div>
              </div>
            </div>

            {/* Official Blackspot Ground Truth Overlap */}
            <div className="glass-card rounded-3xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-slate-200 font-display font-bold text-sm">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Empirical Blackspot Proximity</span>
              </div>
              {data.is_blackspot_corridor ? (
                <div className="space-y-1.5 p-3 bg-rose-950/30 rounded-2xl border border-rose-900/40">
                  <p className="text-rose-300 text-xs font-semibold">
                    🚨 Designated BTP Blackspot Corridor: {data.official_blackspot_name || 'Chronic Fatal Cluster'}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Centroid Distance: <strong className="text-white font-mono">{data.historical_blackspot_proximity_m}m</strong> (within MoRTH 500m evaluation perimeter).
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 text-xs leading-relaxed">
                  No direct overlap with official BTP 3-year blackspot corridors. Nearest chronic crash centroid is <strong className="text-slate-200 font-mono">{data.historical_blackspot_proximity_m}m</strong> away.
                </p>
              )}
            </div>

            {/* Local SHAP Waterfall Attribution (The XAI Visualizer) */}
            <div className="glass-card rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
                <div className="flex items-center space-x-2 text-white font-display font-bold text-sm">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>SHAP Feature Attribution</span>
                </div>
                <span className="text-[10px] text-cyan-300 font-mono bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20">
                  TreeExplainer
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                Quantifies individual infrastructure &amp; ambient contributions driving this segment's calibrated probability:
              </p>

              <div className="space-y-2 pt-1">
                {data.shap_top_factors.map((factor, idx) => (
                  <div key={idx} className="space-y-1.5 bg-[#08090D] p-3 rounded-2xl border border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{factor.feature}</span>
                      <span className={`font-mono font-black text-xs px-2 py-0.5 rounded-lg ${
                        factor.direction === 'increases_risk' 
                          ? 'text-rose-400 bg-rose-950/40 border border-rose-900/40' 
                          : 'text-emerald-400 bg-emerald-950/40 border border-emerald-900/40'
                      }`}>
                        {factor.direction === 'increases_risk' ? '+' : '-'}{factor.impact_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-[#1A1E2B] h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          factor.direction === 'increases_risk' ? 'bg-[#FF2E5B]' : 'bg-[#00F59B]'
                        }`}
                        style={{ width: `${Math.min(100, factor.impact_percentage * 3)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Citizen Hazard Corroboration */}
            <div className="glass-card rounded-3xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-white font-display font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Citizen Hazard Prioritization</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-black text-[10px] border border-amber-500/30">
                  HPI: {data.hazard_prioritization_score} / 5.0
                </span>
              </div>
              <p className="text-xs text-slate-300">
                <strong>{data.active_hazards_count} corroborated reports</strong> recorded within 300m spatial buffer of this corridor.
              </p>
            </div>

            {/* Recommended Municipal Action */}
            <div className="bg-gradient-to-br from-cyan-950/40 via-[#0D0F15] to-[#0D0F15] border border-cyan-500/30 rounded-3xl p-4 space-y-2 shadow-xl">
              <div className="flex items-center space-x-2 text-cyan-300 font-display font-bold text-xs">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                <span>Recommended Municipal Action</span>
              </div>
              <p className="text-slate-200 text-xs leading-relaxed font-medium">
                {data.recommended_action}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
