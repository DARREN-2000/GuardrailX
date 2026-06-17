from __future__ import annotations

from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.instrumentation.sqlalchemy import SQLAlchemyInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
    ConsoleSpanExporter,
    SpanExporter,
)

from app.core.config import Settings


def configure_otel(*, settings: Settings, app=None, engine=None) -> None:
    if not settings.otel_enabled:
        return

    resource_attributes = {
        "service.name": settings.otel_service_name,
        **settings.otel_resource_attributes,
    }
    resource = Resource.create(resource_attributes)

    provider = TracerProvider(resource=resource)
    exporter: SpanExporter
    if settings.otel_exporter_otlp_endpoint:
        exporter = OTLPSpanExporter(endpoint=settings.otel_exporter_otlp_endpoint)
    else:
        exporter = ConsoleSpanExporter()
    provider.add_span_processor(BatchSpanProcessor(exporter))
    trace.set_tracer_provider(provider)

    if app is not None:
        FastAPIInstrumentor.instrument_app(app)

    if engine is not None:
        SQLAlchemyInstrumentor().instrument(engine=engine.sync_engine)
