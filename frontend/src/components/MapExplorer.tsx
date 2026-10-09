import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Layers, Sliders, Shield, AlertTriangle, Eye, Sun, Moon, CloudRain, Info, Search, CloudLightning, Compass, ExternalLink } from 'lucide-react';
import { api, MapLayersResponse, MapLayerFeature } from '../services/api';

interface MapExplorerProps {
  onSelectSegment: (segmentId: number) => void;
  onOpenReportAtCoord: (lat: number, lon: number) => void;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onSelectSegment, onOpenReportAtCoord }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
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
  const BENGALURU_LANDMARKS: Record<string, [number, number]> = {
    'Silk Board': [12.9176, 77.6238],
    'Hebbal Flyover': [13.0358, 77.5970],
    'Marathahalli Bridge': [12.9562, 77.7011],
    'Tin Factory (KR Puram)': [12.9972, 77.6698],
    'Peenya 8th Mile': [13.0458, 77.5029],
    'Kengeri Bus Stand': [12.9125, 77.4839],
    'Indiranagar 100ft Rd': [12.9784, 77.6408],
    'Electronic City Ph 1': [12.8452, 77.6602]
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

    // Official OpenStreetMap tile layer (100% Free & Open, No API Key Required)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

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
    for (const [name, coords] of Object.entries(BENGALURU_LANDMARKS)) {
      if (name.toLowerCase().includes(query)) {
        handleJumpToLandmark(coords);
        return;
      }
    }
    // Default to central if not found
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
          weight: 1.5,
          opacity: 0.6,
          fillColor: '#EF4444',
          fillOpacity: 0.12,
          dashArray: '4, 6'
        });

        const centerMarker = L.circleMarker([lat, lon], {
          radius: 9,
          fillColor: '#EF4444',
          color: '#FFFFFF',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.95
        });

        const popupContent = `
          <div class="p-1 space-y-2">
            <div class="flex items-center space-x-1.5 text-xs font-bold text-red-400">
              <span class="w-2 h-2 rounded-full bg-red-500"></span>
              <span>OFFICIAL BTP BLACKSPOT</span>
            </div>
            <h4 class="font-bold text-sm text-slate-100">${p.junction_name}</h4>
            <p class="text-[11px] text-slate-400 font-medium">${p.corridor_name}</p>
            <div class="grid grid-cols-2 gap-2 bg-slate-900/80 p-2 rounded border border-slate-700 text-xs">
              <div>
                <span class="text-slate-400 block text-[10px]">3-Yr Fatalities</span>
                <span class="font-bold text-red-400 text-sm">${p.fatal_count_3yr}</span>
              </div>
              <div>
                <span class="text-slate-400 block text-[10px]">3-Yr Injuries</span>
                <span class="font-bold text-amber-400 text-sm">${p.injury_count_3yr}</span>
              </div>
            </div>
            <p class="text-[11px] text-slate-300 leading-tight">
              <strong>Primary Cause:</strong> ${p.primary_hazard_cause}
            </p>
            <div class="text-[9px] text-slate-500 border-t border-slate-700 pt-1">
              Source: ${p.official_source}
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
          weight: p.is_blackspot_corridor ? 5.5 : 3.5,
          opacity: 0.85
        });

        polyline.on('click', () => {
          onSelectSegment(p.segment_id);
        });

        polyline.bindTooltip(`
          <div class="text-xs">
            <span class="font-bold">${p.road_name}</span> (${p.road_class})<br/>
            Predicted Risk: <strong style="color:${color}">${Math.round(riskProb * 100)}%</strong>
            <div class="text-[10px] text-blue-400 underline">Click to inspect SHAP breakdown</div>
          </div>
        `, { sticky: true });

        segments.addLayer(polyline);
      }

      // 3. Citizen Hazard Submissions
      if (p.layer_type === 'citizen_hazard' && showHazards) {
        const [lon, lat] = feature.geometry.coordinates;

        const hazardMarker = L.circleMarker([lat, lon], {
          radius: 6 + (p.corroboration_count > 1 ? 2 : 0),
          fillColor: p.color,
          color: '#FFFFFF',
          weight: 1.5,
          opacity: 0.9,
          fillOpacity: 0.85
        });

        const statusBadge = p.status === 'VERIFIED'
          ? '<span class="px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/20 text-emerald-400 font-bold">VERIFIED</span>'
          : '<span class="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-400 font-bold">PENDING AUDIT</span>';

        hazardMarker.bindPopup(`
          <div class="p-1 space-y-1.5 text-xs">
            <div class="flex items-center justify-between">
              <span class="font-bold text-slate-200">${p.hazard_type}</span>
              ${statusBadge}
            </div>
            <p class="text-slate-300 text-[11px]">${p.description}</p>
            <div class="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-700 pt-1">
              <span>Severity: ${p.severity_rating}/5</span>
              <span>Corroboration: <strong>${p.corroboration_count} reports</strong></span>
            </div>
            ${p.is_synthetic ? '<div class="text-[9px] text-slate-500 italic">Synthetic prototype demonstration sample</div>' : ''}
          </div>
        `);

        hazards.addLayer(hazardMarker);
      }
    });
  }, [layersData, showBlackspots, showSegments, showHazards, selectedCorridorFilter, isNightTime, isRainActive]);

  return (
    <div className="relative w-full h-[calc(100vh-65px)] overflow-hidden">
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Control Toolbar (Top Left) */}
      <div className="absolute top-4 left-4 z-10 w-84 max-w-[calc(100vw-2rem)] bg-[#0F172A]/95 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-2xl text-xs space-y-3.5">
        {/* Layer Toggles Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
          <div className="flex items-center space-x-2 font-bold text-slate-200">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Bengaluru GIS Safety Layers</span>
          </div>
          {loading && (
            <span className="text-[10px] text-blue-400 animate-pulse font-mono">Loading data...</span>
          )}
        </div>

        {/* Live Free Open-Meteo Weather Badge */}
        {liveWeather && (
          <div className="bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/50 rounded-xl p-2.5 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-blue-300 flex items-center gap-1.5">
                <CloudLightning className="w-3.5 h-3.5 text-blue-400" />
                Live Bengaluru Weather
              </span>
              <span className="font-mono font-bold text-slate-100">{liveWeather.temperature_c}°C</span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>{liveWeather.weather_condition}</span>
              <span className="text-emerald-400 font-semibold">{liveWeather.source.split('(')[0]}</span>
            </div>
          </div>
        )}

        {/* Landmark Quick Search (OSM Nominatim) */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search location (Silk Board, Hebbal...)"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-1.5 pl-8 pr-3 text-slate-200 text-xs focus:outline-none focus:border-blue-500 placeholder:text-slate-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </form>

        {/* Quick Landmark Jump Pills */}
        <div className="flex flex-wrap gap-1">
          {['Silk Board', 'Hebbal Flyover', 'Marathahalli Bridge', 'Peenya 8th Mile'].map((place) => (
            <button
              key={place}
              type="button"
              onClick={() => handleJumpToLandmark(BENGALURU_LANDMARKS[place])}
              className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-all"
            >
              {place.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Toggle Switches */}
        <div className="space-y-1.5 pt-1 border-t border-slate-800">
          <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/40 p-1 rounded">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
              <span className="text-slate-300">Official BTP Blackspots (16)</span>
            </div>
            <input
              type="checkbox"
              checked={showBlackspots}
              onChange={(e) => setShowBlackspots(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/40 p-1 rounded">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-300">OSM Road Links (ML Scored)</span>
            </div>
            <input
              type="checkbox"
              checked={showSegments}
              onChange={(e) => setShowSegments(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer hover:bg-slate-800/40 p-1 rounded">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span className="text-slate-300">Citizen Hazard Submissions</span>
            </div>
            <input
              type="checkbox"
              checked={showHazards}
              onChange={(e) => setShowHazards(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
            />
          </label>
        </div>

        {/* Operating Context Simulation Toggles */}
        <div className="pt-2 border-t border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Operating Context Simulator:
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsNightTime(isNightTime ? 0 : 1)}
              className={`flex items-center justify-center space-x-1.5 p-1.5 rounded-lg border text-[11px] transition-all ${
                isNightTime
                  ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              {isNightTime ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              <span>{isNightTime ? 'Night (19-06h)' : 'Daytime'}</span>
            </button>

            <button
              onClick={() => setIsRainActive(isRainActive ? 0 : 1)}
              className={`flex items-center justify-center space-x-1.5 p-1.5 rounded-lg border text-[11px] transition-all ${
                isRainActive
                  ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>{isRainActive ? 'Rain Active' : 'Dry Surface'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Helper Hint */}
        <div className="bg-blue-950/30 border border-blue-800/40 rounded-lg p-2 text-[10px] text-blue-300 flex items-start space-x-1.5">
          <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
          <span>Click on any road link to view its local SHAP risk card. Click any point on the map to submit a citizen hazard report.</span>
        </div>
      </div>

      {/* Floating Legend (Bottom Left) */}
      <div className="absolute bottom-6 left-4 z-10 bg-[#0F172A]/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 shadow-xl text-[11px] space-y-1.5 hidden md:block">
        <span className="font-bold text-slate-300 block mb-1">Risk Tier Legend</span>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-4 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Low Relative Risk (&lt; 28%)</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-4 h-1.5 rounded-full bg-amber-500"></span>
          <span>Moderate Risk (28% - 58%)</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-4 h-1.5 rounded-full bg-red-500"></span>
          <span>Elevated / Chronic Blackspot (&gt; 58%)</span>
        </div>
      </div>
    </div>
  );
};
