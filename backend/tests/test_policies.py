import uuid
from unittest.mock import AsyncMock, patch

import pytest

from app.models.policy import Policy
from app.services.policies import PolicyService


@pytest.mark.asyncio
async def test_evaluate_policy():
    mock_repo = AsyncMock()
    service = PolicyService(repository=mock_repo)

    tenant_id = uuid.uuid4()
    policy_name = "test_policy"
    prompt = "This is a test prompt."

    mock_policy = Policy(id=uuid.uuid4(), name=policy_name, tenant_id=tenant_id)

    mock_repo.get_by_name = AsyncMock(return_value=mock_policy)

    with patch("asyncio.to_thread") as mock_to_thread, patch("asyncio.create_task") as mock_create_task:

        async def dummy_coro():
            pass

        coro = dummy_coro()
        mock_to_thread.return_value = coro

        result = await service.evaluate_policy(tenant_id, policy_name, prompt)

        assert mock_create_task.called

        await coro

        assert result["is_safe"] is True
        assert result["risk_score"] == 0.05
        assert result["tokens_used"] == len(prompt.split()) + 10
        assert "latency" in result
        assert result["policy"] == policy_name
