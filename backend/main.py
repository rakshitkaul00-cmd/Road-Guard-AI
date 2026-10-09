from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
import os

from backend.api.auth import router as auth_router
from backend.api.map import router as map_router
from backend.api.reports import router as reports_router
from backend.api.admin import router as admin_router
from backend.api.segments import router as segments_router
from backend.api.routes import router as routes_router
from backend.api.analytics import router as analytics_router
from backend.api.weather import router as weather_router
from backend.ml.inference import inference_engine

app = FastAPI(
    title="RoadGuard AI — REST API",
    description="Geospatial Road Accident Prevention & Decision-Support Platform for Bengaluru (BBMP)",
    version="1.0.0"
)

# Enable CORS for local Vite development & demonstration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api/v1 prefix
app.include_router(auth_router, prefix="/api/v1")
app.include_router(map_router, prefix="/api/v1")
app.include_router(reports_router, prefix="/api/v1")
app.include_router(admin_router, prefix="/api/v1")
app.include_router(segments_router, prefix="/api/v1")
app.include_router(routes_router, prefix="/api/v1")
app.include_router(analytics_router, prefix="/api/v1")
app.include_router(weather_router, prefix="/api/v1")

@app.get("/api/v1/health")
def health_check():
    return {
        "status": "healthy",
        "service": "RoadGuard AI Backend",
        "study_area": "Bengaluru Urban (BBMP)",
        "model_loaded": inference_engine.model is not None,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# Serve production React build if dist exists
from fastapi.staticfiles import StaticFiles
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend", "dist")
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
