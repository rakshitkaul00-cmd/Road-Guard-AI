import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, Shield, AlertTriangle, Sun, Moon, CloudRain, Info, Search, 
  CloudLightning, Compass, Crosshair, ChevronDown, ChevronUp, Eye, EyeOff,
  Radio, Sparkles, Navigation2
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
  const [selectedCorridorFilter, setSelectedCorridorFilter] = useState('ALL');
  const [isControlsExpanded, setIsControlsExpanded] = useState(true);

  // Basemap View Style: 'dark' | 'satellite' | 'standard'
  const [basemapStyle, setBasemapStyle] = useState<'dark' | 'satellite' | 'standard'>('dark');

  // Live Free APIs State
  const [liveWeather, setLiveWeather] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter & Operating Context States
  const [showBlackspots, setShowBlackspots] = useState(true);
  const [showSegments, setShowSegments] = useState(true);
  const [showHazards, setShowHazards] = useState(true);
  const [minSeverity, setMinSeverity] = useState(1);
  const [isNightTime, setIsNightTime] = useState(1);
  const [isRainActive, setIsRainActive] = useState(0);

  // Landmark Coordinates for Quick Jump (Nominatim Verified)
  const BENGALURU_LANDMARKS: Record<string, { coords: [number, number]; desc: string }> = {
    'Silk Board': { coords: [12.9176, 77.6238], desc: 'South Hub • High Congestion' },
    'Hebbal Flyover': { coords: [13.0358, 77.5970], desc: 'North Spine • Airport Corridor' },
    'Marathahalli': { coords: [12.9562, 77.7011], desc: 'East IT Corridor • ORR' },
    'Tin Factory': { coords: [12.9972, 77.6698], desc: 'KR Puram • Multi-Modal Node' },
    'Peenya 8th Mile': { coords: [13.0458, 77.5029], desc: 'Tumakuru Highway • Heavy Freight' },
    'Electronic City': { coords: [12.8452, 77.6602], desc: 'Elevated Expressway • IT Hub' },
    'Indiranagar': { coords: [12.9784, 77.6408], desc: '100ft Road • High Pedestrian' },
    'Kengeri Bus Stand': { coords: [12.9125, 77.4839], desc: 'Mysuru Road • Urban Border' }
  };

  // Switch Tile Layer based on basemap style
  const updateTileLayer = (style: 'dark' | 'satellite' | 'standard', map: L.Map) => {
    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    if (style === 'satellite') {
      // Free high-resolution ESRI World Imagery (No API Key Required)
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
          maxZoom: 18
        }
      ).addTo(map);
    } else {
      // OpenStreetMap with CSS filter for dark/standard
      tileLayerRef.current = L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }
      ).addTo(map);
    }
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Bengaluru Central (BBMP)
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

  // Fetch map layers
  const fetchMapData = async () => {
    setLoading(true);
    try {
      const data = await api.getMapLayers('all', minSeverity);
      setLayersData(data);
    } catch (e) {
      console.error("Failed to load map layers", e);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Live Weather from Open-Meteo
  const fetchLiveWeather = async () => {
    try {
      const w = await api.getLiveWeather();
      setLiveWeather(w);
      if (w.is_precipitation_active) {
        setIsRainActive(1);
      }
    } catch (e) {
      console.error("Live weather query error", e);
    }
  };

  useEffect(() => {
    fetchMapData();
    fetchLiveWeather();
  }, [minSeverity]);

  // Handle Search / Jump
  const handleJumpToLandmark = (coords: [number, number]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(coords, 14, { duration: 1.5 });
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    for (const [name, info] of Object.entries(BENGALURU_LANDMARKS)) {
      if (name.toLowerCase().includes(query)) {
        handleJumpToLandmark(info.coords);
        return;
      }
    }
    handleJumpToLandmark([12.9716, 77.5946]);
  };

  // Render Features to Leaflet Layers
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
        if (selectedCorridorFilter !== 'ALL' && !p.corridor_name.includes(selectedCorridorFilter)) {
          return;
        }

        const [lon, lat] = feature.geometry.coordinates;

        const bufferCircle = L.circle([lat, lon], {
          radius: p.buffer_radius_m || 500,
          color: '#EF4444',
          weight: 1.8,
          opacity: 0.8,
          fillColor: '#EF4444',
          fillOpacity: 0.15,
          dashArray: '5, 8'
        });

        // Pulsing custom div icon marker
        const pulsingIcon = L.divIcon({
          className: 'custom-blackspot-marker',
          html: `
            <div class="relative flex items-center justify-center">
              <span class="absolute w-7 h-7 rounded-full bg-red-500/40 animate-ping"></span>
              <span class="relative w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center">
                <span class="w-1.5 h-1.5 rounded-full bg-white"></span>
              </span>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const centerMarker = L.marker([lat, lon], { icon: pulsingIcon });

        const popupContent = `
          <div class="p-2 space-y-2.5 max-w-xs text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-700/80 pb-1.5">
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                OFFICIAL BTP BLACKSPOT
              </span>
              <span class="text-[10px] font-mono text-slate-400">ID: #${p.blackspot_id}</span>
            </div>
            <div>
              <h4 class="font-bold text-sm text-white">${p.junction_name}</h4>
              <p class="text-[11px] text-slate-300">${p.corridor_name}</p>
            </div>
            <div class="grid grid-cols-2 gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-700 text-xs">
              <div class="text-center p-1 bg-red-950/40 rounded border border-red-900/40">
                <span class="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">3-Yr Fatalities</span>
                <span class="font-black text-red-400 text-base">${p.fatal_count_3yr}</span>
              </div>
              <div class="text-center p-1 bg-amber-950/40 rounded border border-amber-900/40">
                <span class="text-slate-400 block text-[9px] uppercase tracking-wider font-semibold">3-Yr Severe Injuries</span>
                <span class="font-black text-amber-400 text-base">${p.injury_count_3yr}</span>
              </div>
            </div>
            <p class="text-[11px] text-slate-300 leading-snug">
              <strong class="text-slate-200">Engineering Hazard Factor:</strong> ${p.primary_hazard_cause}
            </p>
            <div class="text-[9px] text-slate-400 border-t border-slate-700/80 pt-1.5 flex items-center justify-between">
              <span>Verified: ${p.official_source}</span>
              <span class="font-mono text-blue-400">r = 500m</span>
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
        
        let color = p.color;
        let riskProb = p.calibrated_risk_probability;
        if (isNightTime && !p.is_blackspot_corridor) {
          riskProb = Math.min(0.95, riskProb + 0.12);
        }
        if (isRainActive) {
          riskProb = Math.min(0.95, riskProb + 0.14);
        }

        if (riskProb >= 0.58) color = '#EF4444';
        else if (riskProb >= 0.28) color = '#F59E0B';
        else color = '#10B981';

        const polyline = L.polyline(coords, {
          color: color,
          weight: p.is_blackspot_corridor ? 6 : 4,
          opacity: 0.9,
          lineCap: 'round',
          lineJoin: 'round'
        });

        polyline.on('click', () => {
          onSelectSegment(p.segment_id);
        });

        polyline.bindTooltip(`
          <div class="text-xs p-1 space-y-1">
            <div class="font-bold text-white">${p.road_name}</div>
            <div class="flex items-center justify-between gap-3 text-[11px]">
              <span class="text-slate-400 capitalize">${p.road_class} • ${p.speed_limit_kmh} km/h</span>
              <span class="font-bold px-1.5 py-0.5 rounded" style="background:${color}20; color:${color}">
                ${Math.round(riskProb * 100)}% Risk
              </span>
            </div>
            <div class="text-[10px] text-blue-400 font-medium flex items-center gap-1 pt-0.5 border-t border-slate-700">
              <span>👉 Click for SHAP Attribution Breakdown</span>
            </div>
          </div>
        `, { sticky: true, opacity: 0.95 });

        segments.addLayer(polyline);
      }

      // 3. Citizen Hazard Submissions
      if (p.layer_type === 'citizen_hazard' && showHazards) {
        const [lon, lat] = feature.geometry.coordinates;

        const hazardIcon = L.divIcon({
          className: 'custom-hazard-marker',
          html: `
            <div class="relative flex items-center justify-center cursor-pointer">
              <span class="w-3.5 h-3.5 rounded-full ${p.status === 'VERIFIED' ? 'bg-emerald-500' : 'bg-amber-500'} border-2 border-white shadow-md flex items-center justify-center text-[8px] font-bold text-slate-900">
                ${p.corroboration_count > 1 ? p.corroboration_count : '!'}
              </span>
            </div>
          `,
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        const hazardMarker = L.marker([lat, lon], { icon: hazardIcon });

        const statusBadge = p.status === 'VERIFIED'
          ? '<span class="px-2 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">MUNICIPALLY VERIFIED</span>'
          : '<span class="px-2 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">COMMUNITY REPORT</span>';

        hazardMarker.bindPopup(`
          <div class="p-2 space-y-2 max-w-xs text-xs text-slate-100">
            <div class="flex items-center justify-between border-b border-slate-700 pb-1.5">
              <span class="font-bold text-white text-sm">${p.hazard_type}</span>
              ${statusBadge}
            </div>
            <p class="text-slate-300 text-xs leading-relaxed">${p.description}</p>
            <div class="grid grid-cols-2 gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-700 text-[11px]">
              <div>
                <span class="text-slate-400 block text-[9px]">Severity Score</span>
                <span class="font-bold text-amber-400">${p.severity_rating} / 5</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[9px]">Spatially Corroborated</span>
                <span class="font-bold text-blue-400">${p.corroboration_count} reports</span>
              </div>
            </div>
            ${p.is_synthetic ? '<div class="text-[9px] text-slate-500 italic">Pre-seeded synthetic demonstration observation (≤50m deduplicated)</div>' : ''}
          </div>
        `);

        hazards.addLayer(hazardMarker);
      }
    });
  }, [layersData, showBlackspots, showSegments, showHazards, selectedCorridorFilter, isNightTime, isRainActive]);

  return (
    <div className={`relative w-full h-[calc(100vh-64px)] overflow-hidden map-theme-${basemapStyle}`}>
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Top Telemetry & Weather Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Telemetry Pill */}
        <div className="pointer-events-auto flex items-center space-x-2 bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 rounded-xl px-3 py-1.5 shadow-2xl text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-slate-200 tracking-tight">BENGALURU GIS COMMAND</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400 font-mono text-[11px]">250 Links • 16 Blackspots</span>
        </div>

        {/* Center/Right Weather & Context HUD */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {liveWeather && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 rounded-xl px-3 py-1.5 shadow-2xl text-xs text-slate-200">
              <CloudLightning className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span className="font-semibold">{liveWeather.temperature_c}°C</span>
              <span className="text-slate-400 text-[11px]">• {liveWeather.weather_condition}</span>
              {liveWeather.is_precipitation_active && (
                <span className="px-1.5 py-0.5 rounded text-[9px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  RAIN ACTIVE
                </span>
              )}
            </div>
          )}

          {/* Basemap Switcher */}
          <div className="flex items-center bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-xl p-0.5 shadow-2xl text-[11px]">
            <button
              onClick={() => setBasemapStyle('dark')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                basemapStyle === 'dark' 
                  ? 'bg-blue-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🌙 Dark
            </button>
            <button
              onClick={() => setBasemapStyle('satellite')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                basemapStyle === 'satellite' 
                  ? 'bg-blue-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🛰️ Satellite
            </button>
            <button
              onClick={() => setBasemapStyle('standard')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                basemapStyle === 'standard' 
                  ? 'bg-blue-600 text-white font-bold shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🗺️ Map
            </button>
          </div>
        </div>
      </div>

      {/* Floating Interactive Controls Panel (Left) */}
      <div className={`absolute top-14 left-3 z-10 w-80 max-w-[calc(100vw-1.5rem)] bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl text-xs transition-all duration-300 ${
        isControlsExpanded ? 'p-3.5 space-y-3' : 'p-2.5 w-auto'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 font-bold text-slate-100">
            <Layers className="w-4 h-4 text-blue-400" />
            {isControlsExpanded && <span>Layers & Simulation</span>}
          </div>
          <button
            onClick={() => setIsControlsExpanded(!isControlsExpanded)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            title={isControlsExpanded ? 'Collapse HUD' : 'Expand HUD'}
          >
            {isControlsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {isControlsExpanded && (
          <>
            {/* Quick Landmark Search (Nominatim) */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search junction (Silk Board, Hebbal...)"
                className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl py-1.5 pl-8 pr-3 text-slate-200 text-xs focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </form>

            {/* Quick Hub Jump Pills */}
            <div className="flex flex-wrap gap-1">
              {Object.keys(BENGALURU_LANDMARKS).slice(0, 5).map((place) => (
                <button
                  key={place}
                  type="button"
                  onClick={() => handleJumpToLandmark(BENGALURU_LANDMARKS[place].coords)}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700/60 transition-all"
                >
                  {place}
                </button>
              ))}
            </div>

            {/* Layer Visibility Toggles */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/40 px-2 py-1.5 rounded-lg transition-all">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                  <span className="text-slate-200 font-medium">BTP Fatal Blackspots (16)</span>
                </div>
                <input
                  type="checkbox"
                  checked={showBlackspots}
                  onChange={(e) => setShowBlackspots(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/40 px-2 py-1.5 rounded-lg transition-all">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                  <span className="text-slate-200 font-medium">OSM ML Risk Links (250)</span>
                </div>
                <input
                  type="checkbox"
                  checked={showSegments}
                  onChange={(e) => setShowSegments(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/40 px-2 py-1.5 rounded-lg transition-all">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]"></span>
                  <span className="text-slate-200 font-medium">Citizen Hazard Reports</span>
                </div>
                <input
                  type="checkbox"
                  checked={showHazards}
                  onChange={(e) => setShowHazards(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            {/* Real-Time Context Simulation Engine */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold flex items-center gap-1">
                  <Radio className="w-3 h-3 text-blue-400 animate-pulse" />
                  Context Simulation:
                </span>
                <span className="text-[10px] text-blue-400 font-mono">Modulates ML Risk</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setIsNightTime(isNightTime ? 0 : 1)}
                  className={`flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-xl border text-[11px] font-semibold transition-all ${
                    isNightTime
                      ? 'bg-indigo-950/70 border-indigo-500/60 text-indigo-200 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {isNightTime ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{isNightTime ? 'Night (+12%)' : 'Daylight'}</span>
                </button>

                <button
                  onClick={() => setIsRainActive(isRainActive ? 0 : 1)}
                  className={`flex items-center justify-center space-x-1.5 py-1.5 px-2 rounded-xl border text-[11px] font-semibold transition-all ${
                    isRainActive
                      ? 'bg-cyan-950/70 border-cyan-500/60 text-cyan-200 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isRainActive ? 'Rain (+14%)' : 'Dry Surface'}</span>
                </button>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-blue-950/30 border border-blue-900/40 rounded-xl p-2 text-[10px] text-blue-300 flex items-start space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Click any road segment line to open its <strong>SHAP Factor AI Attribution Card</strong>. Click any empty spot to submit a hazard report.</span>
            </div>
          </>
        )}
      </div>

      {/* Floating Tactical Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-xl border border-slate-700/60 rounded-xl p-3 shadow-2xl text-[11px] space-y-2 hidden md:block">
        <div className="flex items-center justify-between text-slate-200 font-bold border-b border-slate-800 pb-1">
          <span>Risk Classification</span>
          <span className="text-[10px] font-mono text-slate-400">Calibrated Platt Scale</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-5 h-2 rounded bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span>Low Exposure (&lt; 28%)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-5 h-2 rounded bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
            <span>Moderate Hazard (28% - 58%)</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-300">
            <span className="w-5 h-2 rounded bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></span>
            <span>Elevated / Chronic Blackspot (&gt; 58%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
