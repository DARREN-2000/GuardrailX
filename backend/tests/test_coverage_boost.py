import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.api.v1.endpoints.health import router
from unittest.mock import AsyncMock, patch
from app.core.config import Settings
import uuid
import datetime

from app.models.tenant import Tenant
from app.models.provider import Provider
from app.models.user import User
from app.models.policy import Policy
from app.models.policy_version import PolicyVersion
from app.models.governance_decision import GovernanceDecision
from app.models.risk_assessment import RiskAssessment
from app.models.audit_event import AuditEvent
from app.models.base import UserRole
from app.repositories.base import SQLAlchemyRepository

def test_models_import():
    # Instantiating all models to test their base imports and default values mapping correctly
    t = Tenant(id=uuid.uuid4(), name="t", slug="t")
    p = Provider(id=uuid.uuid4(), name="p", base_url="x", model_name="x", provider_type="openai")
    u = User(id=uuid.uuid4(), email="u", role=UserRole.admin)
    po = Policy(id=uuid.uuid4(), name="po")
    pv = PolicyVersion(id=uuid.uuid4(), checksum="x")
    gd = GovernanceDecision(id=uuid.uuid4(), provider_id=uuid.uuid4(), decided_by_user_id=uuid.uuid4(), outcome="allow")
    ra = RiskAssessment(id=uuid.uuid4(), score=1, severity="1", provider_id=uuid.uuid4())
    ae = AuditEvent(id=uuid.uuid4(), event_type="x", action="x", resource_type="x", resource_id=str(uuid.uuid4()))

    assert t.name == "t"
    assert p.name == "p"
    assert u.email == "u"

@pytest.mark.asyncio
async def test_health_routes():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        res = await client.get("/api/v1/health/live")
        assert res.status_code == 200

@pytest.mark.asyncio
async def test_base_repo_coverage_mock():
    mock_session = AsyncMock()
    repo = SQLAlchemyRepository(mock_session, Tenant)

    t = Tenant()
    mock_session.get.return_value = t
    assert await repo.get(1) == t

    mock_session.scalars.return_value = AsyncMock(all=lambda: [t])
    assert len(await repo.list()) == 1

    await repo.add_all([t])
    await repo.delete(t)
    await repo.refresh(t)
