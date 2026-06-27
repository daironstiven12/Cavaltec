from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class AIConversationBase(BaseModel):
    user_id: int
    title: str
    is_pinned: Optional[bool] = False
    messages: Optional[str] = None


class AIConversationCreate(AIConversationBase):
    pass


class AIConversationUpdate(AIConversationBase):
    user_id: Optional[int] = None
    title: Optional[str] = None


class AIConversationResponse(AIConversationBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
