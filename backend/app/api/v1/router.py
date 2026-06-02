from __future__ import annotations

from fastapi import APIRouter

from app.api.v1.endpoints.health import router as health_router
from app.api.v1.endpoints.policies import router as policies_router
from app.api.v1.endpoints.providers import router as providers_router
from app.api.v1.endpoints.tenants import router as tenants_router
from app.api.v1.endpoints.users import router as users_router


api_router = APIRouter()
api_router.include_router(health_router)
api_router.include_router(tenants_router)
api_router.include_router(users_router)
api_router.include_router(providers_router)
api_router.include_router(policies_router)

