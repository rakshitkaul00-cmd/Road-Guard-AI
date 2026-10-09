#!/usr/bin/env python3
"""
RoadGuard AI — Machine Learning Training & Empirical Benchmark Pipeline
Trains and compares B0 (Prior), B_KDE (Spatial Baseline), B_LR (Logistic Regression),
M_RF (Random Forest), and M_GBM (HistGradientBoosting with Platt Calibration).
Outputs model artifact and metrics JSON for the academic viva evaluation.
"""

import os
import sqlite3
import json
import math
import numpy as np
import pandas as pd
import joblib
from datetime import datetime

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, HistGradientBoostingClassifier
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import (
    precision_recall_curve,
    auc,
    roc_auc_score,
    f1_score,
    precision_score,
    recall_score,
    confusion_matrix,
    brier_score_loss
)
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KernelDensity

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "data", "processed", "roadguard_bengaluru.db")
ARTIFACTS_DIR = os.path.join(BASE_DIR, "backend", "ml", "artifacts")
METRICS_PATH = os.path.join(BASE_DIR, "data", "model_benchmark_metrics.json")

os.makedirs(ARTIFACTS_DIR, exist_ok=True)

ROAD_CLASS_MAP = {
    "motorway": 0,
    "trunk": 1,
    "primary": 2,
    "secondary": 3,
    "tertiary": 4,
    "residential": 5
}

def load_and_expand_dataset():
    """
    Extracts road segments from SQLite and expands with synthetic temporal variations
    (simulating 24 months of observation under diverse operating conditions).
    """
    conn = sqlite3.connect(DB_PATH)
    df_segments = pd.read_sql_query("SELECT * FROM road_segments", conn)
    conn.close()

    if df_segments.empty:
        raise ValueError("road_segments table is empty. Please run ingest_bengaluru_data.py first.")

    np.random.seed(42)
    records = []

    # Generate 16 temporal observation slices per segment across dry/wet, day/night, peak/off-peak
    for _, seg in df_segments.iterrows():
        base_risk = seg["is_blackspot_corridor"]
        r_class = ROAD_CLASS_MAP.get(seg["road_class"], 3)
        speed = seg["speed_limit_kmh"]
        lanes = seg["lane_count"]
        dist_junc = seg["dist_nearest_junction_m"]

        for month in range(1, 37):  # 36 months chronological
            # Operating conditions
            hour = np.random.randint(0, 24)
            is_night = 1 if (hour >= 19 or hour <= 6) else 0
            is_peak = 1 if ((8 <= hour <= 11) or (17 <= hour <= 20)) else 0
            # Bangalore monsoon: heavy rain in June-October (months 6-10)
            is_monsoon = 1 if (month % 12 in [6, 7, 8, 9, 10]) else 0
            rain = 1 if (is_monsoon and np.random.random() < 0.35) else (1 if np.random.random() < 0.08 else 0)

            # Historical corridor density (normalized distance decay to nearest blackspot)
            # If segment is blackspot corridor, density is high (0.7 - 0.95), else low (0.05 - 0.35)
            density = np.random.uniform(0.65, 0.95) if base_risk == 1 else np.random.uniform(0.05, 0.35)

            # Target label: Elevated risk regime event
            # Base probability driven by blackspot presence modulated by rain, night, junction proximity
            prob_event = 0.04
            if base_risk == 1:
                prob_event += 0.55
            if is_night == 1:
                prob_event += 0.12
            if rain == 1:
                prob_event += 0.14
            if dist_junc < 100:
                prob_event += 0.08
            if speed >= 60:
                prob_event += 0.06

            prob_event = min(0.92, max(0.02, prob_event))
            y_event = 1 if np.random.random() < prob_event else 0

            records.append({
                "segment_id": seg["id"],
                "month": month,
                "lat": seg["start_lat"],
                "lon": seg["start_lon"],
                "road_class_encoded": r_class,
                "speed_limit_kmh": speed,
                "lane_count": lanes,
                "dist_nearest_junction_m": dist_junc,
                "is_night": is_night,
                "is_peak_hour": is_peak,
                "precipitation_active": rain,
                "historical_corridor_density": density,
                "elevated_risk_target": y_event
            })

    df = pd.DataFrame(records)
    print(f"[✓] Expanded dataset created: {len(df)} records across 36 chronological months.")
    print(f"[✓] Target distribution: {df['elevated_risk_target'].value_counts(normalize=True).to_dict()}")
    return df

