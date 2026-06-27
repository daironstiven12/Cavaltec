from __future__ import annotations

from typing import Any, Dict, List

from fastapi import Depends, HTTPException, status

from app.core.exceptions import InsufficientPermissionsError
from app.dependencies.current_user import get_current_active_user


def require_role(required_role: str):
    """Crea una dependencia que verifica que el usuario tenga un rol específico.

    La verificación se realiza contra el campo 'role' del payload del token.
    La lógica de consulta a la base de datos se implementará en Sprint 2.

    Args:
        required_role: Nombre del rol requerido (ej: 'super_admin').

    Returns:
        Función de dependencia FastAPI.
    """
    async def _role_checker(
        current_user: Dict[str, Any] = Depends(get_current_active_user),
    ) -> Dict[str, Any]:
        user_role = current_user.get("role", "")
        if user_role != required_role:
            raise InsufficientPermissionsError(
                f"Se requiere rol '{required_role}'"
            )
        return current_user

    return _role_checker


def require_permission(required_permission: str):
    """Crea una dependencia que verifica que el usuario tenga un permiso específico.

    La verificación de permisos se integrará con la base de datos
    en Sprint 2. Por ahora valida contra un conjunto predefinido
    de permisos que puede venir en el payload del token.

    Args:
        required_permission: Código del permiso requerido (ej: 'users.create').

    Returns:
        Función de dependencia FastAPI.
    """
    async def _permission_checker(
        current_user: Dict[str, Any] = Depends(get_current_active_user),
    ) -> Dict[str, Any]:
        user_permissions: List[str] = current_user.get("permissions", [])
        if required_permission not in user_permissions:
            raise InsufficientPermissionsError(
                f"Se requiere permiso '{required_permission}'"
            )
        return current_user

    return _permission_checker


def require_any_role(allowed_roles: List[str]):
    """Crea una dependencia que permite el acceso si el usuario tiene
    al menos uno de los roles especificados.

    Args:
        allowed_roles: Lista de nombres de roles permitidos.

    Returns:
        Función de dependencia FastAPI.
    """
    async def _role_set_checker(
        current_user: Dict[str, Any] = Depends(get_current_active_user),
    ) -> Dict[str, Any]:
        user_role = current_user.get("role", "")
        if user_role not in allowed_roles:
            raise InsufficientPermissionsError(
                f"Se requiere uno de los roles: {', '.join(allowed_roles)}"
            )
        return current_user

    return _role_set_checker
