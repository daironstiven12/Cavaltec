from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr

from app.core.enums import CompanySize


class CompanyBase(BaseModel):
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
    is_active: Optional[bool] = True


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(CompanyBase):
    business_name: Optional[str] = None
    nit: Optional[str] = None
    email: Optional[EmailStr] = None
    company_size: Optional[CompanySize] = None


class CompanyResponse(CompanyBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
