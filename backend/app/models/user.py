from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Index, String, UniqueConstraint
from sqlalchemy import Enum as SAEnum
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import (
    TenantScopedMixin,
    TimestampMixin,
    UserRole,
    UserStatus,
    UUIDPrimaryKeyMixin,
)


class User(Base, UUIDPrimaryKeyMixin, TenantScopedMixin, TimestampMixin):
    __tablename__ = "users"
    __table_args__ = (
        UniqueConstraint("tenant_id", "email", name="uq_users_tenant_email"),
        UniqueConstraint("tenant_id", "auth_subject", name="uq_users_tenant_auth_subject"),
        Index("ix_users_tenant_status", "tenant_id", "status"),
    )

    email: Mapped[str] = mapped_column(String(320), nullable=False)
    display_name: Mapped[str] = mapped_column(String(200), nullable=False)
    auth_subject: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[UserRole] = mapped_column(
        SAEnum(UserRole, name="user_role", native_enum=True),
        nullable=False,
        default=UserRole.analyst,
    )
    status: Mapped[UserStatus] = mapped_column(
        SAEnum(UserStatus, name="user_status", native_enum=True),
        nullable=False,
        default=UserStatus.invited,
    )
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    last_login_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    preferences: Mapped[dict[str, object]] = mapped_column(JSONB, nullable=False, default=dict)

    tenant = relationship("Tenant", back_populates="users")
    authored_policies = relationship("Policy", back_populates="owner_user")
    authored_policy_versions = relationship("PolicyVersion", back_populates="published_by_user")
    decisions = relationship("GovernanceDecision", back_populates="decided_by_user")
    audit_events = relationship("AuditEvent", back_populates="actor_user")
