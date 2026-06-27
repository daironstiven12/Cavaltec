from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.core.enums import AuditAction


class AuditLogBase(BaseModel):
    user_id: Optional[int] = None
    action: AuditAction
    entity_type: str
    entity_id: Optional[int] = None
    old_values: Optional[str] = None
    new_values: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None


class AuditLogCreate(AuditLogBase):
    pass


class AuditLogUpdate(AuditLogBase):
    action: Optional[AuditAction] = None
    entity_type: Optional[str] = None


class AuditLogResponse(AuditLogBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
