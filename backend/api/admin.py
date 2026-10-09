from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any, Optional
import sqlite3
from datetime import datetime, timezone

from backend.database import get_db
from backend.models.schemas import ReportModerationUpdate
from backend.api.auth import require_role

router = APIRouter(prefix="/admin", tags=["Administrative Moderation"])

@router.patch("/reports/{report_id}")
def moderate_report(
    report_id: int,
    payload: ReportModerationUpdate,
    user: dict = Depends(require_role(["ADMIN", "MODERATOR"])),
    db: sqlite3.Connection = Depends(get_db)
) -> Dict[str, Any]:
    """
    Moderates a citizen hazard report (VERIFIED / REJECTED / DUPLICATE), creating an audit log.
    """
    cursor = db.cursor()
    cursor.execute("SELECT id, status FROM citizen_reports WHERE id = ?", (report_id,))
    report = cursor.fetchone()

    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Report with ID {report_id} not found."
        )

    previous_status = report["status"]
    new_status = payload.new_status.upper()
    now_iso = datetime.now(timezone.utc).isoformat()

    # Update report status
    cursor.execute("""
        UPDATE citizen_reports
        SET status = ?, updated_at = ?
        WHERE id = ?
    """, (new_status, now_iso, report_id))

    # Log audit entry
    cursor.execute("""
        INSERT INTO moderation_logs (report_id, moderator_email, previous_status, new_status, moderation_notes, logged_at)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        report_id,
        user.get("email", "admin@roadguard.ai"),
        previous_status,
        new_status,
        payload.moderation_notes,
        now_iso
    ))

    db.commit()

    return {
        "status": "success",
        "message": f"Report #{report_id} status transitioned from {previous_status} to {new_status}.",
        "report_id": report_id,
        "new_status": new_status,
        "moderator": user.get("email")
    }

@router.get("/moderation-logs")
def get_moderation_logs(
    user: dict = Depends(require_role(["ADMIN", "MODERATOR"])),
    db: sqlite3.Connection = Depends(get_db)
) -> List[Dict[str, Any]]:
    cursor = db.cursor()
    cursor.execute("""
        SELECT l.*, r.hazard_type, r.description
        FROM moderation_logs l
        JOIN citizen_reports r ON l.report_id = r.id
        ORDER BY l.id DESC LIMIT 50
    """)
    rows = cursor.fetchall()
    return [dict(r) for r in rows]
