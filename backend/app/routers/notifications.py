from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.current_user import get_current_active_user
from app.repositories.notification_repository import NotificationRepository
from app.schemas.dashboard_v2 import NotificationListResponse, NotificationResponse

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("/", response_model=NotificationListResponse)
def list_notifications(
    skip: int = 0,
    limit: int = 50,
    unread_only: bool = Query(False),
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Lista las notificaciones del usuario."""
    repo = NotificationRepository(db)
    notifications = repo.get_by_user(
        user_id=current_user["id"], skip=skip, limit=limit, unread_only=unread_only
    )
    unread_count = repo.count_unread(current_user["id"])
    return NotificationListResponse(
        notifications=[NotificationResponse(**n) for n in notifications],
        unread_count=unread_count,
        total=len(notifications),
    )


@router.get("/unread-count")
def get_unread_count(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Obtiene el conteo de notificaciones no leídas."""
    repo = NotificationRepository(db)
    count = repo.count_unread(current_user["id"])
    return {"unread_count": count}


@router.patch("/{notification_id}/read")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Marca una notificación como leída."""
    repo = NotificationRepository(db)
    repo.mark_as_read(notification_id, current_user["id"])
    return {"message": "Notificación marcada como leída"}


@router.patch("/read-all")
def mark_all_as_read(
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_active_user),
):
    """Marca todas las notificaciones como leídas."""
    repo = NotificationRepository(db)
    repo.mark_all_as_read(current_user["id"])
    return {"message": "Todas las notificaciones marcadas como leídas"}
