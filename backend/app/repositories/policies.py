from __future__ import annotations

from sqlalchemy import select

from app.models.policy import Policy
from app.repositories.base import SQLAlchemyRepository


class PolicyRepository(SQLAlchemyRepository[Policy]):
    def __init__(self, session) -> None:
        super().__init__(session, Policy)

    async def get_by_name(self, tenant_id, name: str) -> Policy | None:
        return await self.session.scalar(select(Policy).where(Policy.tenant_id == tenant_id, Policy.name == name))
