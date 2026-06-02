from __future__ import annotations

from app.models.policy import Policy
from app.repositories.policies import PolicyRepository
from app.services.base import CRUDService


class PolicyService(CRUDService[Policy]):
    def __init__(self, repository: PolicyRepository) -> None:
        super().__init__(repository)

    async def get_by_name(self, tenant_id, name: str) -> Policy | None:
        return await self.repository.get_by_name(tenant_id, name)
