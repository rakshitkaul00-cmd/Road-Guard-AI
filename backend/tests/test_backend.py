import pytest
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["model_loaded"] is True

def test_map_layers():
    response = client.get("/api/v1/map/layers?layer=all")
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "FeatureCollection"
    assert len(data["features"]) > 0

def test_citizen_report_submission_and_deduplication():
    import time
    offset = (time.time() % 1000) * 0.0001
    test_lat = round(12.9400 + offset, 5)
    test_lon = round(77.6300 + offset, 5)

    # Submit first report
    payload1 = {
        "hazard_type": "POTHOLE",
        "description": "Severe pothole cluster causing vehicle swerving near junction.",
        "severity_rating": 4,
        "latitude": test_lat,
        "longitude": test_lon
    }
    res1 = client.post("/api/v1/reports", json=payload1)
    assert res1.status_code == 201
    d1 = res1.json()
    assert d1["status"] == "success"
    assert d1["is_duplicate"] is False
    assert "report_id" in d1

    # Submit second report within 15 meters
    payload2 = {
        "hazard_type": "POTHOLE",
        "description": "Another commuter reporting the same large pothole.",
        "severity_rating": 4,
        "latitude": round(test_lat + 0.00008, 5),
        "longitude": round(test_lon + 0.00008, 5)
    }
    res2 = client.post("/api/v1/reports", json=payload2)
    assert res2.status_code == 201
    d2 = res2.json()
    assert d2["is_duplicate"] is True
    assert d2["corroborated_report_id"] == d1["report_id"]

def test_segment_risk_card():
    # Segment 1
    response = client.get("/api/v1/segments/1?is_night=1&precipitation=0")
    assert response.status_code == 200
    data = response.json()
    assert "road_name" in data
    assert "calibrated_risk_probability" in data
    assert "risk_tier" in data
    assert len(data["shap_top_factors"]) > 0

def test_route_evaluation():
    payload = {
        "origin": [12.9716, 77.5946],
        "destination": [12.9176, 77.6238]
    }
    response = client.post("/api/v1/routes/evaluate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert len(data["routes"]) == 2
    assert "recommendation_rationale" in data

def test_analytics_and_benchmarks():
    res_overview = client.get("/api/v1/analytics/overview")
    assert res_overview.status_code == 200
    d_ov = res_overview.json()
    assert d_ov["summary"]["total_blackspots"] > 0

    res_bench = client.get("/api/v1/analytics/model-performance")
    assert res_bench.status_code == 200
    d_bn = res_bench.json()
    assert "models" in d_bn["benchmarks"]

def test_admin_authentication():
    # Invalid password
    bad_res = client.post("/api/v1/auth/login", json={
        "email": "admin@roadguard.ai",
        "password": "WrongPassword"
    })
    assert bad_res.status_code == 401

    # Valid password
    good_res = client.post("/api/v1/auth/login", json={
        "email": "admin@roadguard.ai",
        "password": "Admin@RoadGuard2026"
    })
    assert good_res.status_code == 200
    d = good_res.json()
    assert d["role"] == "ADMIN"
    assert "access_token" in d

def test_live_weather_api():
    res = client.get("/api/v1/weather/live")
    assert res.status_code == 200
    d = res.json()
    assert d["city"] == "Bengaluru"
    assert "temperature_c" in d
    assert "is_precipitation_active" in d

def test_government_ogd_portal():
    res = client.get("/api/v1/analytics/government-ogd-portal")
    assert res.status_code == 200
    d = res.json()
    assert "portal_name" in d
    assert "data.gov.in" in d["portal_url"]

def test_simulate_segment_risk():
    payload = {
        "road_class": "primary",
        "speed_limit_kmh": 60,
        "lane_count": 4,
        "dist_nearest_junction_m": 120.0,
        "is_night": 1,
        "precipitation_active": 1,
        "is_peak_hour": 1,
        "is_blackspot_corridor": 1
    }
    res = client.post("/api/v1/segments/simulate", json=payload)
    assert res.status_code == 200
    d = res.json()
    assert "calibrated_risk_probability" in d
    assert "risk_tier" in d
    assert "shap_top_factors" in d
    assert d["calibrated_risk_probability"] > 0.4
