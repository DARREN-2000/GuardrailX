# Aegis

[![CI](https://github.com/DARREN-2000/Aegis/actions/workflows/ci.yml/badge.svg)](https://github.com/DARREN-2000/Aegis/actions/workflows/ci.yml) [![Pages build](https://github.com/DARREN-2000/Aegis/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/DARREN-2000/Aegis/actions/workflows/deploy-pages.yml)

<p align="center">
  <img src="assets/readme-animated.svg" alt="Aegis animated header" align="center" />
</p>

It includes a FastAPI backend, a Vite + React frontend, infrastructure scaffolding, and policy templates.

## Core Capabilities (Implemented)
- **PII Redaction**: Detects and redacts emails, phone numbers, credit cards, IBANs, IP addresses, and person names using Presidio and regex.
- **Prompt Injection Detection**: Detects instruction-overrides and delimiter-based attacks.
- **Jailbreak Detection**: Detects DAN-style prompts, developer mode requests, base64 obfuscation, and persona escapes.
- **Content Safety Filter**: Evaluates text against violence, self-harm, sexual, and hate lexicons.
- **Risk-Based Enforcement**: Combined evaluation engine that decides whether to allow, redact, or block prompts.

## Roadmap (Planned)
- Hallucination-risk scoring.

## Guardrail Playground

<p align="center">
  <img src="docs/screenshots/dashboard.png" alt="Aegis Dashboard" align="center" />
</p>

## High-Level Architecture

![Architecture](assets/architecture.svg)

## Core Modules

![Core Modules](assets/core-modules.svg)

## Policy Engine

![Policy Engine](assets/policy-engine.svg)

## Audit Platform

![Audit Platform](assets/audit.svg)

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

## Deploying the Backend (Render)

You can deploy the backend easily to [Render](https://render.com) using the included `render.yaml` configuration.

1. Connect your GitHub repository to Render.
2. Select **Blueprint** and point it to the `render.yaml` file in the root of the repository.
3. Render will provision a PostgreSQL database and a Python web service, automatically applying database migrations (`alembic upgrade head`) and starting the FastAPI server.
4. Once deployed, take your Render URL (e.g., `https://aegis-backend.onrender.com`) and update your frontend's environment variable `VITE_API_BASE_URL` to point to it.

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
- The backend uses `DATABASE_URL=postgresql+asyncpg://aegis:aegis@db:5432/aegis` by default; update `backend/.env` if you need different credentials.

If you'd like, I can add a `Makefile` or `docker-entrypoint` scripts to run migrations automatically on container startup.
