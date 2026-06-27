from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class QuestionnaireVersionBase(BaseModel):
    questionnaire_id: int
    version_number: str
    description: Optional[str] = None
    is_current: Optional[bool] = False
    published_at: Optional[datetime] = None


class QuestionnaireVersionCreate(QuestionnaireVersionBase):
    pass


class QuestionnaireVersionUpdate(QuestionnaireVersionBase):
    questionnaire_id: Optional[int] = None
    version_number: Optional[str] = None
    is_current: Optional[bool] = None


class QuestionnaireVersionResponse(QuestionnaireVersionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
