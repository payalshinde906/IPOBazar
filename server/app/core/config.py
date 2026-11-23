"""Application configuration loaded from environment variables / `.env`."""
from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Strongly-typed application settings.

    Values are read from environment variables first, falling back to the
    project-local `.env` file. Using a typed model means a typo in a variable
    name surfaces as an error instead of a silent bug.
    """

    # `env_prefix` namespaces every setting (e.g. IPOBAZAR_DATABASE_URL) so a
    # generic ambient variable such as DATABASE_URL can never silently override
    # our configuration. Env vars take precedence over the `.env` file.
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        env_prefix="IPOBAZAR_",
    )

    app_name: str = "IPOBazar API"
    app_env: str = "development"
    api_v1_prefix: str = "/api/v1"

    # Secret used to sign JWTs (used from Phase 6 onwards).
    secret_key: str = "change-me-local-dev-secret"
    access_token_expire_minutes: int = 60

    # SQLAlchemy connection string. The real value lives in `.env`.
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/IPOBazar"

    # Comma-separated allowed CORS origins.
    cors_origins: str = "*"

    @property
    def cors_origin_list(self) -> list[str]:
        """Split the raw CORS string into a clean list of origins."""
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance (read once per process)."""
    return Settings()
