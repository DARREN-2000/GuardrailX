from __future__ import annotations

from fastapi import APIRouter, Depends

from app.core.config import Settings
from app.core.dependencies import get_health_service, get_settings
from app.schemas.health import HealthResponse
from app.services.health import HealthService

router = APIRouter(prefix="/health", tags=["health"])


@router.get("/live", response_model=HealthResponse)
async def live(settings: Settings = Depends(get_settings)) -> HealthResponse:
    return HealthResponse(status="ok", service=settings.app_name, environment=settings.environment)


@router.get("/ready", response_model=HealthResponse)
async def ready(
    settings: Settings = Depends(get_settings),
    health_service: HealthService = Depends(get_health_service),
) -> HealthResponse:
    checks = await health_service.check_database()
    return HealthResponse(status="ok", service=settings.app_name, environment=settings.environment, checks=checks)
