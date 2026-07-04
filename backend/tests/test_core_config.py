from app.core.config import Settings


def test_settings_default():
    settings = Settings(database_url="postgresql+asyncpg://aegis:aegis@db:5432/aegis")
    assert settings.environment == "development"
    assert settings.app_name == "Aegis"
    assert not settings.otel_enabled
    assert settings.otel_exporter_otlp_endpoint is None


def test_settings_model_config():
    settings = Settings(database_url="sqlite+aiosqlite:///:memory:")
    assert settings.database_url == "sqlite+aiosqlite:///:memory:"


def test_settings_cors_origins():
    settings = Settings(cors_origins="http://example.com,http://test.com")
    assert settings.cors_origins == ["http://example.com", "http://test.com"]

    settings_none = Settings(cors_origins=None)
    assert settings_none.cors_origins == []


def test_settings_otel_attributes():
    settings = Settings(otel_resource_attributes="key1=value1,key2=value2,invalid")
    assert settings.otel_resource_attributes == {"key1": "value1", "key2": "value2"}

    settings_none = Settings(otel_resource_attributes=None)
    assert settings_none.otel_resource_attributes == {}
