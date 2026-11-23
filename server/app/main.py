"""IPOBazar FastAPI application entry point.

Run locally with:
    uvicorn app.main:app --reload
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.health import router as health_router
from app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="REST API for the IPOBazar IPO tracking application.",
)

# CORS lets the Expo app (a different origin) call this API during development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Versioned API routes, e.g. GET /api/v1/health
app.include_router(health_router, prefix=settings.api_v1_prefix)


@app.get("/", tags=["Root"])
def root() -> dict:
    """Root endpoint giving basic service info."""
    return {
        "app": settings.app_name,
        "status": "running",
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health", tags=["Health"])
def root_health() -> dict:
    """Root-level liveness probe (mirrors /api/v1/health)."""
    return {"status": "ok", "service": "ipobazar-api"}
