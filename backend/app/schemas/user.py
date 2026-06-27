from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr

from app.core.enums import OAuthProvider


class UserBase(BaseModel):
    company_id: int
    role_id: int
    first_name: str
    last_name: str
    email: EmailStr
    oauth_provider: OAuthProvider = OAuthProvider.LOCAL
    oauth_id: Optional[str] = None
    is_active: Optional[bool] = True
    email_verified: Optional[bool] = False


class UserCreate(UserBase):
    password_hash: Optional[str] = None


class UserUpdate(UserBase):
    company_id: Optional[int] = None
    role_id: Optional[int] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    oauth_provider: Optional[OAuthProvider] = None
    is_active: Optional[bool] = None
    email_verified: Optional[bool] = None


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    failed_login_attempts: Optional[int] = 0
    locked_until: Optional[datetime] = None
    password_changed_at: Optional[datetime] = None
    last_login: Optional[datetime] = None
    last_login_ip: Optional[str] = None
    updated_by: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
