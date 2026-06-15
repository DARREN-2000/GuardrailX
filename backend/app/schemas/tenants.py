from __future__ import annotations

from uuid import UUID

from pydantic import BaseModel


class TenantSummary(BaseModel):
    id: UUID
    slug: str
    name: str
    status: str


class TenantListResponse(BaseModel):
    items: list[TenantSummary]
    total: int | None = None
