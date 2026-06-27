from __future__ import annotations

from typing import List, Optional

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.assessment import Assessment
from app.models.assessment_result import AssessmentResult
from app.models.category_result import CategoryResult


class AssessmentRepository:
    """Repositorio de acceso a datos para evaluaciones."""

    def __init__(self, db: Session) -> None:
        self._db = db

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        company_id: Optional[int] = None,
        status: Optional[str] = None,
    ) -> List[Assessment]:
        query = self._db.query(Assessment).options(
            joinedload(Assessment.company),
            joinedload(Assessment.evaluator),
            joinedload(Assessment.questionnaire_version),
        )
        if company_id:
            query = query.filter(Assessment.company_id == company_id)
        if status:
            query = query.filter(Assessment.status == status)
        return query.order_by(Assessment.created_at.desc()).offset(skip).limit(limit).all()

    def get_by_id(self, assessment_id: int) -> Optional[Assessment]:
        return (
            self._db.query(Assessment)
            .options(
                joinedload(Assessment.company),
                joinedload(Assessment.evaluator),
                joinedload(Assessment.questionnaire_version),
                joinedload(Assessment.answers),
                joinedload(Assessment.result),
                joinedload(Assessment.category_results),
            )
            .filter(Assessment.id == assessment_id)
            .first()
        )

    def create(self, data: dict) -> Assessment:
        assessment = Assessment(**data)
        self._db.add(assessment)
        self._db.flush()
        return assessment

    def update(self, assessment_id: int, data: dict) -> Optional[Assessment]:
        assessment = self.get_by_id(assessment_id)
        if not assessment:
            return None
        for key, value in data.items():
            if value is not None:
                setattr(assessment, key, value)
        self._db.flush()
        return assessment

    def delete(self, assessment_id: int) -> bool:
        assessment = self.get_by_id(assessment_id)
        if not assessment:
            return False
        self._db.delete(assessment)
        self._db.flush()
        return True

    def count(
        self,
        company_id: Optional[int] = None,
        status: Optional[str] = None,
    ) -> int:
        query = self._db.query(func.count(Assessment.id))
        if company_id:
            query = query.filter(Assessment.company_id == company_id)
        if status:
            query = query.filter(Assessment.status == status)
        return query.scalar() or 0

    def get_results(self, assessment_id: int) -> Optional[AssessmentResult]:
        return (
            self._db.query(AssessmentResult)
            .filter(AssessmentResult.assessment_id == assessment_id)
            .first()
        )

    def create_result(self, data: dict) -> AssessmentResult:
        result = AssessmentResult(**data)
        self._db.add(result)
        self._db.flush()
        return result

    def get_category_results(self, assessment_id: int) -> List[CategoryResult]:
        return (
            self._db.query(CategoryResult)
            .filter(CategoryResult.assessment_id == assessment_id)
            .all()
        )

    def create_category_result(self, data: dict) -> CategoryResult:
        result = CategoryResult(**data)
        self._db.add(result)
        self._db.flush()
        return result

    def get_assessments_with_results(self, company_id: Optional[int] = None) -> List[dict]:
        query = (
            self._db.query(
                Assessment.id,
                Assessment.status,
                Assessment.created_at,
                func.coalesce(AssessmentResult.compliance_percentage, 0).label("compliance"),
            )
            .outerjoin(AssessmentResult, Assessment.id == AssessmentResult.assessment_id)
        )
        if company_id:
            query = query.filter(Assessment.company_id == company_id)
        return query.all()
