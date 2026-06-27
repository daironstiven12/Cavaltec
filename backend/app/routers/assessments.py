from datetime import datetime, timezone
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.models.assessment_answer import AssessmentAnswer
from app.repositories.assessment_repository import AssessmentRepository
from app.schemas.assessment_v2 import (
    AssessmentAnswerCreate,
    AssessmentAnswerResponse,
    AssessmentCreate,
    AssessmentResponse,
    AssessmentUpdate,
    AssessmentWithDetailsResponse,
    CategoryResultResponse,
)

router = APIRouter(prefix="/assessments", tags=["Assessments"])


@router.get("/", response_model=List[AssessmentWithDetailsResponse])
def list_assessments(
    skip: int = 0,
    limit: int = 100,
    company_id: Optional[int] = Query(None),
    status_filter: Optional[str] = Query(None, alias="status"),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    assessments = repo.get_all(
        skip=skip, limit=limit, company_id=company_id, status=status_filter
    )
    result = []
    for a in assessments:
        a_dict = AssessmentWithDetailsResponse.model_validate(a)
        a_dict.company_name = a.company.business_name if a.company else None
        a_dict.evaluator_name = (
            f"{a.evaluator.first_name} {a.evaluator.last_name}"
            if a.evaluator
            else None
        )
        if a.result:
            a_dict.compliance_percentage = a.result.compliance_percentage
        result.append(a_dict)
    return result


@router.get("/{assessment_id}", response_model=AssessmentWithDetailsResponse)
def get_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    assessment = repo.get_by_id(assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")
    a_dict = AssessmentWithDetailsResponse.model_validate(assessment)
    a_dict.company_name = (
        assessment.company.business_name if assessment.company else None
    )
    a_dict.evaluator_name = (
        f"{assessment.evaluator.first_name} {assessment.evaluator.last_name}"
        if assessment.evaluator
        else None
    )
    if assessment.result:
        a_dict.compliance_percentage = assessment.result.compliance_percentage
    return a_dict


@router.post("/", response_model=AssessmentResponse, status_code=status.HTTP_201_CREATED)
def create_assessment(
    assessment_data: AssessmentCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    data = assessment_data.model_dump()
    data["evaluator_id"] = current_user["id"]
    data["started_at"] = datetime.now(timezone.utc)
    data["status"] = "IN_PROGRESS"
    return repo.create(data)


@router.put("/{assessment_id}", response_model=AssessmentResponse)
def update_assessment(
    assessment_id: int,
    assessment_data: AssessmentUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    assessment = repo.update(
        assessment_id, assessment_data.model_dump(exclude_unset=True)
    )
    if not assessment:
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")
    return assessment


@router.delete("/{assessment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    if not repo.delete(assessment_id):
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")


@router.get("/{assessment_id}/results")
def get_assessment_results(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    results = repo.get_results(assessment_id)
    if not results:
        raise HTTPException(
            status_code=404, detail="Resultados no encontrados para esta evaluación"
        )
    return {
        "id": results.id,
        "assessment_id": results.assessment_id,
        "total_score": results.total_score,
        "compliance_percentage": results.compliance_percentage,
        "compliance_level": results.compliance_level,
        "risk_level": results.risk_level,
        "generated_at": results.generated_at,
    }


@router.get("/{assessment_id}/categories", response_model=List[CategoryResultResponse])
def get_category_results(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    return repo.get_category_results(assessment_id)


@router.post(
    "/{assessment_id}/answers",
    status_code=status.HTTP_201_CREATED,
)
def save_answers(
    assessment_id: int,
    answers: List[AssessmentAnswerCreate],
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    assessment = repo.get_by_id(assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")

    if assessment.status == "DRAFT":
        repo.update(assessment_id, {"status": "IN_PROGRESS"})

    results = []
    for answer in answers:
        # Obtener el score de la opción seleccionada
        from app.models.question_option import QuestionOption
        option = db.query(QuestionOption).filter(QuestionOption.id == answer.option_id).first()
        score = option.option_value if option else 0

        db_answer = AssessmentAnswer(
            assessment_id=assessment_id,
            question_id=answer.question_id,
            option_id=answer.option_id,
            score=score,
            observations=answer.observations,
            answered_at=datetime.now(timezone.utc),
        )
        repo._db.add(db_answer)
        repo._db.flush()
        results.append({
            "id": db_answer.id,
            "assessment_id": db_answer.assessment_id,
            "question_id": db_answer.question_id,
            "option_id": db_answer.option_id,
            "score": db_answer.score,
            "observations": db_answer.observations,
        })

    return results


@router.patch("/{assessment_id}/complete")
def complete_assessment(
    assessment_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    repo = AssessmentRepository(db)
    assessment = repo.update(assessment_id, {
        "status": "COMPLETED",
        "finished_at": datetime.now(timezone.utc),
    })
    if not assessment:
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")

    # Calcular resultados
    answers = (
        repo._db.query(AssessmentAnswer)
        .filter(AssessmentAnswer.assessment_id == assessment_id)
        .all()
    )

    total_score = sum(float(a.score or 0) for a in answers)
    max_score = len(answers) * 10
    compliance = (total_score / max_score * 100) if max_score > 0 else 0

    compliance_level = "LOW"
    if compliance >= 90:
        compliance_level = "EXCELLENT"
    elif compliance >= 70:
        compliance_level = "HIGH"
    elif compliance >= 50:
        compliance_level = "MEDIUM"

    result_data = {
        "assessment_id": assessment_id,
        "total_score": total_score,
        "compliance_percentage": round(compliance, 1),
        "compliance_level": compliance_level,
        "risk_level": "MEDIUM",
    }
    repo.create_result(result_data)

    return {"message": "Evaluación completada", "compliance_percentage": round(compliance, 1)}
