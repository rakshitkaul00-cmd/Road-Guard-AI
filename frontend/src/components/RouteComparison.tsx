import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  Shield, Navigation, AlertTriangle, CheckCircle, Clock, ArrowRight, 
  Info, Sparkles, MapPin, Gauge, Award, Compass, Zap, Check, ChevronRight,
  Eye, Flag, ArrowLeftRight, Search, X, Loader2
} from 'lucide-react';
import { api, RouteEvaluationResponse } from '../services/api';

interface PlaceOption {
  id: string;
  name: string;
  coords: [number, number];
  category: string;
}

const BENGALURU_PLACES: PlaceOption[] = [
  // --- Priority BTP Blackspots & Major Arterial Hubs ---
  { id: 'silkboard', name: 'Central Silk Board Junction (South Core)', coords: [12.9176, 77.6238], category: 'Major Hub' },
  { id: 'hebbal', name: 'Hebbal Flyover & Junction (North Spine)', coords: [13.0358, 77.5970], category: 'Major Hub' },
  { id: 'tinfactory', name: 'Tin Factory / KR Puram Bridge (East)', coords: [12.9972, 77.6698], category: 'Blackspot' },
  { id: 'goragunte', name: 'Goraguntepalya / CMTI Flyover (Tumakuru Rd)', coords: [13.0285, 77.5408], category: 'Blackspot' },
  { id: 'peenya', name: 'Peenya 8th Mile / Jalahalli Cross (NH-48)', coords: [13.0458, 77.5029], category: 'Blackspot' },
  { id: 'marathahalli', name: 'Marathahalli Multiplex & Bridge (ORR)', coords: [12.9562, 77.7011], category: 'Blackspot' },
  { id: 'bellandur', name: 'Bellandur EcoSpace / Flyover Descent', coords: [12.9260, 77.6762], category: 'Blackspot' },
  { id: 'dairycircle', name: 'Dairy Circle / Bannerghatta Road', coords: [12.9372, 77.5995], category: 'Major Hub' },
  { id: 'mekhri', name: 'Mekhri Circle / Bellary Road (Palace Grounds)', coords: [13.0076, 77.5843], category: 'Major Hub' },
  { id: 'yeshwanthpur-cir', name: 'Yeshwanthpur Govardhan Circle', coords: [13.0238, 77.5513], category: 'Major Hub' },
  { id: 'domlur', name: 'Domlur Flyover / EGL Corridor', coords: [12.9609, 77.6387], category: 'Major Hub' },
  { id: 'richmond', name: 'Richmond Circle / Residency Road', coords: [12.9664, 77.5996], category: 'CBD' },
  { id: 'corporation', name: 'Corporation Circle / Hudson Circle', coords: [12.9678, 77.5886], category: 'CBD' },
  { id: 'kengeri', name: 'Kengeri Satellite Bus Stand (Mysuru Rd)', coords: [12.9125, 77.4839], category: 'Major Hub' },
  { id: 'nayandahalli', name: 'Nayandahalli Junction (Mysuru Rd / ORR)', coords: [12.9463, 77.5255], category: 'Major Hub' },
  { id: 'nagavara', name: 'Nagavara Junction / Manyata Gate (ORR)', coords: [13.0435, 77.6208], category: 'Tech Corridor' },

  // --- Tech Parks & IT Corridors ---
  { id: 'ecity-p1', name: 'Electronic City Phase 1 (Infosys/Wipro)', coords: [12.8452, 77.6602], category: 'Tech Corridor' },
  { id: 'ecity-p2', name: 'Electronic City Phase 2 (TCS/Tech M)', coords: [12.8415, 77.6833], category: 'Tech Corridor' },
  { id: 'whitefield-itpb', name: 'Whitefield ITPB / Hope Farm', coords: [12.9840, 77.7516], category: 'Tech Corridor' },
  { id: 'manyata', name: 'Manyata Embassy Business Park (Hebbal)', coords: [13.0494, 77.6214], category: 'Tech Corridor' },
  { id: 'bagmane', name: 'Bagmane Tech Park (CV Raman Nagar)', coords: [12.9798, 77.6599], category: 'Tech Corridor' },
  { id: 'ecospace', name: 'Ecospace Business Park (Bellandur)', coords: [12.9265, 77.6820], category: 'Tech Corridor' },
  { id: 'cessna', name: 'Cessna Business Park (Kadubeesanahalli)', coords: [12.9362, 77.6934], category: 'Tech Corridor' },
  { id: 'global-village', name: 'Global Village Tech Park (RR Nagar)', coords: [12.9174, 77.5028], category: 'Tech Corridor' },
  { id: 'rmz-infinity', name: 'RMZ Infinity (Old Madras Road)', coords: [12.9934, 77.6607], category: 'Tech Corridor' },
  { id: 'prestige-tech', name: 'Prestige Tech Park (Marathahalli-ORR)', coords: [12.9388, 77.6912], category: 'Tech Corridor' },

  // --- Commercial, Dining & CBD Zones ---
  { id: 'indiranagar-100ft', name: 'Indiranagar 100ft Road / 12th Main', coords: [12.9784, 77.6408], category: 'Commercial' },
  { id: 'koramangala-sony', name: 'Koramangala Sony World / 80ft Road', coords: [12.9345, 77.6271], category: 'Commercial' },
  { id: 'koramangala-5th', name: 'Koramangala 5th Block (Forum Mall)', coords: [12.9340, 77.6180], category: 'Commercial' },
  { id: 'mgroad', name: 'MG Road / Brigade Road (Central CBD)', coords: [12.9740, 77.6080], category: 'CBD' },
  { id: 'church-street', name: 'Church Street / Museum Road', coords: [12.9750, 77.6055], category: 'CBD' },
  { id: 'commercial-st', name: 'Commercial Street / Tasker Town', coords: [12.9822, 77.6083], category: 'Commercial' },
  { id: 'malleshwaram-8th', name: 'Malleshwaram 8th Cross (Sampige Rd)', coords: [13.0041, 77.5701], category: 'Commercial' },
  { id: 'jayanagar-4th', name: 'Jayanagar 4th Block Complex', coords: [12.9304, 77.5835], category: 'Commercial' },
  { id: 'gandhi-bazaar', name: 'Basavanagudi Gandhi Bazaar Circle', coords: [12.9438, 77.5704], category: 'Commercial' },
  { id: 'kalyan-nagar', name: 'Kalyan Nagar / HRBR Layout (Kammanahalli)', coords: [13.0232, 77.6472], category: 'Commercial' },
  { id: 'frazer-town', name: 'Frazer Town / MM Road (Pulakeshi Nagar)', coords: [12.9968, 77.6133], category: 'Commercial' },

  // --- Key Residential Neighborhoods ---
  { id: 'hsr-27th', name: 'HSR Layout 27th Main (Sector 1 & 2)', coords: [12.9116, 77.6389], category: 'Residential' },
  { id: 'btm-2nd', name: 'BTM Layout 2nd Stage (Udupi Garden)', coords: [12.9145, 77.6105], category: 'Residential' },
  { id: 'jp-nagar-delmia', name: 'JP Nagar 6th Phase (Delmia Circle)', coords: [12.9080, 77.5860], category: 'Residential' },
  { id: 'jp-nagar-2nd', name: 'JP Nagar 2nd Phase / 24th Main', coords: [12.9130, 77.5930], category: 'Residential' },
  { id: 'banashankari-bda', name: 'Banashankari BDA Complex (2nd Stage)', coords: [12.9254, 77.5736], category: 'Residential' },
  { id: 'rajajinagar-1st', name: 'Rajajinagar 1st Block (Navrang)', coords: [12.9935, 77.5530], category: 'Residential' },
  { id: 'vijayanagar-ttmc', name: 'Vijayanagar TTMC & Metro Hub', coords: [12.9715, 77.5372], category: 'Residential' },
  { id: 'sadashivanagar', name: 'Sadashivanagar / Bashyam Circle', coords: [13.0089, 77.5772], category: 'Residential' },
  { id: 'cunningham-rd', name: 'Cunningham Road / Vasanth Nagar', coords: [12.9877, 77.5954], category: 'Residential' },
  { id: 'sahakara-nagar', name: 'Sahakara Nagar / Kodigehalli Gate', coords: [13.0615, 77.5905], category: 'Residential' },
  { id: 'vidyaranyapura', name: 'Vidyaranyapura Main Road / Post Office', coords: [13.0782, 77.5580], category: 'Residential' },
  { id: 'sarjapur-wipro', name: 'Sarjapur Road (Wipro Corporate Gate)', coords: [12.9103, 77.6850], category: 'Residential' },
  { id: 'bannerghatta-gottigere', name: 'Bannerghatta Road (Gottigere / Meenakshi)', coords: [12.8652, 77.5902], category: 'Residential' },
  { id: 'kanakapura-metro', name: 'Kanakapura Road (Silk Institute Metro)', coords: [12.8752, 77.5450], category: 'Residential' },
  { id: 'magadi-road', name: 'Magadi Road (Prasanna Theatre / Tollgate)', coords: [12.9765, 77.5420], category: 'Residential' },

  // --- Transit Terminals, Airports & Rail Terminals ---
  { id: 'kia-airport', name: 'Kempegowda International Airport (KIA Toll)', coords: [13.2014, 77.7108], category: 'Airport' },
  { id: 'majestic-sbc', name: 'KSR Bengaluru City Railway Station (Majestic SBC)', coords: [12.9781, 77.5695], category: 'Transit Hub' },
  { id: 'majestic-bus', name: 'Majestic Kempegowda Bus Station (BMTC/KSRTC)', coords: [12.9767, 77.5713], category: 'Transit Hub' },
  { id: 'yeshwanthpur-rail', name: 'Yeshwanthpur Railway Station (YPR)', coords: [13.0245, 77.5501], category: 'Transit Hub' },
  { id: 'krpuram-rail', name: 'KR Puram Railway Station (KJM)', coords: [13.0012, 77.6890], category: 'Transit Hub' },
  { id: 'cantonment-rail', name: 'Bengaluru Cantonment Railway Station (BNC)', coords: [12.9930, 77.5986], category: 'Transit Hub' },
  { id: 'smvb-baiyappanahalli', name: 'Sir M. Visvesvaraya Terminal (SMVB Baiyappanahalli)', coords: [12.9928, 77.6534], category: 'Transit Hub' },
  { id: 'shantinagar-ttmc', name: 'Shantinagar TTMC Bus Station (KSRTC)', coords: [12.9542, 77.5925], category: 'Transit Hub' },

  // --- Extended Suburbs & Arterial Corridors ---
  { id: 'yelahanka-town', name: 'Yelahanka New Town (Kogilu Cross)', coords: [13.1007, 77.6012], category: 'Residential' },
  { id: 'devanahalli', name: 'Devanahalli Town / NH-44 Crossing', coords: [13.2480, 77.7120], category: 'Major Hub' },
  { id: 'nelamangala-toll', name: 'Nelamangala Toll Plaza (NH-48)', coords: [13.0990, 77.3910], category: 'Major Hub' },
  { id: 'hoskote-toll', name: 'Hoskote Toll / NH-75 Old Madras Rd', coords: [13.0710, 77.7980], category: 'Major Hub' },
  { id: 'hoodi', name: 'Hoodi Junction (ITPL Main Road)', coords: [12.9910, 77.7160], category: 'Tech Corridor' },
  { id: 'kadugodi', name: 'Kadugodi Tree Park / Metro Station', coords: [12.9980, 77.7600], category: 'Tech Corridor' },
  { id: 'varthur-kodi', name: 'Varthur Kodi & Lake Circle', coords: [12.9410, 77.7420], category: 'Residential' },
  { id: 'mahadevapura', name: 'Mahadevapura Ring Road (More Mega Store)', coords: [12.9902, 77.6875], category: 'Tech Corridor' },
  { id: 'kundalahalli', name: 'Kundalahalli Gate (AECS Layout)', coords: [12.9645, 77.7155], category: 'Tech Corridor' }
];

