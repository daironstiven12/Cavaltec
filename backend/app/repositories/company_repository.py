from __future__ import annotations

from typing import List, Optional

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.assessment import Assessment
from app.models.company import Company
from app.models.user import User


class CompanyRepository:
    """Repositorio de acceso a datos para empresas."""

    def __init__(self, db: Session) -> None:
        self._db = db

    def get_all(self, skip: int = 0, limit: int = 100) -> List[Company]:
        return (
            self._db.query(Company)
            .options(joinedload(Company.users))
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_by_id(self, company_id: int) -> Optional[Company]:
        return (
            self._db.query(Company)
            .options(joinedload(Company.users))
            .filter(Company.id == company_id)
            .first()
        )

    def get_by_nit(self, nit: str) -> Optional[Company]:
        return self._db.query(Company).filter(Company.nit == nit).first()

    def create(self, data: dict) -> Company:
        company = Company(**data)
        self._db.add(company)
        self._db.flush()
        return company

    def update(self, company_id: int, data: dict) -> Optional[Company]:
        company = self.get_by_id(company_id)
        if not company:
            return None
        for key, value in data.items():
            if value is not None:
                setattr(company, key, value)
        self._db.flush()
        return company

    def delete(self, company_id: int) -> bool:
        company = self.get_by_id(company_id)
        if not company:
            return False
        self._db.delete(company)
        self._db.flush()
        return True

    def count(self) -> int:
        return self._db.query(func.count(Company.id)).scalar() or 0

    def count_active(self) -> int:
        return (
            self._db.query(func.count(Company.id))
            .filter(Company.is_active == True)
            .scalar()
            or 0
        )

    def get_stats(self, company_id: int) -> dict:
        company = self.get_by_id(company_id)
        if not company:
            return {}

        total_users = (
            self._db.query(func.count(User.id))
            .filter(User.company_id == company_id)
            .scalar()
            or 0
        )

        total_assessments = (
            self._db.query(func.count(Assessment.id))
            .filter(Assessment.company_id == company_id)
            .scalar()
            or 0
        )

        completed_assessments = (
            self._db.query(func.count(Assessment.id))
            .filter(
                Assessment.company_id == company_id,
                Assessment.status == "COMPLETED",
            )
            .scalar()
            or 0
        )

        return {
            "total_users": total_users,
            "total_assessments": total_assessments,
            "completed_assessments": completed_assessments,
        }
