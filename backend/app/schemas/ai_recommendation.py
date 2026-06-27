from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.core.enums import RecommendationStatus


class AIRecommendationBase(BaseModel):
    user_id: int
    conversation_id: Optional[int] = None
    assessment_id: Optional[int] = None
    title: str
    description: Optional[str] = None
    priority: Optional[str] = None
    category: Optional[str] = None
    status: Optional[RecommendationStatus] = RecommendationStatus.PENDING


class AIRecommendationCreate(AIRecommendationBase):
    pass


class AIRecommendationUpdate(AIRecommendationBase):
    user_id: Optional[int] = None
    title: Optional[str] = None
    status: Optional[RecommendationStatus] = None


class AIRecommendationResponse(AIRecommendationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
