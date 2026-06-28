from __future__ import annotations

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import Settings, get_settings
from app.db.session import get_db_session
from app.repositories.policies import PolicyRepository
from app.repositories.providers import ProviderRepository
from app.repositories.tenants import TenantRepository
from app.repositories.users import UserRepository
from app.services.health import HealthService
from app.services.policies import PolicyService
from app.services.providers import ProviderService
from app.services.tenants import TenantService
from app.services.users import UserService


def get_db_session_dependency() -> AsyncSession:
    raise RuntimeError("Use get_db_session as an async dependency")


def get_settings_dependency() -> Settings:
    return get_settings()


async def get_tenant_repository(session: AsyncSession = Depends(get_db_session)) -> TenantRepository:
    return TenantRepository(session)


async def get_provider_repository(session: AsyncSession = Depends(get_db_session)) -> ProviderRepository:
    return ProviderRepository(session)


async def get_user_repository(session: AsyncSession = Depends(get_db_session)) -> UserRepository:
    return UserRepository(session)


async def get_policy_repository(session: AsyncSession = Depends(get_db_session)) -> PolicyRepository:
    return PolicyRepository(session)


async def get_health_service(session: AsyncSession = Depends(get_db_session)) -> HealthService:
    return HealthService(session)


async def get_tenant_service(session: AsyncSession = Depends(get_db_session)) -> TenantService:
    return TenantService(TenantRepository(session))


async def get_provider_service(session: AsyncSession = Depends(get_db_session)) -> ProviderService:
    return ProviderService(ProviderRepository(session))


async def get_user_service(repository: UserRepository = Depends(get_user_repository)) -> UserService:
    return UserService(repository)


async def get_policy_service(repository: PolicyRepository = Depends(get_policy_repository)) -> PolicyService:
    return PolicyService(repository)


__all__ = [
    "get_settings",
    "get_db_session",
    "get_tenant_repository",
    "get_provider_repository",
    "get_user_repository",
    "get_policy_repository",
    "get_health_service",
    "get_tenant_service",
    "get_provider_service",
    "get_user_service",
    "get_policy_service",
]
