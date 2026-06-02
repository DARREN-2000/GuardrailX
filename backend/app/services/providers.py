from __future__ import annotations

from app.models.provider import Provider
from app.repositories.providers import ProviderRepository


class ProviderService:
    def __init__(self, provider_repository: ProviderRepository) -> None:
        self.provider_repository = provider_repository

    async def list_providers(self, tenant_id: str) -> list[Provider]:
        return await self.provider_repository.list_for_tenant(tenant_id)

    async def get_default_provider(self, tenant_id: str) -> Provider | None:
        return await self.provider_repository.get_default_for_tenant(tenant_id)
