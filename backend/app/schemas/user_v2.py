from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class UserCreate(BaseModel):
    company_id: int
    role_id: int
    first_name: str
    last_name: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    role_id: Optional[int] = None
    company_id: Optional[int] = None
    is_active: Optional[bool] = None


class UserChangePassword(BaseModel):
    new_password: str


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    company_id: int
    role_id: int
    first_name: str
    last_name: str
    email: str
    is_active: Optional[bool] = True
    last_login: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class UserWithDetailsResponse(UserResponse):
    company_name: Optional[str] = None
    role_name: Optional[str] = None