export const RouteComparison: React.FC = () => {
  // Search Inputs
  const [originText, setOriginText] = useState('Hebbal Flyover & Junction (North Spine)');
  const [destText, setDestText] = useState('Central Silk Board Junction (South Core)');
  const [originCoords, setOriginCoords] = useState<[number, number]>([13.0358, 77.5970]);
  const [destCoords, setDestCoords] = useState<[number, number]>([12.9176, 77.6238]);

  // Dropdown States
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<PlaceOption[]>(BENGALURU_PLACES);
  const [destSuggestions, setDestSuggestions] = useState<PlaceOption[]>(BENGALURU_PLACES);

  // Route Evaluation & Map States
  const [loading, setLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<RouteEvaluationResponse | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<string>('route_collector_secondary');

  const originContainerRef = useRef<HTMLDivElement>(null);
  const destContainerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayersRef = useRef<{ [key: string]: L.Polyline }>({});
  const markerGroupRef = useRef<L.LayerGroup>(L.layerGroup());

  // Quick Curated Corridor Shortcuts
  const popularShortcuts = [
    {
      title: 'Hebbal → Silk Board',
      category: 'North-South Spine',
      origin: [13.0358, 77.5970] as [number, number],
      originName: 'Hebbal Flyover & Junction (North Spine)',
      destination: [12.9176, 77.6238] as [number, number],
      destName: 'Central Silk Board Junction (South Core)'
    },
    {
      title: 'Whitefield → Silk Board',
      category: 'Tech Corridor',
      origin: [12.9840, 77.7516] as [number, number],
      originName: 'Whitefield ITPB / Hope Farm',
      destination: [12.9176, 77.6238] as [number, number],
      destName: 'Central Silk Board Junction (South Core)'
    },
    {
      title: 'Indiranagar → Koramangala',
      category: 'East-Central Urban',
      origin: [12.9784, 77.6408] as [number, number],
      originName: 'Indiranagar 100ft Road / 12th Main',
      destination: [12.9345, 77.6271] as [number, number],
      destName: 'Koramangala Sony World / 80ft Road'
    },
    {
      title: 'Hebbal → KIA Airport',
      category: 'Airport Expressway',
      origin: [13.0358, 77.5970] as [number, number],
      originName: 'Hebbal Flyover & Junction (North Spine)',
      destination: [13.2014, 77.7108] as [number, number],
      destName: 'Kempegowda International Airport (KIA Toll)'
    },
    {
      title: 'Peenya → Electronic City',
      category: 'Industrial Ring Bypass',
      origin: [13.0458, 77.5029] as [number, number],
      originName: 'Peenya 8th Mile / Jalahalli Cross (NH-48)',
      destination: [12.8452, 77.6602] as [number, number],
      destName: 'Electronic City Phase 1 (Infosys/Wipro)'
    },
    {
      title: 'Majestic → Whitefield',
      category: 'Commuter Core',
      origin: [12.9781, 77.5695] as [number, number],
      originName: 'KSR Bengaluru City Railway Station (Majestic SBC)',
      destination: [12.9840, 77.7516] as [number, number],
      destName: 'Whitefield ITPB / Hope Farm'
    }
  ];

  // Dismiss dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (originContainerRef.current && !originContainerRef.current.contains(e.target as Node)) {
        setIsOriginOpen(false);
      }
      if (destContainerRef.current && !destContainerRef.current.contains(e.target as Node)) {
        setIsDestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter Origin Suggestions across all 68+ places without slicing
  useEffect(() => {
    const q = originText.trim().toLowerCase();
    if (!q) {
      setOriginSuggestions(BENGALURU_PLACES);
    } else {
      setOriginSuggestions(
        BENGALURU_PLACES.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.category.toLowerCase().includes(q)
        )
      );
    }
  }, [originText]);

  // Filter Destination Suggestions across all 68+ places without slicing
  useEffect(() => {
    const q = destText.trim().toLowerCase();
    if (!q) {
      setDestSuggestions(BENGALURU_PLACES);
    } else {
      setDestSuggestions(
        BENGALURU_PLACES.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.category.toLowerCase().includes(q)
        )
      );
    }
  }, [destText]);

  // Core Evaluation Handler
  const evaluateRoute = async (origin: [number, number], dest: [number, number]) => {
    setLoading(true);
    try {
      const res = await api.evaluateRoute(origin, dest);
      setEvaluationResult(res);
      setActiveRouteId('route_collector_secondary');
    } catch (e) {
      console.error("Failed to evaluate route", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    evaluateRoute(originCoords, destCoords);
  }, []);

  // Instant selection handlers that immediately update route calculation
  const handleSelectOrigin = (place: PlaceOption) => {
    setOriginText(place.name);
    setOriginCoords(place.coords);
    setIsOriginOpen(false);
    evaluateRoute(place.coords, destCoords);
  };

  const handleSelectDest = (place: PlaceOption) => {
    setDestText(place.name);
    setDestCoords(place.coords);
    setIsDestOpen(false);
    evaluateRoute(originCoords, place.coords);
  };

  const handleApplyShortcut = (shortcut: typeof popularShortcuts[0]) => {
    setOriginText(shortcut.originName);
    setDestText(shortcut.destName);
    setOriginCoords(shortcut.origin);
    setDestCoords(shortcut.destination);
    setIsOriginOpen(false);
    setIsDestOpen(false);
    evaluateRoute(shortcut.origin, shortcut.destination);
  };

  const handleSwap = () => {
    const tempText = originText;
    const tempCoords = originCoords;
    setOriginText(destText);
    setOriginCoords(destCoords);
    setDestText(tempText);
    setDestCoords(tempCoords);
    setIsOriginOpen(false);
    setIsDestOpen(false);
    evaluateRoute(destCoords, tempCoords);
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOriginOpen(false);
    setIsDestOpen(false);

    let curOrig = originCoords;
    const matchOrig = BENGALURU_PLACES.find(p => p.name.toLowerCase().includes(originText.toLowerCase()));
    if (matchOrig) {
      curOrig = matchOrig.coords;
      setOriginCoords(matchOrig.coords);
    }

    let curDest = destCoords;
    const matchDest = BENGALURU_PLACES.find(p => p.name.toLowerCase().includes(destText.toLowerCase()));
    if (matchDest) {
      curDest = matchDest.coords;
      setDestCoords(matchDest.coords);
    }

    evaluateRoute(curOrig, curDest);
  };

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

    // Crisp dark street map using OpenStreetMap France HOT with CSS dark filter
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      subdomains: ['a', 'b'],
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crossOrigin: true
    }).addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 200);

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

    // Origin Marker 🟢 A
    const originIcon = L.divIcon({
      className: 'route-origin-pin',
      html: `
        <div style="width: 32px; height: 32px; border-radius: 9999px; background: #00F59B; border: 3px solid #08090D; display: flex; align-items: center; justify-content: center; color: #08090D; font-weight: 900; font-size: 13px; box-shadow: 0 0 15px #00F59B; transform: translate(-16px, -16px);">
          A
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    L.marker([origLat, origLon], { icon: originIcon })
      .bindPopup(`<strong style="color: #00F59B;">🟢 Starting Point:</strong><br>${originText}`)
      .addTo(markerGroupRef.current);

    // Destination Marker 🔴 B
    const destIcon = L.divIcon({
      className: 'route-dest-pin',
      html: `
        <div style="width: 32px; height: 32px; border-radius: 9999px; background: #00E5FF; border: 3px solid #08090D; display: flex; align-items: center; justify-content: center; color: #08090D; font-weight: 900; font-size: 13px; box-shadow: 0 0 15px #00E5FF; transform: translate(-16px, -16px);">
          B
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    L.marker([destLat, destLon], { icon: destIcon })
      .bindPopup(`<strong style="color: #00E5FF;">🔴 Destination:</strong><br>${destText}`)
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
        weight: route.route_id === activeRouteId ? 6.5 : 4,
        opacity: route.route_id === activeRouteId ? 0.95 : 0.55,
        dashArray: isSafer ? undefined : '6, 6'
      }).addTo(map);

      polyline.bindTooltip(
        `<div style="font-family: sans-serif; font-size: 12px; font-weight: bold; padding: 2px 4px;">${route.route_name.split(':')[0]}: ${route.estimated_time_mins} mins • Exposure ${route.cumulative_risk_exposure}</div>`,
        { sticky: true }
      );

      polyline.on('click', () => {
        setActiveRouteId(route.route_id);
      });

      routeLayersRef.current[route.route_id] = polyline;
    });

    if (allCoords.length > 0) {
      map.fitBounds(L.latLngBounds(allCoords), { padding: [50, 50] });
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
          Find the Safest Route in Bengaluru
        </h2>
        <p className="text-slate-400 text-xs md:text-sm max-w-3xl leading-relaxed font-light">
          Unlike ordinary GPS apps that only care about speed, RoadGuard AI compares travel time against <strong>actual accident blackspots and road hazards</strong> to help you choose the safest journey.
        </p>
      </div>

      {/* Modern Route Search Form (Google Maps Style) */}
      <div className="glass-card-elevated rounded-3xl p-5 md:p-6 shadow-2xl space-y-4 bg-[#0D101A] border border-white/[0.08]">
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5" />
            Route Origin &amp; Destination Finder
          </span>
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Interactive Autocomplete Enabled
          </span>
        </div>

        <form onSubmit={handleSubmitSearch} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
          {/* Origin Input */}
          <div ref={originContainerRef} className={`relative flex-1 ${isOriginOpen ? 'z-40' : 'z-20'}`}>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00F59B]"></span>
              </div>
              <input
                type="text"
                value={originText}
                onChange={(e) => {
                  setOriginText(e.target.value);
                  setIsOriginOpen(true);
                }}
                onFocus={() => setIsOriginOpen(true)}
                placeholder="Where are you starting from?"
                className="w-full pl-9 pr-8 py-3 bg-[#141824] border border-white/[0.1] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-medium"
              />
              {originText && (
                <button
                  type="button"
                  onClick={() => {
                    setOriginText('');
                    setIsOriginOpen(true);
                  }}
                  className="absolute right-2.5 p-1 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Origin Dropdown Suggestions */}
            {isOriginOpen && originSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0C0F17]/98 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto overflow-x-hidden divide-y divide-white/[0.06] custom-dropdown-scrollbar">
                <div className="sticky top-0 z-10 px-3.5 py-2 bg-[#090C14]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold">
                  <span>📍 {originSuggestions.length} Bengaluru Locations</span>
                  <span className="text-[10px] text-slate-400 font-normal">Scroll to explore</span>
                </div>
                {originSuggestions.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => handleSelectOrigin(place)}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-cyan-500/10 transition-colors group"
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">{place.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 shrink-0 ml-2">
                      {place.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button */}
          <button
            type="button"
            onClick={handleSwap}
            className="self-center p-2.5 rounded-xl bg-white/[0.06] hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 border border-white/[0.08] transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Swap Origin and Destination"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          {/* Destination Input */}
          <div ref={destContainerRef} className={`relative flex-1 ${isDestOpen ? 'z-40' : 'z-20'}`}>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 flex items-center pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00E5FF]"></span>
              </div>
              <input
                type="text"
                value={destText}
                onChange={(e) => {
                  setDestText(e.target.value);
                  setIsDestOpen(true);
                }}
                onFocus={() => setIsDestOpen(true)}
                placeholder="Where do you want to go?"
                className="w-full pl-9 pr-8 py-3 bg-[#141824] border border-white/[0.1] rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-medium"
              />
              {destText && (
                <button
                  type="button"
                  onClick={() => {
                    setDestText('');
                    setIsDestOpen(true);
                  }}
                  className="absolute right-2.5 p-1 text-slate-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Destination Dropdown Suggestions */}
            {isDestOpen && destSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#0C0F17]/98 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto overflow-x-hidden divide-y divide-white/[0.06] custom-dropdown-scrollbar">
                <div className="sticky top-0 z-10 px-3.5 py-2 bg-[#090C14]/95 backdrop-blur-md border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold">
                  <span>🏁 {destSuggestions.length} Bengaluru Locations</span>
                  <span className="text-[10px] text-slate-400 font-normal">Scroll to explore</span>
                </div>
                {destSuggestions.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => handleSelectDest(place)}
                    className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-cyan-500/10 transition-colors group"
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <Flag className="w-3.5 h-3.5 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-semibold text-slate-200 truncate group-hover:text-white">{place.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 shrink-0 ml-2">
                      {place.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Button: Find Safest Route */}
          <button
            type="submit"
            disabled={loading}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center space-x-2 shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-200" />
                <span>Find Safest Route</span>
              </>
            )}
          </button>
        </form>

        {/* Popular Quick Corridor Chips */}
        <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
            Popular City Corridors (1-Click Test):
          </span>
          <div className="flex flex-wrap gap-2">
            {popularShortcuts.map((s, idx) => {
              const isCurrent = originText.includes(s.originName.split(' ')[0]) && destText.includes(s.destName.split(' ')[0]);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyShortcut(s)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all duration-200 flex items-center space-x-1.5 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 border-cyan-400 text-cyan-200 shadow-md font-semibold'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border-white/[0.08]'
                  }`}
                >
                  <span>{s.title}</span>
                  <span className="text-[10px] text-slate-500 hidden sm:inline">({s.category})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive GIS Route Visualizer Map */}
      <div className="glass-card-elevated rounded-3xl p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-2 gap-2">
          <div className="flex items-center space-x-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="font-display font-bold text-white text-sm">Interactive Corridor Map</span>
          </div>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-3.5 h-1.5 rounded-full bg-[#00F59B] shadow-[0_0_8px_#00F59B]"></span>
              Route 2 (Safer Bypass)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-3.5 h-1.5 rounded-full bg-[#FFB800] shadow-[0_0_8px_#FFB800]"></span>
              Route 1 (Fast Arterial)
            </span>
          </div>
        </div>

        <div className="relative isolate z-0 w-full h-80 md:h-96 rounded-2xl overflow-hidden border border-white/10 map-theme-dark">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>

      {/* Route Evaluation Display */}
      {loading && (
        <div className="py-20 text-center space-y-3 text-slate-400 font-mono text-xs">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Analyzing multi-corridor BTP blackspot crossings &amp; live exposure...</p>
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
                      <span className="text-[11px] font-mono text-slate-400">
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
                        <span className="text-slate-400 font-medium">Crash Risk Exposure Score:</span>
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
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" /> Bypasses chronic collision hotspots; significantly lower fatality probability.
                      </span>
                    ) : (
                      <span className="text-amber-400 flex items-center gap-2 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" /> Traverses high-speed arterial bottlenecks with documented crash clusters.
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
