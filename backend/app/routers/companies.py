from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.repositories.company_repository import CompanyRepository
from app.schemas.company_v2 import (
    CompanyCreate,
    CompanyResponse,
    CompanyStatsResponse,
    CompanyUpdate,
)

router = APIRouter(prefix="/companies", tags=["Companies"])


@router.get("/", response_model=List[CompanyResponse])
def list_companies(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = CompanyRepository(db)
    return repo.get_all(skip=skip, limit=limit)


@router.get("/{company_id}", response_model=CompanyResponse)
def get_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = CompanyRepository(db)
    company = repo.get_by_id(company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    return company


@router.get("/{company_id}/stats", response_model=CompanyStatsResponse)
def get_company_stats(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = CompanyRepository(db)
    stats = repo.get_stats(company_id)
    if not stats:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    return stats


@router.post("/", response_model=CompanyResponse, status_code=status.HTTP_201_CREATED)
def create_company(
    company_data: CompanyCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = CompanyRepository(db)
    if repo.get_by_nit(company_data.nit):
        raise HTTPException(status_code=400, detail="El NIT ya está registrado")
    return repo.create(company_data.model_dump())


@router.put("/{company_id}", response_model=CompanyResponse)
def update_company(
    company_id: int,
    company_data: CompanyUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = CompanyRepository(db)
    company = repo.update(company_id, company_data.model_dump(exclude_unset=True))
    if not company:
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
    return company


@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_company(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = CompanyRepository(db)
    if not repo.delete(company_id):
        raise HTTPException(status_code=404, detail="Empresa no encontrada")
