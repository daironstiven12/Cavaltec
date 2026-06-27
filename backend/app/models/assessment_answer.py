from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, Numeric, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class AssessmentAnswer(Base):
    __tablename__ = "assessment_answers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    assessment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("assessments.id"), nullable=False
    )
    question_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("questions.id"), nullable=False
    )
    option_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("question_options.id"), nullable=True
    )
    answer_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    score: Mapped[Optional[float]] = mapped_column(
        Numeric(5, 2), default=0.00
    )
    observations: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    answered_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    assessment: Mapped["Assessment"] = relationship(back_populates="answers")
    question: Mapped["Question"] = relationship(
        back_populates="assessment_answers"
    )
    option: Mapped[Optional["QuestionOption"]] = relationship(
        back_populates="assessment_answers"
    )
