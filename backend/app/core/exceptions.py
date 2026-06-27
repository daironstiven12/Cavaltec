from __future__ import annotations


class InvalidTokenError(Exception):
    """Error lanzado cuando un token JWT es inválido o está mal formado."""

    def __init__(self, detail: str = "Token inválido") -> None:
        self.detail = detail
        super().__init__(self.detail)


class ExpiredTokenError(Exception):
    """Error lanzado cuando un token JWT ha expirado."""

    def __init__(self, detail: str = "Token expirado") -> None:
        self.detail = detail
        super().__init__(self.detail)


class InvalidCredentialsError(Exception):
    """Error lanzado cuando las credenciales proporcionadas son incorrectas."""

    def __init__(self, detail: str = "Credenciales incorrectas") -> None:
        self.detail = detail
        super().__init__(self.detail)


class InactiveUserError(Exception):
    """Error lanzado cuando el usuario autenticado está inactivo/deshabilitado."""

    def __init__(self, detail: str = "Usuario inactivo") -> None:
        self.detail = detail
        super().__init__(self.detail)


class InsufficientPermissionsError(Exception):
    """Error lanzado cuando el usuario no tiene los permisos requeridos."""

    def __init__(self, detail: str = "Permisos insuficientes") -> None:
        self.detail = detail
        super().__init__(self.detail)
