import React, { useEffect, useState } from 'react';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Activity, MapPin, Gauge, Lightbulb } from 'lucide-react';
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

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0F172A]/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl flex flex-col transition-all">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Segment Risk Assessment Card</h3>
            <span className="text-[10px] text-slate-400 font-mono">Segment ID: #{segmentId}</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {loading && (
          <div className="py-20 text-center space-y-2 text-slate-400 font-mono">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p>Evaluating calibrated ML model & SHAP factors...</p>
          </div>
        )}

        {!loading && data && (
          <>
            {/* Road Metadata Banner */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <h4 className="font-bold text-slate-100 text-base">{data.road_name}</h4>
              <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-slate-800">
                <div>
                  <span className="text-slate-500 block">Class:</span>
                  <span className="font-semibold text-slate-200 uppercase">{data.road_class}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Speed Limit:</span>
                  <span className="font-semibold text-slate-200">{data.speed_limit_kmh} km/h</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Lanes:</span>
                  <span className="font-semibold text-slate-200">{data.lane_count} lanes</span>
                </div>
              </div>
            </div>

            {/* Calibrated Model Probability Meter */}
            <div className={`p-4 rounded-xl border space-y-3 ${
              data.risk_tier === 'ELEVATED'
                ? 'bg-red-500/10 border-red-500/30'
                : data.risk_tier === 'MODERATE'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-emerald-500/10 border-emerald-500/30'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Calibrated Relative Risk
                  </span>
                  <div className="flex items-baseline space-x-2 mt-0.5">
                    <span className="text-2xl font-black text-slate-100">
                      {Math.round(data.calibrated_risk_probability * 100)}%
                    </span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      data.risk_tier === 'ELEVATED'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : data.risk_tier === 'MODERATE'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {data.risk_tier} REGIME
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Data Confidence</span>
                  <span className="font-bold text-emerald-400 text-xs">{data.data_confidence}</span>
                </div>
              </div>

              {/* Progress Meter */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className={`h-full transition-all duration-500 ${
                    data.risk_tier === 'ELEVATED' ? 'bg-red-500' : data.risk_tier === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.round(data.calibrated_risk_probability * 100)}%` }}
                />
              </div>
            </div>

            {/* Historical Blackspot Evidence */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center space-x-2 text-slate-300 font-bold">
                <MapPin className="w-4 h-4 text-red-400" />
                <span>Historical Blackspot Association</span>
              </div>
              {data.is_blackspot_corridor ? (
                <div className="space-y-1">
                  <p className="text-red-300 text-[11px] leading-relaxed">
                    <strong>Designated BTP Blackspot Corridor:</strong> {data.official_blackspot_name || 'Chronic High-Fatality Cluster'}
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    Proximity to centroid: <strong>{data.historical_blackspot_proximity_m} meters</strong> (within MoRTH 500m evaluation buffer).
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 text-[11px]">
                  No direct overlap with official BTP 3-year blackspot corridors. Nearest blackspot is {data.historical_blackspot_proximity_m}m away.
                </p>
              )}
            </div>

            {/* Local SHAP Waterfall Attribution */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-200 font-bold">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>Explainability: SHAP Feature Attribution</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">TreeExplainer</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                Shows the quantitative marginal contribution of individual road geometry and operating factors to the estimated risk probability:
              </p>

              <div className="space-y-2 pt-1">
                {data.shap_top_factors.map((factor, idx) => (
                  <div key={idx} className="space-y-1 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200 text-[11px]">{factor.feature}</span>
                      <span className={`font-mono font-bold text-[11px] ${
                        factor.direction === 'increases_risk' ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                        {factor.direction === 'increases_risk' ? '+' : '-'}{factor.impact_percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${factor.direction === 'increases_risk' ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(100, factor.impact_percentage * 3)}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Citizen Hazard Queue & HPI */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-200 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Citizen Hazard Prioritization</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  HPI: {data.hazard_prioritization_score} / 5.0
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                <strong>{data.active_hazards_count} active citizen reports</strong> recorded within 300m buffer zone of this segment.
              </p>
            </div>

            {/* Actionable Municipal Guidance */}
            <div className="bg-blue-950/40 border border-blue-800/50 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-blue-400 font-bold text-[11px]">
                <Lightbulb className="w-4 h-4" />
                <span>Recommended Municipal Action</span>
              </div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                {data.recommended_action}
              </p>
            </div>

            {/* Academic Viva Disclaimer */}
            <div className="text-[9px] text-slate-500 leading-normal border-t border-slate-800 pt-2">
              * Note for Academic Evaluation: Predicted risk probability is generated by a Platt-calibrated HistGradientBoosting classifier trained on 36-month historical Bengaluru infrastructure patterns. It estimates relative corridor likelihood, not deterministic crash prophecy.
            </div>
          </>
        )}
      </div>
    </div>
  );
};
