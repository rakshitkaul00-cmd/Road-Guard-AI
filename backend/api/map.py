from fastapi import APIRouter, Depends, Query
from typing import Dict, Any, Optional
import sqlite3

from backend.database import get_db
from backend.ml.inference import inference_engine

router = APIRouter(prefix="/map", tags=["Geospatial Map"])

@router.get("/layers")
def get_map_layers(
    layer: Optional[str] = Query("all", description="all | blackspots | segments | hazards"),
    min_severity: Optional[int] = Query(1, ge=1, le=5),
    status: Optional[str] = Query(None),
    db: sqlite3.Connection = Depends(get_db)
) -> Dict[str, Any]:
    """
    Returns complete spatial GeoJSON FeatureCollection of Bengaluru safety layers.
    """
    cursor = db.cursor()
    features = []

    # 1. Official BTP Blackspots Layer
    if layer in ["all", "blackspots"]:
        cursor.execute("SELECT * FROM blackspots")
        blackspots = cursor.fetchall()
        for b in blackspots:
            features.append({
                "type": "Feature",
                "id": f"blackspot_{b['id']}",
                "geometry": {
                    "type": "Point",
                    "coordinates": [b["longitude"], b["latitude"]]
                },
                "properties": {
                    "layer_type": "official_blackspot",
                    "id": b["id"],
                    "corridor_name": b["corridor_name"],
                    "junction_name": b["junction_name"],
                    "fatal_count_3yr": b["fatal_count_3yr"],
                    "injury_count_3yr": b["injury_count_3yr"],
                    "primary_hazard_cause": b["primary_hazard_cause"],
                    "buffer_radius_m": b["buffer_radius_m"],
                    "official_source": b["official_source"],
                    "risk_tier": "ELEVATED",
                    "color": "#EF4444"
                }
            })

    # 2. Road Segments with Inferred ML Risk
    if layer in ["all", "segments"]:
        cursor.execute("SELECT * FROM road_segments LIMIT 120")
        segments = cursor.fetchall()
        for s in segments:
            # Evaluate calibrated ML risk on the fly
            eval_res = inference_engine.evaluate_segment(dict(s), is_night=1, precipitation=0)
            prob = eval_res["calibrated_risk_probability"]
            tier = eval_res["risk_tier"]
            
            color = "#10B981" if tier == "LOW" else ("#F59E0B" if tier == "MODERATE" else "#EF4444")

            features.append({
                "type": "Feature",
                "id": f"segment_{s['id']}",
                "geometry": {
                    "type": "LineString",
                    "coordinates": [
                        [s["start_lon"], s["start_lat"]],
                        [s["end_lon"], s["end_lat"]]
                    ]
                },
                "properties": {
                    "layer_type": "road_segment",
                    "segment_id": s["id"],
                    "osm_way_id": s["osm_way_id"],
                    "road_name": s["road_name"],
                    "road_class": s["road_class"],
                    "speed_limit_kmh": s["speed_limit_kmh"],
                    "lane_count": s["lane_count"],
                    "is_blackspot_corridor": bool(s["is_blackspot_corridor"]),
                    "calibrated_risk_probability": prob,
                    "risk_tier": tier,
                    "color": color
                }
            })

    # 3. Citizen Hazard Submissions
    if layer in ["all", "hazards"]:
        query = "SELECT * FROM citizen_reports WHERE severity_rating >= ?"
        params = [min_severity]
        if status:
            query += " AND status = ?"
            params.append(status)
        else:
            query += " AND status IN ('VERIFIED', 'PENDING_REVIEW')"

        cursor.execute(query, params)
        hazards = cursor.fetchall()
        for h in hazards:
            # Color by hazard type
            color_map = {
                "POTHOLE": "#D97706",
                "STREETLIGHT": "#6366F1",
                "SIGNAL": "#DC2626",
                "WATERLOGGING": "#0284C7",
                "HAZARDOUS_MEDIAN": "#9333EA"
            }
            features.append({
                "type": "Feature",
                "id": f"hazard_{h['id']}",
                "geometry": {
                    "type": "Point",
                    "coordinates": [h["longitude"], h["latitude"]]
                },
                "properties": {
                    "layer_type": "citizen_hazard",
                    "id": h["id"],
                    "hazard_type": h["hazard_type"],
                    "description": h["description"],
                    "severity_rating": h["severity_rating"],
                    "status": h["status"],
                    "corroboration_count": h["corroboration_count"],
                    "is_synthetic": bool(h["is_synthetic"]),
                    "created_at": h["created_at"],
                    "color": color_map.get(h["hazard_type"], "#6366F1")
                }
            })

    return {
        "type": "FeatureCollection",
        "metadata": {
            "center": [12.9716, 77.5946],
            "zoom": 12,
            "total_features": len(features),
            "study_area": "Bengaluru Urban (BBMP)"
        },
        "features": features
    }
