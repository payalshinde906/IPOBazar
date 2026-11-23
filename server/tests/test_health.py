"""Tests for the health endpoints."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_health_returns_ok() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_versioned_health_returns_ok() -> None:
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["service"] == "ipobazar-api"


def test_root_endpoint() -> None:
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "running"
