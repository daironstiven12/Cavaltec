from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import ComplianceLevel, RiskLevel
from app.database.base import Base


class AssessmentResult(Base):
    __tablename__ = "assessment_results"
    __table_args__ = (UniqueConstraint("assessment_id"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    assessment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("assessments.id"), nullable=False, unique=True
    )
    total_score: Mapped[Optional[float]] = mapped_column(Numeric(6, 2), nullable=True)
    compliance_percentage: Mapped[Optional[float]] = mapped_column(
        Numeric(5, 2), nullable=True
    )
    compliance_level: Mapped[Optional[ComplianceLevel]] = mapped_column(
        String(20), nullable=True
    )
    risk_level: Mapped[Optional[RiskLevel]] = mapped_column(
        String(10), nullable=True
    )
    summary: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    generated_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    assessment: Mapped["Assessment"] = relationship(back_populates="result")
