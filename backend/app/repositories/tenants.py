from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.tenant import Tenant
from app.repositories.base import SQLAlchemyRepository


class TenantRepository(SQLAlchemyRepository[Tenant]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, Tenant)

    async def get_by_slug(self, slug: str) -> Tenant | None:
        stmt = select(Tenant).where(Tenant.slug == slug)
        return await self.session.scalar(stmt)
