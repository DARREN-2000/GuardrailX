import uuid

import pytest

from app.models.base import PolicyStatus, ProviderType, TenantStatus, UserRole
from app.models.policy import Policy
from app.models.provider import Provider
from app.models.tenant import Tenant
from app.models.user import User
from app.repositories.base import SQLAlchemyRepository
from app.repositories.policies import PolicyRepository
from app.repositories.providers import ProviderRepository
from app.repositories.tenants import TenantRepository
from app.repositories.users import UserRepository


@pytest.mark.asyncio
async def test_tenant_repository(async_db_session):
    repo = TenantRepository(async_db_session)

    tenant = Tenant(name="Test Tenant", slug=f"test-slug-{uuid.uuid4()}", status=TenantStatus.active)
    await repo.add(tenant)
    assert tenant.id is not None

    res = await repo.get_by_slug(tenant.slug)
    assert res is not None
    assert res.name == "Test Tenant"

    res_missing = await repo.get_by_slug("nonexistent")
    assert res_missing is None

@pytest.mark.asyncio
async def test_user_repository(async_db_session):
    tenant_repo = TenantRepository(async_db_session)
    tenant = Tenant(name="Test Tenant 2", slug=f"test-slug-{uuid.uuid4()}", status=TenantStatus.active)
    await tenant_repo.add(tenant)

    repo = UserRepository(async_db_session)
    email = f"test-{uuid.uuid4()}@example.com"
    user = User(tenant_id=tenant.id, email=email, role=UserRole.admin, display_name="Test User", auth_subject="sub123")
    await repo.add(user)

    res = await repo.get_by_email(tenant.id, email)
    assert res is not None
    assert res.email == email

    res_missing = await repo.get_by_email(tenant.id, "nonexistent@example.com")
    assert res_missing is None

@pytest.mark.asyncio
async def test_provider_repository(async_db_session):
    tenant_repo = TenantRepository(async_db_session)
    tenant = Tenant(name="Test Tenant 3", slug=f"test-slug-{uuid.uuid4()}", status=TenantStatus.active)
    await tenant_repo.add(tenant)

    repo = ProviderRepository(async_db_session)
    provider = Provider(tenant_id=tenant.id, name="OpenAI", provider_type=ProviderType.openai, base_url="https://api.openai.com", model_name="gpt-4", is_default=True)
    await repo.add(provider)

    res_list = await repo.list_for_tenant(tenant.id)
    assert len(res_list) >= 1

    res_default = await repo.get_default_for_tenant(tenant.id)
    assert res_default is not None
    assert res_default.name == "OpenAI"

@pytest.mark.asyncio
async def test_policy_repository(async_db_session):
    tenant_repo = TenantRepository(async_db_session)
    tenant = Tenant(name="Test Tenant 4", slug=f"test-slug-{uuid.uuid4()}", status=TenantStatus.active)
    await tenant_repo.add(tenant)

    repo = PolicyRepository(async_db_session)
    policy_name = f"policy-{uuid.uuid4()}"
    policy = Policy(tenant_id=tenant.id, name=policy_name, description="Test policy", status=PolicyStatus.active)
    await repo.add(policy)

    res = await repo.get_by_name(tenant.id, policy_name)
    assert res is not None
    assert res.name == policy_name

    res_missing = await repo.get_by_name(tenant.id, "nonexistent")
    assert res_missing is None
