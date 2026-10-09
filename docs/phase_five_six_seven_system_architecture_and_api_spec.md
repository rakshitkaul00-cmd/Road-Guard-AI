# ROADGUARD AI — PHASES FIVE, SIX & SEVEN: SYSTEM ARCHITECTURE, DATABASE SCHEMA & API SPECIFICATION
## UI/UX Design System, End-to-End Component Architecture, Database ER Model, and REST API Contracts

---

### 1. Executive Summary & Design System
**RoadGuard AI** is engineered as a high-performance, civic-tech and geospatial intelligence platform. It avoids garish neon colors and alarmist red banners, adopting a calm, data-dense, professional aesthetic inspired by modern municipal GIS portals and transportation command centers.

#### Design Tokens & Theme Philosophy
* **Brand Foundation:**
  * Primary Accent: Deep Slate Blue (`#1E293B` / `#0F172A`)
  * Data Visualization Accents:
    * Low Risk / Normal: Emerald Teal (`#10B981`)
    * Moderate Risk / Caution: Amber Ochre (`#F59E0B`)
    * High Risk / Chronic Blackspot: Crimson Ruby (`#EF4444`)
    * Citizen Hazard Layer: Electric Indigo (`#6366F1`)
  * Neutral Canvas: Slate Neutral (`#F8FAFC` in light mode, `#0B0F19` in dark/command-center mode)
* **Typography:** `Inter` / `system-ui` for maximum tabular legibility and GIS data density.
* **Component Standards:** Accessible contrast ratios ($\ge 4.5:1$), distinct keyboard focus rings, clear loading skeletons, and explanatory tooltips for every data metric.

---

### 2. End-to-End System Architecture

```mermaid
flowchart TD
    subgraph ClientTier ["Frontend Client Tier (React 18 + Vite + Tailwind)"]
        UI_Home["Landing Page & Project Overview"]
        UI_Map["Interactive GIS Explorer (Leaflet / MapLibre)"]
        UI_Report["Citizen Hazard Reporting Modal"]
        UI_Detail["Segment Risk Assessment Drawer (SHAP)"]
        UI_Route["Safety Route Comparison Panel"]
        UI_Admin["Admin Moderation & Inspection Queue"]
        UI_Stats["Research & Analytics Dashboard"]
    end

    subgraph APITier ["Backend API Tier (Python 3.11 + FastAPI)"]
        Router_Auth["Auth & Role Gate (JWT)"]
        Router_Map["Map & Spatial Data Endpoints"]
        Router_Reports["Citizen Reporting & Deduplication"]
        Router_Admin["Moderation & Audit Workflow"]
        Router_Inference["Real-Time ML & SHAP Inference Engine"]
        Router_Analytics["Municipal Analytics Aggregator"]
    end

    subgraph DataTier ["Data & Model Storage Tier"]
        DB[(SQLite with Spatial Indexing<br/>roadguard_bengaluru.db)]
        ModelStore["Pre-Trained Model Registry<br/>(HistGradientBoosting + SHAP Explainer)"]
        StaticAssets["GeoJSON Spatial Layers<br/>(BTP Corridors, BBMP Wards, OSM Road Links)"]
    end

    ClientTier -->|REST / JSON| APITier
    APITier --> DB
    Router_Inference --> ModelStore
    Router_Map --> StaticAssets
```

---

### 3. Database Entity-Relationship (ER) Schema

The database is built on **SQLite 3**, optimized with bounding-box spatial coordinates and indexed queries for lightning-fast sub-millisecond lookups on local environments.

```mermaid
erDiagram
    USERS ||--o{ CITIZEN_REPORTS : submits
    USERS ||--o{ MODERATION_LOGS : audits
    BLACKSPOTS ||--o{ SEGMENT_EVALUATIONS : benchmarks
    ROAD_SEGMENTS ||--o{ SEGMENT_EVALUATIONS : assessed_in
    CITIZEN_REPORTS ||--o{ MODERATION_LOGS : verified_by

    USERS {
        int id PK
        string email UK
        string password_hash
        string full_name
        string role "ADMIN | MODERATOR | CITIZEN"
        datetime created_at
    }

    BLACKSPOTS {
        int id PK
        string corridor_name
        string junction_name
        float latitude
        float longitude
        int fatal_count_3yr
        int injury_count_3yr
        string primary_hazard_cause
        float buffer_radius_m
        string official_source
    }

    ROAD_SEGMENTS {
        int id PK
        string osm_way_id
        string road_name
        string road_class "motorway | trunk | primary | secondary | tertiary | residential"
        int speed_limit_kmh
        int lane_count
        float start_lat
        float start_lon
        float end_lat
        float end_lon
        float length_meters
        float dist_nearest_junction_m
        string geometry_geojson
    }

    CITIZEN_REPORTS {
        int id PK
        string hazard_type "POTHOLE | STREETLIGHT | SIGNAL | WATERLOGGING | HAZARDOUS_MEDIAN"
        string description
        int severity_rating "1 to 5"
        float latitude
        float longitude
        string status "PENDING_REVIEW | VERIFIED | DUPLICATE | REJECTED"
        int corroboration_count
        int duplicate_parent_id FK
        boolean is_synthetic
        string reporter_ip_hash
        datetime created_at
        datetime updated_at
    }

    MODERATION_LOGS {
        int id PK
        int report_id FK
        int moderator_id FK
        string previous_status
        string new_status
        string moderation_notes
        datetime logged_at
    }

    SEGMENT_EVALUATIONS {
        int id PK
        int segment_id FK
        float base_frequency_prior
        float spatial_kde_density
        float ml_calibrated_probability
        string risk_tier "LOW | MODERATE | ELEVATED"
        string shap_top_factors_json
        float data_confidence_score
        datetime evaluated_at
    }
```

