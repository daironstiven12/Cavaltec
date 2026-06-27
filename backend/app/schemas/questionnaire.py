from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class QuestionnaireBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: Optional[bool] = True


class QuestionnaireCreate(QuestionnaireBase):
    pass


class QuestionnaireUpdate(QuestionnaireBase):
    name: Optional[str] = None


class QuestionnaireResponse(QuestionnaireBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
