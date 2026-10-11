import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, Shield, AlertTriangle, Sun, Moon, CloudRain, Info, Search, 
  CloudLightning, Compass, ChevronDown, ChevronUp, Eye, EyeOff,
  Radio, Sparkles, Navigation2, CheckCircle2, Wind, MapPin, X, Loader2, Flame
} from 'lucide-react';
import { api, MapLayersResponse, MapLayerFeature } from '../services/api';
import { LeafletHeatmapLayer, HeatPoint } from '../utils/leafletHeatmap';

export type BasemapStyle = 'dark' | 'satellite' | 'standard' | 'heatmap';

interface MapExplorerProps {
  onSelectSegment: (segmentId: number) => void;
  onOpenReportAtCoord: (lat: number, lon: number) => void;
}

export interface SearchItem {
  id: string;
  name: string;
  category: 'Blackspot' | 'Major Junction' | 'Neighborhood' | 'Tech Park' | 'Road Corridor' | 'Live Place';
  coords: [number, number];
  desc: string;
}

// Curated High-Density Bengaluru Gazetteers
const BENGALURU_GAZETTEER: SearchItem[] = [
  // BTP Official Blackspots & Critical Hotzones
  { id: 'btp-silkboard', name: 'Central Silk Board Junction', category: 'Blackspot', coords: [12.9176, 77.6238], desc: 'Outer Ring Rd / Hosur Rd • BTP Priority 1' },
  { id: 'btp-hebbal', name: 'Hebbal Flyover & Junction', category: 'Blackspot', coords: [13.0358, 77.5970], desc: 'NH-44 Airport Highway Corridor' },
  { id: 'btp-tinfactory', name: 'Tin Factory / KR Puram Bridge', category: 'Blackspot', coords: [12.9972, 77.6698], desc: 'Old Madras Rd • Critical Bottleneck' },
  { id: 'btp-goragunte', name: 'Goraguntepalya / CMTI Junction', category: 'Blackspot', coords: [13.0285, 77.5408], desc: 'Tumakuru Rd Elevated Flyover (NH-48)' },
  { id: 'btp-marathahalli', name: 'Marathahalli Multiplex Junction', category: 'Major Junction', coords: [12.9562, 77.7011], desc: 'Outer Ring Road • East Tech Corridor' },
  { id: 'btp-peenya', name: 'Peenya 8th Mile / Jalahalli Cross', category: 'Blackspot', coords: [13.0458, 77.5029], desc: 'Industrial Arterial Corridor (NH-48)' },
  { id: 'btp-ecity', name: 'Electronic City Toll Plaza', category: 'Major Junction', coords: [12.8452, 77.6602], desc: 'Hosur Rd Elevated Expressway' },
  { id: 'btp-kengeri', name: 'Kengeri Satellite Bus Stand', category: 'Major Junction', coords: [12.9125, 77.4839], desc: 'Mysuru Rd High-Speed Link' },
  { id: 'btp-yeshwanthpur', name: 'Yeshwanthpur Govardhan Circle', category: 'Major Junction', coords: [13.0238, 77.5513], desc: 'Suburban Rail & Ring Road Hub' },
  { id: 'btp-dairycircle', name: 'Dairy Circle / Bannerghatta Rd', category: 'Major Junction', coords: [12.9372, 77.5995], desc: 'South Core Transit Junction' },
  { id: 'btp-richmond', name: 'Richmond Circle / Residency Rd', category: 'Major Junction', coords: [12.9664, 77.5996], desc: 'Central Business District Intersection' },
  { id: 'btp-domlur', name: 'Domlur Flyover / EGL Corridor', category: 'Major Junction', coords: [12.9609, 77.6387], desc: 'Old Airport Road / Intermediate Ring Rd' },
  { id: 'btp-mekhri', name: 'Mekhri Circle / Bellary Rd', category: 'Major Junction', coords: [13.0076, 77.5843], desc: 'Palace Grounds North Approach' },
  { id: 'btp-majestic', name: 'Majestic / Kempegowda Bus Station', category: 'Major Junction', coords: [12.9767, 77.5713], desc: 'Central Metro & Transit Interchange' },

  // Neighborhoods & Commercial Hubs
  { id: 'hub-koramangala', name: 'Koramangala (Sony World Junction)', category: 'Neighborhood', coords: [12.9352, 77.6245], desc: '100ft Road / 80ft Road Core' },
  { id: 'hub-indiranagar', name: 'Indiranagar (100ft Road)', category: 'Neighborhood', coords: [12.9784, 77.6408], desc: '100ft Rd / CMH Rd Boulevard' },
  { id: 'hub-hsr', name: 'HSR Layout (27th Main)', category: 'Neighborhood', coords: [12.9116, 77.6389], desc: 'Sector 1-7 Residential & Commercial' },
  { id: 'hub-whitefield', name: 'Whitefield (Hope Farm / ITPB)', category: 'Tech Park', coords: [12.9840, 77.7516], desc: 'East Bengaluru IT Hub' },
  { id: 'hub-bellandur', name: 'Bellandur EcoSpace', category: 'Tech Park', coords: [12.9260, 77.6762], desc: 'Outer Ring Road Tech Corridor' },
  { id: 'hub-sarjapur', name: 'Sarjapur Road (Wipro Gate)', category: 'Road Corridor', coords: [12.9103, 77.6850], desc: 'Kaikondrahalli • SE Commuter Corridor' },
  { id: 'hub-jayanagar', name: 'Jayanagar (4th Block / South End)', category: 'Neighborhood', coords: [12.9348, 77.5786], desc: 'South Historic Commercial Hub' },
  { id: 'hub-malleshwaram', name: 'Malleshwaram (8th Cross)', category: 'Neighborhood', coords: [13.0041, 77.5701], desc: 'Margosa Rd & Sampige Rd' },
  { id: 'hub-banashankari', name: 'Banashankari Temple Circle', category: 'Neighborhood', coords: [12.9254, 77.5736], desc: 'Kanakapura Rd / Outer Ring Rd' },
  { id: 'hub-rajajinagar', name: 'Rajajinagar (Navrang Circle)', category: 'Neighborhood', coords: [12.9973, 77.5552], desc: '10th Main West Transit Hub' },
  { id: 'hub-nagavara', name: 'Nagavara / Manyata Tech Park', category: 'Tech Park', coords: [13.0435, 77.6208], desc: 'North Outer Ring Road Tech Hub' },
  { id: 'hub-mgroad', name: 'MG Road / Brigade Road', category: 'Neighborhood', coords: [12.9740, 77.6080], desc: 'Central Business District' },
  { id: 'hub-cubbonpark', name: 'Cubbon Park / Vidhana Soudha', category: 'Neighborhood', coords: [12.9796, 77.5907], desc: 'Government Administrative Zone' },
  { id: 'hub-yelahanka', name: 'Yelahanka (Police Station / Kogilu)', category: 'Neighborhood', coords: [13.1007, 77.6012], desc: 'North Suburb / Airport Approach' },
  { id: 'hub-btm', name: 'BTM Layout (Udupi Garden)', category: 'Neighborhood', coords: [12.9166, 77.6101], desc: 'Outer Ring Road Intermediate Hub' },
  { id: 'hub-kalyannagar', name: 'Kalyan Nagar / HRBR Layout', category: 'Neighborhood', coords: [13.0232, 77.6472], desc: 'Ring Road East Corridor' },
  { id: 'hub-krpuram', name: 'KR Puram Railway Station', category: 'Major Junction', coords: [13.0012, 77.6890], desc: 'Old Madras Highway Interchange' },
  { id: 'hub-lalbagh', name: 'Lalbagh West Gate / Minerva', category: 'Major Junction', coords: [12.9507, 77.5844], desc: 'South Core Link' },
  { id: 'hub-airport', name: 'KIA Bengaluru Airport Toll', category: 'Major Junction', coords: [13.2014, 77.7108], desc: 'Kempegowda International Airport' }
];

