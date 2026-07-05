# Project Internals

This document covers the internal structure of the GuardrailX codebase.

## Directory Structure

- `backend/app/api`: FastAPI route definitions.
- `backend/app/core`: Configuration, dependency injection, logging.
- `backend/app/db`: SQLAlchemy setup and base models.
- `backend/app/models`: SQLAlchemy ORM models.
- `backend/app/schemas`: Pydantic schemas for API validation.
- `backend/app/services`: Core business logic (Providers, Tenants).
- `backend/app/services/guardrails`: The implementation of specific security checks (PII, Injection, etc.).
- `backend/tests`: Pytest suite.

- `frontend/src/components`: Reusable UI elements (shadcn/ui).
- `frontend/src/sections`: Landing page and dashboard sections.
- `frontend/src/lib`: Utilities and local evaluators.

## Dependency Injection
We use FastAPI's `Depends` for dependency injection. Repositories are injected into Services, which are injected into API endpoints. This ensures high testability.
