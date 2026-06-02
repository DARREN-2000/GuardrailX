from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum as SAEnum, Index, Integer, String, Text, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import (
    ProviderHealthStatus,
    ProviderType,
    TimestampMixin,
    TenantScopedMixin,
    UUIDPrimaryKeyMixin,
)


class Provider(Base, UUIDPrimaryKeyMixin, TenantScopedMixin, TimestampMixin):
    __tablename__ = "providers"
    __table_args__ = (
        UniqueConstraint("tenant_id", "name", name="uq_providers_tenant_name"),
        Index("ix_providers_tenant_type", "tenant_id", "provider_type"),
        Index("ix_providers_tenant_enabled_priority", "tenant_id", "enabled", "routing_priority"),
    )

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    provider_type: Mapped[ProviderType] = mapped_column(
        SAEnum(ProviderType, name="provider_type", native_enum=True),
        nullable=False,
    )
    base_url: Mapped[str] = mapped_column(String(2048), nullable=False)
    model_name: Mapped[str] = mapped_column(String(255), nullable=False)
    api_key_ref: Mapped[str | None] = mapped_column(String(255), nullable=True)
    enabled: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    is_default: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    routing_priority: Mapped[int] = mapped_column(Integer, nullable=False, default=100)
    timeout_seconds: Mapped[int] = mapped_column(Integer, nullable=False, default=60)
    health_status: Mapped[ProviderHealthStatus] = mapped_column(
        SAEnum(ProviderHealthStatus, name="provider_health_status", native_enum=True),
        nullable=False,
        default=ProviderHealthStatus.unknown,
    )
    last_health_check_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    config: Mapped[dict[str, object]] = mapped_column(JSONB, nullable=False, default=dict)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    tenant = relationship("Tenant", back_populates="providers")
    risk_assessments = relationship("RiskAssessment", back_populates="provider")
    decisions = relationship("GovernanceDecision", back_populates="provider")
