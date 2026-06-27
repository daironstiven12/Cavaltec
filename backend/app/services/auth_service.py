from __future__ import annotations

from datetime import datetime, timedelta, timezone

from app.core.exceptions import (
    InactiveUserError,
    InvalidCredentialsError,
    InvalidTokenError,
)
from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
    verify_refresh_token,
)
from app.repositories.auth_repository import AuthRepository
from app.schemas.auth import (
    AuthenticatedUserResponse,
    LoginRequest,
    RefreshRequest,
    RegisterRequest,
    TokenResponse,
    UserProfileResponse,
)

LOCK_DURATION_MINUTES: int = 15
MAX_FAILED_ATTEMPTS: int = 5
ADMIN_ROLE_NAME: str = "Administrador Empresa"


class AuthService:
    """Servicio de autenticación.

    Contiene toda la lógica de negocio para el módulo de autenticación:
    registro, inicio de sesión, renovación de tokens, cierre de sesión
    y obtención del usuario autenticado.
    """

    def __init__(self, repository: AuthRepository) -> None:
        self._repository = repository

    def _build_token_payload(self, user) -> dict:
        """Construye el payload estándar para los tokens JWT.

        Args:
            user: Instancia del modelo User.

        Returns:
            Diccionario con los datos del payload.
        """
        return {
            "sub": str(user.id),
            "email": user.email,
            "role": user.role.name,
            "company_id": user.company_id,
            "is_active": user.is_active,
        }

    def _build_auth_response(self, user, access_token: str, refresh_token: str) -> AuthenticatedUserResponse:
        """Construye la respuesta de autenticación con datos del usuario, empresa, rol y permisos.

        Args:
            user: Instancia del modelo User con relaciones cargadas.
            access_token: Access token JWT.
            refresh_token: Refresh token JWT.

        Returns:
            Respuesta completa de autenticación.
        """
        permissions = [rp.permission.code for rp in user.role.role_permissions]
        return AuthenticatedUserResponse(
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            is_active=user.is_active,
            company=user.company,
            role=user.role,
            permissions=permissions,
            access_token=access_token,
            refresh_token=refresh_token,
        )

    def register(self, request: RegisterRequest, ip_address: str) -> AuthenticatedUserResponse:
        """Registra una nueva empresa con su usuario administrador.

        Realiza las validaciones de correo y NIT, crea la empresa,
        crea el usuario administrador, genera los tokens JWT y
        retorna la información completa del usuario autenticado.

        Args:
            request: Datos de registro con información de empresa y usuario.
            ip_address: Dirección IP desde la que se realiza el registro.

        Returns:
            Información del usuario autenticado con tokens.

        Raises:
            InvalidCredentialsError: Si el correo o NIT ya existen.
        """
        if self._repository.email_exists(request.email):
            raise InvalidCredentialsError("El correo ya está registrado")

        if self._repository.nit_exists(request.nit):
            raise InvalidCredentialsError("El NIT ya está registrado")

        role = self._repository.get_role_by_name(ADMIN_ROLE_NAME)
        if role is None:
            raise InvalidCredentialsError("Rol de administrador no encontrado")

        company_data = {
            "business_name": request.business_name,
            "trade_name": request.trade_name,
            "nit": request.nit,
            "email": request.email,
            "phone": request.phone,
            "sector": request.sector,
            "company_size": request.company_size,
            "address": request.address,
            "city": request.city,
            "department": request.department,
            "website": request.website,
        }
        company = self._repository.create_company(
            {k: v for k, v in company_data.items() if v is not None}
        )

        password_hash = hash_password(request.password)
        user_data = {
            "company_id": company.id,
            "role_id": role.id,
            "first_name": request.first_name,
            "last_name": request.last_name,
            "email": request.email,
            "password_hash": password_hash,
            "last_login_ip": ip_address,
        }
        user = self._repository.create_user(user_data)

        access_token = create_access_token(data=self._build_token_payload(user))
        refresh_token = create_refresh_token(
            data={"sub": str(user.id), "email": user.email}
        )

        return self._build_auth_response(user, access_token, refresh_token)

    def login(self, request: LoginRequest, ip_address: str) -> AuthenticatedUserResponse:
        """Autentica un usuario con sus credenciales.

        Valida la contraseña, verifica que el usuario esté activo
        y no bloqueado, maneja los intentos fallidos, actualiza
        la información de inicio de sesión y genera los tokens JWT.

        Args:
            request: Credenciales de inicio de sesión.
            ip_address: Dirección IP desde la que se inicia sesión.

        Returns:
            Información del usuario autenticado con tokens.

        Raises:
            InvalidCredentialsError: Si las credenciales son incorrectas
                o el usuario está bloqueado.
            InactiveUserError: Si el usuario está inactivo.
        """
        user = self._repository.get_user_by_email(request.email)
        if user is None:
            raise InvalidCredentialsError("Credenciales incorrectas")

        if not user.is_active:
            raise InactiveUserError("Usuario inactivo")

        if user.locked_until and user.locked_until > datetime.now(timezone.utc):
            raise InvalidCredentialsError(
                "Usuario bloqueado temporalmente por intentos fallidos"
            )

        if not verify_password(request.password, user.password_hash):
            self._repository.increment_failed_attempts(user.id)
            if user.failed_login_attempts + 1 >= MAX_FAILED_ATTEMPTS:
                locked_until = datetime.now(timezone.utc) + timedelta(
                    minutes=LOCK_DURATION_MINUTES
                )
                self._repository.lock_user(user.id, locked_until)
            raise InvalidCredentialsError("Credenciales incorrectas")

        self._repository.reset_failed_attempts(user.id)
        self._repository.update_last_login(user.id)
        self._repository.update_last_login_ip(user.id, ip_address)

        access_token = create_access_token(data=self._build_token_payload(user))
        refresh_token = create_refresh_token(
            data={"sub": str(user.id), "email": user.email}
        )

        return self._build_auth_response(user, access_token, refresh_token)

    def refresh(self, request: RefreshRequest) -> TokenResponse:
        """Renueva el access token usando un refresh token válido.

        Valida el refresh token, verifica que el usuario siga activo
        y genera un nuevo access token.

        Args:
            request: Refresh token a validar.

        Returns:
            Nuevo access token y el mismo refresh token.

        Raises:
            InvalidTokenError: Si el refresh token es inválido o expiró.
            InvalidCredentialsError: Si el usuario no existe.
            InactiveUserError: Si el usuario está inactivo.
        """
        try:
            payload = verify_refresh_token(request.refresh_token)
        except Exception as exc:
            raise InvalidTokenError("Refresh token inválido o expirado") from exc

        if payload.get("type") != "refresh":
            raise InvalidTokenError("Token no válido para renovación")

        user_id = payload.get("sub")
        if user_id is None:
            raise InvalidTokenError("Token inválido")

        user = self._repository.get_user_by_id(int(user_id))
        if user is None:
            raise InvalidCredentialsError("Usuario no encontrado")

        if not user.is_active:
            raise InactiveUserError("Usuario inactivo")

        new_access_token = create_access_token(
            data=self._build_token_payload(user)
        )

        return TokenResponse(
            access_token=new_access_token,
            refresh_token=request.refresh_token,
        )

    def logout(self) -> dict:
        """Prepara el cierre de sesión.

        Por ahora no invalida tokens. Estructura preparada
        para futura implementación de blacklist.
        """
        return {"message": "Sesión cerrada exitosamente"}

    def get_current_user(self, user_id: int) -> UserProfileResponse:
        """Obtiene la información completa del usuario autenticado.

        Retorna los datos del usuario incluyendo empresa, rol y
        permisos asociados.

        Args:
            user_id: ID del usuario autenticado.

        Returns:
            Perfil del usuario con empresa, rol y permisos.

        Raises:
            InvalidCredentialsError: Si el usuario no existe.
        """
        user = self._repository.get_user_by_id(user_id)
        if user is None:
            raise InvalidCredentialsError("Usuario no encontrado")

        permissions = [rp.permission.code for rp in user.role.role_permissions]

        return UserProfileResponse(
            id=user.id,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            is_active=user.is_active,
            company=user.company,
            role=user.role,
            permissions=permissions,
        )
