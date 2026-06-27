from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.core.enums import ComplianceLevel, RiskLevel


class AssessmentResultBase(BaseModel):
    assessment_id: int
    total_score: Optional[float] = None
    compliance_percentage: Optional[float] = None
    compliance_level: Optional[ComplianceLevel] = None
    risk_level: Optional[RiskLevel] = None
    summary: Optional[str] = None
    generated_at: Optional[datetime] = None


class AssessmentResultCreate(AssessmentResultBase):
    pass


class AssessmentResultUpdate(AssessmentResultBase):
    assessment_id: Optional[int] = None


class AssessmentResultResponse(AssessmentResultBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
