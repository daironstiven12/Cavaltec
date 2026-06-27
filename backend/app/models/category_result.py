from __future__ import annotations

from sqlalchemy import ForeignKey, Integer, Numeric
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class CategoryResult(Base):
    __tablename__ = "category_results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    assessment_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("assessments.id"), nullable=False
    )
    category_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("question_categories.id"), nullable=False
    )
    score: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    max_score: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)
    percentage: Mapped[float] = mapped_column(Numeric(5, 2), nullable=False)

    assessment: Mapped["Assessment"] = relationship(
        back_populates="category_results"
    )
    category: Mapped["QuestionCategory"] = relationship(
        back_populates="category_results"
    )
