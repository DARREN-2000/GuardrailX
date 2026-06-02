# GuardrailX

[![CI](https://github.com/DARREN-2000/GuardrailX/actions/workflows/ci.yml/badge.svg)](https://github.com/DARREN-2000/GuardrailX/actions/workflows/ci.yml) [![Pages build](https://github.com/DARREN-2000/GuardrailX/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/DARREN-2000/GuardrailX/actions/workflows/deploy-pages.yml)

<p align="center">
  <!-- refined animated SVG header -->
  <svg width="100%" viewBox="0 0 1200 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GuardrailX logo">
    <defs>
      <linearGradient id="g1" x1="0%" x2="100%" y1="0%" y2="0%">
        <stop offset="0%" stop-color="#6EE7B7">
          <animate attributeName="stop-color" values="#6EE7B7;#60A5FA;#F472B6;#6EE7B7" dur="6s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stop-color="#60A5FA">
          <animate attributeName="stop-color" values="#60A5FA;#F472B6;#6EE7B7;#60A5FA" dur="6s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="10" stdDeviation="18" flood-opacity="0.08" />
      </filter>
    </defs>

    <rect width="100%" height="100%" fill="#0f172a" />

    <g transform="translate(60,40)">
      <g filter="url(#shadow)">
        <text x="0" y="80" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" font-size="64" font-weight="700" fill="url(#g1)">GuardrailX</text>
      </g>

      <g transform="translate(420,10)" opacity="0.95">
        <circle cx="20" cy="20" r="10" fill="#60A5FA">
          <animate attributeName="cy" values="20;10;20" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cx" values="20;40;20" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="30" r="8" fill="#F472B6">
          <animate attributeName="cy" values="30;18;30" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="cx" values="70;90;70" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="120" cy="18" r="6" fill="#6EE7B7">
          <animate attributeName="cy" values="18;5;18" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="cx" values="120;140;120" dur="3.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </g>

    <text x="60" y="155" font-family="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" font-size="18" fill="#94a3b8">Policy-driven AI governance runtime — backend + frontend starter</text>
  </svg>
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
