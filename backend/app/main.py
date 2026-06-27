import logging
import traceback

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.core.config import settings
from app.core.exceptions import (
    ExpiredTokenError,
    InactiveUserError,
    InvalidCredentialsError,
    InsufficientPermissionsError,
    InvalidTokenError,
)
from app.routers import (
    ai,
    assessments,
    auth,
    companies,
    dashboard,
    notifications,
    questions,
    reports,
    users,
)

logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    description="API de Privacidad y Cumplimiento",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:4200",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = []
    for error in exc.errors():
        loc = " -> ".join(str(l) for l in error.get("loc", []))
        errors.append({"field": loc, "message": error.get("msg", "")})
    return JSONResponse(
        status_code=422,
        content={"detail": "Error de validación", "errors": errors},
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail},
    )


@app.exception_handler(InvalidTokenError)
async def invalid_token_handler(request: Request, exc: InvalidTokenError) -> JSONResponse:
    return JSONResponse(
        status_code=401,
        content={"detail": exc.detail},
    )


@app.exception_handler(ExpiredTokenError)
async def expired_token_handler(request: Request, exc: ExpiredTokenError) -> JSONResponse:
    return JSONResponse(
        status_code=401,
        content={"detail": exc.detail},
    )


@app.exception_handler(InvalidCredentialsError)
async def invalid_credentials_handler(request: Request, exc: InvalidCredentialsError) -> JSONResponse:
    return JSONResponse(
        status_code=401,
        content={"detail": exc.detail},
    )


@app.exception_handler(InactiveUserError)
async def inactive_user_handler(request: Request, exc: InactiveUserError) -> JSONResponse:
    return JSONResponse(
        status_code=403,
        content={"detail": exc.detail},
    )


@app.exception_handler(InsufficientPermissionsError)
async def insufficient_permissions_handler(request: Request, exc: InsufficientPermissionsError) -> JSONResponse:
    return JSONResponse(
        status_code=403,
        content={"detail": exc.detail},
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}\n{traceback.format_exc()}")
    return JSONResponse(
        status_code=500,
        content={"detail": "Error interno del servidor"},
    )


app.include_router(auth.router)
app.include_router(users.router)
app.include_router(companies.router)
app.include_router(assessments.router)
app.include_router(questions.router)
app.include_router(reports.router)
app.include_router(dashboard.router)
app.include_router(ai.router)
app.include_router(notifications.router)


@app.get("/")
def read_root():
    return {"message": "Backend funcionando correctamente"}


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "environment": settings.APP_ENV,
    }
