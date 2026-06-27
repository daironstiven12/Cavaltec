from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy.orm import Session, joinedload

from app.models.company import Company
from app.models.role import Role
from app.models.user import User


class AuthRepository:
    """Repositorio de autenticación.

    Capa de acceso a datos para las operaciones de autenticación.
    Único responsable de acceder a las tablas users y companies.
    No contiene lógica de negocio.
    """

    def __init__(self, db: Session) -> None:
        self._db = db

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Busca un usuario por su correo electrónico.

        Args:
            email: Correo electrónico del usuario.

        Returns:
            Usuario encontrado o None si no existe.
        """
        return (
            self._db.query(User)
            .options(
                joinedload(User.company),
                joinedload(User.role).joinedload(Role.role_permissions),
            )
            .filter(User.email == email)
            .first()
        )

    def get_user_by_id(self, user_id: int) -> Optional[User]:
        """Busca un usuario por su ID.

        Args:
            user_id: ID del usuario.

        Returns:
            Usuario encontrado o None si no existe.
        """
        return (
            self._db.query(User)
            .options(
                joinedload(User.company),
                joinedload(User.role).joinedload(Role.role_permissions),
            )
            .filter(User.id == user_id)
            .first()
        )

    def email_exists(self, email: str) -> bool:
        """Verifica si un correo electrónico ya está registrado.

        Args:
            email: Correo electrónico a verificar.

        Returns:
            True si el correo ya existe.
        """
        return self._db.query(User.id).filter(User.email == email).first() is not None

    def nit_exists(self, nit: str) -> bool:
        """Verifica si un NIT ya está registrado.

        Args:
            nit: NIT a verificar.

        Returns:
            True si el NIT ya existe.
        """
        return (
            self._db.query(Company.id).filter(Company.nit == nit).first() is not None
        )

    def create_company(self, data: dict) -> Company:
        """Crea una nueva empresa.

        Args:
            data: Diccionario con los datos de la empresa.

        Returns:
            Empresa creada.
        """
        company = Company(**data)
        self._db.add(company)
        self._db.flush()
        return company

    def create_user(self, data: dict) -> User:
        """Crea un nuevo usuario.

        Args:
            data: Diccionario con los datos del usuario.

        Returns:
            Usuario creado.
        """
        user = User(**data)
        self._db.add(user)
        self._db.flush()
        return user

    def get_role_by_name(self, name: str) -> Optional[Role]:
        """Busca un rol por su nombre.

        Args:
            name: Nombre del rol.

        Returns:
            Rol encontrado o None si no existe.
        """
        return (
            self._db.query(Role)
            .options(joinedload(Role.role_permissions))
            .filter(Role.name == name)
            .first()
        )

    def update_last_login(self, user_id: int) -> None:
        """Actualiza la fecha del último inicio de sesión.

        Args:
            user_id: ID del usuario.
        """
        self._db.query(User).filter(User.id == user_id).update(
            {"last_login": datetime.now()}
        )
        self._db.flush()

    def update_last_login_ip(self, user_id: int, ip: str) -> None:
        """Actualiza la IP del último inicio de sesión.

        Args:
            user_id: ID del usuario.
            ip: Dirección IP.
        """
        self._db.query(User).filter(User.id == user_id).update(
            {"last_login_ip": ip}
        )
        self._db.flush()

    def increment_failed_attempts(self, user_id: int) -> None:
        """Incrementa el contador de intentos fallidos.

        Args:
            user_id: ID del usuario.
        """
        self._db.query(User).filter(User.id == user_id).update(
            {User.failed_login_attempts: User.failed_login_attempts + 1}
        )
        self._db.flush()

    def reset_failed_attempts(self, user_id: int) -> None:
        """Reinicia el contador de intentos fallidos.

        Args:
            user_id: ID del usuario.
        """
        self._db.query(User).filter(User.id == user_id).update(
            {"failed_login_attempts": 0}
        )
        self._db.flush()

    def lock_user(self, user_id: int, until: datetime) -> None:
        """Bloquea un usuario hasta una fecha determinada.

        Args:
            user_id: ID del usuario.
            until: Fecha hasta la cual estará bloqueado.
        """
        self._db.query(User).filter(User.id == user_id).update(
            {"locked_until": until}
        )
        self._db.flush()

    def update_password_changed_at(self, user_id: int) -> None:
        """Actualiza la fecha de cambio de contraseña.

        Args:
            user_id: ID del usuario.
        """
        self._db.query(User).filter(User.id == user_id).update(
            {"password_changed_at": datetime.now()}
        )
        self._db.flush()
