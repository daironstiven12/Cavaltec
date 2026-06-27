from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


class AssessmentCreate(BaseModel):
    company_id: int
    questionnaire_version_id: int


class AssessmentUpdate(BaseModel):
    status: Optional[str] = None
    finished_at: Optional[datetime] = None


class AssessmentAnswerCreate(BaseModel):
    question_id: int
    option_id: int
    observations: Optional[str] = None


class AssessmentAnswerResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    assessment_id: int
    question_id: int
    option_id: Optional[int] = None
    score: Optional[float] = None
    observations: Optional[str] = None


class AssessmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    company_id: int
    evaluator_id: int
    questionnaire_version_id: int
    status: Optional[str] = None
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    created_at: Optional[datetime] = None


class AssessmentWithDetailsResponse(AssessmentResponse):
    company_name: Optional[str] = None
    evaluator_name: Optional[str] = None
    compliance_percentage: Optional[float] = None


class CategoryResultResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    assessment_id: int
    category_id: int
    score: float
    max_score: float
    percentage: float


class AssessmentResultResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    assessment_id: int
    total_score: float
    compliance_percentage: float
    compliance_level: str
    risk_level: str
    summary: Optional[str] = None
    generated_at: Optional[datetime] = None
