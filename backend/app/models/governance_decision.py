from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, Enum as SAEnum, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base
from app.models.base import DecisionOutcome, TimestampMixin, TenantScopedMixin, UUIDPrimaryKeyMixin


class GovernanceDecision(Base, UUIDPrimaryKeyMixin, TenantScopedMixin, TimestampMixin):
    __tablename__ = "governance_decisions"

    risk_assessment_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("risk_assessments.id", ondelete="CASCADE"),
        nullable=False,
    )
    provider_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("providers.id", ondelete="SET NULL"), nullable=True)
    decided_by_user_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    outcome: Mapped[DecisionOutcome] = mapped_column(
        SAEnum(DecisionOutcome, name="decision_outcome", native_enum=True),
        nullable=False,
    )
    rationale: Mapped[str] = mapped_column(Text, nullable=False)
    decision_context: Mapped[dict[str, object]] = mapped_column(JSONB, nullable=False, default=dict)
    decided_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    policy_ref: Mapped[str | None] = mapped_column(String(255), nullable=True)

    tenant = relationship("Tenant", back_populates="governance_decisions")
    risk_assessment = relationship("RiskAssessment", back_populates="decisions")
    provider = relationship("Provider", back_populates="decisions")
    decided_by_user = relationship("User", back_populates="decisions")
