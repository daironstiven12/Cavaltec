from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class AIChatRequest(BaseModel):
    message: str
    conversation_id: Optional[int] = None
    assessment_id: Optional[int] = None


class AIConversationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    prompt: str
    response: Optional[str] = None
    model: Optional[str] = None
    tokens_used: Optional[int] = 0
    created_at: Optional[datetime] = None


class AIConversationListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    prompt: str
    response: Optional[str] = None
    model: Optional[str] = None
    created_at: Optional[datetime] = None


class AIChatResponse(BaseModel):
    conversation_id: int
    response: str
    model: str = "openrouter"
    tokens_used: int = 0


class AIRecommendationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    assessment_result_id: int
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[str] = None
    status: str = "PENDING"
    created_at: Optional[datetime] = None
