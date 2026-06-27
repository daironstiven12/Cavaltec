from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    category_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("question_categories.id"), nullable=False
    )
    question_text: Mapped[str] = mapped_column(Text, nullable=False)
    help_text: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    explanation: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    weight: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    display_order: Mapped[int] = mapped_column(Integer, nullable=False)
    is_required: Mapped[Optional[bool]] = mapped_column(Boolean, default=True)
    is_active: Mapped[Optional[bool]] = mapped_column(Boolean, default=True)
    created_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    category: Mapped["QuestionCategory"] = relationship(back_populates="questions")
    options: Mapped[list["QuestionOption"]] = relationship(
        back_populates="question"
    )
    assessment_answers: Mapped[list["AssessmentAnswer"]] = relationship(
        back_populates="question"
    )
