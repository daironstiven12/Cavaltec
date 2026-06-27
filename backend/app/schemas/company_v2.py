from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr

from app.core.enums import CompanySize


class CompanyCreate(BaseModel):
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
    logo_url: Optional[str] = None
    contact_person: Optional[str] = None


class CompanyUpdate(BaseModel):
    business_name: Optional[str] = None
    trade_name: Optional[str] = None
    nit: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    sector: Optional[str] = None
    company_size: Optional[CompanySize] = None
    address: Optional[str] = None
    city: Optional[str] = None
    department: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
    contact_person: Optional[str] = None
    is_active: Optional[bool] = None


class CompanyResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    business_name: str
    trade_name: Optional[str] = None
    nit: str
    email: str
    phone: Optional[str] = None
    sector: Optional[str] = None
    company_size: CompanySize
    address: Optional[str] = None
    city: Optional[str] = None
    department: Optional[str] = None
    website: Optional[str] = None
    logo_url: Optional[str] = None
    contact_person: Optional[str] = None
    is_active: Optional[bool] = True
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class CompanyStatsResponse(BaseModel):
    total_users: int = 0
    total_assessments: int = 0
    completed_assessments: int = 0
