from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import Dict, Any, Optional
import sqlite3
import math

from backend.database import get_db
from backend.models.schemas import SegmentRiskCard, SegmentSimulationRequest
from backend.ml.inference import inference_engine

router = APIRouter(prefix="/segments", tags=["Road Segment Risk Intelligence"])

def haversine_m(lat1, lon1, lat2, lon2):
    R = 6371000.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))

@router.get("/{segment_id}", response_model=SegmentRiskCard)
def get_segment_risk_card(
    segment_id: int,
    is_night: Optional[int] = Query(1),
    precipitation: Optional[int] = Query(0),
    is_peak: Optional[int] = Query(1),
    db: sqlite3.Connection = Depends(get_db)
):
    """
    Returns complete evidence-decomposed Segment Risk Assessment Card with local SHAP attributions.
    """
    cursor = db.cursor()
    cursor.execute("SELECT * FROM road_segments WHERE id = ?", (segment_id,))
    seg = cursor.fetchone()

    if not seg:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Road segment #{segment_id} not found."
        )

    seg_dict = dict(seg)

    # 1. Official Blackspot Corroboration
    cursor.execute("SELECT * FROM blackspots")
    blackspots = cursor.fetchall()
    
    min_bs_dist = float("inf")
    closest_bs_name = None
    for b in blackspots:
        dist = haversine_m(seg["start_lat"], seg["start_lon"], b["latitude"], b["longitude"])
        if dist < min_bs_dist:
            min_bs_dist = dist
            closest_bs_name = f"{b['corridor_name']} ({b['junction_name']})"

    # 2. Query Active Citizen Hazards along this segment (within 300m)
    cursor.execute("""
        SELECT * FROM citizen_reports
        WHERE latitude BETWEEN ? AND ?
          AND longitude BETWEEN ? AND ?
    """, (
        seg["start_lat"] - 0.003, seg["start_lat"] + 0.003,
        seg["start_lon"] - 0.003, seg["start_lon"] + 0.003
    ))
    nearby_hazards = [dict(h) for h in cursor.fetchall()]
    
    # Calculate HPI
    hpi_score = inference_engine.calculate_hazard_prioritization_index(nearby_hazards)

    # 3. Model Inference & SHAP Attribution
    eval_res = inference_engine.evaluate_segment(
        seg_dict,
        is_night=is_night,
        precipitation=precipitation,
        is_peak=is_peak
    )

    return SegmentRiskCard(
        segment_id=seg["id"],
        road_name=seg["road_name"],
        road_class=seg["road_class"],
        speed_limit_kmh=seg["speed_limit_kmh"],
        lane_count=seg["lane_count"],
        length_meters=seg["length_meters"],
        start_coords=[seg["start_lat"], seg["start_lon"]],
        end_coords=[seg["end_lat"], seg["end_lon"]],
        is_blackspot_corridor=bool(seg["is_blackspot_corridor"]),
        historical_blackspot_proximity_m=round(min_bs_dist, 1),
        official_blackspot_name=closest_bs_name if min_bs_dist <= 800 else None,
        calibrated_risk_probability=eval_res["calibrated_risk_probability"],
        risk_tier=eval_res["risk_tier"],
        shap_top_factors=eval_res["shap_top_factors"],
        active_hazards_count=len(nearby_hazards),
        hazard_prioritization_score=hpi_score,
        data_confidence=eval_res["data_confidence"],
        recommended_action=eval_res["recommended_action"]
    )

@router.post("/simulate")
def simulate_segment_risk(payload: SegmentSimulationRequest):
    """
    Real-time in-memory what-if inference sandbox for vivas and sensitivity audits.
    """
    eval_res = inference_engine.evaluate_segment(
        {
            "road_class": payload.road_class,
            "speed_limit_kmh": payload.speed_limit_kmh,
            "lane_count": payload.lane_count,
            "dist_nearest_junction_m": payload.dist_nearest_junction_m,
            "is_blackspot_corridor": payload.is_blackspot_corridor
        },
        is_night=payload.is_night,
        precipitation=payload.precipitation_active,
        is_peak=payload.is_peak_hour
    )
    return {
        "calibrated_risk_probability": eval_res["calibrated_risk_probability"],
        "risk_tier": eval_res["risk_tier"],
        "shap_top_factors": eval_res["shap_top_factors"],
        "data_confidence": eval_res["data_confidence"],
        "recommended_action": eval_res["recommended_action"]
    }
