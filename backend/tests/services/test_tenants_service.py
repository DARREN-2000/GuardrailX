import uuid
from unittest.mock import AsyncMock

import pytest

from app.models.tenant import Tenant
from app.services.tenants import TenantService


@pytest.mark.asyncio
async def test_tenant_service():
    mock_repo = AsyncMock()
    service = TenantService(tenant_repository=mock_repo)

    tenant = Tenant(id=uuid.uuid4(), slug="test-slug", name="Test Tenant")

    mock_repo.get_by_slug.return_value = tenant
    mock_repo.list.return_value = [tenant]

    res = await service.get_tenant_by_slug("test-slug")
    assert res is not None
    assert res.slug == "test-slug"

    res_list = await service.list_tenants()
    assert len(res_list) == 1
    assert res_list[0].name == "Test Tenant"
