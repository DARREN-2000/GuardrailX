from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.dependencies import get_tenant_service
from app.schemas.tenants import TenantListResponse, TenantSummary
from app.services.tenants import TenantService

router = APIRouter(prefix="/tenants", tags=["tenants"])


def _to_summary(tenant) -> TenantSummary:
    return TenantSummary(
        id=tenant.id,
        slug=tenant.slug,
        name=tenant.name,
        status=tenant.status.value if hasattr(tenant.status, "value") else str(tenant.status),
    )


@router.get("", response_model=TenantListResponse)
async def list_tenants(
    limit: int = Query(default=100, ge=1, le=500),
    offset: int = Query(default=0, ge=0),
    tenant_service: TenantService = Depends(get_tenant_service),
) -> TenantListResponse:
    tenants = await tenant_service.list_tenants(limit=limit, offset=offset)
    return TenantListResponse(items=[_to_summary(tenant) for tenant in tenants], total=len(tenants))


@router.get("/{slug}", response_model=TenantSummary)
async def get_tenant(slug: str, tenant_service: TenantService = Depends(get_tenant_service)) -> TenantSummary:
    tenant = await tenant_service.get_tenant_by_slug(slug)
    if tenant is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tenant not found")
    return _to_summary(tenant)
