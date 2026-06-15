from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy import Enum as SAEnum
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import PolicyVersionStatus, TimestampMixin, UUIDPrimaryKeyMixin


class PolicyVersion(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    __tablename__ = "policy_versions"
    __table_args__ = (UniqueConstraint("policy_id", "version_number", name="uq_policy_versions_policy_version"),)

    policy_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("policies.id", ondelete="CASCADE"), nullable=False)
    version_number: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[PolicyVersionStatus] = mapped_column(
        SAEnum(PolicyVersionStatus, name="policy_version_status", native_enum=True),
        nullable=False,
        default=PolicyVersionStatus.draft,
    )
    content: Mapped[dict[str, object]] = mapped_column(JSONB, nullable=False, default=dict)
    checksum: Mapped[str] = mapped_column(String(128), nullable=False)
    published_by_user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    policy = relationship("Policy", back_populates="versions")
    published_by_user = relationship("User", back_populates="authored_policy_versions")
