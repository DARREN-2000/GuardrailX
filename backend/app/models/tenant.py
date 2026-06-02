from __future__ import annotations

from typing import Any

from sqlalchemy import Enum as SAEnum, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import TenantStatus, TimestampMixin, UUIDPrimaryKeyMixin


class Tenant(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "tenants"

    slug: Mapped[str] = mapped_column(String(80), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    status: Mapped[TenantStatus] = mapped_column(
        SAEnum(TenantStatus, name="tenant_status", native_enum=True),
        nullable=False,
        default=TenantStatus.active,
    )
    settings: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, default=dict)
    compliance_profile: Mapped[dict[str, Any]] = mapped_column(JSONB, nullable=False, default=dict)

    users = relationship("User", back_populates="tenant", cascade="all, delete-orphan")
    policies = relationship("Policy", back_populates="tenant", cascade="all, delete-orphan")
    providers = relationship("Provider", back_populates="tenant", cascade="all, delete-orphan")
    risk_assessments = relationship("RiskAssessment", back_populates="tenant", cascade="all, delete-orphan")
    governance_decisions = relationship("GovernanceDecision", back_populates="tenant", cascade="all, delete-orphan")
    audit_events = relationship("AuditEvent", back_populates="tenant", cascade="all, delete-orphan")
