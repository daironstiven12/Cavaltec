from __future__ import annotations

from typing import List

from sqlalchemy import text
from sqlalchemy.orm import Session


class NotificationRepository:
    """Repositorio de acceso a datos para notificaciones."""

    def __init__(self, db: Session) -> None:
        self._db = db

    def get_by_user(
        self, user_id: int, skip: int = 0, limit: int = 50, unread_only: bool = False
    ) -> List[dict]:
        query = text("""
            SELECT id, user_id, title, message, type, is_read, created_at
            FROM notifications
            WHERE user_id = :user_id
        """)

        params = {"user_id": user_id, "limit": limit, "skip": skip}

        if unread_only:
            query = text(str(query) + " AND is_read = FALSE")

        query = text(str(query) + " ORDER BY created_at DESC LIMIT :limit OFFSET :skip")

        result = self._db.execute(query, params)
        return [
            {
                "id": row[0],
                "user_id": row[1],
                "title": row[2],
                "message": row[3],
                "type": row[4],
                "is_read": row[5],
                "created_at": row[6],
            }
            for row in result
        ]

    def count_unread(self, user_id: int) -> int:
        result = self._db.execute(
            text("SELECT COUNT(*) FROM notifications WHERE user_id = :user_id AND is_read = FALSE"),
            {"user_id": user_id},
        )
        return result.scalar() or 0

    def mark_as_read(self, notification_id: int, user_id: int) -> bool:
        self._db.execute(
            text("UPDATE notifications SET is_read = TRUE WHERE id = :id AND user_id = :user_id"),
            {"id": notification_id, "user_id": user_id},
        )
        self._db.flush()
        return True

    def mark_all_as_read(self, user_id: int) -> bool:
        self._db.execute(
            text("UPDATE notifications SET is_read = TRUE WHERE user_id = :user_id AND is_read = FALSE"),
            {"user_id": user_id},
        )
        self._db.flush()
        return True

    def create(self, data: dict) -> int:
        result = self._db.execute(
            text("""INSERT INTO notifications (user_id, title, message, type, is_read, created_at)
               VALUES (:user_id, :title, :message, :type, FALSE, NOW())"""),
            data,
        )
        self._db.flush()
        return result.lastrowid
