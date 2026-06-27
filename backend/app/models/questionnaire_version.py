from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class QuestionnaireVersion(Base):
    __tablename__ = "questionnaire_versions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    questionnaire_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("questionnaires.id"), nullable=False
    )
    version_number: Mapped[str] = mapped_column(String(20), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_current: Mapped[Optional[bool]] = mapped_column(Boolean, default=False)
    published_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    created_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    questionnaire: Mapped["Questionnaire"] = relationship(
        back_populates="versions"
    )
    categories: Mapped[list["QuestionCategory"]] = relationship(
        back_populates="version"
    )
    assessments: Mapped[list["Assessment"]] = relationship(
        back_populates="questionnaire_version"
    )
