from __future__ import annotations

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession


class HealthService:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def check_database(self) -> dict[str, str]:
        await self.session.execute(text("SELECT 1"))
        return {"database": "ok"}
