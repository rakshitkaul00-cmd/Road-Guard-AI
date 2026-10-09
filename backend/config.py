import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "data", "processed", "roadguard_bengaluru.db")
MODEL_PATH = os.path.join(BASE_DIR, "backend", "ml", "artifacts", "roadguard_calibrated_gbm.joblib")
METRICS_PATH = os.path.join(BASE_DIR, "data", "model_benchmark_metrics.json")

JWT_SECRET = os.getenv("JWT_SECRET", "roadguard-ai-academic-viva-secret-key-2026")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Bengaluru study area bounding box
BENGALURU_BBOX = {
    "min_lat": 12.8340,
    "max_lat": 13.1550,
    "min_lon": 77.4602,
    "max_lon": 77.7841,
    "center": [12.9716, 77.5946]
}
