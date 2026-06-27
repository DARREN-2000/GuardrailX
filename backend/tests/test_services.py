from unittest.mock import AsyncMock

import pytest

from app.services.base import CRUDService
from app.services.health import HealthService


@pytest.mark.asyncio
async def test_crud_service():
    mock_repo = AsyncMock()
    service = CRUDService(repository=mock_repo)

    mock_repo.get = AsyncMock(return_value="mock_entity")
    res = await service.get(1)
    assert res == "mock_entity"

    mock_repo.list = AsyncMock(return_value=["mock_entity"])
    res_list = await service.list(offset=0, limit=10)
    assert res_list == ["mock_entity"]

    mock_repo.add = AsyncMock(return_value="mock_entity_created")
    res_create = await service.create("new_entity")
    assert res_create == "mock_entity_created"


@pytest.mark.asyncio
async def test_health_service():
    mock_session = AsyncMock()
    service = HealthService(session=mock_session)
    res = await service.check_database()
    assert res == {"database": "ok"}
    mock_session.execute.assert_called_once()
