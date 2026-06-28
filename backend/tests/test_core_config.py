from app.core.config import Settings


def test_settings_default():
    settings = Settings(database_url="postgresql+asyncpg://guardrailx:guardrailx@db:5432/guardrailx")
    assert settings.environment == "development"
    assert settings.app_name == "GuardrailX"
    assert not settings.otel_enabled
    assert settings.otel_exporter_otlp_endpoint is None

def test_settings_model_config():
    settings = Settings(database_url="sqlite+aiosqlite:///:memory:")
    assert settings.database_url == "sqlite+aiosqlite:///:memory:"
