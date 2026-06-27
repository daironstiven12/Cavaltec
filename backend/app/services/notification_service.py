from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session

from app.repositories.notification_repository import NotificationRepository


class NotificationService:
    """Servicio para gestionar notificaciones del sistema."""

    def __init__(self, db: Session) -> None:
        self._db = db
        self._repo = NotificationRepository(db)

    def notify_assessment_created(self, user_id: int, assessment_id: int, company_name: str):
        """Notifica cuando se crea una nueva evaluación."""
        self._repo.create({
            "user_id": user_id,
            "title": "Nueva evaluación creada",
            "message": f"Se ha creado una nueva evaluación para {company_name}",
            "type": "assessment",
        })

    def notify_assessment_completed(self, user_id: int, assessment_id: int, compliance: float):
        """Notifica cuando se completa una evaluación."""
        self._repo.create({
            "user_id": user_id,
            "title": "Evaluación completada",
            "message": f"La evaluación #{assessment_id} ha sido completada. Cumplimiento: {compliance}%",
            "type": "assessment",
        })

    def notify_new_user(self, admin_user_id: int, new_user_name: str, company_name: str):
        """Notifica cuando se registra un nuevo usuario."""
        self._repo.create({
            "user_id": admin_user_id,
            "title": "Nuevo usuario registrado",
            "message": f"{new_user_name} se ha unido a {company_name}",
            "type": "user",
        })

    def notify_breach_detected(self, user_id: int, category: str, severity: str):
        """Notifica cuando se detecta una brecha de cumplimiento."""
        self._repo.create({
            "user_id": user_id,
            "title": "Brecha detectada",
            "message": f"Se ha detectado una brecha en {category} con severidad {severity}",
            "type": "alert",
        })

    def notify_report_ready(self, user_id: int, report_id: int):
        """Notifica cuando un reporte está listo para descargar."""
        self._repo.create({
            "user_id": user_id,
            "title": "Reporte listo",
            "message": f"El reporte #{report_id} está listo para descargar",
            "type": "report",
        })

    def notify_ai_recommendation(self, user_id: int, title: str):
        """Notifica cuando hay nuevas recomendaciones de IA."""
        self._repo.create({
            "user_id": user_id,
            "title": "Nueva recomendación de IA",
            "message": title,
            "type": "ai",
        })

    def notify_system(self, user_id: int, title: str, message: str):
        """Envía una notificación genérica del sistema."""
        self._repo.create({
            "user_id": user_id,
            "title": title,
            "message": message,
            "type": "system",
        })
