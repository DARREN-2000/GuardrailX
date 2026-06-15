from __future__ import annotations

from collections.abc import Sequence
from typing import Generic, TypeVar
from uuid import UUID

from app.db.base import Base
from app.repositories.base import SQLAlchemyRepository

ModelType = TypeVar("ModelType", bound=Base)


class CRUDService(Generic[ModelType]):
    def __init__(self, repository: SQLAlchemyRepository[ModelType]) -> None:
        self.repository = repository

    async def get(self, identifier: UUID) -> ModelType | None:
        return await self.repository.get(identifier)

    async def list(self, *, offset: int = 0, limit: int = 100) -> Sequence[ModelType]:
        return await self.repository.list(offset=offset, limit=limit)

    async def create(self, instance: ModelType) -> ModelType:
        return await self.repository.add(instance)
