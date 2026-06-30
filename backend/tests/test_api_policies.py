import uuid
from unittest.mock import AsyncMock

import pytest
from httpx import ASGITransport, AsyncClient

from app.core.dependencies import get_policy_service
from app.main import app


@pytest.mark.asyncio
async def test_evaluate_policy_endpoint():
    mock_service = AsyncMock()
    mock_policy = AsyncMock()
    mock_policy.tenant_id = uuid.uuid4()
    mock_policy.name = "test_policy"

    mock_service.get.return_value = mock_policy
    mock_service.evaluate_policy.return_value = {
        "is_safe": True,
        "risk_score": 0.0,
        "tokens_used": 15,
        "latency": 0.05,
        "policy": "test_policy",
        "has_pii": False,
        "has_injection": False,
    }

    app.dependency_overrides[get_policy_service] = lambda: mock_service

    policy_id = uuid.uuid4()

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(f"/api/v1/policies/{policy_id}/evaluate", json={"prompt": "test prompt"})

    assert response.status_code == 200
    data = response.json()
    assert data["is_safe"] is True
    assert data["policy"] == "test_policy"

    app.dependency_overrides.clear()