---

### 4. REST API Specification (OpenAPI Contract)

All endpoints return uniform JSON payloads with standardized HTTP status codes and error bodies:
`{"status": "success", "data": {...}, "timestamp": "ISO-8601"}`.

#### 4.1 Public & Spatial Map APIs
* `GET /api/v1/health`
  * Returns system health, database status, loaded model version, and uptime.
* `GET /api/v1/map/layers`
  * Query parameters: `layer=all|blackspots|hazards|hotspots`, `severity_min=1`
  * Returns GeoJSON `FeatureCollection` containing:
    1. Documented BTP blackspot point markers and buffer polygons.
    2. Active citizen-reported hazard clusters with corroboration counts.
    3. Spatial KDE density contour points across the BBMP grid.
* `GET /api/v1/segments/{segment_id}`
  * Returns full **Segment Risk Assessment Card** payload:
    * Road geometry and metadata.
    * Official historical blackspot proximity and casualty statistics.
    * Calibrated ML risk probability ($\hat{p} \in [0, 1]$) with qualitative tier.
    * Local SHAP waterfall feature breakdown values.
    * Active citizen hazard count and Hazard Prioritization Index (HPI).
    * Recommended municipal remediation guidance.

#### 4.2 Citizen Reporting & Moderation APIs
* `POST /api/v1/reports`
  * Public endpoint for reporting an observed road hazard.
  * Request Body:
    ```json
    {
      "hazard_type": "POTHOLE",
      "description": "Large pothole cluster near bus bay causing sudden braking.",
      "severity_rating": 4,
      "latitude": 12.9352,
      "longitude": 77.6245
    }
    ```
  * Response: Returns created report ID, status (`PENDING_REVIEW` or `DUPLICATE_MERGED`), and updated corroboration count if an existing hazard is located within $50\text{m}$.
* `GET /api/v1/reports`
  * Query parameters: `status=PENDING_REVIEW|VERIFIED|ALL`, `hazard_type`, `limit=50`, `offset=0`.
* `PATCH /api/v1/admin/reports/{report_id}`
  * Protected endpoint (`Requires Role: MODERATOR or ADMIN`).
  * Request Body: `{"new_status": "VERIFIED", "moderation_notes": "Corroborated via ward inspection log."}`
  * Updates status, writes audit entry to `MODERATION_LOGS`, and refreshes the public map cache.

#### 4.3 Analytics & Research APIs
* `GET /api/v1/analytics/overview`
  * Returns city-wide summary aggregates:
    * Total historical blackspots (64).
    * Total citizen reports (subdivided by status: Pending, Verified, Resolved, Rejected).
    * Breakdown by hazard category (Potholes, Streetlights, Signals, Waterlogging).
    * Spatial distribution across Bengaluru zones (North, South, East, West, Central).
* `GET /api/v1/analytics/model-performance`
  * Returns formal empirical benchmark metrics table:
    * Comparison of $B_0$ Prior, $B_{\text{KDE}}$ Spatial Baseline, $B_{\text{LR}}$ Logistic Regression, $M_{\text{RF}}$ Random Forest, and $M_{\text{GBM}}$ Gradient Boosting.
    * Scores: PR-AUC, ROC-AUC, Brier Calibration Score, Precision, Recall, F1.
    * Global feature importances and dataset partitioning metadata.

#### 4.4 Route Risk Assessment API
* `POST /api/v1/routes/evaluate`
  * Evaluates two candidate routes between origin and destination coordinates in Bengaluru.
  * Request Body: `{"origin": [12.9716, 77.5946], "destination": [12.9279, 77.6271]}`
  * Computes route length, historical blackspot exposure count, cumulative segment risk score, and transparently compares relative safety profiles with uncertainty disclaimers.

