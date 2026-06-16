from app.core.config import Settings
from app.observability.otel import configure_otel


def test_configure_otel():
    settings = Settings(otel_enabled=True, otel_exporter_otlp_endpoint="http://localhost:4317")
    configure_otel(settings=settings)
    settings_no_endpoint = Settings(otel_enabled=True, otel_exporter_otlp_endpoint=None)
    configure_otel(settings=settings_no_endpoint)