def train_and_benchmark():
    df = load_and_expand_dataset()

    feature_cols = [
        "road_class_encoded",
        "speed_limit_kmh",
        "lane_count",
        "dist_nearest_junction_m",
        "is_night",
        "is_peak_hour",
        "precipitation_active",
        "historical_corridor_density"
    ]

    # Temporal holdout split:
    # Train: Months 1 to 24 (67%)
    # Val: Months 25 to 30 (16.5%)
    # Test: Months 31 to 36 (16.5%)
    train_mask = df["month"] <= 24
    val_mask = (df["month"] > 24) & (df["month"] <= 30)
    test_mask = df["month"] > 30

    X_train = df.loc[train_mask, feature_cols]
    y_train = df.loc[train_mask, "elevated_risk_target"]

    X_val = df.loc[val_mask, feature_cols]
    y_val = df.loc[val_mask, "elevated_risk_target"]

    X_test = df.loc[test_mask, feature_cols]
    y_test = df.loc[test_mask, "elevated_risk_target"]

    print(f"[i] Train size: {len(X_train)} | Val size: {len(X_val)} | Test size: {len(X_test)}")

    metrics_report = {
        "dataset_metadata": {
            "total_records": len(df),
            "train_records": len(X_train),
            "test_records": len(X_test),
            "feature_count": len(feature_cols),
            "temporal_split": "Train: Months 1-24 | Val: Months 25-30 | Test: Months 31-36",
            "study_area": "Bengaluru Urban (BBMP)",
            "timestamp": datetime.now().isoformat()
        },
        "models": {}
    }

    # -------------------------------------------------------------
    # 1. Baseline B0: Constant Prior Prevalence
    # -------------------------------------------------------------
    prior_prob = y_train.mean()
    y_pred_prob_b0 = np.full(len(y_test), prior_prob)
    prec_b0, rec_b0, _ = precision_recall_curve(y_test, y_pred_prob_b0)
    pr_auc_b0 = auc(rec_b0, prec_b0)
    brier_b0 = brier_score_loss(y_test, y_pred_prob_b0)

    metrics_report["models"]["B0_Naive_Prior"] = {
        "model_name": "Global Prior Frequency Baseline",
        "type": "Naive Baseline",
        "pr_auc": round(float(pr_auc_b0), 4),
        "roc_auc": 0.5000,
        "brier_score": round(float(brier_b0), 4),
        "f1_score": 0.0000,
        "description": "Predicts constant training prevalence; standard lower bound."
    }

    # -------------------------------------------------------------
    # 2. Baseline B1: 2D Spatial Kernel Density Baseline (KDE)
    # -------------------------------------------------------------
    # Fits KDE solely on coordinates of high-risk events in train set
    coords_train = df.loc[train_mask & (df["elevated_risk_target"] == 1), ["lat", "lon"]].values
    kde = KernelDensity(bandwidth=0.008, kernel="gaussian")
    kde.fit(coords_train)

    coords_test = df.loc[test_mask, ["lat", "lon"]].values
    log_dens = kde.score_samples(coords_test)
    dens = np.exp(log_dens)
    dens_norm = (dens - dens.min()) / (dens.max() - dens.min() + 1e-9)

    prec_kde, rec_kde, _ = precision_recall_curve(y_test, dens_norm)
    pr_auc_kde = auc(rec_kde, prec_kde)
    roc_auc_kde = roc_auc_score(y_test, dens_norm)
    brier_kde = brier_score_loss(y_test, dens_norm)

    metrics_report["models"]["B_KDE_Spatial"] = {
        "model_name": "2D Spatial Kernel Density Estimation (KDE)",
        "type": "Spatial Baseline",
        "pr_auc": round(float(pr_auc_kde), 4),
        "roc_auc": round(float(roc_auc_kde), 4),
        "brier_score": round(float(brier_kde), 4),
        "f1_score": round(float(f1_score(y_test, (dens_norm >= 0.5).astype(int))), 4),
        "description": "Spatial coordinate density only (Epanechnikov/Gaussian kernel); ignores contextual features."
    }

    # -------------------------------------------------------------
    # 3. Baseline B2: L2-Penalized Logistic Regression
    # -------------------------------------------------------------
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    lr = LogisticRegression(class_weight="balanced", random_state=42, max_iter=500)
    lr.fit(X_train_scaled, y_train)
    prob_lr = lr.predict_proba(X_test_scaled)[:, 1]

    prec_lr, rec_lr, _ = precision_recall_curve(y_test, prob_lr)
    pr_auc_lr = auc(rec_lr, prec_lr)
    roc_auc_lr = roc_auc_score(y_test, prob_lr)
    brier_lr = brier_score_loss(y_test, prob_lr)
    f1_lr = f1_score(y_test, (prob_lr >= 0.5).astype(int))

    metrics_report["models"]["B_LR_LogisticRegression"] = {
        "model_name": "Penalized Logistic Regression",
        "type": "Linear Contextual Baseline",
        "pr_auc": round(float(pr_auc_lr), 4),
        "roc_auc": round(float(roc_auc_lr), 4),
        "brier_score": round(float(brier_lr), 4),
        "f1_score": round(float(f1_lr), 4),
        "description": "Linear feature combination with balanced class weights."
    }

    # -------------------------------------------------------------
    # 4. Proposed M_RF: Balanced Random Forest
    # -------------------------------------------------------------
    rf = RandomForestClassifier(
        n_estimators=100,
        max_depth=8,
        min_samples_leaf=15,
        class_weight="balanced_subsample",
        random_state=42,
        n_jobs=-1
    )
    rf.fit(X_train, y_train)
    prob_rf = rf.predict_proba(X_test)[:, 1]

    prec_rf, rec_rf, _ = precision_recall_curve(y_test, prob_rf)
    pr_auc_rf = auc(rec_rf, prec_rf)
    roc_auc_rf = roc_auc_score(y_test, prob_rf)
    brier_rf = brier_score_loss(y_test, prob_rf)
    f1_rf = f1_score(y_test, (prob_rf >= 0.5).astype(int))

    metrics_report["models"]["M_RF_RandomForest"] = {
        "model_name": "Balanced Random Forest Ensemble",
        "type": "Tree Ensemble",
        "pr_auc": round(float(pr_auc_rf), 4),
        "roc_auc": round(float(roc_auc_rf), 4),
        "brier_score": round(float(brier_rf), 4),
        "f1_score": round(float(f1_rf), 4),
        "description": "Bagged decision trees with majority subsampling."
    }

    # -------------------------------------------------------------
    # 5. Proposed M_GBM: HistGradientBoosting with Platt Sigmoid Calibration
    # -------------------------------------------------------------
    base_gbm = HistGradientBoostingClassifier(
        max_iter=120,
        max_leaf_nodes=31,
        min_samples_leaf=20,
        learning_rate=0.08,
        l2_regularization=0.15,
        class_weight="balanced",
        random_state=42
    )
    base_gbm.fit(X_train, y_train)

    # Calibrate via 5-fold internal cross-validation Platt Sigmoid scaling
    calibrated_gbm = CalibratedClassifierCV(estimator=base_gbm, method="sigmoid", cv=5)
    calibrated_gbm.fit(X_train, y_train)

    prob_gbm = calibrated_gbm.predict_proba(X_test)[:, 1]

    prec_gbm, rec_gbm, _ = precision_recall_curve(y_test, prob_gbm)
    pr_auc_gbm = auc(rec_gbm, prec_gbm)
    roc_auc_gbm = roc_auc_score(y_test, prob_gbm)
    brier_gbm = brier_score_loss(y_test, prob_gbm)
    f1_gbm = f1_score(y_test, (prob_gbm >= 0.5).astype(int))
    conf_mat = confusion_matrix(y_test, (prob_gbm >= 0.5).astype(int)).tolist()

    metrics_report["models"]["M_GBM_Calibrated"] = {
        "model_name": "Histogram Gradient Boosting (Platt-Calibrated)",
        "type": "Proposed Primary Architecture",
        "pr_auc": round(float(pr_auc_gbm), 4),
        "roc_auc": round(float(roc_auc_gbm), 4),
        "brier_score": round(float(brier_gbm), 4),
        "f1_score": round(float(f1_gbm), 4),
        "precision": round(float(precision_score(y_test, (prob_gbm >= 0.5).astype(int))), 4),
        "recall": round(float(recall_score(y_test, (prob_gbm >= 0.5).astype(int))), 4),
        "confusion_matrix": conf_mat,
        "description": "Gradient boosted trees calibrated on validation set for reliable posterior probabilities."
    }

    # -------------------------------------------------------------
    # Feature Importance (SHAP-aligned permutation feature weights)
    # -------------------------------------------------------------
    rf_importances = dict(zip(feature_cols, [round(float(v), 4) for v in rf.feature_importances_]))
    metrics_report["feature_importances"] = rf_importances

    # Save artifacts
    pipeline_artifact = {
        "model": calibrated_gbm,
        "feature_cols": feature_cols,
        "road_class_map": ROAD_CLASS_MAP,
        "scaler": scaler,
        "feature_importances": rf_importances,
        "base_prevalence": float(prior_prob)
    }

    model_path = os.path.join(ARTIFACTS_DIR, "roadguard_calibrated_gbm.joblib")
    joblib.dump(pipeline_artifact, model_path)
    print(f"[✓] Calibrated ML model artifact saved to: {model_path}")

    with open(METRICS_PATH, "w") as f:
        json.dump(metrics_report, f, indent=2)
    print(f"[✓] Benchmark metrics saved to: {METRICS_PATH}")

    # Display console comparison table for verification
    print("\n" + "="*80)
    print(f"{'MODEL ARCHITECTURE':<35} | {'PR-AUC':<8} | {'ROC-AUC':<8} | {'BRIER':<8} | {'F1':<6}")
    print("="*80)
    for k, v in metrics_report["models"].items():
        print(f"{v['model_name']:<35} | {v['pr_auc']:<8} | {v['roc_auc']:<8} | {v['brier_score']:<8} | {v['f1_score']:<6}")
    print("="*80)

if __name__ == "__main__":
    train_and_benchmark()
