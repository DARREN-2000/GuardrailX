# GuardrailX

[![CI](https://github.com/DARREN-2000/GuardrailX/actions/workflows/ci.yml/badge.svg)](https://github.com/DARREN-2000/GuardrailX/actions/workflows/ci.yml) [![Pages build](https://github.com/DARREN-2000/GuardrailX/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/DARREN-2000/GuardrailX/actions/workflows/deploy-pages.yml)

<p align="center">
  ![GuardrailX hero](assets/hero.svg)
</p>

GuardrailX is a starter framework for building guardrails around LLM-driven applications. It includes a FastAPI backend, a Vite + React frontend, infrastructure scaffolding, and policy templates.

**Current status**

- Backend health tests pass locally (I ran `backend/tests/test_health.py`).
- I made small fixes to improve testability (database engine creation guarded when OTEL is disabled, and a SQLAlchemy column compatibility fix).
- The full application requires a PostgreSQL instance and additional dependencies listed in `backend/pyproject.toml`.

## Quickstart — Backend

Install Python deps and run the API:

```bash
cd backend
python -m pip install -U pip
python -m pip install -r requirements.txt || python -m pip install fastapi uvicorn sqlalchemy alembic pydantic pydantic-settings
uvicorn app.main:app --reload --port 8000
```

Health endpoints:

- `/api/v1/health/live`
- `/api/v1/health/ready`

## Quickstart — Frontend

```bash
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5173`.

## Tests

Backend tests (example):

```bash
cd backend
python -m pip install -U pip
python -m pip install -r requirements-dev.txt || python -m pip install pytest pydantic-settings
python -m pytest -q
```

## Contributing

PRs welcome. Keep changes focused and add tests for behavior changes.

## License

See the `LICENSE` file.

## Local end-to-end with Docker Compose

Bring up Postgres, the backend, and a static frontend build with Docker Compose (from the repository root):

```bash
cd infrastructure/compose
docker compose up --build
```

- Backend will be available at `http://localhost:8000`.
- Frontend static build served at `http://localhost:5173`.

Notes:
- Compose sets `OTEL_ENABLED=false` for the backend to avoid requiring tracing exporters during local runs.
- The backend uses `DATABASE_URL=postgresql+asyncpg://guardrailx:guardrailx@db:5432/guardrailx` by default; update `backend/.env` if you need different credentials.

If you'd like, I can add a `Makefile` or `docker-entrypoint` scripts to run migrations automatically on container startup.
