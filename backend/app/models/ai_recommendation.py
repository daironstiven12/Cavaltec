from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.enums import RecommendationStatus
from app.database.base import Base


class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("users.id"), nullable=False
    )
    conversation_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("ai_conversations.id"), nullable=True
    )
    assessment_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("assessments.id"), nullable=True
    )
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    priority: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    status: Mapped[Optional[RecommendationStatus]] = mapped_column(
        String(20), default=RecommendationStatus.PENDING
    )
    created_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    user: Mapped["User"] = relationship(back_populates="ai_recommendations")
    conversation: Mapped[Optional["AIConversation"]] = relationship(
        back_populates="recommendations"
    )
    assessment: Mapped[Optional["Assessment"]] = relationship()
