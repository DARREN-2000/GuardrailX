from __future__ import annotations

from app.models.tenant import Tenant
from app.repositories.tenants import TenantRepository


class TenantService:
    def __init__(self, tenant_repository: TenantRepository) -> None:
        self.tenant_repository = tenant_repository

    async def get_tenant_by_slug(self, slug: str) -> Tenant | None:
        return await self.tenant_repository.get_by_slug(slug)

    async def list_tenants(self, limit: int = 100, offset: int = 0) -> list[Tenant]:
        return await self.tenant_repository.list(limit=limit, offset=offset)
