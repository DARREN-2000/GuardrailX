import uuid
from unittest.mock import AsyncMock

import pytest

from app.models.provider import Provider
from app.services.providers import ProviderService


@pytest.mark.asyncio
async def test_provider_service():
    mock_repo = AsyncMock()
    service = ProviderService(provider_repository=mock_repo)

    tenant_id = str(uuid.uuid4())
    provider = Provider(id=uuid.uuid4(), name="Test", tenant_id=uuid.UUID(tenant_id))

    mock_repo.list_for_tenant.return_value = [provider]
    mock_repo.get_default_for_tenant.return_value = provider

    res = await service.list_providers(tenant_id)
    assert len(res) == 1
    assert res[0].name == "Test"

    res_def = await service.get_default_provider(tenant_id)
    assert res_def is not None
    assert res_def.name == "Test"
