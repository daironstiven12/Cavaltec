from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class QuestionBase(BaseModel):
    category_id: int
    question_text: str
    help_text: Optional[str] = None
    explanation: Optional[str] = None
    weight: float
    display_order: int
    is_required: Optional[bool] = True
    is_active: Optional[bool] = True


class QuestionCreate(QuestionBase):
    pass


class QuestionUpdate(QuestionBase):
    category_id: Optional[int] = None
    question_text: Optional[str] = None
    weight: Optional[float] = None
    display_order: Optional[int] = None


class QuestionResponse(QuestionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
