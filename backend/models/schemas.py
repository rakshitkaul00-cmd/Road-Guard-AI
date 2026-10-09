from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class CitizenReportCreate(BaseModel):
    hazard_type: str = Field(..., description="POTHOLE | STREETLIGHT | SIGNAL | WATERLOGGING | HAZARDOUS_MEDIAN")
    description: str = Field(..., min_length=5, max_length=1000)
    severity_rating: int = Field(..., ge=1, le=5)
    latitude: float = Field(..., ge=12.80, le=13.25)
    longitude: float = Field(..., ge=77.40, le=77.85)

class CitizenReportResponse(BaseModel):
    id: int
    hazard_type: str
    description: str
    severity_rating: int
    latitude: float
    longitude: float
    status: str
    corroboration_count: int
    is_synthetic: bool
    created_at: str
    updated_at: str

class ReportModerationUpdate(BaseModel):
    new_status: str = Field(..., description="VERIFIED | REJECTED | DUPLICATE")
    moderation_notes: Optional[str] = "Reviewed by municipal auditor."

class ShapFactor(BaseModel):
    feature: str
    impact_percentage: float
    direction: str  # 'increases_risk' | 'decreases_risk'
    description: str

class SegmentRiskCard(BaseModel):
    segment_id: int
    road_name: str
    road_class: str
    speed_limit_kmh: int
    lane_count: int
    length_meters: float
    start_coords: List[float]
    end_coords: List[float]
    is_blackspot_corridor: bool
    historical_blackspot_proximity_m: float
    official_blackspot_name: Optional[str] = None
    calibrated_risk_probability: float
    risk_tier: str  # LOW | MODERATE | ELEVATED
    shap_top_factors: List[ShapFactor]
    active_hazards_count: int
    hazard_prioritization_score: float
    data_confidence: str  # HIGH | MODERATE | LOW
    recommended_action: str

class RouteEvaluationRequest(BaseModel):
    origin: List[float]
    destination: List[float]

class CandidateRoute(BaseModel):
    route_id: str
    route_name: str
    total_distance_km: float
    estimated_time_mins: float
    blackspot_corridors_traversed: int
    mean_segment_risk_probability: float
    cumulative_risk_exposure: float
    active_hazard_count: int
    safety_tier: str
    waypoints: List[List[float]]

class RouteEvaluationResponse(BaseModel):
    origin: List[float]
    destination: List[float]
    routes: List[CandidateRoute]
    recommendation_rationale: str
    disclaimer: str

class UserLoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    email: str
    full_name: str
