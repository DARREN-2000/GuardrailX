import uuid
from unittest.mock import AsyncMock

import pytest

from app.models.user import User
from app.services.users import UserService


@pytest.mark.asyncio
async def test_user_service():
    mock_repo = AsyncMock()
    service = UserService(repository=mock_repo)

    tenant_id = str(uuid.uuid4())
    user = User(id=uuid.uuid4(), email="test@test.com", tenant_id=uuid.UUID(tenant_id))

    mock_repo.get_by_email.return_value = user

    res = await service.get_by_email(tenant_id, "test@test.com")
    assert res is not None
    assert res.email == "test@test.com"
