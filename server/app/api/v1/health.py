"""Health-check endpoints.

These are intentionally lightweight so they can be used as liveness/readiness
probes and by the mobile app to verify connectivity to the API.
"""
from fastapi import APIRouter, HTTPException, status
from sqlalchemy import text

from app.db.session import SessionLocal

router = APIRouter(tags=["Health"])


@router.get("/health")
def health() -> dict:
    """Liveness check — confirms the API process is up (no database access)."""
    return {"status": "ok", "service": "ipobazar-api"}


@router.get("/health/db")
def health_db() -> dict:
    """Readiness check — confirms the API can reach PostgreSQL."""
    db = SessionLocal()
    try:
        db.execute(text("select 1"))
        return {"status": "ok", "database": "connected"}
    except Exception as exc:  # noqa: BLE001 - surface any driver error to the probe
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"database unavailable: {exc}",
        ) from exc
    finally:
        db.close()
