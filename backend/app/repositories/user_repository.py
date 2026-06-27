from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.models.user import User


class UserRepository:
    """Repositorio de acceso a datos para usuarios."""

    def __init__(self, db: Session) -> None:
        self._db = db

    def get_all(
        self,
        skip: int = 0,
        limit: int = 100,
        company_id: Optional[int] = None,
        role_id: Optional[int] = None,
    ) -> List[User]:
        query = self._db.query(User).options(
            joinedload(User.company),
            joinedload(User.role),
        )
        if company_id:
            query = query.filter(User.company_id == company_id)
        if role_id:
            query = query.filter(User.role_id == role_id)
        return query.offset(skip).limit(limit).all()

    def get_by_id(self, user_id: int) -> Optional[User]:
        return (
            self._db.query(User)
            .options(
                joinedload(User.company),
                joinedload(User.role),
            )
            .filter(User.id == user_id)
            .first()
        )

    def get_by_email(self, email: str) -> Optional[User]:
        return (
            self._db.query(User)
            .options(
                joinedload(User.company),
                joinedload(User.role),
            )
            .filter(User.email == email)
            .first()
        )

    def create(self, data: dict) -> User:
        user = User(**data)
        self._db.add(user)
        self._db.flush()
        return user

    def update(self, user_id: int, data: dict) -> Optional[User]:
        user = self.get_by_id(user_id)
        if not user:
            return None
        for key, value in data.items():
            if value is not None:
                setattr(user, key, value)
        self._db.flush()
        return user

    def delete(self, user_id: int) -> bool:
        user = self.get_by_id(user_id)
        if not user:
            return False
        self._db.delete(user)
        self._db.flush()
        return True

    def count(self, company_id: Optional[int] = None) -> int:
        query = self._db.query(func.count(User.id))
        if company_id:
            query = query.filter(User.company_id == company_id)
        return query.scalar() or 0

    def update_password(self, user_id: int, password_hash: str) -> bool:
        user = self.get_by_id(user_id)
        if not user:
            return False
        user.password_hash = password_hash
        user.password_changed_at = datetime.now()
        self._db.flush()
        return True

    def update_last_login(self, user_id: int, ip: Optional[str] = None) -> None:
        self._db.query(User).filter(User.id == user_id).update(
            {
                "last_login": datetime.now(),
                "last_login_ip": ip,
                "failed_login_attempts": 0,
            }
        )
        self._db.flush()

    def increment_failed_attempts(self, user_id: int) -> None:
        self._db.query(User).filter(User.id == user_id).update(
            {User.failed_login_attempts: User.failed_login_attempts + 1}
        )
        self._db.flush()

    def lock_user(self, user_id: int, until: datetime) -> None:
        self._db.query(User).filter(User.id == user_id).update(
            {"locked_until": until}
        )
        self._db.flush()
