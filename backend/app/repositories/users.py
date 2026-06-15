from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.repositories.base import SQLAlchemyRepository


class UserRepository(SQLAlchemyRepository[User]):
    def __init__(self, session: AsyncSession) -> None:
        super().__init__(session, User)

    async def get_by_email(self, tenant_id: str, email: str) -> User | None:
        stmt = select(User).where(User.tenant_id == tenant_id, User.email == email)
        return await self.session.scalar(stmt)
