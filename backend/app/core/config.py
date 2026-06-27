from functools import lru_cache
from pydantic import ConfigDict
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    model_config = ConfigDict(
        env_file=".env",
        extra="ignore",
        env_file_encoding="utf-8",
    )

    APP_NAME: str = "Privacy Compliance API"
    APP_ENV: str = "development"

    SECRET_KEY: str = ""
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    TOKEN_TYPE: str = "bearer"

    MYSQL_DATABASE: str = "privacy_compliance"
    MYSQL_USER: str = "app_user"
    MYSQL_PASSWORD: str = ""
    MYSQL_ROOT_PASSWORD: str = ""
    MYSQL_HOST: str = "localhost"
    MYSQL_PORT: int = 3306

    DATABASE_URL: str = "mysql+pymysql://app_user:password@localhost:3306/privacy_compliance"

    OPENROUTER_API_KEY: str = ""


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