// Helper to extract dense Kernel Density Estimation (KDE) thermal points from all layers
function extractHeatmapPoints(data: MapLayersResponse): HeatPoint[] {
  const points: HeatPoint[] = [];

  data.features.forEach((feature: MapLayerFeature) => {
    const p = feature.properties;

    // 1. Official BTP Blackspots (Highest fatality hotspots)
    if (p.layer_type === 'official_blackspot') {
      const [lon, lat] = feature.geometry.coordinates;
      const fatal = p.total_fatalities_3yr ?? p.fatal_count_3yr ?? 14;
      const intensity = Math.min(1.0, 0.75 + (fatal / 25) * 0.25);
      points.push({ lat, lng: lon, intensity });

      // Add micro-cluster nodes around the blackspot to form a natural dense kernel
      const microOffsets = [
        [0.0012, 0.0008], [-0.0010, -0.0011], [0.0009, -0.0012], [-0.0011, 0.0009]
      ];
      microOffsets.forEach(([dLat, dLng]) => {
        points.push({
          lat: lat + dLat,
          lng: lon + dLng,
          intensity: intensity * 0.78
        });
      });
    }

    // 2. OSM Highway Links (Risk Segments)
    if (p.layer_type === 'road_segment') {
      const baseProb = typeof p.calibrated_risk_probability === 'number'
        ? p.calibrated_risk_probability
        : typeof p.calibrated_risk === 'number'
          ? p.calibrated_risk
          : (p.risk_tier === 'ELEVATED' || p.is_blackspot_corridor ? 0.70 : p.risk_tier === 'MODERATE' ? 0.45 : 0.22);

      const coords = feature.geometry.coordinates;
      if (Array.isArray(coords)) {
        for (let i = 0; i < coords.length; i += 2) {
          const [cLon, cLat] = coords[i];
          points.push({
            lat: cLat,
            lng: cLon,
            intensity: Math.min(0.92, Math.max(0.20, baseProb))
          });
        }
      }
    }

    // 3. Citizen Hazard Reports
    if (p.layer_type === 'citizen_hazard') {
      const [lon, lat] = feature.geometry.coordinates;
      const severity = p.severity_rating || p.severity || 3;
      points.push({
        lat,
        lng: lon,
        intensity: Math.min(0.85, 0.35 + (severity / 5) * 0.45)
      });
    }
  });

  return points;
}

