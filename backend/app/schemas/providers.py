from __future__ import annotations

from uuid import UUID

from pydantic import BaseModel


class ProviderSummary(BaseModel):
    id: UUID
    name: str
    provider_type: str
    enabled: bool
    is_default: bool
    routing_priority: int


class ProviderListResponse(BaseModel):
    items: list[ProviderSummary]
