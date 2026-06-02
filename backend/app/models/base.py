from __future__ import annotations

import enum
import uuid
from datetime import datetime
from typing import Any

from sqlalchemy import DateTime, ForeignKey, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column


class TenantStatus(str, enum.Enum):
    active = "active"
    suspended = "suspended"
    archived = "archived"


class UserRole(str, enum.Enum):
    owner = "owner"
    admin = "admin"
    analyst = "analyst"
    reviewer = "reviewer"
    service = "service"


class UserStatus(str, enum.Enum):
    active = "active"
    invited = "invited"
    disabled = "disabled"


class ProviderType(str, enum.Enum):
    openai = "openai"
    ollama = "ollama"
    vllm = "vllm"


class ProviderHealthStatus(str, enum.Enum):
    unknown = "unknown"
    healthy = "healthy"
    degraded = "degraded"
    unhealthy = "unhealthy"


class PolicyStatus(str, enum.Enum):
    draft = "draft"
    active = "active"
    retired = "retired"


class PolicyVersionStatus(str, enum.Enum):
    draft = "draft"
    published = "published"
    archived = "archived"


class DecisionOutcome(str, enum.Enum):
    allow = "allow"
    redact = "redact"
    block = "block"
    review = "review"
    escalate = "escalate"


class AssessmentKind(str, enum.Enum):
    prompt_injection = "prompt_injection"
    jailbreak = "jailbreak"
    pii = "pii"
    content_safety = "content_safety"
    hallucination = "hallucination"
    composite = "composite"


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )


class UUIDPrimaryKeyMixin:
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)


class TenantScopedMixin:
    tenant_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("tenants.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )


class JSONBMixin:
    attributes: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, default=dict)
