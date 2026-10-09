# RoadGuard AI: Smart Road Accident Prevention & Decision-Support Platform
### Final-Year Engineering Capstone & Applied Geospatial Research
**Study Region:** Bengaluru Urban Metropolitan Area (BBMP limits)  
**Authors:** Multidisciplinary Engineering & Research Team

---

## 1. Executive Summary & Core Mission
**RoadGuard AI** is an academic research prototype and geospatial decision-support platform designed to address urban road safety challenges across Bengaluru. By synthesizing **OpenStreetMap (OSM)** road infrastructure geometry, **Bengaluru Traffic Police (BTP)** and **MoRTH** documented accident blackspots, and crowdsourced citizen hazard observations, the system provides transparent, explainable spatial intelligence for commuters, researchers, and municipal traffic engineers.

Crucially, RoadGuard AI decouples **empirical historical evidence** (where crashes have recorded high casualties in the past) from **probabilistic contextual modeling** (estimating relative segment risk based on road class, speed limits, junction proximity, lighting, and weather conditions). The system explicitly rejects unexplained "AI black boxes" in favor of **SHAP (SHapley Additive exPlanations)** and defensible baseline comparisons.

---

## 2. Key Capabilities & System Features

1. **Interactive GIS Safety Map:**
   * Dynamic layers: Official BTP Blackspots (with 500m evaluation buffers), OpenStreetMap Road Segments (color-coded by calibrated risk tier), and Corroborated Citizen Hazards.
   * Real-time operating context simulator: Toggle between Daytime vs. Nighttime (19:00–06:00) and Dry Surface vs. Active Monsoon Rain to witness live risk surface modulation.
   * Corridor quick-filters for major transit spines: NH-44 (Airport Road), Outer Ring Road (ORR), Hosur Road (Silk Board), Tumakuru Road (Peenya), Old Madras Road (Tin Factory), and Mysuru Road (Kengeri).

2. **Calibrated Machine Learning & SHAP Attribution:**
   * Primary Model: Histogram Gradient Boosting Classifier with **Platt Sigmoid Calibration** (`CalibratedClassifierCV`).
   * Benchmarked against three rigorous baselines:
     * $B_0$: Global Frequency Prior Baseline
     * $B_{\text{KDE}}$: 2D Spatial Kernel Density Estimation Baseline ($h=500\text{m}$)
     * $B_{\text{LR}}$: $L_2$-penalized Logistic Regression
   * Evaluated strictly on a chronological hold-out test set (Months 31–36) using **PR-AUC, ROC-AUC, Brier Probability Calibration Score, and F1-score**.
   * Local SHAP waterfall decomposition explaining the exact factors driving each road segment's risk score (e.g., $+28.5\%$ blackspot proximity, $+14.2\%$ junction convergence, $+12.0\%$ night, $-4.5\%$ dry surface).

3. **Citizen Civic Sensing & Spatial Deduplication:**
   * Public portal for reporting road hazards (Potholes, Dark Corridors, Inoperative Signals, Waterlogging, Median Cuts).
   * **Automated 50-meter Deduplication Algorithm:** Reports submitted within 50m and 72 hours of an existing issue automatically merge into corroboration votes, boosting the item's municipal inspection priority without cluttering map layers.

4. **Multi-Route Safety Exposure Evaluator:**
   * Evaluates candidate transit paths (e.g., Hebbal to Silk Board, Indiranagar to Koramangala) by computing cumulative risk exposure and blackspot corridor crossings rather than blindly minimizing travel time.

5. **Municipal Moderation Workspace:**
   * Role-based access control (Citizen, Moderator, Admin) enabling municipal safety auditors to inspect, verify, mark duplicates, or reject citizen reports with automated audit logging.

6. **Emergency Guidance Panel:**
   * Verified official Karnataka emergency hotlines (112 National Helpline, 103 Traffic Police, 108 Ambulance, 1533 BBMP Disaster Room) with explicit notices clarifying academic research scope.

---

## 3. Technology Stack & Monorepo Structure

```
roadguard-ai/
├── backend/
│   ├── api/                  # Modular FastAPI route controllers (map, reports, segments, routes, auth, admin)
│   ├── database.py           # SQLite connection manager with row factory
│   ├── config.py             # App configuration & Bengaluru bounding box
│   ├── main.py               # Application entrypoint & static asset server
│   ├── ml/
│   │   ├── inference.py      # Sub-5ms in-memory ML predictor & SHAP generator
│   │   └── artifacts/        # Serialized calibrated joblib models
│   ├── models/schemas.py     # Pydantic v2 data contracts
│   └── tests/test_backend.py # Automated pytest test suite (100% passing)
├── frontend/
│   ├── src/
│   │   ├── components/       # React components (MapExplorer, SegmentDetailDrawer, etc.)
│   │   ├── services/api.ts   # REST client
│   │   ├── App.tsx           # Main app layout
│   │   └── index.css         # Dark command-center theme
│   ├── package.json          # Vite + React 18 + Tailwind CSS + Leaflet
│   └── dist/                 # Production pre-built web bundle
├── data/
│   ├── processed/            # roadguard_bengaluru.db (Pre-seeded SQLite database)
│   └── model_benchmark_metrics.json # Empirical metrics JSON
└── scripts/
    ├── ingest_bengaluru_data.py # Seed official BTP blackspots & OSM segments
    ├── train_ml_pipeline.py     # Train B0, KDE, LR, RF, GBM models
    └── run_all.sh               # One-click startup script
```

---

## 4. Quickstart Guide (Running for Viva / Demonstration)

### Option A: One-Click Launcher (Recommended)
From the project root:
```bash
./scripts/run_all.sh
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.

### Option B: Step-by-Step Manual Launch
1. **Activate Python Virtual Environment:**
   ```bash
   source .venv/bin/activate
   ```
2. **Run Backend API Server (serves both API & built React frontend):**
   ```bash
   PYTHONPATH=. uvicorn backend.main:app --host 0.0.0.0 --port 8000
   ```
3. **Run Frontend in Hot-Reload Development Mode (Optional):**
   ```bash
   cd frontend && npm run dev
   ```

---

## 5. Pre-Seeded Viva Demonstration Credentials
To demonstrate administrative capabilities during your university review, switch roles in the top-right navbar or log in via API:
* **System Administrator:** `admin@roadguard.ai` / `Admin@RoadGuard2026`
* **Municipal Safety Inspector:** `moderator@roadguard.ai` / `Moderator@RoadGuard2026`

---

## 6. Running Automated Verification Tests
Execute the pytest suite:
```bash
source .venv/bin/activate
PYTHONPATH=. pytest backend/tests/test_backend.py -v
```
All 7 functional and analytical tests will execute and pass:
* `test_health_check`
* `test_map_layers`
* `test_citizen_report_submission_and_deduplication`
* `test_segment_risk_card`
* `test_route_evaluation`
* `test_analytics_and_benchmarks`
* `test_admin_authentication`

---

## 7. Academic Integrity & Ethics Statement
1. **No False Claims of Causal Prevention:** RoadGuard AI is an **evidence-based decision-support system**. It identifies historical risk correlations; it does not claim to magically eliminate crashes or predict random driver behavior.
2. **Transparent Demonstration Data:** Synthetic citizen records are immutably tagged with `is_synthetic = 1`. Official BTP blackspots are strictly maintained with official source citations.
3. **Privacy Compliance:** In accordance with India's DPDP Act 2023, no personally identifiable commuter information or vehicle license plates are collected or exposed.
