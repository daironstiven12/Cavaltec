from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.ai.openrouter import openrouter_service
from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.models.ai_conversation import AIConversation
from app.models.ai_recommendation import AIRecommendation
from app.schemas.ai_v2 import (
    AIChatRequest,
    AIChatResponse,
    AIConversationListResponse,
    AIConversationResponse,
    AIRecommendationResponse,
)

router = APIRouter(prefix="/ai", tags=["AI"])


@router.post("/chat", response_model=AIChatResponse)
async def chat(
    request: AIChatRequest,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Envía un mensaje al asistente IA y retorna la respuesta."""
    # Obtener historial de la conversación anterior si existe
    conversation_history = []
    if request.conversation_id:
        prev_conv = (
            db.query(AIConversation)
            .filter(
                AIConversation.id == request.conversation_id,
                AIConversation.user_id == current_user["id"],
            )
            .first()
        )
        if prev_conv and prev_conv.response:
            conversation_history = [
                {"role": "user", "content": prev_conv.prompt},
                {"role": "assistant", "content": prev_conv.response},
            ]

    # Obtener respuesta de OpenRouter
    response_text = await openrouter_service.chat(
        message=request.message,
        conversation_history=conversation_history,
        context=f"Evaluación ID: {request.assessment_id}" if request.assessment_id else None,
    )

    # Guardar conversación
    conversation = AIConversation(
        user_id=current_user["id"],
        assessment_id=request.assessment_id,
        prompt=request.message,
        response=response_text,
        model=openrouter_service.DEFAULT_MODEL,
        tokens_used=len(response_text.split()),
    )
    db.add(conversation)
    db.flush()

    return AIChatResponse(
        conversation_id=conversation.id,
        response=response_text,
        model=conversation.model or "openrouter",
        tokens_used=conversation.tokens_used or 0,
    )


@router.get("/conversations", response_model=List[AIConversationListResponse])
def list_conversations(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Lista todas las conversaciones del usuario."""
    conversations = (
        db.query(AIConversation)
        .filter(AIConversation.user_id == current_user["id"])
        .order_by(AIConversation.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )
    return conversations


@router.get("/conversations/{conversation_id}", response_model=AIConversationResponse)
def get_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Obtiene los detalles de una conversación."""
    conv = (
        db.query(AIConversation)
        .filter(
            AIConversation.id == conversation_id,
            AIConversation.user_id == current_user["id"],
        )
        .first()
    )
    if not conv:
        raise HTTPException(status_code=404, detail="Conversación no encontrada")
    return conv


@router.delete("/conversations/{conversation_id}", status_code=204)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Elimina una conversación."""
    conv = (
        db.query(AIConversation)
        .filter(
            AIConversation.id == conversation_id,
            AIConversation.user_id == current_user["id"],
        )
        .first()
    )
    if not conv:
        raise HTTPException(status_code=404, detail="Conversación no encontrada")
    db.delete(conv)
    db.flush()


@router.post("/analyze-assessment")
async def analyze_assessment(
    assessment_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Analiza una evaluación y genera recomendaciones con IA."""
    from app.repositories.assessment_repository import AssessmentRepository

    a_repo = AssessmentRepository(db)
    assessment = a_repo.get_by_id(assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")

    result = a_repo.get_results(assessment_id)
    category_results = a_repo.get_category_results(assessment_id)

    category_scores = {
        f"Categoría {cr.category_id}": cr.percentage for cr in category_results
    }

    analysis = await openrouter_service.analyze_assessment(
        compliance_percentage=result.compliance_percentage if result else 0,
        category_scores=category_scores,
        company_name=assessment.company.business_name if assessment.company else "N/A",
    )

    return {"analysis": analysis}


@router.get("/recommendations", response_model=List[AIRecommendationResponse])
def get_recommendations(
    assessment_result_id: Optional[int] = Query(None),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Obtiene las recomendaciones de IA."""
    query = db.query(AIRecommendation)
    if assessment_result_id:
        query = query.filter(
            AIRecommendation.assessment_result_id == assessment_result_id
        )
    return query.order_by(AIRecommendation.created_at.desc()).all()


@router.post("/generate-recommendations", response_model=List[AIRecommendationResponse])
async def generate_recommendations(
    assessment_id: int = Query(...),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Genera recomendaciones automáticas para una evaluación."""
    from app.repositories.assessment_repository import AssessmentRepository

    a_repo = AssessmentRepository(db)
    assessment = a_repo.get_by_id(assessment_id)
    if not assessment:
        raise HTTPException(status_code=404, detail="Evaluación no encontrada")

    result = a_repo.get_results(assessment_id)
    if not result:
        raise HTTPException(status_code=400, detail="La evaluación no tiene resultados")

    category_results = a_repo.get_category_results(assessment_id)

    category_scores = {
        f"Categoría {cr.category_id}": cr.percentage for cr in category_results
    }

    recommendations = await openrouter_service.generate_recommendations(
        compliance_percentage=result.compliance_percentage if result else 0,
        category_scores=category_scores,
    )

    saved = []
    for rec in recommendations:
        db_rec = AIRecommendation(
            assessment_result_id=result.id,
            title=rec.get("title", ""),
            description=rec.get("description", ""),
            priority=rec.get("priority", "MEDIUM"),
            status="PENDING",
        )
        db.add(db_rec)
        db.flush()
        saved.append(db_rec)

    return saved
