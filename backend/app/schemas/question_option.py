from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class QuestionOptionBase(BaseModel):
    question_id: int
    option_text: str
    option_value: float
    display_order: int


class QuestionOptionCreate(QuestionOptionBase):
    pass


class QuestionOptionUpdate(QuestionOptionBase):
    question_id: Optional[int] = None
    option_text: Optional[str] = None
    option_value: Optional[float] = None
    display_order: Optional[int] = None


class QuestionOptionResponse(QuestionOptionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
