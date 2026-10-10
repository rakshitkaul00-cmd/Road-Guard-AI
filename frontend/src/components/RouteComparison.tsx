import React, { useState } from 'react';
import { 
  Shield, Navigation, AlertTriangle, CheckCircle, Clock, ArrowRight, 
  Info, Sparkles, MapPin, Gauge, Award, Compass, Zap
} from 'lucide-react';
import { api, RouteEvaluationResponse } from '../services/api';

export const RouteComparison: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState('hebbal_to_silkboard');
  const [loading, setLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<RouteEvaluationResponse | null>(null);

  const presets = [
    {
      id: 'hebbal_to_silkboard',
      title: 'Corridor 1: Hebbal Flyover → Silk Board Junction',
      subtitle: 'North-to-South Arterial Transit Spine',
      origin: [13.0358, 77.5970] as [number, number],
      destination: [12.9176, 77.6238] as [number, number]
    },
    {
      id: 'indiranagar_to_koramangala',
      title: 'Corridor 2: Indiranagar 100ft Rd → Koramangala Sony World',
      subtitle: 'East-Central Urban Commercial Connector',
      origin: [12.9784, 77.6408] as [number, number],
      destination: [12.9345, 77.6271] as [number, number]
    },
    {
      id: 'peenya_to_ecity',
      title: 'Corridor 3: Peenya 8th Mile → Electronic City Phase 1',
      subtitle: 'Industrial Ring Highway • Heavy Vehicle Flow',
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
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-2 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Safety-Informed Transit Intelligence</span>
        </div>
        <h2 className="text-xl md:text-2xl font-black text-white">
          Multi-Route Risk Exposure Comparison
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed">
          Traditional turn-by-turn navigation platforms optimize blindly for travel time or distance, routinely funneling commuters through fatal collision clusters. RoadGuard AI evaluates candidate transit paths by calculating cumulative casualty risk exposure and blackspot intersections.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-200">
            Select Transit Corridor in Bengaluru:
          </label>
          <span className="text-[11px] text-blue-400 font-mono">OSRM & BTP Evaluation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => handleEvaluate(p.id)}
              className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                selectedPreset === p.id
                  ? 'bg-blue-600/15 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span className="font-bold block text-slate-100 text-xs">{p.title}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{p.subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Route Evaluation Display */}
      {loading && (
        <div className="py-24 text-center space-y-3 text-slate-400 font-mono text-xs">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Evaluating multi-route cumulative risk exposure & blackspot intersections...</p>
        </div>
      )}

      {!loading && evaluationResult && (
        <div className="space-y-6">
          {/* Side-by-Side Route Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {evaluationResult.routes.map((route, idx) => {
              const isLowerRisk = route.safety_tier === 'LOWER_EXPOSURE';
              return (
                <div
                  key={route.route_id}
                  className={`bg-slate-900/90 border rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-4 transition-all relative overflow-hidden ${
                    isLowerRisk
                      ? 'border-emerald-500/50 shadow-emerald-500/10'
                      : 'border-slate-800'
                  }`}
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        isLowerRisk
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {isLowerRisk ? '★ RECOMMENDED SAFER ROUTE' : 'STANDARD ARTERIAL ROUTE'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">Path #{idx + 1}</span>
                    </div>

                    <h3 className="text-base font-black text-white mb-1">{route.route_name}</h3>

                    {/* Metric Grid */}
                    <div className="grid grid-cols-2 gap-2.5 mt-4 text-xs">
                      <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Distance</span>
                        <span className="text-lg font-black text-white">{route.total_distance_km} km</span>
                      </div>
                      <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Estimated Travel Time</span>
                        <span className="text-lg font-black text-white">{route.estimated_time_mins} mins</span>
                      </div>
                      <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">BTP Blackspots Traversed</span>
                        <span className={`text-lg font-black ${route.blackspot_corridors_traversed > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {route.blackspot_corridors_traversed} corridors
                        </span>
                      </div>
                      <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Citizen Hazards</span>
                        <span className="text-lg font-black text-amber-400">{route.active_hazard_count} reports</span>
                      </div>
                    </div>

                    {/* Cumulative Exposure Bar */}
                    <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Cumulative Risk Exposure Score:</span>
                        <span className={`font-mono font-black text-sm ${isLowerRisk ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {route.cumulative_risk_exposure}
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isLowerRisk ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-rose-500'
                          }`}
                          style={{ width: `${Math.min(100, (route.cumulative_risk_exposure / 15) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-300 border-t border-slate-800/80">
                    {isLowerRisk ? (
                      <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                        <CheckCircle className="w-4 h-4" /> Bypasses chronic collision hotspots; significantly lower fatality probability.
                      </span>
                    ) : (
                      <span className="text-amber-400/90 flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-4 h-4" /> Traverses high-speed arterial corridors with chronic junction convergence.
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rationale Banner */}
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-2xl p-5 text-xs text-emerald-200 flex items-start space-x-3.5 shadow-xl">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">Comparative Decision Analysis</h4>
              <p className="leading-relaxed text-emerald-200/95 text-xs">{evaluationResult.recommendation_rationale}</p>
            </div>
          </div>

          {/* Academic Disclaimer */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5 text-[11px] text-slate-400 leading-normal flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>{evaluationResult.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
