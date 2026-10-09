@echo off
REM ==============================================================================
REM RoadGuard AI — Windows One-Click Launch Script
REM ==============================================================================
echo =======================================================================
echo   ROADGUARD AI -- Smart Road Accident Decision-Support Platform
echo   Launching Web Platform on http://localhost:8000
echo =======================================================================

cd /d "%~dp0\.."

python -m pip install -r requirements.txt

if not exist "data\processed\roadguard_bengaluru.db" (
    echo Seeding Bengaluru database...
    python scripts\ingest_bengaluru_data.py
)

if not exist "backend\ml\artifacts\roadguard_calibrated_gbm.joblib" (
    echo Training ML model benchmarks...
    python scripts\train_ml_pipeline.py
)

echo.
echo Starting Web Server on http://localhost:8000 ...
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
pause
