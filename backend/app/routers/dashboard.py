from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.models.assessment import Assessment
from app.models.assessment_result import AssessmentResult
from app.models.company import Company
from app.models.category_result import CategoryResult
from app.repositories.assessment_repository import AssessmentRepository
from app.schemas.dashboard_v2 import (
    ComplianceByCategory,
    DashboardStats,
    RecentActivity,
)

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/admin", response_model=DashboardStats)
def get_admin_dashboard(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    total_evaluations = db.query(func.count(Assessment.id)).scalar() or 0
    total_companies = db.query(func.count(Company.id)).scalar() or 0

    avg_compliance = (
        db.query(func.avg(AssessmentResult.compliance_percentage)).scalar() or 0
    )

    completed = (
        db.query(func.count(Assessment.id))
        .filter(Assessment.status == "COMPLETED")
        .scalar()
        or 0
    )

    return DashboardStats(
        total_evaluations=total_evaluations,
        average_compliance=round(float(avg_compliance), 1),
        total_companies=total_companies,
        total_breaches=max(0, total_evaluations - completed),
        pending_tasks=total_evaluations - completed,
    )


@router.get("/company/{company_id}", response_model=DashboardStats)
def get_company_dashboard(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    total_evaluations = (
        db.query(func.count(Assessment.id))
        .filter(Assessment.company_id == company_id)
        .scalar()
        or 0
    )

    avg_compliance = (
        db.query(func.avg(AssessmentResult.compliance_percentage))
        .join(Assessment, Assessment.id == AssessmentResult.assessment_id)
        .filter(Assessment.company_id == company_id)
        .scalar()
        or 0
    )

    completed = (
        db.query(func.count(Assessment.id))
        .filter(Assessment.company_id == company_id, Assessment.status == "COMPLETED")
        .scalar()
        or 0
    )

    return DashboardStats(
        total_evaluations=total_evaluations,
        average_compliance=round(float(avg_compliance), 1),
        total_companies=1,
        total_breaches=max(0, total_evaluations - completed),
        pending_tasks=total_evaluations - completed,
    )


@router.get("/auditor", response_model=DashboardStats)
def get_auditor_dashboard(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    total_evaluations = (
        db.query(func.count(Assessment.id))
        .filter(Assessment.evaluator_id == current_user["id"])
        .scalar()
        or 0
    )

    avg_compliance = (
        db.query(func.avg(AssessmentResult.compliance_percentage))
        .join(Assessment, Assessment.id == AssessmentResult.assessment_id)
        .filter(Assessment.evaluator_id == current_user["id"])
        .scalar()
        or 0
    )

    companies_audited = (
        db.query(func.count(func.distinct(Assessment.company_id)))
        .filter(Assessment.evaluator_id == current_user["id"])
        .scalar()
        or 0
    )

    return DashboardStats(
        total_evaluations=total_evaluations,
        average_compliance=round(float(avg_compliance), 1),
        total_companies=companies_audited,
        total_breaches=0,
        pending_tasks=0,
    )


@router.get("/compliance-by-category", response_model=List[ComplianceByCategory])
def get_compliance_by_category(
    company_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    query = (
        db.query(
            CategoryResult.category_id,
            func.avg(CategoryResult.percentage).label("avg_percentage"),
        )
        .group_by(CategoryResult.category_id)
    )

    if company_id:
        query = query.join(
            Assessment, Assessment.id == CategoryResult.assessment_id
        ).filter(Assessment.company_id == company_id)

    results = query.all()

    category_names = {
        1: "Política de Datos",
        2: "Privacidad desde el Diseño",
        3: "Gobernanza",
        4: "Seguridad",
    }

    return [
        ComplianceByCategory(
            category=category_names.get(r.category_id, f"Categoría {r.category_id}"),
            percentage=round(float(r.avg_percentage), 1),
        )
        for r in results
    ]


@router.get("/recent-activity", response_model=List[RecentActivity])
def get_recent_activity(
    company_id: Optional[int] = Query(None),
    limit: int = Query(10),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    query = (
        db.query(
            Assessment.id,
            Assessment.status,
            Assessment.created_at,
            Assessment.company_id,
        )
        .order_by(Assessment.created_at.desc())
        .limit(limit)
    )

    if company_id:
        query = query.filter(Assessment.company_id == company_id)

    assessments = query.all()

    return [
        RecentActivity(
            id=a.id,
            action=a.status,
            description=f"Evaluación #{a.id} - {a.status}",
            date=a.created_at,
        )
        for a in assessments
    ]