#### 4.5 Authentication API
* `POST /api/v1/auth/login`
  * Authenticates administrators/researchers, issuing a signed JWT bearer token.
  * Pre-seeded credentials provided for university demonstration:
    * **Admin Role:** `admin@roadguard.ai` / `Admin@RoadGuard2026`
    * **Moderator Role:** `moderator@roadguard.ai` / `Moderator@RoadGuard2026`

---

### 5. Role & Permission Access Matrix

| Platform Action / Capability | Public Anonymous Citizen | Registered Citizen | Municipal Moderator | System Administrator |
| :--- | :---: | :---: | :---: | :---: |
| Explore Map & View Layers | Yes | Yes | Yes | Yes |
| Inspect Segment Risk Cards | Yes | Yes | Yes | Yes |
| Submit New Citizen Hazard Report | Yes | Yes | Yes | Yes |
| Evaluate Safety-Informed Routes | Yes | Yes | Yes | Yes |
| View Research & Analytics | Yes | Yes | Yes | Yes |
| Review Pending Citizen Reports | No | No | Yes | Yes |
| Approve / Reject / Merge Hazards | No | No | Yes | Yes |
| Manage User Roles & Audit Logs | No | No | No | Yes |
| Trigger Model Retraining Scripts | No | No | No | Yes |

---

### 6. Concrete Project Monorepo Structure

We establish a clean, production-grade monorepo at `/Users/rakshitkoul/.gemini/antigravity/scratch/roadguard-ai`:

```
roadguard-ai/
├── README.md                           # Comprehensive Setup, Run & Viva Guide
├── data/
│   ├── raw/                            # Original raw source files (BTP blackspots, OSM bbox)
│   ├── processed/                      # Cleaned SQLite DB (roadguard_bengaluru.db)
│   └── model_benchmark_metrics.json    # Verified empirical benchmark metrics
├── backend/
│   ├── main.py                         # FastAPI application entrypoint
│   ├── config.py                       # Configuration & environment variables
│   ├── database.py                     # SQLite engine & connection session
│   ├── models/                         # SQLAlchemy database models
│   │   ├── __init__.py
│   │   └── schemas.py
│   ├── api/                            # Modular API route controllers
│   │   ├── __init__.py
│   │   ├── map.py                      # Spatial GeoJSON & layers
│   │   ├── reports.py                  # Hazard reporting & deduplication
│   │   ├── segments.py                 # Segment details & SHAP cards
│   │   ├── routes.py                   # Route risk exposure calculation
│   │   ├── analytics.py                # Dashboard metrics & model benchmarks
│   │   └── auth.py                     # JWT authentication & moderation
│   ├── ml/                             # ML inference & pipeline modules
│   │   ├── __init__.py
│   │   ├── inference.py                # Fast in-memory model predictor & SHAP
│   │   ├── kde_engine.py               # Spatial Kernel Density Estimation
│   │   └── artifacts/                  # Serialized calibrated joblib models
│   └── tests/                          # Automated backend pytest suite
├── frontend/
│   ├── index.html                      # HTML5 shell
│   ├── package.json                    # React dependencies & scripts
│   ├── vite.config.ts                  # Vite build configuration
│   ├── tailwind.config.js              # Custom RoadGuard design tokens & colors
│   └── src/
│       ├── App.tsx                     # Main layout & navigation router
│       ├── main.tsx                    # React DOM entrypoint
│       ├── components/
│       │   ├── Navbar.tsx              # Top navigation & role switcher
│       │   ├── MapExplorer.tsx         # Leaflet GIS interactive map & layers
│       │   ├── ReportModal.tsx         # Citizen hazard reporting form
│       │   ├── SegmentDetailDrawer.tsx # SHAP waterfall & risk assessment card
│       │   ├── RouteComparison.tsx     # Route safety exposure evaluator
│       │   ├── AdminQueue.tsx          # Municipal moderation workflow
│       │   ├── AnalyticsView.tsx       # Empirical benchmarks & charts
│       │   ├── EmergencyDrawer.tsx     # Official emergency contacts & disclaimer
│       │   └── LandingSection.tsx      # Public introduction & methodology
│       └── services/
│           └── api.ts                  # Axios/Fetch API client
└── scripts/
    ├── ingest_bengaluru_data.py        # Seed BTP blackspots, OSM road links & synthetic reports
    ├── train_ml_pipeline.py            # Train B0, KDE, LR, RF, GBM & compute PR-AUC/SHAP
    └── run_all.sh                      # One-click startup script for viva demonstration
```

---

### 7. Sign-Off & Verification
With the complete design system, ER schema, OpenAPI endpoints, and monorepo structure approved, we proceed directly to **Phase Eight: Prototype Implementation**.
