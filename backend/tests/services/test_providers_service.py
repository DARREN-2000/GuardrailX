from unittest.mock import AsyncMock

import pytest

from app.services.providers import ProviderService


@pytest.mark.asyncio
async def test_list_providers():
    mock_repo = AsyncMock()
    service = ProviderService(provider_repository=mock_repo)

    provider = AsyncMock()
    mock_repo.list_for_tenant.return_value = [provider]

    res = await service.list_providers("tenant1")
    assert len(res) == 1
    mock_repo.list_for_tenant.assert_called_once_with("tenant1")


@pytest.mark.asyncio
async def test_get_default_provider():
    mock_repo = AsyncMock()
    service = ProviderService(provider_repository=mock_repo)

    provider = AsyncMock()
    mock_repo.get_default_for_tenant.return_value = provider

    res = await service.get_default_provider("tenant1")
    assert res == provider
    mock_repo.get_default_for_tenant.assert_called_once_with("tenant1")

@pytest.mark.asyncio
async def test_route_request():
    mock_repo = AsyncMock()
    service = ProviderService(provider_repository=mock_repo)

    p1 = AsyncMock()
    p1.enabled = True
    p1.is_default = False
    p1.routing_priority = 100

    p2 = AsyncMock()
    p2.enabled = True
    p2.is_default = True
    p2.routing_priority = 50

    mock_repo.list_for_tenant.return_value = [p1, p2]

    res = await service.route_request("tenant1")
    assert res == p2

@pytest.mark.asyncio
async def test_route_request_no_default():
    mock_repo = AsyncMock()
    service = ProviderService(provider_repository=mock_repo)

    p1 = AsyncMock()
    p1.enabled = True
    p1.is_default = False
    p1.routing_priority = 100

    p2 = AsyncMock()
    p2.enabled = True
    p2.is_default = False
    p2.routing_priority = 50

    mock_repo.list_for_tenant.return_value = [p1, p2]

    res = await service.route_request("tenant1")
    assert res == p2

@pytest.mark.asyncio
async def test_route_request_none_enabled():
    mock_repo = AsyncMock()
    service = ProviderService(provider_repository=mock_repo)

    p1 = AsyncMock()
    p1.enabled = False

    mock_repo.list_for_tenant.return_value = [p1]

    res = await service.route_request("tenant1")
    assert res is None
