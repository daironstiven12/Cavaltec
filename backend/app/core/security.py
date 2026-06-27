from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Optional

from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, ExpiredSignatureError, jwt
from passlib.context import CryptContext

from app.core.config import settings

_pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def _encode_jwt(
    payload: Dict[str, Any],
    secret_key: str,
    algorithm: str,
) -> str:
    """Core JWT encoding — internal helper."""
    return jwt.encode(payload, secret_key, algorithm=algorithm)


def _decode_jwt(token: str, secret_key: str, algorithms: list[str]) -> Dict[str, Any]:
    """Core JWT decoding — internal helper."""
    return jwt.decode(token, secret_key, algorithms=algorithms)


def create_access_token(
    data: Dict[str, Any],
    expires_delta: Optional[timedelta] = None,
) -> str:
    """Genera un Access Token JWT.

    Args:
        data: Datos a incluir en el payload (ej: {"sub": user_id}).
        expires_delta: Tiempo de expiración personalizado.

    Returns:
        Token JWT codificado como string.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta
        or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "type": "access",
    })
    return _encode_jwt(to_encode, settings.SECRET_KEY, settings.JWT_ALGORITHM)


def verify_access_token(token: str) -> Dict[str, Any]:
    """Verifica y decodifica un Access Token.

    Args:
        token: Token JWT a verificar.

    Returns:
        Payload del token si es válido.

    Raises:
        jwt.ExpiredSignatureError: Si el token expiró.
        jwt.JWTError: Si el token es inválido.
    """
    return _decode_jwt(token, settings.SECRET_KEY, [settings.JWT_ALGORITHM])


def create_refresh_token(
    data: Dict[str, Any],
    expires_delta: Optional[timedelta] = None,
) -> str:
    """Genera un Refresh Token JWT.

    Args:
        data: Datos a incluir en el payload.
        expires_delta: Tiempo de expiración personalizado.

    Returns:
        Refresh token JWT codificado como string.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta
        or timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    )
    to_encode.update({
        "exp": expire,
        "iat": datetime.now(timezone.utc),
        "type": "refresh",
    })
    return _encode_jwt(to_encode, settings.SECRET_KEY, settings.JWT_ALGORITHM)


def verify_refresh_token(token: str) -> Dict[str, Any]:
    """Verifica y decodifica un Refresh Token.

    Args:
        token: Refresh token JWT a verificar.

    Returns:
        Payload del token si es válido.

    Raises:
        jwt.ExpiredSignatureError: Si el token expiró.
        jwt.JWTError: Si el token es inválido.
    """
    payload = _decode_jwt(token, settings.SECRET_KEY, [settings.JWT_ALGORITHM])
    return payload


def hash_password(password: str) -> str:
    """Genera el hash de una contraseña usando Argon2.

    Args:
        password: Contraseña en texto plano.

    Returns:
        Hash de la contraseña.
    """
    return _pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica una contraseña contra su hash.

    Args:
        plain_password: Contraseña en texto plano.
        hashed_password: Hash almacenado.

    Returns:
        True si la contraseña coincide, False en caso contrario.
    """
    return _pwd_context.verify(plain_password, hashed_password)
