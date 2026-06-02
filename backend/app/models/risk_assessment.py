from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum as SAEnum, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import AssessmentKind, TimestampMixin, TenantScopedMixin, UUIDPrimaryKeyMixin


class RiskAssessment(Base, UUIDPrimaryKeyMixin, TenantScopedMixin, TimestampMixin):
    __tablename__ = "risk_assessments"

    assessment_kind: Mapped[AssessmentKind] = mapped_column(
        SAEnum(AssessmentKind, name="assessment_kind", native_enum=True),
        nullable=False,
    )
    provider_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("providers.id", ondelete="SET NULL"), nullable=True)
    score: Mapped[int] = mapped_column(Integer, nullable=False)
    severity: Mapped[str] = mapped_column(String(32), nullable=False)
    summary: Mapped[str] = mapped_column(String(500), nullable=False)
    details: Mapped[dict[str, object]] = mapped_column(JSONB, nullable=False, default=dict)
    evaluated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    tenant = relationship("Tenant", back_populates="risk_assessments")
    provider = relationship("Provider", back_populates="risk_assessments")
    decisions = relationship("GovernanceDecision", back_populates="risk_assessment")
