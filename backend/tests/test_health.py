import os

# Disable OTEL during tests to avoid instrumentation errors when drivers are missing
os.environ.setdefault("OTEL_ENABLED", "false")

from fastapi.testclient import TestClient

from app.main import create_app
from app.core.dependencies import get_health_service


class DummyHealthService:
    async def check_database(self):
        return {"database": "ok"}


def test_health_live():
    app = create_app()
    with TestClient(app) as client:
        resp = client.get("/api/v1/health/live")
        assert resp.status_code == 200
        data = resp.json()
        assert data["status"] == "ok"


def test_health_ready_with_override():
    app = create_app()

    async def _dummy_health_service():
        return DummyHealthService()

    app.dependency_overrides[get_health_service] = _dummy_health_service

    with TestClient(app) as client:
        resp = client.get("/api/v1/health/ready")
        assert resp.status_code == 200
        data = resp.json()
        assert data["checks"]["database"] == "ok"