export const MapExplorer: React.FC<MapExplorerProps> = ({ onSelectSegment, onOpenReportAtCoord }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const heatmapLayerRef = useRef<LeafletHeatmapLayer | null>(null);
  const searchBeaconRef = useRef<L.Marker | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
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

  // Basemap View: 'dark' | 'satellite' | 'standard' | 'heatmap'
  const [basemapStyle, setBasemapStyle] = useState<BasemapStyle>('dark');
  const [showHeatmap, setShowHeatmap] = useState(false);

  // Live Free Weather & Search
  const [liveWeather, setLiveWeather] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);

  // Toggles & Simulation Context
  const [showBlackspots, setShowBlackspots] = useState(true);
  const [showSegments, setShowSegments] = useState(true);
  const [showHazards, setShowHazards] = useState(true);
  const [isNightTime, setIsNightTime] = useState(0);
  const [isRainActive, setIsRainActive] = useState(0);

  // Switch Tile Layer dynamically across all 4 map styles
  const updateTileLayer = (style: BasemapStyle, map: L.Map) => {
    if (tileLayerRef.current && map.hasLayer(tileLayerRef.current)) {
      map.removeLayer(tileLayerRef.current);
    }

    if (style === 'satellite') {
      // 🛰️ Satellite: High-Resolution Esri Aerial Imagery (No API key, unwatermarked)
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri &mdash; High-Resolution Aerial Satellite',
          maxZoom: 19,
          maxNativeZoom: 18
        }
      );
    } else if (style === 'standard') {
      // 🗺️ Blueprint: Clean, High-Detail Esri World Street Map (No API key, unwatermarked)
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri &mdash; StreetMap & Transport',
          maxZoom: 19,
          maxNativeZoom: 18
        }
      );
    } else {
      // 🌙 Obsidian & 🔥 Heatmap: Native Pitch-Dark Esri Dark Gray Canvas (No API key, unwatermarked)
      tileLayerRef.current = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri &mdash; Dark Gray Canvas',
          maxZoom: 19,
          maxNativeZoom: 16
        }
      );
    }

    tileLayerRef.current.addTo(map);
  };

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    mapInstanceRef.current = map;

    return () => {
      if (heatmapLayerRef.current && mapInstanceRef.current) {
        mapInstanceRef.current.removeLayer(heatmapLayerRef.current);
        heatmapLayerRef.current = null;
      }
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update tiles when basemap style changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      updateTileLayer(basemapStyle, mapInstanceRef.current);
      setTimeout(() => {
        mapInstanceRef.current?.invalidateSize();
      }, 100);
    }
  }, [basemapStyle]);

  // Synchronize Thermal KDE Heatmap Layer with map
  useEffect(() => {
    if (!mapInstanceRef.current || !layersData) return;
    const map = mapInstanceRef.current;
    const shouldShow = basemapStyle === 'heatmap' || showHeatmap;

    if (shouldShow) {
      const points = extractHeatmapPoints(layersData);
      if (!heatmapLayerRef.current) {
        heatmapLayerRef.current = new LeafletHeatmapLayer(points, {
          radius: 32,
          blur: 22,
          minOpacity: 0.08
        });
        heatmapLayerRef.current.addTo(map);
      } else {
        heatmapLayerRef.current.setPoints(points);
        if (!map.hasLayer(heatmapLayerRef.current)) {
          heatmapLayerRef.current.addTo(map);
        }
      }
    } else {
      if (heatmapLayerRef.current && map.hasLayer(heatmapLayerRef.current)) {
        map.removeLayer(heatmapLayerRef.current);
      }
    }
  }, [basemapStyle, showHeatmap, layersData]);

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

  // Location Selection & Animated Beacon Placement
  const handleSelectLocation = (item: SearchItem) => {
    if (!mapInstanceRef.current) return;

    // Fly smoothly to target
    mapInstanceRef.current.flyTo(item.coords, 15, { duration: 1.4 });

    // Remove previous search beacon if any
    if (searchBeaconRef.current) {
      mapInstanceRef.current.removeLayer(searchBeaconRef.current);
    }

    // Create glowing pulse beacon icon
    const beaconIcon = L.divIcon({
      className: 'search-beacon-icon',
      html: `
        <div style="position: relative; width: 36px; height: 36px; transform: translate(-18px, -18px);">
          <div style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(0, 229, 255, 0.4); animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: absolute; inset: 4px; border-radius: 9999px; background: #08090D; border: 2.5px solid #00E5FF; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 18px #00E5FF;">
            <div style="width: 8px; height: 8px; border-radius: 9999px; background: #00E5FF;"></div>
          </div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18]
    });

    const marker = L.marker(item.coords, { icon: beaconIcon }).addTo(mapInstanceRef.current);
    marker.bindPopup(`
      <div style="font-family: sans-serif; font-size: 12px; color: #f8fafc; background: #08090D; padding: 6px 12px; border-radius: 12px; border: 1px solid #00E5FF; min-width: 160px; box-shadow: 0 10px 25px rgba(0,0,0,0.8);">
        <strong style="color: #00E5FF; font-size: 13px;">📍 ${item.name}</strong><br>
        <span style="color: #94a3b8; font-size: 11px;">${item.desc}</span>
      </div>
    `).openPopup();

    searchBeaconRef.current = marker;
    setSearchQuery(item.name);
    setIsSearchOpen(false);
  };

  // Autocomplete filtering & Live Geocoding debouncer
  useEffect(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      // Default top suggestions when empty
      setSearchResults(BENGALURU_GAZETTEER.slice(0, 5));
      return;
    }

    // 1. Match local gazetteer
    const localMatches = BENGALURU_GAZETTEER.filter(
      item => item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );

    // 2. Match blackspots and road segments from layersData
    const dynamicMatches: SearchItem[] = [];
    if (layersData?.features) {
      for (const feat of layersData.features) {
        const p = feat.properties || {};
        if (p.layer_type === 'official_blackspot' && p.blackspot_name) {
          if (p.blackspot_name.toLowerCase().includes(q) && !localMatches.some(m => m.name.toLowerCase().includes(p.blackspot_name.toLowerCase()))) {
            const coords: [number, number] = [feat.geometry.coordinates[1], feat.geometry.coordinates[0]];
            dynamicMatches.push({
              id: `feat-bs-${feat.id}`,
              name: p.blackspot_name,
              category: 'Blackspot',
              coords,
              desc: `${p.corridor_name || 'BTP Fatality Hotspot'} • Risk Tier: ELEVATED`
            });
          }
        } else if (p.layer_type === 'road_segment' && p.road_name) {
          if (p.road_name.toLowerCase().includes(q) && !dynamicMatches.some(m => m.name === p.road_name)) {
            const coords: [number, number] = feat.geometry.coordinates?.[0]
              ? [feat.geometry.coordinates[0][1], feat.geometry.coordinates[0][0]]
              : [12.9716, 77.5946];
            dynamicMatches.push({
              id: `feat-seg-${feat.id}`,
              name: p.road_name,
              category: 'Road Corridor',
              coords,
              desc: `${p.road_class?.toUpperCase() || 'PRIMARY'} • ${p.speed_limit_kmh || 50} km/h • Risk: ${Math.round(((p.calibrated_risk_probability ?? p.calibrated_risk) || 0.25) * 100)}%`
            });
          }
        }
      }
    }

    const combined = [...localMatches, ...dynamicMatches].slice(0, 6);
    setSearchResults(combined);

    // 3. Fallback: If less than 2 results and query has 3+ chars, query OpenStreetMap Nominatim
    if (combined.length < 2 && q.length >= 3) {
      setIsSearchingExternal(true);
      const timer = setTimeout(async () => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ', Bengaluru')}&limit=4`,
            { signal: AbortSignal.timeout(3000) }
          );
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              const liveMatches: SearchItem[] = data.map((item: any, idx: number) => ({
                id: `nominatim-${idx}-${item.place_id || idx}`,
                name: item.display_name.split(',')[0],
                category: 'Live Place',
                coords: [parseFloat(item.lat), parseFloat(item.lon)],
                desc: item.display_name.split(',').slice(1, 3).join(',').trim() || 'Bengaluru Location'
              }));
              setSearchResults(prev => [...prev, ...liveMatches].slice(0, 6));
            }
          }
        } catch (_) {
          // Graceful ignore
        } finally {
          setIsSearchingExternal(false);
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [searchQuery, layersData]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSelectLocation(searchResults[0]);
    }
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
          opacity: 0.65,
          fillColor: '#FF2E5B',
          fillOpacity: 0.08,
          dashArray: '6, 8'
        });

        // Tactical double-pulse radar marker
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

        const marker = L.marker([lat, lon], { icon: customIcon });

        const blackspotName = p.blackspot_name || p.junction_name || 'Designated Hotzone';
        const fatalCount = p.total_fatalities_3yr ?? p.fatal_count_3yr ?? 14;
        const injuryCount = p.total_grievous_injuries_3yr ?? p.injury_count_3yr ?? 28;

        const popupContent = `
          <div style="font-family: sans-serif; font-size: 12px; color: #f8fafc; background: #08090D; padding: 12px 14px; border-radius: 14px; border: 1px solid #FF2E5B; min-width: 230px; box-shadow: 0 10px 25px rgba(0,0,0,0.8);">
            <div style="font-size: 10px; font-weight: bold; color: #FF2E5B; text-transform: uppercase; display: flex; align-items: center; justify-content: space-between;">
              <span>● BTP Official Blackspot</span>
              <span style="font-family: monospace; color: #94a3b8;">#${p.id || p.blackspot_id || 1}</span>
            </div>
            <div style="font-size: 14px; font-weight: 800; margin-top: 4px; color: #ffffff;">${blackspotName}</div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">${p.corridor_name || 'Bengaluru Arterial'}</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 8px;">
              <div style="background: rgba(255,46,91,0.12); border: 1px solid rgba(255,46,91,0.25); border-radius: 8px; padding: 4px 6px; text-align: center;">
                <span style="display: block; font-size: 9px; color: #fda4af; text-transform: uppercase;">Fatalities (3-Yr)</span>
                <span style="font-size: 14px; font-weight: 800; color: #f43f5e;">${fatalCount}</span>
              </div>
              <div style="background: rgba(255,184,0,0.12); border: 1px solid rgba(255,184,0,0.25); border-radius: 8px; padding: 4px 6px; text-align: center;">
                <span style="display: block; font-size: 9px; color: #fde68a; text-transform: uppercase;">Injuries (3-Yr)</span>
                <span style="font-size: 14px; font-weight: 800; color: #fbbf24;">${injuryCount}</span>
              </div>
            </div>
            ${p.primary_hazard_cause ? `<div style="font-size: 10px; color: #cbd5e1; margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.08); line-height: 1.3;"><strong style="color: #e2e8f0;">Cause:</strong> ${p.primary_hazard_cause}</div>` : ''}
          </div>
        `;

        marker.bindPopup(popupContent);
        bufferCircle.bindPopup(popupContent);

        blackspots.addLayer(bufferCircle);
        blackspots.addLayer(marker);
      }

      // 2. OSM Highway Links / Segments (Platt Calibrated Color Separation)
      if (p.layer_type === 'road_segment' && showSegments) {
        // Extract base risk probability
        let baseProb = typeof p.calibrated_risk_probability === 'number'
          ? p.calibrated_risk_probability
          : typeof p.calibrated_risk === 'number'
            ? p.calibrated_risk
            : (p.risk_tier === 'ELEVATED' || p.is_blackspot_corridor ? 0.68 : p.risk_tier === 'MODERATE' ? 0.42 : 0.22);

        // Real-time environmental context modulation
        let prob = baseProb;
        if (isNightTime && !p.is_blackspot_corridor) {
          prob = Math.min(0.95, prob + 0.10);
        }
        if (isRainActive) {
          prob = Math.min(0.95, prob + 0.12);
        }
        prob = Math.min(0.95, Math.max(0.05, prob));

        // High-Contrast 3-Color Separation: Green (#00F59B), Yellow (#FFB800), Red (#FF2E5B)
        let color = '#00F59B'; // Mint Aurora (< 28%)
        let tierLabel = 'Low Exposure';
        let weight = 4.5;

        if (prob >= 0.58 || p.risk_tier === 'ELEVATED' || p.is_blackspot_corridor) {
          color = '#FF2E5B'; // Coral Crimson (>= 58%)
          tierLabel = 'Critical Blackspot';
          weight = 6.0;
        } else if (prob >= 0.28 || p.risk_tier === 'MODERATE') {
          color = '#FFB800'; // Solar Amber (28–58%)
          tierLabel = 'Moderate Hazard';
          weight = 5.0;
        } else {
          color = '#00F59B'; // Vibrant Mint Green (< 28%)
          tierLabel = 'Low Exposure';
          weight = 4.5;
        }

        const latLngs = feature.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);

        const isHeatmapActive = basemapStyle === 'heatmap' || showHeatmap;
        const polyline = L.polyline(latLngs, {
          color: color,
          weight: isHeatmapActive ? 2.5 : weight,
          opacity: isHeatmapActive ? 0.38 : 0.94,
          lineCap: 'round',
          lineJoin: 'round'
        });

        polyline.on('click', () => {
          onSelectSegment(p.segment_id);
        });

        polyline.bindTooltip(`
          <div style="font-family: sans-serif; font-size: 11px; padding: 4px 8px; color: #f8fafc; background: #08090D; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px;">
            <div style="font-weight: 700; font-size: 12px; color: #ffffff; margin-bottom: 2px;">${p.road_name || 'Highway Link'}</div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
              <span style="color: #94a3b8; text-transform: capitalize;">${p.road_class || 'Arterial'} • ${p.speed_limit_kmh || 50} km/h</span>
              <span style="font-weight: 800; font-family: monospace; padding: 2px 6px; border-radius: 4px; background: ${color}25; color: ${color};">
                ${Math.round(prob * 100)}% (${tierLabel})
              </span>
            </div>
            <div style="font-size: 10px; color: #38bdf8; margin-top: 4px; padding-top: 4px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;">
              <span>Click to inspect local SHAP card</span>
              <span style="font-family: monospace;">#${p.segment_id}</span>
            </div>
          </div>
        `, { sticky: true, opacity: 0.96 });

        segments.addLayer(polyline);
      }

      // 3. Crowdsourced Citizen Hazard Points (Crisp, Distinct Markers)
      if (p.layer_type === 'citizen_hazard' && showHazards) {
        const [lon, lat] = feature.geometry.coordinates;

        // Distinct type-based coloring
        const hazardColors: Record<string, string> = {
          'POTHOLE': '#F59E0B',        // Solar Amber
          'SIGNAL': '#EF4444',         // Red
          'STREETLIGHT': '#818CF8',    // Indigo
          'WATERLOGGING': '#0EA5E9',   // Sky Cyan
          'HAZARDOUS_MEDIAN': '#A855F7' // Purple
        };
        const hazardColor = p.color || hazardColors[p.hazard_type] || (p.status === 'VERIFIED' ? '#00F59B' : '#FFB800');

        const marker = L.circleMarker([lat, lon], {
          radius: 4.5,
          color: '#FFFFFF',
          weight: 1.5,
          fillColor: hazardColor,
          fillOpacity: 0.88
        });

        const statusBadge = p.status === 'VERIFIED'
          ? '<span style="font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; background: rgba(0,245,155,0.18); color: #00F59B; border: 1px solid rgba(0,245,155,0.35);">VERIFIED</span>'
          : '<span style="font-size: 9px; font-weight: bold; padding: 2px 6px; border-radius: 4px; background: rgba(255,184,0,0.18); color: #FFB800; border: 1px solid rgba(255,184,0,0.35);">COMMUNITY</span>';

        marker.bindPopup(`
          <div style="font-family: sans-serif; font-size: 12px; color: #f8fafc; background: #08090D; padding: 10px 14px; border-radius: 12px; border: 1px solid ${hazardColor}50; min-width: 200px; box-shadow: 0 10px 25px rgba(0,0,0,0.8);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: bold; color: ${hazardColor}; text-transform: uppercase;">⚠️ ${p.hazard_type || 'Road Hazard'}</span>
              ${statusBadge}
            </div>
            <div style="font-size: 11px; color: #cbd5e1; margin-top: 4px; line-height: 1.4;">${p.description || 'Reported by commuter'}</div>
            <div style="font-size: 10px; color: #94a3b8; margin-top: 8px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;">
              <span>Severity: <strong style="color: #f1f5f9;">${p.severity_rating || p.severity || 3}/5</strong></span>
              <span>Corroborations: <strong style="color: #f1f5f9;">${p.corroboration_count || p.corroborations || 1}</strong></span>
            </div>
          </div>
        `);

        hazards.addLayer(marker);
      }
    });
  }, [layersData, showBlackspots, showSegments, showHazards, isNightTime, isRainActive, basemapStyle, showHeatmap]);

  return (
    <div className="relative w-full h-[calc(100vh-68px)] overflow-hidden font-sans">
      {/* Map Canvas with Obsidian Cyberpunk Theme */}
      <div ref={mapContainerRef} className={`w-full h-full z-0 bg-[#08090D] map-theme-${basemapStyle}`} />

      {/* Loading Radar Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 bg-[#08090D]/85 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-display font-bold text-base text-white tracking-wide">
              Initializing Autonomous Safety Radar
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Ingesting BTP Blackspots • OSM Highway Topology • Live Meteorology
            </p>
          </div>
        </div>
      )}

      {/* Top Floating Telemetry & Weather Status Bar */}
      <div className="absolute top-4 left-4 right-4 md:right-auto z-10 flex flex-wrap items-center gap-2.5">
        {/* Basemap Style Switcher */}
        <div className="glass-card px-1.5 py-1 rounded-2xl flex flex-wrap items-center space-x-1 shadow-2xl text-xs">
          <button
            onClick={() => setBasemapStyle('dark')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              basemapStyle === 'dark' 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🌙 Obsidian
          </button>
          <button
            onClick={() => setBasemapStyle('satellite')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              basemapStyle === 'satellite' 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🛰️ Satellite
          </button>
          <button
            onClick={() => setBasemapStyle('standard')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              basemapStyle === 'standard' 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🗺️ Blueprint
          </button>
          <button
            onClick={() => setBasemapStyle('heatmap')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all flex items-center gap-1 ${
              basemapStyle === 'heatmap' 
                ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-rose-600 text-white font-semibold shadow-lg shadow-orange-500/30 ring-1 ring-white/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🔥</span>
            <span>Heatmap</span>
          </button>
        </div>

        {/* Live Weather Telemetry Pill */}
        {liveWeather && (
          <div className="glass-card px-3.5 py-2 rounded-2xl flex items-center space-x-3 text-xs shadow-2xl text-slate-200">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-semibold">
              <CloudRain className="w-3.5 h-3.5" />
              <span>{liveWeather.city || 'Bengaluru'}: {liveWeather.temperature_c ?? 24}°C</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300 font-mono text-[11px]">
              {liveWeather.condition || 'Clear Asphalt'}
            </span>
            <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
              liveWeather.is_precipitation_active 
                ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}>
              {liveWeather.is_precipitation_active ? '⚠️ +14% Wet Penalty' : '✓ 1.0x Dry Grip'}
            </span>
          </div>
        )}
      </div>

      {/* Floating Tactical Panel (Top Right Dock) */}
      <div className="absolute top-4 right-4 z-10 w-80 md:w-88 glass-card rounded-3xl p-4 shadow-2xl space-y-3.5 transition-all text-xs">
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-display font-bold text-sm text-white tracking-wide">
              Tactical Layers &amp; Simulation
            </span>
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
            {/* Search Input with Autocomplete & Geocoding Dropdown */}
            <div ref={searchContainerRef} className="relative">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search any place or junction (Koramangala, Silk Board...)"
                  className="w-full bg-[#08090D] border border-white/10 rounded-2xl py-2.5 pl-9 pr-8 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-500"
                />
                <Search className="w-4 h-4 text-cyan-400 absolute left-3 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setIsSearchOpen(false);
                      if (searchBeaconRef.current && mapInstanceRef.current) {
                        mapInstanceRef.current.removeLayer(searchBeaconRef.current);
                        searchBeaconRef.current = null;
                      }
                    }}
                    className="absolute right-2.5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Autocomplete Dropdown List */}
              {isSearchOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0D101A]/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-64 overflow-y-auto divide-y divide-white/[0.06]">
                  {searchResults.length > 0 ? (
                    searchResults.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectLocation(item)}
                        className="w-full px-3 py-2 text-left flex items-start space-x-2.5 hover:bg-cyan-500/10 transition-colors group"
                      >
                        <div className="p-1 rounded-lg bg-white/[0.05] group-hover:bg-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 truncate">
                              {item.name}
                            </span>
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase shrink-0 ${
                              item.category === 'Blackspot'
                                ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                : item.category === 'Tech Park'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-white/[0.08] text-slate-400'
                            }`}>
                              {item.category}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate font-light">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-3 text-center text-xs text-slate-400">
                      {isSearchingExternal ? (
                        <div className="flex items-center justify-center space-x-2 text-cyan-400">
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Searching OpenStreetMap places...</span>
                        </div>
                      ) : (
                        <span>Press Enter to search live places for "{searchQuery}"</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Corridor Fly-To Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Quick Hub Jump:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BENGALURU_GAZETTEER.slice(0, 6).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectLocation(item)}
                    className="text-[10px] font-medium px-2.5 py-1 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 border border-white/[0.08] text-slate-300 transition-all active:scale-95"
                  >
                    {item.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Layer Visibility Toggles */}
            <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
              <label className="flex items-center justify-between cursor-pointer hover:bg-white/[0.04] px-2.5 py-1.5 rounded-xl transition-all">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-[0_0_10px_rgba(255,94,0,0.8)]"></span>
                  <span className="text-slate-200 font-medium">Thermal Accident Heatmap (KDE)</span>
                </div>
                <input
                  type="checkbox"
                  checked={basemapStyle === 'heatmap' || showHeatmap}
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    setShowHeatmap(isChecked);
                    if (isChecked && basemapStyle !== 'heatmap') {
                      setBasemapStyle('heatmap');
                    } else if (!isChecked && basemapStyle === 'heatmap') {
                      setBasemapStyle('dark');
                    }
                  }}
                  className="rounded bg-[#08090D] border-white/20 text-cyan-500 focus:ring-0 cursor-pointer"
                />
              </label>

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
              <span>Click any road to view its <strong>SHAP Factor AI Card</strong>. Click any point to submit a hazard report.</span>
            </div>
          </>
        )}
      </div>

      {/* Floating Tactical Legend (Bottom Left Dock) */}
      <div className="absolute bottom-4 left-4 z-10 glass-card px-4 py-3 rounded-2xl shadow-2xl text-[11px] space-y-1.5 hidden md:block">
        {basemapStyle === 'heatmap' || showHeatmap ? (
          <>
            <div className="flex items-center justify-between text-slate-200 font-display font-bold border-b border-white/10 pb-1.5 gap-4">
              <span className="flex items-center gap-1.5">
                <span>🔥</span>
                <span>Accident Density Heatmap</span>
              </span>
              <span className="text-[10px] font-mono text-rose-400">KDE Density Surface</span>
            </div>
            <div className="space-y-1 pt-1">
              <div className="w-56 h-2.5 rounded-full bg-gradient-to-r from-[#00F59B] via-[#00E5FF] via-[#FFB800] via-[#FF5E00] to-[#FF2E5B] shadow-sm"></div>
              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                <span className="text-emerald-400">Low Exposure</span>
                <span className="text-amber-400">Moderate</span>
                <span className="text-rose-400 font-bold">Critical Hotspot</span>
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};
