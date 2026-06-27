from __future__ import annotations

from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse


class AuthMiddleware(BaseHTTPMiddleware):
    """Middleware de autenticación para verificar tokens JWT.

    Nota: Este middleware está preparado pero aún no está conectado
    a la aplicación. Se activará cuando se requiera validación
    global de tokens en todas las rutas protegidas.

    Por ahora la autenticación se maneja mediante dependencias
    inyectadas en cada ruta (ver app/dependencies/current_user.py).
    """

    async def dispatch(
        self, request: Request, call_next
    ) -> JSONResponse:
        try:
            response = await call_next(request)
            return response
        except HTTPException:
            raise
        except Exception as exc:
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={"detail": "Error interno del servidor"},
            )
