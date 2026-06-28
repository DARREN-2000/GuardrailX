# ADR 0001: Architecture Baseline

## Status
Accepted

## Context
We need a robust, performant foundation for the GuardrailX proxy and dashboard. It must handle high concurrency, provide structured relational data modeling, and offer a modern React frontend.

## Decisions

1. **Backend Framework:** FastAPI. Provides native async support, excellent validation via Pydantic, and automatic OpenAPI documentation.
2. **Database:** PostgreSQL. Chosen for reliability, transactional integrity, and native support for JSONB (which is useful for arbitrary LLM configuration payloads).
3. **ORM:** SQLAlchemy (with `asyncpg`). Required for asynchronous database interactions, mapped tightly to Pydantic schemas.
4. **Frontend:** React + TypeScript + Vite. Industry standard for Single Page Applications, providing fast builds and robust type checking.
5. **Observability:** OpenTelemetry. Ensures vendor-agnostic tracing and metric collection, compatible with Prometheus and MLflow.

## Consequences
* High performance and type-safety across the stack.
* Requires async programming patterns in Python (managing event loops carefully).
* Running locally requires a full PostgreSQL instance.
