from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import TenantScopedMixin, TimestampMixin, UUIDPrimaryKeyMixin


class AuditEvent(Base, UUIDPrimaryKeyMixin, TenantScopedMixin, TimestampMixin):
    __tablename__ = "audit_events"

    actor_user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    event_type: Mapped[str] = mapped_column(String(120), nullable=False)
    resource_type: Mapped[str] = mapped_column(String(120), nullable=False)
    resource_id: Mapped[str | None] = mapped_column(String(128), nullable=True)
    action: Mapped[str] = mapped_column(String(120), nullable=False)
    outcome: Mapped[str | None] = mapped_column(String(32), nullable=True)
    payload: Mapped[dict[str, object]] = mapped_column(JSONB, nullable=False, default=dict)
    occurred_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    tenant = relationship("Tenant", back_populates="audit_events")
    actor_user = relationship("User", back_populates="audit_events")
