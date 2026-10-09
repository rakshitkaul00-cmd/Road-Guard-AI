from fastapi import APIRouter, Depends, HTTPException, Query, status
from typing import List, Dict, Any, Optional
import sqlite3
import math
from datetime import datetime, timedelta, timezone

from backend.database import get_db
from backend.models.schemas import CitizenReportCreate, CitizenReportResponse

router = APIRouter(prefix="/reports", tags=["Citizen Hazard Reporting"])

def haversine_m(lat1, lon1, lat2, lon2):
    R = 6371000.0
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    return 2 * R * math.atan2(math.sqrt(a), math.sqrt(1 - a))

@router.post("", status_code=status.HTTP_201_CREATED)
def submit_citizen_report(
    report: CitizenReportCreate,
    db: sqlite3.Connection = Depends(get_db)
) -> Dict[str, Any]:
    """
    Submits a road hazard observation with automated spatial deduplication (<= 50m, <= 72h).
    """
    cursor = db.cursor()
    now_iso = datetime.now(timezone.utc).isoformat()
    three_days_ago = (datetime.now(timezone.utc) - timedelta(hours=72)).isoformat()

    # Query recent reports with same hazard type in candidate coordinate window (+- 0.001 deg ~ 110m)
    cursor.execute("""
        SELECT id, latitude, longitude, corroboration_count, status
        FROM citizen_reports
        WHERE hazard_type = ? 
          AND created_at >= ?
          AND latitude BETWEEN ? AND ?
          AND longitude BETWEEN ? AND ?
    """, (
        report.hazard_type,
        three_days_ago,
        report.latitude - 0.001, report.latitude + 0.001,
        report.longitude - 0.001, report.longitude + 0.001
    ))
    candidates = cursor.fetchall()

    duplicate_parent_id = None
    for cand in candidates:
        dist = haversine_m(report.latitude, report.longitude, cand["latitude"], cand["longitude"])
        if dist <= 50.0:  # Within 50-meter deduplication threshold
            duplicate_parent_id = cand["id"]
            new_corr = cand["corroboration_count"] + 1
            cursor.execute("""
                UPDATE citizen_reports
                SET corroboration_count = ?, updated_at = ?
                WHERE id = ?
            """, (new_corr, now_iso, duplicate_parent_id))
            break

    if duplicate_parent_id is not None:
        # Record duplicate entry referencing parent
        cursor.execute("""
            INSERT INTO citizen_reports (
                hazard_type, description, severity_rating, latitude, longitude,
                status, corroboration_count, duplicate_parent_id, is_synthetic,
                reporter_ip_hash, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, 'DUPLICATE', 1, ?, 0, 'verified_client_submission', ?, ?)
        """, (
            report.hazard_type,
            report.description,
            report.severity_rating,
            report.latitude,
            report.longitude,
            duplicate_parent_id,
            now_iso,
            now_iso
        ))
        db.commit()
        return {
            "status": "success",
            "message": "Hazard observation recorded! Corroborated existing nearby report (within 50m).",
            "is_duplicate": True,
            "corroborated_report_id": duplicate_parent_id
        }

    # Otherwise, create fresh report awaiting review
    cursor.execute("""
        INSERT INTO citizen_reports (
            hazard_type, description, severity_rating, latitude, longitude,
            status, corroboration_count, duplicate_parent_id, is_synthetic,
            reporter_ip_hash, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, 'PENDING_REVIEW', 1, NULL, 0, 'verified_client_submission', ?, ?)
    """, (
        report.hazard_type,
        report.description,
        report.severity_rating,
        report.latitude,
        report.longitude,
        now_iso,
        now_iso
    ))
    db.commit()
    new_id = cursor.lastrowid

    return {
        "status": "success",
        "message": "Hazard report successfully submitted and queued for municipal safety audit.",
        "is_duplicate": False,
        "report_id": new_id
    }

@router.get("", response_model=List[CitizenReportResponse])
def get_citizen_reports(
    status: Optional[str] = Query(None, description="PENDING_REVIEW | VERIFIED | DUPLICATE | REJECTED"),
    hazard_type: Optional[str] = Query(None),
    limit: int = Query(50, le=200),
    offset: int = Query(0, ge=0),
    db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.cursor()
    query = "SELECT * FROM citizen_reports WHERE 1=1"
    params = []

    if status and status.upper() != "ALL":
        query += " AND status = ?"
        params.append(status.upper())
    if hazard_type:
        query += " AND hazard_type = ?"
        params.append(hazard_type.upper())

    query += " ORDER BY id DESC LIMIT ? OFFSET ?"
    params.extend([limit, offset])

    cursor.execute(query, params)
    rows = cursor.fetchall()

    return [
        CitizenReportResponse(
            id=r["id"],
            hazard_type=r["hazard_type"],
            description=r["description"],
            severity_rating=r["severity_rating"],
            latitude=r["latitude"],
            longitude=r["longitude"],
            status=r["status"],
            corroboration_count=r["corroboration_count"],
            is_synthetic=bool(r["is_synthetic"]),
            created_at=r["created_at"],
            updated_at=r["updated_at"]
        ) for r in rows
    ]
