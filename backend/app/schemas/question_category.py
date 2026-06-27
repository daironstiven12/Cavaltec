from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class QuestionCategoryBase(BaseModel):
    version_id: int
    name: str
    description: Optional[str] = None
    weight: float
    display_order: int


class QuestionCategoryCreate(QuestionCategoryBase):
    pass


class QuestionCategoryUpdate(QuestionCategoryBase):
    version_id: Optional[int] = None
    name: Optional[str] = None
    weight: Optional[float] = None
    display_order: Optional[int] = None


class QuestionCategoryResponse(QuestionCategoryBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
