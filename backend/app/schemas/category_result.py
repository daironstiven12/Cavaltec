from typing import Optional

from pydantic import BaseModel, ConfigDict


class CategoryResultBase(BaseModel):
    assessment_id: int
    category_id: int
    score: float
    max_score: float
    percentage: float


class CategoryResultCreate(CategoryResultBase):
    pass


class CategoryResultUpdate(CategoryResultBase):
    assessment_id: Optional[int] = None
    category_id: Optional[int] = None
    score: Optional[float] = None
    max_score: Optional[float] = None
    percentage: Optional[float] = None


class CategoryResultResponse(CategoryResultBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
