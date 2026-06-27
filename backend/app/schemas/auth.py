from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr

from app.core.enums import CompanySize


class RegisterRequest(BaseModel):
    business_name: str
    trade_name: Optional[str] = None
    nit: str
    email: EmailStr
    phone: Optional[str] = None
    sector: Optional[str] = None
    company_size: CompanySize
    address: Optional[str] = None
    city: Optional[str] = None
    department: Optional[str] = None
    website: Optional[str] = None
    first_name: str
    last_name: str
    password: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class RefreshRequest(BaseModel):
    refresh_token: str


class UserCompanyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    business_name: str
    nit: str


class UserRoleResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class UserProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    first_name: str
    last_name: str
    email: str
    is_active: bool
    company: UserCompanyResponse
    role: UserRoleResponse
    permissions: list[str]


class AuthenticatedUserResponse(UserProfileResponse):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
