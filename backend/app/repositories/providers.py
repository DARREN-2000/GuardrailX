from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.provider import Provider
from app.repositories.base import SQLAlchemyRepository


class ProviderRepository(SQLAlchemyRepository[Provider]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Provider)

    async def list_for_tenant(self, tenant_id: str) -> list[Provider]:
        stmt = select(Provider).where(Provider.tenant_id == tenant_id).order_by(Provider.routing_priority.asc())
        result = await self.session.scalars(stmt)
        return list(result.all())

    async def get_default_for_tenant(self, tenant_id: str) -> Provider | None:
        stmt = select(Provider).where(Provider.tenant_id == tenant_id, Provider.is_default.is_(True))
        return await self.session.scalar(stmt)
