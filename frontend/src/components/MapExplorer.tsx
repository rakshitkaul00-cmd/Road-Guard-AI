import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, Shield, AlertTriangle, Sun, Moon, CloudRain, Info, Search, 
  CloudLightning, Compass, ChevronDown, ChevronUp, Eye, EyeOff,
  Radio, Sparkles, Navigation2, CheckCircle2, Wind
} from 'lucide-react';
import { api, MapLayersResponse, MapLayerFeature } from '../services/api';

interface MapExplorerProps {
  onSelectSegment: (segmentId: number) => void;
  onOpenReportAtCoord: (lat: number, lon: number) => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onSelectSegment, onOpenReportAtCoord }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  
  const layerGroupsRef = useRef<{
    blackspots: L.LayerGroup;
    segments: L.LayerGroup;
    hazards: L.LayerGroup;
  }>({
    blackspots: L.layerGroup(),
    segments: L.layerGroup(),
    hazards: L.layerGroup()
  });

  const [loading, setLoading] = useState(true);
  const [layersData, setLayersData] = useState<MapLayersResponse | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Basemap View: 'dark' | 'satellite' | 'standard'
  const [basemapStyle, setBasemapStyle] = useState<'dark' | 'satellite' | 'standard'>('dark');

  // Live Free Weather & Search
  const [liveWeather, setLiveWeather] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggles & Simulation Context
  const [showBlackspots, setShowBlackspots] = useState(true);
  const [showSegments, setShowSegments] = useState(true);
  const [showHazards, setShowHazards] = useState(true);
  const [isNightTime, setIsNightTime] = useState(1);
  const [isRainActive, setIsRainActive] = useState(0);

  // Bengaluru Major Transport Hubs
  const BENGALURU_HUBS: Record<string, { coords: [number, number]; desc: string }> = {
    'Silk Board': { coords: [12.9176, 77.6238], desc: 'Outer Ring Rd • High Crash Density' },
    'Hebbal Flyover': { coords: [13.0358, 77.5970], desc: 'NH-44 Airport Corridor' },
    'Marathahalli': { coords: [12.9562, 77.7011], desc: 'ORR East Tech Zone' },
    'Tin Factory': { coords: [12.9972, 77.6698], desc: 'Old Madras Rd • KR Puram' },
    'Peenya 8th Mile': { coords: [13.0458, 77.5029], desc: 'Tumakuru Highway Corridor' },
    'Electronic City': { coords: [12.8452, 77.6602], desc: 'Hosur Rd Elevated Flyover' },
    'Indiranagar': { coords: [12.9784, 77.6408], desc: '100ft Rd Commercial Zone' },
    'Kengeri Bus Stand': { coords: [12.9125, 77.4839], desc: 'Mysuru Rd High-Speed Link' }
  };

  // Switch Tile Layer dynamically
  const updateTileLayer = (style: 'dark' | 'satellite' | 'standard', map: L.Map) => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (style === 'satellite') {
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri &mdash; High-Resolution Aerial Satellite',
          maxZoom: 18
        }
      ).addTo(map);
    } else {
      tileLayerRef.current = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }
      ).addTo(map);
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [12.9716, 77.5946],
      zoom: 12,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    updateTileLayer(basemapStyle, map);

    layerGroupsRef.current.blackspots.addTo(map);
    layerGroupsRef.current.segments.addTo(map);
    layerGroupsRef.current.hazards.addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = parseFloat(e.latlng.lat.toFixed(5));
      const lng = parseFloat(e.latlng.lng.toFixed(5));
      onOpenReportAtCoord(lat, lng);
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tiles when basemap style changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      updateTileLayer(basemapStyle, mapInstanceRef.current);
    }
  }, [basemapStyle]);

  // Load Layers & Live Weather
  const fetchMapData = async () => {
    setLoading(true);
    try {
      const data = await api.getMapLayers('all', 1);
      setLayersData(data);
    } catch (e) {
      console.error("Failed to load map layers", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchLiveWeather = async () => {
    try {
      const w = await api.getLiveWeather();
      setLiveWeather(w);
      if (w.is_precipitation_active) {
        setIsRainActive(1);
      }
    } catch (e) {
      console.error("Live weather error", e);
    }
  };

  useEffect(() => {
    fetchMapData();
    fetchLiveWeather();
  }, []);

  const handleJumpToHub = (coords: [number, number]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, 14, { duration: 1.4 });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    for (const [name, info] of Object.entries(BENGALURU_HUBS)) {
      if (name.toLowerCase().includes(query)) {
        handleJumpToHub(info.coords);
        return;
      }
    }
    handleJumpToHub([12.9716, 77.5946]);
  };

  // Render Features to Leaflet
  useEffect(() => {
    if (!mapInstanceRef.current || !layersData) return;

    const { blackspots, segments, hazards } = layerGroupsRef.current;
    blackspots.clearLayers();
    segments.clearLayers();
    hazards.clearLayers();

    layersData.features.forEach((feature: MapLayerFeature) => {
      const p = feature.properties;

      // 1. Official BTP Blackspots
      if (p.layer_type === 'official_blackspot' && showBlackspots) {
        const [lon, lat] = feature.geometry.coordinates;

        // 500m evaluation perimeter
        const bufferCircle = L.circle([lat, lon], {
          radius: p.buffer_radius_m || 500,
          color: '#FF2E5B',
          weight: 1.5,
          opacity: 0.7,
          fillColor: '#FF2E5B',
          fillOpacity: 0.12,
          dashArray: '6, 8'
        });

        // Custom Double-Radar Center Marker
        const customIcon = L.divIcon({
          className: 'tactical-blackspot-icon',
          html: `
            <div class="relative flex items-center justify-center">
              <span class="absolute w-8 h-8 rounded-full bg-rose-500/30 radar-ping"></span>
              <span class="relative w-4 h-4 rounded-full bg-[#FF2E5B] border-2 border-white shadow-lg flex items-center justify-center">
                <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
              </span>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const centerMarker = L.marker([lat, lon], { icon: customIcon });

        const popupContent = `
          <div class="p-2 space-y-2.5 max-w-xs font-sans text-slate-100">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <span class="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                OFFICIAL BTP BLACKSPOT
              </span>
              <span class="text-[10px] font-mono text-slate-400">#${p.blackspot_id}</span>
            </div>
            <div>
              <h4 class="font-display font-bold text-sm text-white">${p.junction_name}</h4>
              <p class="text-[11px] text-slate-300 font-medium">${p.corridor_name}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 bg-[#0A0D14] p-2 rounded-xl border border-white/10 text-xs">
              <div class="text-center p-1.5 bg-rose-950/40 rounded-lg border border-rose-900/30">
                <span class="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Fatalities (3-Yr)</span>
                <span class="font-display font-black text-rose-400 text-base">${p.fatal_count_3yr}</span>
              </div>
              <div class="text-center p-1.5 bg-amber-950/40 rounded-lg border border-amber-900/30">
                <span class="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">Injuries (3-Yr)</span>
                <span class="font-display font-black text-amber-400 text-base">${p.injury_count_3yr}</span>
              </div>
            </div>
            <p class="text-[11px] text-slate-300 leading-snug">
              <strong class="text-slate-200">Engineering Cause:</strong> ${p.primary_hazard_cause}
            </p>
            <div class="text-[9px] text-slate-400 border-t border-white/10 pt-1.5 flex items-center justify-between font-mono">
              <span>MoRTH Citation • Buffer: 500m</span>
              <span class="text-cyan-400 font-bold">Verified</span>
            </div>
          </div>
        `;
        centerMarker.bindPopup(popupContent);
        bufferCircle.bindPopup(popupContent);

        blackspots.addLayer(bufferCircle);
        blackspots.addLayer(centerMarker);
      }

      // 2. Analyzed Road Segments (LineStrings)
      if (p.layer_type === 'road_segment' && showSegments) {
        const coords = feature.geometry.coordinates.map((c: [number, number]) => [c[1], c[0]]);
        
        let color = '#00F59B'; // Mint Aurora
        let riskProb = p.calibrated_risk_probability;
        if (isNightTime && !p.is_blackspot_corridor) {
          riskProb = Math.min(0.95, riskProb + 0.12);
        }
        if (isRainActive) {
          riskProb = Math.min(0.95, riskProb + 0.14);
        }

        if (riskProb >= 0.58) color = '#FF2E5B'; // Crimson Neon
        else if (riskProb >= 0.28) color = '#FFB800'; // Solar Amber

        const polyline = L.polyline(coords, {
          color: color,
          weight: p.is_blackspot_corridor ? 6 : 4,
          opacity: 0.92,
          lineCap: 'round',
          lineJoin: 'round'
        });

        polyline.on('click', () => {
          onSelectSegment(p.segment_id);
        });

        polyline.bindTooltip(`
          <div class="text-xs p-1 space-y-1 font-sans">
            <div class="font-display font-bold text-white text-sm">${p.road_name}</div>
            <div class="flex items-center justify-between gap-3 text-[11px]">
              <span class="text-slate-300 capitalize">${p.road_class} • ${p.speed_limit_kmh} km/h</span>
              <span class="font-mono font-bold px-1.5 py-0.5 rounded text-[10px]" style="background:${color}25; color:${color}">
                ${Math.round(riskProb * 100)}% RELATIVE RISK
              </span>
            </div>
            <div class="text-[10px] text-cyan-400 font-medium pt-1 border-t border-white/10 flex items-center justify-between">
              <span>Click to inspect local SHAP card</span>
              <span class="font-mono">#${p.segment_id}</span>
            </div>
          </div>
        `, { sticky: true, opacity: 0.95 });

        segments.addLayer(polyline);
      }

      // 3. Citizen Hazard Submissions
      if (p.layer_type === 'citizen_hazard' && showHazards) {
        const [lon, lat] = feature.geometry.coordinates;

        const hazardIcon = L.divIcon({
          className: 'tactical-hazard-icon',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer hover:scale-125 transition-transform">
              <span class="w-4 h-4 rounded-full ${p.status === 'VERIFIED' ? 'bg-[#00F59B]' : 'bg-[#FFB800]'} border-2 border-white shadow-lg flex items-center justify-center text-[9px] font-black text-slate-950">
                ${p.corroboration_count > 1 ? p.corroboration_count : '!'}
              </span>
            </div>
          `,
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        });

        const hazardMarker = L.marker([lat, lon], { icon: hazardIcon });

        const statusBadge = p.status === 'VERIFIED'
          ? '<span class="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">MUNICIPALLY VERIFIED</span>'
          : '<span class="px-2 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">COMMUNITY CORROBORATED</span>';

        hazardMarker.bindPopup(`
          <div class="p-2 space-y-2 max-w-xs text-xs font-sans text-slate-100">
            <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span class="font-display font-bold text-white text-sm">${p.hazard_type}</span>
              ${statusBadge}
            </div>
            <p class="text-slate-300 text-xs leading-relaxed">${p.description}</p>
            <div class="grid grid-cols-2 gap-2 bg-[#0A0D14] p-2 rounded-xl border border-white/10 text-[11px]">
              <div>
                <span class="text-slate-400 block text-[9px]">Severity Score</span>
                <span class="font-mono font-bold text-amber-400">${p.severity_rating} / 5</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[9px]">Spatial Reports</span>
                <span class="font-mono font-bold text-cyan-400">${p.corroboration_count} corroborated</span>
              </div>
            </div>
            ${p.is_synthetic ? '<div class="text-[9px] text-slate-500 italic">Synthetic prototype observation (≤50m deduplicated)</div>' : ''}
          </div>
        `);

        hazards.addLayer(hazardMarker);
      }
    });
  }, [layersData, showBlackspots, showSegments, showHazards, isNightTime, isRainActive]);

  return (
    <div className={`relative w-full h-[calc(100vh-65px)] overflow-hidden map-theme-${basemapStyle} font-sans`}>
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Top Island: Telemetry & Basemap Switcher */}
      <div className="absolute top-3.5 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left Telemetry Pill */}
        <div className="pointer-events-auto flex items-center space-x-3 glass-card px-3.5 py-2 rounded-2xl shadow-2xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <div className="flex items-center space-x-2 text-xs">
            <span className="font-display font-bold text-white tracking-tight">BENGALURU GIS RADAR</span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-[11px] text-cyan-300">250 LINKS • 16 BLACKSPOTS</span>
          </div>
        </div>

        {/* Center / Right Weather & Basemap Dock */}
        <div className="pointer-events-auto flex items-center space-x-2.5">
          {liveWeather && (
            <div className="hidden sm:flex items-center space-x-2.5 glass-card px-3.5 py-2 rounded-2xl shadow-2xl text-xs text-slate-200">
              <CloudLightning className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono font-bold text-white">{liveWeather.temperature_c}°C</span>
              <span className="text-slate-400 text-[11px]">• {liveWeather.weather_condition}</span>
              {liveWeather.is_precipitation_active && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  RAIN ACTIVE
                </span>
              )}
            </div>
          )}

          {/* Designer Basemap Mode Selector */}
          <div className="flex items-center bg-[#0D0F15]/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-1 shadow-2xl text-xs font-medium">
            <button
              onClick={() => setBasemapStyle('dark')}
              className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${
                basemapStyle === 'dark' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌙 Obsidian
            </button>
            <button
              onClick={() => setBasemapStyle('satellite')}
              className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${
                basemapStyle === 'satellite' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🛰️ Satellite
            </button>
            <button
              onClick={() => setBasemapStyle('standard')}
              className={`px-3 py-1.5 rounded-xl transition-all duration-200 ${
                basemapStyle === 'standard' 
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🗺️ Map
            </button>
          </div>
        </div>
      </div>

      {/* Floating Tactical Island (Left Side) */}
      <div className={`absolute top-16 left-4 z-10 w-80 max-w-[calc(100vw-2rem)] glass-card-elevated rounded-3xl shadow-2xl text-xs transition-all duration-300 ${
        isPanelOpen ? 'p-4 space-y-3.5' : 'p-3 w-auto'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-display font-bold text-white text-sm">
            <Layers className="w-4 h-4 text-cyan-400" />
            {isPanelOpen && <span>Tactical Layers &amp; Simulation</span>}
          </div>
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title={isPanelOpen ? 'Collapse Controls' : 'Expand Controls'}
          >
            {isPanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isPanelOpen && (
          <>
            {/* Search Input with ⌘K Style */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Jump to junction (Silk Board, Hebbal...)"
                className="w-full bg-[#08090D] border border-white/10 rounded-2xl py-2 pl-9 pr-3 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>

            {/* Quick Hub Jump Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Corridor Fly-To:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(BENGALURU_HUBS).slice(0, 6).map((hub) => (
                  <button
                    key={hub}
                    type="button"
                    onClick={() => handleJumpToHub(BENGALURU_HUBS[hub].coords)}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 border border-white/[0.08] text-slate-300 transition-all active:scale-95"
                  >
                    {hub}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Visibility Toggles */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/[0.04] px-2.5 py-1.5 rounded-xl transition-all">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF2E5B] shadow-[0_0_10px_rgba(255,46,91,0.6)]"></span>
                  <span className="text-slate-200 font-medium">BTP Fatal Corridors (16)</span>
                </div>
                <input
                  type="checkbox"
                  checked={showBlackspots}
                  onChange={(e) => setShowBlackspots(e.target.checked)}
                  className="rounded bg-[#08090D] border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-white/[0.04] px-2.5 py-1.5 rounded-xl transition-all">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F59B] shadow-[0_0_10px_rgba(0,245,155,0.6)]"></span>
                  <span className="text-slate-200 font-medium">OSM ML Risk Segments (250)</span>
                </div>
                <input
                  type="checkbox"
                  checked={showSegments}
                  onChange={(e) => setShowSegments(e.target.checked)}
                  className="rounded bg-[#08090D] border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-white/[0.04] px-2.5 py-1.5 rounded-xl transition-all">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.6)]"></span>
                  <span className="text-slate-200 font-medium">Citizen Hazard Points (120)</span>
                </div>
                <input
                  type="checkbox"
                  checked={showHazards}
                  onChange={(e) => setShowHazards(e.target.checked)}
                  className="rounded bg-[#08090D] border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Real-Time Context Simulation Engine */}
            <div className="pt-2 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                  <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Context Simulation:
                </span>
                <span className="font-mono text-[10px] text-cyan-300">Modulates ML Surface</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsNightTime(isNightTime ? 0 : 1)}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all duration-200 ${
                    isNightTime
                      ? 'bg-indigo-950/70 border-indigo-500/50 text-indigo-200 shadow-lg shadow-indigo-500/10'
                      : 'bg-[#08090D] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {isNightTime ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isNightTime ? 'Night (+12%)' : 'Daylight'}</span>
                </button>

                <button
                  onClick={() => setIsRainActive(isRainActive ? 0 : 1)}
                  className={`flex items-center justify-center space-x-1.5 py-2 px-2.5 rounded-xl border text-[11px] font-semibold transition-all duration-200 ${
                    isRainActive
                      ? 'bg-cyan-950/70 border-cyan-500/50 text-cyan-200 shadow-lg shadow-cyan-500/10'
                      : 'bg-[#08090D] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isRainActive ? 'Rain (+14%)' : 'Dry Surface'}</span>
                </button>
              </div>
            </div>

            {/* Interaction Hint */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-2.5 text-[11px] text-cyan-300 flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Click on any road link to view its <strong>SHAP Factor AI Attribution Card</strong>. Click any open map point to submit a citizen report.</span>
            </div>
          </>
        )}
      </div>

      {/* Floating Tactical Legend (Bottom Left Dock) */}
      <div className="absolute bottom-4 left-4 z-10 glass-card px-4 py-3 rounded-2xl shadow-2xl text-[11px] space-y-1.5 hidden md:block">
        <div className="flex items-center justify-between text-slate-200 font-display font-bold border-b border-white/10 pb-1.5 gap-4">
          <span>Risk Surface Hierarchy</span>
          <span className="text-[10px] font-mono text-cyan-400">Platt Calibrated</span>
        </div>
        <div className="flex items-center space-x-4 pt-0.5">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-3.5 h-2 rounded bg-[#00F59B] shadow-[0_0_8px_rgba(0,245,155,0.6)]"></span>
            <span>&lt; 28% Low</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-3.5 h-2 rounded bg-[#FFB800] shadow-[0_0_8px_rgba(255,184,0,0.6)]"></span>
            <span>28–58% Moderate</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-3.5 h-2 rounded bg-[#FF2E5B] shadow-[0_0_8px_rgba(255,46,91,0.6)]"></span>
            <span>&gt; 58% Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};
