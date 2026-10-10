const BASE_URL = ((import.meta as any).env?.VITE_API_BASE_URL as string) || '';
const API_BASE = `${BASE_URL.replace(/\/$/, '')}/api/v1`;

export interface MapLayerFeature {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: any;
  };
  properties: Record<string, any>;
}

export interface MapLayersResponse {
  type: string;
  metadata: {
    center: [number, number];
    zoom: number;
    total_features: number;
    study_area: string;
  };
  features: MapLayerFeature[];
}

export interface ShapFactor {
  feature: string;
  impact_percentage: number;
  direction: 'increases_risk' | 'decreases_risk';
  description: string;
}

export interface SegmentRiskCard {
  segment_id: number;
  road_name: string;
  road_class: string;
  speed_limit_kmh: number;
  lane_count: number;
  length_meters: number;
  start_coords: [number, number];
  end_coords: [number, number];
  is_blackspot_corridor: boolean;
  historical_blackspot_proximity_m: number;
  official_blackspot_name?: string;
  calibrated_risk_probability: number;
  risk_tier: 'LOW' | 'MODERATE' | 'ELEVATED';
  shap_top_factors: ShapFactor[];
  active_hazards_count: number;
  hazard_prioritization_score: number;
  data_confidence: string;
  recommended_action: string;
}

export interface CandidateRoute {
  route_id: string;
  route_name: string;
  total_distance_km: number;
  estimated_time_mins: number;
  blackspot_corridors_traversed: number;
  mean_segment_risk_probability: number;
  cumulative_risk_exposure: number;
  active_hazard_count: number;
  safety_tier: string;
  waypoints: [number, number][];
}

export interface RouteEvaluationResponse {
  origin: [number, number];
  destination: [number, number];
  routes: CandidateRoute[];
  recommendation_rationale: string;
  disclaimer: string;
}

export interface CitizenReport {
  id: number;
  hazard_type: string;
  description: string;
  severity_rating: number;
  latitude: number;
  longitude: number;
  status: string;
  corroboration_count: number;
  is_synthetic: boolean;
  created_at: string;
  updated_at: string;
}

export const api = {
  async getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  async getMapLayers(layer = 'all', minSeverity = 1): Promise<MapLayersResponse> {
    const res = await fetch(`${API_BASE}/map/layers?layer=${layer}&min_severity=${minSeverity}`);
    return res.json();
  },

  async getSegmentRiskCard(segmentId: number, isNight = 1, precipitation = 0): Promise<SegmentRiskCard> {
    const res = await fetch(`${API_BASE}/segments/${segmentId}?is_night=${isNight}&precipitation=${precipitation}`);
    return res.json();
  },

  async submitReport(payload: {
    hazard_type: string;
    description: string;
    severity_rating: number;
    latitude: number;
    longitude: number;
  }) {
    const res = await fetch(`${API_BASE}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async getReports(status?: string): Promise<CitizenReport[]> {
    const url = status && status !== 'ALL' 
      ? `${API_BASE}/reports?status=${status}` 
      : `${API_BASE}/reports`;
    const res = await fetch(url);
    return res.json();
  },

  async moderateReport(reportId: number, newStatus: string, token: string, notes = "Audited via moderation queue") {
    const res = await fetch(`${API_BASE}/admin/reports/${reportId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ new_status: newStatus, moderation_notes: notes })
    });
    return res.json();
  },

  async evaluateRoute(origin: [number, number], destination: [number, number]): Promise<RouteEvaluationResponse> {
    const res = await fetch(`${API_BASE}/routes/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ origin, destination })
    });
    return res.json();
  },

  async getAnalyticsOverview() {
    const res = await fetch(`${API_BASE}/analytics/overview`);
    return res.json();
  },

  async getModelBenchmarks() {
    const res = await fetch(`${API_BASE}/analytics/model-performance`);
    return res.json();
  },

  async getLiveWeather() {
    const res = await fetch(`${API_BASE}/weather/live`);
    return res.json();
  },

  async getGovernmentOgdInfo() {
    const res = await fetch(`${API_BASE}/analytics/government-ogd-portal`);
    return res.json();
  },

  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      throw new Error("Invalid credentials");
    }
    return res.json();
  },

  async simulateRisk(payload: {
    road_class: string;
    speed_limit_kmh: number;
    lane_count: number;
    dist_nearest_junction_m: number;
    is_night: number;
    precipitation_active: number;
    is_peak_hour: number;
    is_blackspot_corridor: number;
  }) {
    const res = await fetch(`${API_BASE}/segments/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return res.json();
  }
};
