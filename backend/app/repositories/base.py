from __future__ import annotations

from collections.abc import Sequence
from typing import Any, Generic, TypeVar

from sqlalchemy import Select, select
from sqlalchemy.ext.asyncio import AsyncSession


ModelType = TypeVar("ModelType")


class SQLAlchemyRepository(Generic[ModelType]):
    def __init__(self, session: AsyncSession, model: type[ModelType]) -> None:
        self.session = session
        self.model = model

    async def get(self, primary_key: Any) -> ModelType | None:
        return await self.session.get(self.model, primary_key)

    async def list(self, *, limit: int = 100, offset: int = 0) -> list[ModelType]:
        stmt: Select[tuple[ModelType]] = select(self.model).limit(limit).offset(offset)
        result = await self.session.scalars(stmt)
        return list(result.all())

    async def add(self, entity: ModelType) -> ModelType:
        self.session.add(entity)
        await self.session.flush()
        return entity

    async def add_all(self, entities: Sequence[ModelType]) -> None:
        self.session.add_all(list(entities))
        await self.session.flush()

    async def delete(self, entity: ModelType) -> None:
        await self.session.delete(entity)
        await self.session.flush()

    async def refresh(self, entity: ModelType) -> ModelType:
        await self.session.refresh(entity)
        return entity
