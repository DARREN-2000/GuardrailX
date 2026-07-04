from __future__ import annotations

from functools import lru_cache
from typing import Any

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    app_name: str = "Aegis"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    log_level: str = "INFO"
    json_logs: bool = True

    database_url: str = "postgresql+asyncpg://aegis:aegis@localhost:5432/aegis"
    database_echo: bool = False
    database_pool_size: int = 5
    database_max_overflow: int = 10

    cors_origins: list[str] = Field(default_factory=lambda: ["http://localhost:3000", "http://localhost:5173"])

    otel_enabled: bool = True
    otel_service_name: str = "aegis-backend"
    otel_exporter_otlp_endpoint: str | None = None
    otel_traces_sample_rate: float = 1.0
    otel_resource_attributes: dict[str, str] = Field(default_factory=dict)

    mlflow_tracking_uri: str | None = "http://localhost:5000"

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: Any) -> list[str]:
        if value is None:
            return []
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return list(value)

    @field_validator("otel_resource_attributes", mode="before")
    @classmethod
    def parse_resource_attributes(cls, value: Any) -> dict[str, str]:
        if value is None:
            return {}
        if isinstance(value, dict):
            return {str(key): str(item) for key, item in value.items()}
        if isinstance(value, str):
            pairs = [item.strip() for item in value.split(",") if item.strip()]
            attributes: dict[str, str] = {}
            for pair in pairs:
                if "=" not in pair:
                    continue
                key, item = pair.split("=", 1)
                attributes[key.strip()] = item.strip()
            return attributes
        return dict(value)


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
