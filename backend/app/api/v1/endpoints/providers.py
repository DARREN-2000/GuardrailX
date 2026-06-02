from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.dependencies import get_provider_service
from app.schemas.providers import ProviderListResponse, ProviderSummary
from app.services.providers import ProviderService

router = APIRouter(prefix="/tenants/{tenant_id}/providers", tags=["providers"])


def _to_summary(provider) -> ProviderSummary:
    return ProviderSummary(
        id=provider.id,
        name=provider.name,
        provider_type=provider.provider_type.value if hasattr(provider.provider_type, "value") else str(provider.provider_type),
        enabled=provider.enabled,
        is_default=provider.is_default,
        routing_priority=provider.routing_priority,
    )


@router.get("", response_model=ProviderListResponse)
async def list_providers(
    tenant_id: str,
    provider_service: ProviderService = Depends(get_provider_service),
) -> ProviderListResponse:
    providers = await provider_service.list_providers(tenant_id)
    return ProviderListResponse(items=[_to_summary(provider) for provider in providers])


@router.get("/default", response_model=ProviderSummary)
async def get_default_provider(
    tenant_id: str,
    provider_service: ProviderService = Depends(get_provider_service),
) -> ProviderSummary:
    provider = await provider_service.get_default_provider(tenant_id)
    if provider is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Default provider not found")
    return _to_summary(provider)
