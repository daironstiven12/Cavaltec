from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict


class PermissionBase(BaseModel):
    code: str
    name: str
    description: Optional[str] = None


class PermissionCreate(PermissionBase):
    pass


class PermissionUpdate(PermissionBase):
    code: Optional[str] = None
    name: Optional[str] = None


class PermissionResponse(PermissionBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
