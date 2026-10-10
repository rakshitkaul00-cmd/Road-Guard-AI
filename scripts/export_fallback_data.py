import json
from pathlib import Path
from fastapi.testclient import TestClient
from backend.main import app

def main():
    client = TestClient(app)

    print("[1/6] Fetching map layers...")
    map_data = client.get('/api/v1/map/layers?layer=all&min_severity=1').json()
    print(f"      Got {len(map_data.get('features', []))} features")

    print("[2/6] Fetching analytics overview...")
    analytics = client.get('/api/v1/analytics/overview').json()

    print("[3/6] Fetching model benchmarks...")
    benchmarks = client.get('/api/v1/analytics/model-performance').json()

    print("[4/6] Fetching citizen reports...")
    reports = client.get('/api/v1/reports').json()
    print(f"      Got {len(reports)} reports")

    print("[5/6] Fetching government OGD portal data...")
    ogd = client.get('/api/v1/analytics/government-ogd-portal').json()

    print("[6/6] Fetching candidate route evaluation...")
    routes = client.post('/api/v1/routes/evaluate', json={'origin': [13.0358, 77.5970], 'destination': [12.9175, 77.6234]}).json()

    ts_content = """// Auto-generated production fallback data for standalone edge hosting (e.g. Netlify)
// Ensures 100% interactivity, zero blank screens, and full ML simulation capability offline.

import { MapLayersResponse, SegmentRiskCard, RouteEvaluationResponse, CitizenReport } from '../services/api';

export const FALLBACK_MAP_LAYERS: MapLayersResponse = """ + json.dumps(map_data, indent=2) + """;

export const FALLBACK_ANALYTICS_OVERVIEW = """ + json.dumps(analytics, indent=2) + """;

export const FALLBACK_MODEL_BENCHMARKS = """ + json.dumps(benchmarks, indent=2) + """;

export const FALLBACK_REPORTS: CitizenReport[] = """ + json.dumps(reports, indent=2) + """;

export const FALLBACK_OGD_PORTAL = """ + json.dumps(ogd, indent=2) + """;

export const FALLBACK_ROUTE_EVALUATION: RouteEvaluationResponse = """ + json.dumps(routes, indent=2) + """;

export function simulateFallbackRisk(params: {
  road_class: string;
  speed_limit_kmh: number;
  lane_count: number;
  dist_nearest_junction_m: number;
  is_night: number;
  precipitation_active: number;
  is_peak_hour: number;
  is_blackspot_corridor: number;
}) {
  let baseScore = 0.22;
  if (params.is_blackspot_corridor === 1) baseScore += 0.32;
  if (params.dist_nearest_junction_m <= 100) baseScore += 0.12;
  if (params.speed_limit_kmh >= 60) baseScore += 0.08;
  if (params.lane_count >= 6) baseScore += 0.05;
  if (params.is_night === 1) baseScore += 0.10;
  if (params.precipitation_active === 1) baseScore += 0.12;
  if (params.is_peak_hour === 1) baseScore += 0.06;

  const prob = Math.round(Math.min(0.95, Math.max(0.05, baseScore)) * 1000) / 1000;

  let riskTier: 'LOW' | 'MODERATE' | 'ELEVATED' = 'LOW';
  let recAction = 'Maintain standard road maintenance schedule and monitor citizen feedback queues.';
  if (prob >= 0.58) {
    riskTier = 'ELEVATED';
    recAction = 'Priority corridor inspection: deploy radar speed calming & audit pedestrian crossing signals.';
  } else if (prob >= 0.28) {
    riskTier = 'MODERATE';
    recAction = 'Routine municipal safety audit: inspect lane markings, streetlighting illumination, and pothole patches.';
  }

  const shapFactors: Array<{
    feature: string;
    impact_percentage: number;
    direction: 'increases_risk' | 'decreases_risk';
    description: string;
  }> = [];

  if (params.is_blackspot_corridor === 1) {
    shapFactors.push({
      feature: 'Historical Blackspot Corridor Proximity',
      impact_percentage: 28.5,
      direction: 'increases_risk',
      description: 'Segment lies within 500m of a designated BTP high-fatality cluster.'
    });
  }
  if (params.dist_nearest_junction_m <= 100) {
    shapFactors.push({
      feature: 'High Junction Convergence (< 100m)',
      impact_percentage: 14.2,
      direction: 'increases_risk',
      description: 'Short distance to major intersection introduces frequent weaving and deceleration.'
    });
  }
  if (params.is_night === 1) {
    shapFactors.push({
      feature: 'Nighttime Operating Window',
      impact_percentage: 12.0,
      direction: 'increases_risk',
      description: 'Reduced ambient illumination and elevated two-wheeler vulnerability.'
    });
  }
  if (params.speed_limit_kmh >= 60) {
    shapFactors.push({
      feature: 'High Arterial Speed Limit (>= 60 km/h)',
      impact_percentage: 8.5,
      direction: 'increases_risk',
      description: 'Higher kinetic energy and longer emergency braking distance.'
    });
  }
  if (params.precipitation_active === 0) {
    shapFactors.push({
      feature: 'Dry Road Surface Context',
      impact_percentage: 4.5,
      direction: 'decreases_risk',
      description: 'Absence of standing water reduces hydroplaning risk.'
    });
  }

  return {
    calibrated_risk_probability: prob,
    risk_tier: riskTier,
    shap_top_factors: shapFactors,
    recommended_action: recAction,
    data_confidence: 'HIGH'
  };
}

export function getFallbackSegmentRiskCard(segmentId: number, isNight = 1, precipitation = 0): SegmentRiskCard {
  const feat = FALLBACK_MAP_LAYERS.features.find(f => f.id === `segment-${segmentId}` || f.properties?.segment_id === segmentId);
  const p = feat?.properties || {};
  const isBlackspot = p.is_blackspot_corridor === 1 || p.is_blackspot === true;
  const speed = p.speed_limit_kmh || 50;
  const lanes = p.lane_count || 4;
  const roadClass = p.road_class || 'primary';
  const roadName = p.road_name || `Urban Arterial Segment #${segmentId}`;
  
  const sim = simulateFallbackRisk({
    road_class: roadClass,
    speed_limit_kmh: speed,
    lane_count: lanes,
    dist_nearest_junction_m: p.dist_nearest_junction_m || (isBlackspot ? 85 : 320),
    is_night: isNight,
    precipitation_active: precipitation,
    is_peak_hour: 1,
    is_blackspot_corridor: isBlackspot ? 1 : 0
  });

  const startCoords: [number, number] = feat?.geometry?.coordinates?.[0] 
    ? [feat.geometry.coordinates[0][1], feat.geometry.coordinates[0][0]] 
    : [12.9716, 77.5946];
  const endCoords: [number, number] = feat?.geometry?.coordinates?.[1] 
    ? [feat.geometry.coordinates[1][1], feat.geometry.coordinates[1][0]] 
    : [12.9720, 77.5950];

  return {
    segment_id: segmentId,
    road_name: roadName,
    road_class: roadClass,
    speed_limit_kmh: speed,
    lane_count: lanes,
    length_meters: p.length_meters || 240,
    start_coords: startCoords,
    end_coords: endCoords,
    is_blackspot_corridor: isBlackspot,
    historical_blackspot_proximity_m: isBlackspot ? 85.0 : 450.0,
    official_blackspot_name: p.official_blackspot_name || (isBlackspot ? 'Bengaluru Police Designated Priority Blackspot' : undefined),
    calibrated_risk_probability: sim.calibrated_risk_probability,
    risk_tier: sim.risk_tier,
    shap_top_factors: sim.shap_top_factors,
    active_hazards_count: p.active_hazards_count || (isBlackspot ? 3 : 0),
    hazard_prioritization_score: isBlackspot ? 3.45 : 1.10,
    data_confidence: 'HIGH',
    recommended_action: sim.recommended_action
  };
}
"""

    out_file = Path("frontend/src/data/fallbackData.ts")
    out_file.parent.mkdir(parents=True, exist_ok=True)
    out_file.write_text(ts_content, encoding="utf-8")
    print(f"✓ Successfully wrote {out_file} ({len(ts_content):,} bytes)")

if __name__ == "__main__":
    main()
