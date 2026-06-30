from __future__ import annotations

from uuid import UUID

from app.schemas.common import ORMModel
from pydantic import BaseModel


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

class PolicyEvaluateRequest(BaseModel):
    prompt: str

class PolicyEvaluateResponse(BaseModel):
    is_safe: bool
    risk_score: float
    tokens_used: int
    latency: float
    policy: str | None
    has_pii: bool
    has_injection: bool
