from __future__ import annotations

import uuid

from sqlalchemy import Enum as SAEnum
from sqlalchemy import ForeignKey, Index, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import (
    PolicyStatus,
    TenantScopedMixin,
    TimestampMixin,
    UUIDPrimaryKeyMixin,
)


class Policy(Base, UUIDPrimaryKeyMixin, TenantScopedMixin, TimestampMixin):
    __tablename__ = "policies"
    __table_args__ = (
        UniqueConstraint("tenant_id", "name", name="uq_policies_tenant_name"),
        Index("ix_policies_tenant_status", "tenant_id", "status"),
    )

    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[PolicyStatus] = mapped_column(
        SAEnum(PolicyStatus, name="policy_status", native_enum=True),
        nullable=False,
        default=PolicyStatus.draft,
    )
    owner_user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)

    tenant = relationship("Tenant", back_populates="policies")
    owner_user = relationship("User", back_populates="authored_policies")
    versions = relationship("PolicyVersion", back_populates="policy", cascade="all, delete-orphan")
