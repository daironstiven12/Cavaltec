from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import AssessmentStatus
from app.database.base import Base


class Assessment(Base):
    __tablename__ = "assessments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    company_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("companies.id"), nullable=False
    )
    questionnaire_version_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("questionnaire_versions.id"), nullable=False
    )
    evaluator_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=False
    )
    started_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    finished_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    status: Mapped[Optional[AssessmentStatus]] = mapped_column(
        String(20), default=AssessmentStatus.IN_PROGRESS
    )
    created_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    company: Mapped["Company"] = relationship(back_populates="assessments")
    questionnaire_version: Mapped["QuestionnaireVersion"] = relationship(
        back_populates="assessments"
    )
    evaluator: Mapped["User"] = relationship(back_populates="assessments")
    answers: Mapped[list["AssessmentAnswer"]] = relationship(
        back_populates="assessment"
    )
    result: Mapped[Optional["AssessmentResult"]] = relationship(
        back_populates="assessment", uselist=False
    )
    category_results: Mapped[list["CategoryResult"]] = relationship(
        back_populates="assessment"
    )
