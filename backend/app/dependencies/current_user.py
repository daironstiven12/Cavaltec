from __future__ import annotations

from typing import Any, Dict

from fastapi import Depends, HTTPException, status
from jose import ExpiredSignatureError, JWTError

from app.core.exceptions import (
    ExpiredTokenError,
    InactiveUserError,
    InvalidCredentialsError,
    InvalidTokenError,
)
from app.core.security import oauth2_scheme, verify_access_token


async def get_current_user(
    token: str = Depends(oauth2_scheme),
) -> Dict[str, Any]:
    """Dependencia que obtiene el usuario autenticado a partir del token JWT.

    Extrae y valida el token del header Authorization,
    decodifica el payload y retorna los datos del usuario.

    Args:
        token: Token JWT extraído automáticamente por OAuth2PasswordBearer.

    Returns:
        Diccionario con los datos del usuario extraídos del token.

    Raises:
        InvalidTokenError: Si el token es inválido o está mal formado.
        ExpiredTokenError: Si el token ha expirado.
        InactiveUserError: Si el usuario está deshabilitado.
        HTTPException: Con código 401 si ocurre cualquiera de los errores anteriores.
    """
    try:
        payload = verify_access_token(token)
    except ExpiredSignatureError as exc:
        raise ExpiredTokenError("Token expirado") from exc
    except JWTError as exc:
        raise InvalidTokenError("Token inválido") from exc

    user_id: Any = payload.get("sub")
    if user_id is None:
        raise InvalidCredentialsError("No se pudo identificar al usuario")

    is_active: bool = payload.get("is_active", True)
    if not is_active:
        raise InactiveUserError("Usuario inactivo")

    return {
        "id": user_id,
        "email": payload.get("email", ""),
        "role": payload.get("role", ""),
        "company_id": payload.get("company_id"),
        "is_active": is_active,
    }


async def get_current_active_user(
    current_user: Dict[str, Any] = Depends(get_current_user),
) -> Dict[str, Any]:
    """Dependencia que verifica que el usuario autenticado esté activo.

    Args:
        current_user: Usuario obtenido por get_current_user.

    Returns:
        Diccionario con los datos del usuario activo.

    Raises:
        InactiveUserError: Si el usuario no está activo.
    """
    if not current_user.get("is_active", True):
        raise InactiveUserError("Usuario inactivo")
    return current_user
