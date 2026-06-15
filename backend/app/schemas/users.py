from __future__ import annotations

from uuid import UUID

from app.schemas.common import ORMModel


class UserCreate(ORMModel):
    tenant_id: UUID
    email: str
    display_name: str
    auth_subject: str
    role: str = "analyst"
    status: str = "invited"
    is_active: bool = True
    preferences: dict[str, object] = {}


class UserRead(ORMModel):
    id: UUID
    tenant_id: UUID
    email: str
    display_name: str
    auth_subject: str
    role: str
    status: str
    is_active: bool
    preferences: dict[str, object]
