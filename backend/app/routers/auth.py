from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.core.exceptions import (
    ExpiredTokenError,
    InactiveUserError,
    InvalidCredentialsError,
    InvalidTokenError,
)
from app.database.session import get_db
from app.dependencies.current_user import get_current_user
from app.repositories.auth_repository import AuthRepository
from app.schemas.auth import (
    AuthenticatedUserResponse,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    TokenResponse,
    UserProfileResponse,
)
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])


def _get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(AuthRepository(db))


@router.post(
    "/register",
    response_model=AuthenticatedUserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Registro de empresa y usuario administrador",
    description=(
        "Crea una nueva empresa con su usuario administrador. "
        "Valida que el correo y el NIT no estén registrados previamente. "
        "Retorna los datos del usuario autenticado con access token y refresh token."
    ),
)
def register(
    request: RegisterRequest,
    request_obj: Request,
    service: AuthService = Depends(_get_auth_service),
) -> AuthenticatedUserResponse:
    ip_address = request_obj.client.host if request_obj.client else "127.0.0.1"
    try:
        return service.register(request, ip_address)
    except InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=exc.detail,
        )


@router.post(
    "/login",
    response_model=AuthenticatedUserResponse,
    status_code=status.HTTP_200_OK,
    summary="Inicio de sesión",
    description=(
        "Autentica un usuario con su correo y contraseña. "
        "Verifica credenciales, estado activo, bloqueo por intentos fallidos. "
        "Retorna los datos del usuario autenticado con access token y refresh token."
    ),
)
def login(
    request: LoginRequest,
    request_obj: Request,
    service: AuthService = Depends(_get_auth_service),
) -> AuthenticatedUserResponse:
    ip_address = request_obj.client.host if request_obj.client else "127.0.0.1"
    try:
        return service.login(request, ip_address)
    except InactiveUserError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=exc.detail,
        )
    except InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=exc.detail,
        )


@router.post(
    "/refresh",
    response_model=TokenResponse,
    status_code=status.HTTP_200_OK,
    summary="Renovar access token",
    description=(
        "Genera un nuevo access token a partir de un refresh token válido. "
        "Verifica que el refresh token sea válido y que el usuario siga activo."
    ),
)
def refresh(
    request: RefreshRequest,
    service: AuthService = Depends(_get_auth_service),
) -> TokenResponse:
    try:
        return service.refresh(request)
    except InvalidTokenError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=exc.detail,
        )
    except InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=exc.detail,
        )
    except InactiveUserError as exc:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=exc.detail,
        )


@router.post(
    "/logout",
    status_code=status.HTTP_200_OK,
    summary="Cerrar sesión",
    description=(
        "Prepara el cierre de sesión del usuario. "
        "Actualmente no invalida tokens. Estructura preparada para futura implementación."
    ),
)
def logout(
    service: AuthService = Depends(_get_auth_service),
) -> dict:
    return service.logout()


@router.get(
    "/me",
    response_model=UserProfileResponse,
    status_code=status.HTTP_200_OK,
    summary="Obtener usuario autenticado",
    description=(
        "Retorna la información completa del usuario autenticado "
        "incluyendo empresa, rol y permisos asociados."
    ),
)
def get_me(
    current_user: dict = Depends(get_current_user),
    service: AuthService = Depends(_get_auth_service),
) -> UserProfileResponse:
    try:
        return service.get_current_user(int(current_user["id"]))
    except InvalidCredentialsError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=exc.detail,
        )
