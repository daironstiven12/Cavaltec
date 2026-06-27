from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.core.enums import AssessmentStatus


class AssessmentBase(BaseModel):
    company_id: int
    questionnaire_version_id: int
    evaluator_id: int
    started_at: datetime
    finished_at: Optional[datetime] = None
    status: AssessmentStatus = AssessmentStatus.IN_PROGRESS


class AssessmentCreate(AssessmentBase):
    pass


class AssessmentUpdate(AssessmentBase):
    company_id: Optional[int] = None
    questionnaire_version_id: Optional[int] = None
    evaluator_id: Optional[int] = None
    started_at: Optional[datetime] = None
    status: Optional[AssessmentStatus] = None


class AssessmentResponse(AssessmentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
