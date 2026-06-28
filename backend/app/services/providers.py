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

    async def route_request(self, tenant_id: str) -> Provider | None:
        """Selects the best provider based on is_default, routing_priority, and enabled status."""
        providers = await self.list_providers(tenant_id)

        # Filter enabled providers
        enabled_providers = [p for p in providers if p.enabled]
        if not enabled_providers:
            return None

        # First check if there's an enabled default provider
        default_providers = [p for p in enabled_providers if p.is_default]
        if default_providers:
            # If multiple defaults, return the one with highest priority (lowest number)
            return sorted(default_providers, key=lambda p: p.routing_priority)[0]

        # If no default, sort by routing priority (lower number = higher priority)
        return sorted(enabled_providers, key=lambda p: p.routing_priority)[0]
