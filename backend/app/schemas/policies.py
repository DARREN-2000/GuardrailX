from __future__ import annotations

from uuid import UUID

from app.schemas.common import ORMModel


class PolicyCreate(ORMModel):
    tenant_id: UUID
    name: str
    description: str | None = None
    status: str = "draft"
    owner_user_id: UUID | None = None


class PolicyRead(ORMModel):
    id: UUID
    tenant_id: UUID
    name: str
    description: str | None = None
    status: str
    owner_user_id: UUID | None = None
