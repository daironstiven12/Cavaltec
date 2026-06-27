from __future__ import annotations

from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.ai_conversation import AIConversation
from app.models.ai_recommendation import AIRecommendation


class AIRepository:
    """Repositorio de acceso a datos para conversaciones y recomendaciones de IA."""

    def __init__(self, db: Session) -> None:
        self._db = db

    def get_conversations(
        self, user_id: int, skip: int = 0, limit: int = 50
    ) -> List[AIConversation]:
        return (
            self._db.query(AIConversation)
            .filter(AIConversation.user_id == user_id)
            .order_by(AIConversation.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_conversation_by_id(
        self, conversation_id: int, user_id: int
    ) -> Optional[AIConversation]:
        return (
            self._db.query(AIConversation)
            .filter(
                AIConversation.id == conversation_id,
                AIConversation.user_id == user_id,
            )
            .first()
        )

    def create_conversation(self, data: dict) -> AIConversation:
        conv = AIConversation(**data)
        self._db.add(conv)
        self._db.flush()
        return conv

    def get_recommendations(
        self,
        assessment_result_id: Optional[int] = None,
    ) -> List[AIRecommendation]:
        query = self._db.query(AIRecommendation)
        if assessment_result_id:
            query = query.filter(
                AIRecommendation.assessment_result_id == assessment_result_id
            )
        return query.order_by(AIRecommendation.created_at.desc()).all()

    def create_recommendation(self, data: dict) -> AIRecommendation:
        rec = AIRecommendation(**data)
        self._db.add(rec)
        self._db.flush()
        return rec

    def update_recommendation_status(
        self, recommendation_id: int, status: str
    ) -> Optional[AIRecommendation]:
        rec = (
            self._db.query(AIRecommendation)
            .filter(AIRecommendation.id == recommendation_id)
            .first()
        )
        if not rec:
            return None
        rec.status = status
        self._db.flush()
        return rec
