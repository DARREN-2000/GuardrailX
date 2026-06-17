from __future__ import annotations

from app.models.user import User
from app.repositories.users import UserRepository
from app.services.base import CRUDService


class UserService(CRUDService[User]):
    repository: UserRepository

    def __init__(self, repository: UserRepository) -> None:
        super().__init__(repository)

    async def get_by_email(self, tenant_id, email: str) -> User | None:
        return await self.repository.get_by_email(tenant_id, email)
