from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.models.questionnaire import Questionnaire
from app.models.questionnaire_version import QuestionnaireVersion
from app.models.question_category import QuestionCategory
from app.models.question import Question
from app.models.question_option import QuestionOption

router = APIRouter(prefix="/questions", tags=["Questions"])


@router.get("/questionnaires")
def list_questionnaires(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Lista todos los cuestionarios."""
    questionnaires = (
        db.query(Questionnaire).offset(skip).limit(limit).all()
    )
    return [
        {
            "id": q.id,
            "name": q.name,
            "description": q.description,
            "is_active": q.is_active,
        }
        for q in questionnaires
    ]


@router.get("/questionnaires/{questionnaire_id}")
def get_questionnaire(
    questionnaire_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Obtiene un cuestionario con sus versiones."""
    q = db.query(Questionnaire).filter(Questionnaire.id == questionnaire_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Cuestionario no encontrado")

    versions = (
        db.query(QuestionnaireVersion)
        .filter(QuestionnaireVersion.questionnaire_id == questionnaire_id)
        .all()
    )

    return {
        "id": q.id,
        "name": q.name,
        "description": q.description,
        "is_active": q.is_active,
        "versions": [
            {
                "id": v.id,
                "version_number": v.version_number,
                "is_current": v.is_current,
                "published_at": v.published_at,
            }
            for v in versions
        ],
    }


@router.post("/questionnaires", status_code=201)
def create_questionnaire(
    name: str,
    description: str = "",
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Crea un nuevo cuestionario."""
    q = Questionnaire(name=name, description=description, is_active=True)
    db.add(q)
    db.flush()
    return {"id": q.id, "name": q.name, "message": "Cuestionario creado"}


@router.put("/questionnaires/{questionnaire_id}")
def update_questionnaire(
    questionnaire_id: int,
    name: Optional[str] = None,
    description: Optional[str] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Actualiza un cuestionario."""
    q = db.query(Questionnaire).filter(Questionnaire.id == questionnaire_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Cuestionario no encontrado")
    if name:
        q.name = name
    if description is not None:
        q.description = description
    if is_active is not None:
        q.is_active = is_active
    db.flush()
    return {"message": "Cuestionario actualizado"}


@router.get("/versions/{version_id}/categories")
def get_categories(
    version_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Obtiene las categorías de una versión de cuestionario."""
    categories = (
        db.query(QuestionCategory)
        .filter(QuestionCategory.version_id == version_id)
        .order_by(QuestionCategory.display_order)
        .all()
    )
    return [
        {
            "id": c.id,
            "name": c.name,
            "weight": c.weight,
            "display_order": c.display_order,
        }
        for c in categories
    ]


@router.get("/categories/{category_id}/questions")
def get_questions_by_category(
    category_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Obtiene las preguntas de una categoría."""
    questions = (
        db.query(Question)
        .filter(Question.category_id == category_id)
        .order_by(Question.display_order)
        .all()
    )

    result = []
    for q in questions:
        options = (
            db.query(QuestionOption)
            .filter(QuestionOption.question_id == q.id)
            .order_by(QuestionOption.display_order)
            .all()
        )
        result.append({
            "id": q.id,
            "question_text": q.question_text,
            "weight": q.weight,
            "is_required": q.is_required,
            "help_text": q.help_text,
            "explanation": q.explanation,
            "options": [
                {
                    "id": o.id,
                    "option_text": o.option_text,
                    "option_value": o.option_value,
                }
                for o in options
            ],
        })

    return result


@router.post("/questions", status_code=201)
def create_question(
    category_id: int,
    question_text: str,
    weight: float = 1.0,
    display_order: int = 1,
    is_required: bool = True,
    help_text: str = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Crea una nueva pregunta."""
    q = Question(
        category_id=category_id,
        question_text=question_text,
        weight=weight,
        display_order=display_order,
        is_required=is_required,
        help_text=help_text,
        is_active=True,
    )
    db.add(q)
    db.flush()
    return {"id": q.id, "message": "Pregunta creada"}


@router.put("/questions/{question_id}")
def update_question(
    question_id: int,
    question_text: Optional[str] = None,
    weight: Optional[float] = None,
    is_required: Optional[bool] = None,
    is_active: Optional[bool] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Actualiza una pregunta."""
    q = db.query(Question).filter(Question.id == question_id).first()
    if not q:
        raise HTTPException(status_code=404, detail="Pregunta no encontrada")
    if question_text:
        q.question_text = question_text
    if weight is not None:
        q.weight = weight
    if is_required is not None:
        q.is_required = is_required
    if is_active is not None:
        q.is_active = is_active
    db.flush()
    return {"message": "Pregunta actualizada"}
