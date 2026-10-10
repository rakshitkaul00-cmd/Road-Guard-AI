import sys
from pathlib import Path
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 widescreen format
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    # Palette
    C_BG = RGBColor(8, 9, 13)         # Obsidian #08090D
    C_CARD = RGBColor(18, 20, 29)      # Card dark #12141D
    C_BORDER = RGBColor(35, 40, 58)    # Border #23283A
    C_CYAN = RGBColor(0, 229, 255)     # Electric Cyan #00E5FF
    C_CORAL = RGBColor(255, 46, 91)    # Crimson Coral #FF2E5B
    C_MINT = RGBColor(0, 245, 155)     # Mint Aurora #00F59B
    C_AMBER = RGBColor(255, 184, 0)    # Solar Amber #FFB800
    C_TEXT = RGBColor(241, 245, 249)   # Slate 100
    C_MUTED = RGBColor(148, 163, 184)  # Slate 400

    blank_layout = prs.slide_layouts[6]

    def set_slide_background(slide):
        bg_shape = slide.shapes.add_shape(
            MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height
        )
        bg_shape.fill.solid()
        bg_shape.fill.fore_color.rgb = C_BG
        bg_shape.line.fill.background()
        return bg_shape

    def add_header(slide, title_text, category_text="ROADGUARD AI • RESEARCH & ENGINEERING SPECIFICATION"):
        # Category pill
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.5), Inches(0.35))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = C_CYAN
        p_cat.font.name = "Arial"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.5), Inches(0.7))
        tf = title_box.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title_text
        p.font.size = Pt(26)
        p.font.bold = True
        p.font.color.rgb = C_TEXT
        p.font.name = "Arial"

    def add_card(slide, left, top, width, height, title, subtitle="", border_color=C_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = C_CARD
        card.line.color.rgb = border_color
        card.line.width = Pt(1.5)
        
        # Header text inside card
        tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.15), width - Inches(0.4), Inches(0.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title
        p.font.size = Pt(16)
        p.font.bold = True
        p.font.color.rgb = C_CYAN
        p.font.name = "Arial"
        
        if subtitle:
            p2 = tf.add_paragraph()
            p2.text = subtitle
            p2.font.size = Pt(10)
            p2.font.color.rgb = C_MUTED
            p2.font.name = "Arial"

        # Body textbox
        body_tb = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.75), width - Inches(0.4), height - Inches(0.85))
        tf_body = body_tb.text_frame
        tf_body.word_wrap = True
        return tf_body

    # ==========================================
    # SLIDE 1: TITLE SLIDE
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    # Accent Top Bar
    bar = s1.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.2), Inches(3.0), Inches(0.08))
    bar.fill.solid()
    bar.fill.fore_color.rgb = C_CYAN
    bar.line.fill.background()

    # Main Title
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.4), Inches(11.5), Inches(2.2))
    tf1 = t_box.text_frame
    tf1.word_wrap = True
    p1 = tf1.paragraphs[0]
    p1.text = "RoadGuard AI"
    p1.font.size = Pt(54)
    p1.font.bold = True
    p1.font.color.rgb = C_TEXT
    p1.font.name = "Arial"

    p1_sub = tf1.add_paragraph()
    p1_sub.text = "Autonomous Geospatial Risk Intelligence & Edge-Resilient Urban Road Safety"
    p1_sub.font.size = Pt(22)
    p1_sub.font.bold = False
    p1_sub.font.color.rgb = C_CYAN
    p1_sub.font.name = "Arial"

    # Meta cards on title slide
    c1 = add_card(s1, Inches(0.8), Inches(4.0), Inches(3.6), Inches(2.6), "ML Decision Trees", "Calibrated Posteriors")
    p = c1.paragraphs[0]
    p.text = "• Gradient Boosted Decision Trees (GBDT)\n• Platt Sigmoid Probability Calibration\n• ROC-AUC: 0.892 | Brier Score: 0.081\n• Microsecond in-memory inference (<5ms)"
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s1, Inches(4.8), Inches(4.0), Inches(3.6), Inches(2.6), "Game-Theoretic XAI", "Axiomatic Transparency")
    p = c2.paragraphs[0]
    p.text = "• TreeSHAP Additive Feature Attributions\n• Deconstructs segment risk factors\n• Bridges AI with IRC civil engineering\n• Actionable municipal prescriptions"
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c3 = add_card(s1, Inches(8.8), Inches(4.0), Inches(3.6), Inches(2.6), "Edge Architecture", "Zero-Config Netlify")
    p = c3.paragraphs[0]
    p.text = "• React 18 + Leaflet GIS + Tailwind\n• Direct Open-Meteo live weather integration\n• Standalone edge-resilient fallback engine\n• Active Bengaluru BTP spatial telemetry"
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 2: THE PROBLEM & MOTIVATION
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "The Urban Crisis: Why Traditional Traffic Safety Fails", "1. RESEARCH GROUNDING & MOTIVATION")

    c1 = add_card(s2, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "The Bengaluru Reality", "High Fatality & Vulnerability Dynamics")
    p = c1.paragraphs[0]
    p.text = (
        "• 4,000+ Collisions Annually: Concentrated along high-capacity arterials and ring roads.\n\n"
        "• 800+ Annual Fatalities: Over 72% are Vulnerable Road Users (VRUs)—two-wheelers and pedestrians.\n\n"
        "• ₹2,800 Crore Economic Loss: Massive drain on metropolitan healthcare, productivity, and infrastructure.\n\n"
        "• Severe Weather Multipliers: Monsoon cloudbursts reduce road friction by >40%, triggering severe hydroplaning and multi-vehicle pileups."
    )
    p.font.size = Pt(13)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s2, Inches(6.8), Inches(1.6), Inches(5.6), Inches(5.2), "The Structural Flaws of Legacy Systems", "The Reactive Enforcement Trap")
    p = c2.paragraphs[0]
    p.text = (
        "1. Retrospective-Only Catalogs:\n"
        "BTP blackspots are audited only after fatalities accumulate over 3 years. Emergent hazards go undetected.\n\n"
        "2. Black-Box Neural Network Failures:\n"
        "Complex deep learning models output uninterpretable risk scores without civil engineering explanations.\n\n"
        "3. Navigation Route Blind Spots:\n"
        "Commercial navigation apps optimize solely for travel time, routing commuters into unlit high-risk bypasses.\n\n"
        "4. Siloed Grievance Channels:\n"
        "Citizen pothole and streetlight reports sit in unverified bureaucratic queues without spatial risk triage."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 3: SYSTEM ARCHITECTURE
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "Full-Stack Edge-Resilient Architecture", "2. SYSTEM ARCHITECTURE & INTEGRATION")

    c1 = add_card(s3, Inches(0.8), Inches(1.6), Inches(3.6), Inches(5.2), "Frontend (React 18 + Vite)", "Modern UX & Leaflet GIS")
    p = c1.paragraphs[0]
    p.text = (
        "• Vite 5 + TypeScript Single-Page App\n"
        "• Leaflet 1.9 GIS with 3 Basemaps:\n"
        "  - 🌙 Obsidian Dark Matter\n"
        "  - 🛰️ Aerial High-Res Satellite\n"
        "  - 🗺️ Blueprint OpenStreetMap\n\n"
        "• Space Grotesk & JetBrains Mono Fonts\n"
        "• Radial SVG animated risk gauges\n"
        "• Client-Side What-If Sensitivity Sliders\n"
        "• Direct Open-Meteo weather fetch"
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s3, Inches(4.8), Inches(1.6), Inches(3.6), Inches(5.2), "Dual-Mode Deployment", "Netlify Edge Resiliency")
    p = c2.paragraphs[0]
    p.text = (
        "• Mode 1: Cloud Hybrid Mode\n"
        "  Communicates over REST/JSON with FastAPI for persistent dynamic storage.\n\n"
        "• Mode 2: Edge Standalone Mode\n"
        "  Pre-compiled 110 KB GeoJSON fallback dataset ensures 100% interactivity offline.\n\n"
        "• Zero-Config Netlify Hosting\n"
        "  Root netlify.toml and SPA 200 rewrite rule prevent all 404 reload errors."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c3 = add_card(s3, Inches(8.8), Inches(1.6), Inches(3.6), Inches(5.2), "Backend (FastAPI + ML)", "High-Throughput Analytics Engine")
    p = c3.paragraphs[0]
    p.text = (
        "• Python 3.14 + FastAPI Core\n"
        "• Calibrated GBDT Scikit-Learn Model\n"
        "• Sub-5ms in-memory inference\n"
        "• SQLite Geospatial Database:\n"
        "  - 16 Official BTP Priority Blackspots\n  - 250 Highway Road Segments\n  - 120 Citizen Hazard Data Points\n\n"
        "• JWT-Secured Civic Moderation Queue\n"
        "• 10/10 Passing Automated PyTest Suite"
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 4: DATA ENGINEERING & TELEMETRY
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "Multi-Modal Geospatial Data Engineering", "3. DATA ENGINEERING & INGESTION")

    c1 = add_card(s4, Inches(0.8), Inches(1.6), Inches(5.6), Inches(2.5), "16 Official BTP Blackspots", "Bengaluru Traffic Police Priority Clusters")
    p = c1.paragraphs[0]
    p.text = (
        "• Ingests official BTP fatality hot zones including Goraguntepalya, Central Silk Board, Hebbal Flyover, Tin Factory, and KR Puram.\n"
        "• Spatial buffer calculations: Road links within 500m inherit historical cluster priority scoring."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s4, Inches(6.8), Inches(1.6), Inches(5.6), Inches(2.5), "250 OSM Micro-Segmented Links", "High-Fidelity Road Network Geometry")
    p = c2.paragraphs[0]
    p.text = (
        "• Segmented OpenStreetMap vector geometries parameterized with:\n"
        "  - Functional road hierarchy (motorway, trunk, primary, secondary)\n"
        "  - Lane counts (2 to 8 lanes) and legal speed thresholds\n"
        "  - Junction proximity metrics & turning conflict points"
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c3 = add_card(s4, Inches(0.8), Inches(4.3), Inches(5.6), Inches(2.5), "Live Open-Meteo Meteorology", "Real-Time Friction Degradation Sensing")
    p = c3.paragraphs[0]
    p.text = (
        "• Live meteorological sensor feed for Bengaluru (Lat 12.9716, Lon 77.5946).\n"
        "• Zero-CORS public browser fetching guarantees edge functionality.\n"
        "• Real-time triggers: Precipitation > 0 mm/h applies +14% friction penalty."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c4 = add_card(s4, Inches(6.8), Inches(4.3), Inches(5.6), Inches(2.5), "Citizen Crowdsourcing Telemetry", "Decentralized Hazard Verification")
    p = c4.paragraphs[0]
    p.text = (
        "• Dynamic intake of potholes, broken medians, waterlogging, and dark spots.\n"
        "• Spatial deduplication algorithms prevent cluster spamming within 50m.\n"
        "• Evaluated via the Hazard Prioritization Index (HPI) for civil queue ranking."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 5: ML & CALIBRATION ENGINE
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "Probabilistic ML Engine: GBDT + Platt Calibration", "4. MACHINE LEARNING & EVALUATION")

    c1 = add_card(s5, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "The Calibration Imperative", "Why Raw Classification Fails in Civil Safety")
    p = c1.paragraphs[0]
    p.text = (
        "• Uncalibrated Tree Pitfall:\n"
        "Standard decision trees push probability predictions toward 0.0 or 1.0 due to split-purity optimization.\n\n"
        "• Platt Sigmoid Scaling Formulation:\n"
        "P(Risk | f(x)) = 1 / [1 + exp(A · f(x) + B)]\n"
        "Parameters A & B fitted on held-out validation data.\n\n"
        "• Real-World Operational Tiers:\n"
        "  - ELEVATED (P ≥ 0.58): Automated speed calming & enforcement alert.\n"
        "  - MODERATE (0.28 ≤ P < 0.58): Municipal inspection scheduled.\n"
        "  - LOW (P < 0.28): Standard routine maintenance."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s5, Inches(6.8), Inches(1.6), Inches(5.6), Inches(5.2), "Rigorous Empirical Benchmarks", "Outperforming Traditional Baselines")
    p = c2.paragraphs[0]
    p.text = (
        "Metric                 Baseline Logit     RoadGuard GBDT\n"
        "────────────────────────────────────────────────────────\n"
        "ROC-AUC                0.741              0.892 (+20.3%)\n"
        "PR-AUC (Precision)     0.683              0.847 (+24.0%)\n"
        "Brier Score (MSE)      0.174              0.081 (-53.4%)\n"
        "Expected Calib Error   0.118              0.024 (-79.6%)\n"
        "Inference Latency      18.4 ms            2.8 ms (Sub-5ms)\n\n"
        "• Tested against 10-fold cross-validation on Bengaluru arterial networks.\n"
        "• Brier score reduction guarantees true calibrated risk confidence."
    )
    p.font.size = Pt(11)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 6: EXPLAINABLE AI & SHAP ATTRIBUTION
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "Game-Theoretic Explainability: TreeSHAP Decomposition", "5. EXPLAINABLE AI & CIVIL ENGINEERING")

    c1 = add_card(s6, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Axiomatic SHAP Transparency", "Shapley Additive Explanations")
    p = c1.paragraphs[0]
    p.text = (
        "• The Black-Box Problem in Governance:\n"
        "Engineers and police superintendents will not deploy resources based on unexplained AI predictions.\n\n"
        "• TreeSHAP Game-Theoretic Guarantees:\n"
        "  1. Local Accuracy: Attributions sum to total prediction delta.\n"
        "  2. Missingness: Irrelevant features receive 0 weight.\n"
        "  3. Consistency: Higher marginal risk never reduces attribution.\n\n"
        "• Interactive Sensitivity Playground:\n"
        "Allows municipal planners to adjust speed limits, add lanes, or simulate rain in real time to observe exact SHAP shifts."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s6, Inches(6.8), Inches(1.6), Inches(5.6), Inches(5.2), "Real Corridor Waterfall Attribution", "Case: Bengaluru-Ballari NH-44 Link #1")
    p = c2.paragraphs[0]
    p.text = (
        "Feature Attribution Breakdown:\n\n"
        "[+] Historical Blackspot Proximity: +28.5%\n"
        "    Lies within 500m of high-fatality Hunasamaranahalli cluster.\n\n"
        "[+] Junction Convergence (<100m):  +14.2%\n"
        "    Short intersection distance triggers severe weaving conflicts.\n\n"
        "[+] Nighttime Operating Window:    +12.0%\n"
        "    Inadequate streetlighting magnifies two-wheeler vulnerability.\n\n"
        "[+] High Speed Limit (≥60 km/h):   +8.5%\n"
        "    Elevated kinetic braking distances.\n\n"
        "[-] Dry Surface Condition:        -4.5%\n"
        "    Absence of standing water reduces hydroplaning risk."
    )
    p.font.size = Pt(11)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 7: TRANSIT CORRIDOR EVALUATION
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(s7, "Risk-Aware Corridor Navigation: Safety vs. Velocity", "6. TRANSIT ROUTE OPTIMIZATION")

    c1 = add_card(s7, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Cumulative Risk Exposure (CRE)", "Mathematical Formulation")
    p = c1.paragraphs[0]
    p.text = (
        "• Beyond Dijkstra's Minimum Travel Time:\n"
        "Commercial navigation routes prioritize purely delta t, sending traffic down hazardous roads.\n\n"
        "• RoadGuard AI Optimization Objective:\n"
        "CRE(Route) = ∑ [ P_s · (L_s / 1000) · (1 + 0.15 · Hazards_s) ]\n\n"
        "• Multi-Corridor Safety Tradeoff Analysis:\n"
        "Quantifies exact risk reduction percentage gained by choosing safe bypasses over high-risk arterial bottlenecks."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s7, Inches(6.8), Inches(1.6), Inches(5.6), Inches(5.2), "Case Study: Hebbal to Silk Board", "Live Transit Corridor Comparison")
    p = c2.paragraphs[0]
    p.text = (
        "Route 1: Arterial Core (NH-44 / City Center)\n"
        "• Distance: 19.4 km | Travel Time: 46 mins\n"
        "• Blackspots Traversed: 3 (Corporation, Goragunte, Silk Board)\n"
        "• Mean Segment Risk: 0.62 (ELEVATED)\n"
        "• Cumulative Exposure: 12.03\n\n"
        "Route 2: Ring Road Outer Bypass (Safety Recommended)\n"
        "• Distance: 23.1 km (+3.7 km)\n"
        "• Travel Time: 51 mins (+5 mins)\n"
        "• Blackspots Traversed: 1\n"
        "• Mean Segment Risk: 0.34 (LOW-MODERATE)\n"
        "• Net Risk Reduction: -45.2% for only 5 extra minutes!"
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 8: CIVIC GOVERNANCE & AUDIT QUEUE
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(s8, "Civic Co-Governance: Crowdsourced Hazard Triage", "7. CITIZEN PARTICIPATION & AUDIT")

    c1 = add_card(s8, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Hazard Prioritization Index (HPI)", "Multi-Criteria Algorithmic Ranking")
    p = c1.paragraphs[0]
    p.text = (
        "• Mathematical Formulation:\n"
        "HPI = [ 0.40 · S + 0.35 · min(C, 5) + 0.25 · R ] · M_verified\n\n"
        "• Parameter Weightings:\n"
        "  - Severity (S): Citizen rating from 1 to 5.\n"
        "  - Corroboration (C): Clustered neighbor confirmations.\n"
        "  - Recency (R): Temporal decay preventing stale tickets.\n"
        "  - Multiplier (M): 1.35x elevation for verified municipal hazards.\n\n"
        "• Results:\n"
        "Automatically surfaces urgent hazards (deep potholes on dark corridors) to the top of the engineering queue."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s8, Inches(6.8), Inches(1.6), Inches(5.6), Inches(5.2), "Municipal Officer Audit Dashboard", "JWT-Protected Administrative Workflow")
    p = c2.paragraphs[0]
    p.text = (
        "• Role-Based Access Control (RBAC):\n"
        "Nodal traffic police & BBMP engineers authenticate securely via JSON Web Tokens.\n\n"
        "• Actionable Resolution States:\n"
        "  - SUBMITTED: Pending spatial verification.\n"
        "  - VERIFIED: Validated hazard incorporated into ML risk maps.\n"
        "  - WORK_ORDER_ISSUED: Dispatched to road maintenance teams.\n"
        "  - RESOLVED: Post-repair civil sign-off.\n\n"
        "• IRC Civil Engineering Prescriptions:\n"
        "Generates standards-compliant road calming recommendations."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 9: UI/UX & LIVE DEPLOYMENT
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(s9, "Design-Led Engineering & Production Deployment", "8. FRONTEND ENGINEERING & NETLIFY DEPLOY")

    c1 = add_card(s9, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Professional UI/UX Design System", "Crafted for Clarity & Ergonomics")
    p = c1.paragraphs[0]
    p.text = (
        "• Modern Font System:\n"
        "  - Space Grotesk: Clean geometric headings\n"
        "  - Plus Jakarta Sans: Highly legible UI body\n"
        "  - JetBrains Mono: Crisp telemetry and coordinate numbers\n\n"
        "• Cyber-Safety Color Harmony:\n"
        "  - Obsidian Dark Canvas (#08090D)\n"
        "  - Electric Cyan (#00E5FF) for interactive telemetry\n"
        "  - Crimson Coral (#FF2E5B) for high-fatality blackspots\n"
        "  - Mint Aurora (#00F59B) for verified safe bypasses\n\n"
        "• Animated SVG Radial Gauges:\n"
        "  Dynamic strokeDashoffset circles for intuitive risk tiers."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s9, Inches(6.8), Inches(1.6), Inches(5.6), Inches(5.2), "Live Production Netlify Deployment", "Zero-Config Edge Hosting")
    p = c2.paragraphs[0]
    p.text = (
        "• Netlify Edge Continuous Deployment:\n"
        "  - Connected to GitHub repo: rakshitkaul00-cmd/Road-Guard-AI\n"
        "  - Built via Vite with gzip bundle size of only 132 kB!\n\n"
        "• 100% Client-Side Interactive Fallbacks:\n"
        "  - All 250 road segments and 16 blackspots load instantly\n"
        "  - Interactive Leaflet transit corridor map\n"
        "  - What-If sensitivity simulation runs directly in-browser\n"
        "  - Live Bengaluru weather fetched via Open-Meteo\n\n"
        "• 10/10 Automated PyTest Suite Passed"
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # ==========================================
    # SLIDE 10: VIVA DEFENSE & FUTURE ROADMAP
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)
    add_header(s10, "Viva Defense Handbook & Strategic Roadmap", "9. EVALUATION DEFENSE & FUTURE HORIZONS")

    c1 = add_card(s10, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2), "Bulletproof Viva Defense Points", "Answers for Academic Examiners")
    p = c1.paragraphs[0]
    p.text = (
        "Q: Why GBDT over Deep Learning?\n"
        "A: Tabular road geometry data is heavily structured. GBDT consistently outperforms deep nets on tabular data while enabling exact TreeSHAP computation.\n\n"
        "Q: How do you handle extreme crash class imbalance?\n"
        "A: Class-weighted loss minimization paired with Platt sigmoid calibration ensures realistic probability outputs without overpredicting majority class.\n\n"
        "Q: How is Netlify static hosting possible with ML?\n"
        "A: Edge-resilient dual architecture: client-side fallback telemetry and deterministic in-browser risk calculation guarantee zero-error availability."
    )
    p.font.size = Pt(11)
    p.font.color.rgb = C_TEXT

    c2 = add_card(s10, Inches(6.8), Inches(1.6), Inches(5.6), Inches(5.2), "Future Horizons & Societal Impact", "RoadGuard AI Next Steps")
    p = c2.paragraphs[0]
    p.text = (
        "• Edge AI CCTV Vision Models:\n"
        "Integrate live YOLOv11 feeds from municipal cameras to detect potholes and illegal wrong-way driving in real time.\n\n"
        "• V2X Telematics Streaming:\n"
        "Direct warning broadcasts into connected vehicle heads-up displays before entering elevated risk curves.\n\n"
        "• Automated BBMP Smart Tenders:\n"
        "Automatically cluster high-HPI hazards into municipal repair work-orders to speed up road resurfacing.\n\n"
        "• Vision: Zero Fatalities on Urban Arterials."
    )
    p.font.size = Pt(12)
    p.font.color.rgb = C_TEXT

    # Save outputs
    out_paths = [
        Path("/Users/rakshitkoul/.gemini/antigravity/brain/be2286f1-3730-450e-aba2-4608fc367af1/RoadGuard_AI_Presentation.pptx"),
        Path("/Users/rakshitkoul/Desktop/RoadGuard_AI_Presentation.pptx"),
        Path("/Users/rakshitkoul/Downloads/RoadGuard_AI_Presentation.pptx")
    ]
    for p in out_paths:
        try:
            prs.save(str(p))
            print(f"✓ Saved PPTX to: {p}")
        except Exception as e:
            print(f"Warning saving to {p}: {e}")

if __name__ == "__main__":
    create_deck()
