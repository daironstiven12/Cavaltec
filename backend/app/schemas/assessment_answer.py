from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class AssessmentAnswerBase(BaseModel):
    assessment_id: int
    question_id: int
    option_id: Optional[int] = None
    answer_text: Optional[str] = None
    score: Optional[float] = 0.00
    observations: Optional[str] = None
    answered_at: Optional[datetime] = None


class AssessmentAnswerCreate(AssessmentAnswerBase):
    pass


class AssessmentAnswerUpdate(AssessmentAnswerBase):
    assessment_id: Optional[int] = None
    question_id: Optional[int] = None
    score: Optional[float] = None


class AssessmentAnswerResponse(AssessmentAnswerBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
