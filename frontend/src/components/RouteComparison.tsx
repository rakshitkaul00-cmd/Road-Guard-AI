import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Shield, Navigation, AlertTriangle, CheckCircle, Clock, ArrowRight, 
  Info, Sparkles, MapPin, Gauge, Award, Compass, Zap, Check, ChevronRight,
  Eye, Flag
} from 'lucide-react';
import { api, RouteEvaluationResponse } from '../services/api';

export const RouteComparison: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState('hebbal_to_silkboard');
  const [loading, setLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<RouteEvaluationResponse | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<string>('route_collector_secondary');

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayersRef = useRef<{ [key: string]: L.Polyline }>({});
  const markerGroupRef = useRef<L.LayerGroup>(L.layerGroup());

  const presets = [
    {
      id: 'hebbal_to_silkboard',
      title: 'Hebbal Flyover → Silk Board Junction',
      subtitle: 'North-to-South Arterial Transit Spine',
      origin: [13.0358, 77.5970] as [number, number],
      destination: [12.9176, 77.6238] as [number, number]
    },
    {
      id: 'indiranagar_to_koramangala',
      title: 'Indiranagar 100ft Rd → Koramangala Sony World',
      subtitle: 'East-Central Urban Commercial Connector',
      origin: [12.9784, 77.6408] as [number, number],
      destination: [12.9345, 77.6271] as [number, number]
    },
    {
      id: 'peenya_to_ecity',
      title: 'Peenya 8th Mile → Electronic City Phase 1',
      subtitle: 'Industrial Highway Ring • High Freight Volume',
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
      // Default to the safer route
      setActiveRouteId('route_collector_secondary');
    } catch (e) {
      console.error("Failed to evaluate route", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleEvaluate('hebbal_to_silkboard');
  }, []);

  // Initialize Route Visualizer Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 12,
      zoomControl: false,
      attributionControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Midnight dark map tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(map);

    markerGroupRef.current.addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Plot routes and waypoints when evaluationResult changes
  useEffect(() => {
    if (!mapInstanceRef.current || !evaluationResult) return;
    const map = mapInstanceRef.current;

    // Clear previous routes
    Object.values(routeLayersRef.current).forEach(layer => map.removeLayer(layer));
    routeLayersRef.current = {};
    markerGroupRef.current.clearLayers();

    const [origLat, origLon] = evaluationResult.origin;
    const [destLat, destLon] = evaluationResult.destination;

    // Origin Marker
    const originIcon = L.divIcon({
      className: 'route-origin-pin',
      html: `
        <div class="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 border-2 border-white shadow-xl text-slate-950 font-black text-xs">
          A
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    L.marker([origLat, origLon], { icon: originIcon })
      .bindPopup("<strong>Trip Origin:</strong> " + presets.find(p => p.id === selectedPreset)?.title.split('→')[0])
      .addTo(markerGroupRef.current);

    // Destination Marker
    const destIcon = L.divIcon({
      className: 'route-dest-pin',
      html: `
        <div class="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-400 border-2 border-white shadow-xl text-slate-950 font-black text-xs">
          B
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });
    L.marker([destLat, destLon], { icon: destIcon })
      .bindPopup("<strong>Trip Destination:</strong> " + presets.find(p => p.id === selectedPreset)?.title.split('→')[1])
      .addTo(markerGroupRef.current);

    // Draw Route Polylines
    const allCoords: [number, number][] = [];

    evaluationResult.routes.forEach(route => {
      const isSafer = route.safety_tier === 'LOWER_EXPOSURE';
      const color = isSafer ? '#00F59B' : '#FFB800';
      const coords = route.waypoints as [number, number][];

      coords.forEach(c => allCoords.push(c));

      const polyline = L.polyline(coords, {
        color: color,
        weight: route.route_id === activeRouteId ? 6 : 4,
        opacity: route.route_id === activeRouteId ? 0.95 : 0.6,
        dashArray: isSafer ? undefined : '6, 6'
      }).addTo(map);

      polyline.bindTooltip(
        `<div class="text-xs font-bold">${route.route_name.split(':')[0]}: ${route.estimated_time_mins} mins • Exposure ${route.cumulative_risk_exposure}</div>`,
        { sticky: true }
      );

      polyline.on('click', () => {
        setActiveRouteId(route.route_id);
      });

      routeLayersRef.current[route.route_id] = polyline;
    });

    if (allCoords.length > 0) {
      map.fitBounds(L.latLngBounds(allCoords), { padding: [40, 40] });
    }
  }, [evaluationResult, activeRouteId]);

  // Update line weight when activeRouteId changes
  useEffect(() => {
    Object.entries(routeLayersRef.current).forEach(([id, polyline]) => {
      const isActive = id === activeRouteId;
      polyline.setStyle({
        weight: isActive ? 6.5 : 3.5,
        opacity: isActive ? 0.95 : 0.45
      });
      if (isActive) {
        polyline.bringToFront();
      }
    });
  }, [activeRouteId]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 font-sans">
      {/* Header Banner */}
      <div className="glass-card-elevated rounded-3xl p-6 md:p-8 space-y-3 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>Safety-Informed Transit Intelligence</span>
        </div>
        <h2 className="font-display font-black text-2xl md:text-3xl text-white tracking-tight">
          Multi-Route Risk Exposure Comparison
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed font-light">
          Traditional navigation systems prioritize strictly for travel time or shortest distance, routinely funneling commuters through fatal collision clusters. RoadGuard AI calculates candidate transit corridors by integrating empirical BTP blackspot crossings with active crowdsourced hazard density.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="glass-card rounded-3xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-display font-bold text-white">
            Select Transit Corridor in Bengaluru:
          </label>
          <span className="text-[11px] font-mono text-cyan-400">OSRM Geometry &amp; Platt ML Engine</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => handleEvaluate(p.id)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 active:scale-[0.99] ${
                selectedPreset === p.id
                  ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/10 border-cyan-500/50 text-white shadow-xl shadow-cyan-500/10'
                  : 'bg-[#08090D] border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <span className="font-display font-bold block text-white text-xs">{p.title}</span>
              <span className="text-[11px] text-slate-400 block mt-1">{p.subtitle}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive GIS Route Visualizer Map */}
      <div className="glass-card-elevated rounded-3xl p-4 space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-display font-bold text-white text-sm">Geospatial Transit Corridor Map</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-3.5 h-1.5 rounded-full bg-[#00F59B]"></span>
              Route 2 (Safer Bypass)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3.5 h-1.5 rounded-full bg-[#FFB800]"></span>
              Route 1 (Arterial Arterial)
            </span>
          </div>
        </div>

        <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 map-theme-dark">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>

      {/* Route Evaluation Display */}
      {loading && (
        <div className="py-24 text-center space-y-3 text-slate-400 font-mono text-xs">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Evaluating multi-route exposure & blackspot intersections...</p>
        </div>
      )}

      {!loading && evaluationResult && (
        <div className="space-y-6">
          {/* Side-by-Side Route Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {evaluationResult.routes.map((route, idx) => {
              const isLowerRisk = route.safety_tier === 'LOWER_EXPOSURE';
              const isSelected = route.route_id === activeRouteId;
              return (
                <div
                  key={route.route_id}
                  onClick={() => setActiveRouteId(route.route_id)}
                  className={`glass-card rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-5 transition-all duration-300 relative overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'border-cyan-400 ring-2 ring-cyan-500/30 bg-white/[0.02]'
                      : isLowerRisk
                      ? 'border-emerald-500/40 shadow-emerald-500/10'
                      : 'border-white/[0.08]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                        isLowerRisk
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {isLowerRisk ? '★ RECOMMENDED SAFER ROUTE' : 'STANDARD FASTEST ROUTE'}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {isSelected ? '● SELECTED ON MAP' : `OPTION #${idx + 1}`}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-lg text-white">{route.route_name}</h3>

                    {/* Metric Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-[#08090D] p-3 rounded-2xl border border-white/[0.06]">
                        <span className="text-slate-400 block text-[10px] font-mono uppercase">Total Distance</span>
                        <span className="font-display font-black text-lg text-white">{route.total_distance_km} km</span>
                      </div>
                      <div className="bg-[#08090D] p-3 rounded-2xl border border-white/[0.06]">
                        <span className="text-slate-400 block text-[10px] font-mono uppercase">Estimated Duration</span>
                        <span className="font-display font-black text-lg text-white">{route.estimated_time_mins} mins</span>
                      </div>
                      <div className="bg-[#08090D] p-3 rounded-2xl border border-white/[0.06]">
                        <span className="text-slate-400 block text-[10px] font-mono uppercase">BTP Blackspots Traversed</span>
                        <span className={`font-display font-black text-lg ${route.blackspot_corridors_traversed > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {route.blackspot_corridors_traversed} corridors
                        </span>
                      </div>
                      <div className="bg-[#08090D] p-3 rounded-2xl border border-white/[0.06]">
                        <span className="text-slate-400 block text-[10px] font-mono uppercase">Active Citizen Hazards</span>
                        <span className="font-display font-black text-lg text-amber-400">{route.active_hazard_count} reports</span>
                      </div>
                    </div>

                    {/* Cumulative Exposure Progress */}
                    <div className="p-3.5 bg-[#08090D] rounded-2xl border border-white/[0.06] space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-medium">Cumulative Risk Exposure Score:</span>
                        <span className={`font-mono font-black text-sm ${isLowerRisk ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {route.cumulative_risk_exposure}
                        </span>
                      </div>
                      <div className="w-full bg-[#1A1E2B] rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isLowerRisk 
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]' 
                              : 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-[0_0_8px_rgba(245,158,11,0.7)]'
                          }`}
                          style={{ width: `${Math.min(100, (route.cumulative_risk_exposure / 15) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-xs border-t border-white/[0.08]">
                    {isLowerRisk ? (
                      <span className="text-emerald-400 flex items-center gap-2 font-bold">
                        <CheckCircle className="w-4 h-4 text-emerald-400" /> Bypasses chronic collision hotspots; significantly lower fatality probability.
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-400" /> Traverses high-speed arterial bottlenecks with documented crash clusters.
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rationale Banner */}
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-3xl p-5 text-xs text-emerald-200 flex items-start space-x-3.5 shadow-2xl">
            <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-white">Comparative Decision Analysis</h4>
              <p className="leading-relaxed text-emerald-200/90 text-xs">{evaluationResult.recommendation_rationale}</p>
            </div>
          </div>

          {/* Official Academic Disclaimer */}
          <div className="glass-card rounded-2xl p-4 text-[11px] text-slate-400 leading-normal flex items-start space-x-2.5">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>{evaluationResult.disclaimer}</span>
          </div>
        </div>
      )}
    </div>
  );
};
