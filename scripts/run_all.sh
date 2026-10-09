#!/usr/bin/env bash
# ==============================================================================
# RoadGuard AI — Master Startup Script for University Demonstration & Viva
# Runs backend API & serves production GIS web platform at http://localhost:8000
# ==============================================================================

set -e
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "======================================================================="
echo "  ROADGUARD AI — Geospatial Road Accident Decision-Support Platform   "
echo "  Study Area: Bengaluru Urban (BBMP) | University Capstone Project    "
echo "======================================================================="

# 1. Activate or create Python virtual environment
if [ ! -d ".venv" ]; then
    echo "[1/4] Virtual environment (.venv) not found. Creating and installing dependencies..."
    python3 -m venv .venv
    source .venv/bin/activate
    pip install -r requirements.txt
else
    echo "[1/4] Activating Python virtual environment..."
    source .venv/bin/activate
fi

# 2. Check Database & Seed if missing
if [ ! -f "data/processed/roadguard_bengaluru.db" ]; then
    echo "[2/4] Initializing and seeding Bengaluru database..."
    python3 scripts/ingest_bengaluru_data.py
else
    echo "[2/4] Bengaluru SQLite database verified."
fi

# 3. Check ML Model Artifact & Train if missing
if [ ! -f "backend/ml/artifacts/roadguard_calibrated_gbm.joblib" ]; then
    echo "[3/4] Training calibrated ML model & empirical benchmarks..."
    python3 scripts/train_ml_pipeline.py
else
    echo "[3/4] Calibrated ML model artifact verified."
fi

# 4. Launch FastAPI Web Application
echo "[4/4] Starting RoadGuard AI Web Server on http://localhost:8000..."
echo ""
echo "======================================================================="
echo "  Platform Live at: http://localhost:8000                              "
echo "  API Documentation: http://localhost:8000/docs                        "
echo "  Pre-seeded Viva Credentials:                                         "
echo "    - Admin:     admin@roadguard.ai     / Admin@RoadGuard2026          "
echo "    - Moderator: moderator@roadguard.ai / Moderator@RoadGuard2026      "
echo "======================================================================="
echo ""

PYTHONPATH=. uvicorn backend.main:app --host 0.0.0.0 --port 8000
