import React, { useState } from 'react';
import { Shield, Navigation, AlertTriangle, CheckCircle, Clock, ArrowRight, Info, Sparkles } from 'lucide-react';
import { api, RouteEvaluationResponse } from '../services/api';

export const RouteComparison: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState('hebbal_to_silkboard');
  const [loading, setLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<RouteEvaluationResponse | null>(null);

  const presets = [
    {
      id: 'hebbal_to_silkboard',
      name: 'Preset 1: Hebbal Flyover → Silk Board Junction (North-to-South Spine)',
      origin: [13.0358, 77.5970] as [number, number],
      destination: [12.9176, 77.6238] as [number, number]
    },
    {
      id: 'indiranagar_to_koramangala',
      name: 'Preset 2: Indiranagar 100ft Rd → Koramangala Sony World (East-Central)',
      origin: [12.9784, 77.6408] as [number, number],
      destination: [12.9345, 77.6271] as [number, number]
    },
    {
      id: 'peenya_to_ecity',
      name: 'Preset 3: Peenya 8th Mile → Electronic City (Industrial Outer Corridor)',
      origin: [13.0458, 77.5029] as [number, number],
      destination: [12.8452, 77.6602] as [number, number]
    }
  ];

  const handleEvaluate = async (presetId: string) => {
    setSelectedPreset(presetId);
    const chosen = presets.find(p => p.id === presetId);
    if (!chosen) return;

    setLoading(true);
    try {
      const res = await api.evaluateRoute(chosen.origin, chosen.destination);
      setEvaluationResult(res);
    } catch (e) {
      console.error("Failed to evaluate route", e);
    } finally {
      setLoading(false);
    }
  };

  // Evaluate default preset on mount
  React.useEffect(() => {
    handleEvaluate('hebbal_to_silkboard');
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          <span>Safety-Informed Transit Intelligence</span>
        </div>
        <h2 className="text-xl md:text-2xl font-black text-white">
          Multi-Route Risk Exposure Comparison
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed">
          Traditional navigation algorithms optimize strictly for the shortest distance or fastest travel time, routinely funneling commuters through high-speed, chronic accident blackspots. RoadGuard AI analyzes candidate transit corridors by integrating documented BTP historical crash clusters and active crowdsourced hazard density.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <label className="block text-xs font-bold text-slate-300">
          Select Transit Corridor in Bengaluru:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => handleEvaluate(p.id)}
              className={`p-3 rounded-xl border text-left text-xs transition-all ${
                selectedPreset === p.id
                  ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span className="font-semibold block text-slate-200">{p.name.split(':')[0]}</span>
              <span className="text-[11px] text-slate-400 line-clamp-1">{p.name.split(':')[1]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Route Evaluation Display */}
      {loading && (
        <div className="py-20 text-center space-y-2 text-slate-400 font-mono text-xs">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Evaluating candidate route exposure & blackspot intersections...</p>
        </div>
      )}

      {!loading && evaluationResult && (
        <div className="space-y-6">
          {/* Side-by-Side Route Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evaluationResult.routes.map((route, idx) => {
              const isLowerRisk = route.safety_tier === 'LOWER_EXPOSURE';
              return (
                <div
                  key={route.route_id}
                  className={`bg-[#0F172A] border rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 transition-all ${
                    isLowerRisk
                      ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
                      : 'border-slate-800'
                  }`}
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isLowerRisk
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {isLowerRisk ? '★ RECOMMENDED SAFER ROUTE' : 'STANDARD FASTEST ROUTE'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Option {idx + 1}</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1">{route.route_name}</h3>

                    {/* Metric Grid */}
                    <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Total Distance</span>
                        <span className="text-base font-bold text-white">{route.total_distance_km} km</span>
                      </div>
                      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Estimated Duration</span>
                        <span className="text-base font-bold text-white">{route.estimated_time_mins} mins</span>
                      </div>
                      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">BTP Blackspots Traversed</span>
                        <span className={`text-base font-bold ${route.blackspot_corridors_traversed > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {route.blackspot_corridors_traversed} corridors
                        </span>
                      </div>
                      <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Active Citizen Hazards</span>
                        <span className="text-base font-bold text-amber-400">{route.active_hazard_count} reports</span>
                      </div>
                    </div>

                    {/* Cumulative Exposure Bar */}
                    <div className="mt-4 p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400">Cumulative Risk Exposure Score:</span>
                        <span className={`font-mono font-bold ${isLowerRisk ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {route.cumulative_risk_exposure}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${isLowerRisk ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(100, (route.cumulative_risk_exposure / 15) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-400">
                    {isLowerRisk ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" /> Bypasses chronic collision blackspots.
                      </span>
                    ) : (
                      <span className="text-amber-400/90 flex items-center gap-1 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" /> Traverses high-speed arterial bottlenecks.
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rationale Banner */}
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-4 text-xs text-emerald-200 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Comparative Decision Analysis</h4>
              <p className="leading-relaxed text-emerald-200/90">{evaluationResult.recommendation_rationale}</p>
            </div>
          </div>

          {/* Official Academic Disclaimer */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-[11px] text-slate-500 leading-normal flex items-start space-x-2">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>{evaluationResult.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
