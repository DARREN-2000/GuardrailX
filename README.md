# GuardrailX

[![CI](https://github.com/DARREN-2000/GuardrailX/actions/workflows/ci.yml/badge.svg)](https://github.com/DARREN-2000/GuardrailX/actions/workflows/ci.yml) [![Pages build](https://github.com/DARREN-2000/GuardrailX/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/DARREN-2000/GuardrailX/actions/workflows/deploy-pages.yml)

<p align="center">
  <svg width="100%" viewBox="0 0 1200 520" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="GuardrailX animated governance system illustration">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#34D399" />
        <stop offset="50%" stop-color="#60A5FA" />
        <stop offset="100%" stop-color="#F59E0B" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#34D399" stop-opacity="1" />
        <stop offset="55%" stop-color="#34D399" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#0F172A" stop-opacity="0" />
      </radialGradient>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#000000" flood-opacity="0.5" />
      </filter>
    </defs>

    <rect width="1200" height="520" rx="36" fill="#050814" />
    <rect x="24" y="24" width="1152" height="472" rx="28" fill="url(#g1)" opacity="0.08" />
    <g opacity="0.18">
      <circle cx="220" cy="120" r="2" fill="#fff" />
      <circle cx="290" cy="92" r="2" fill="#fff" />
      <circle cx="410" cy="146" r="2" fill="#fff" />
      <circle cx="930" cy="110" r="2" fill="#fff" />
      <circle cx="1040" cy="168" r="2" fill="#fff" />
      <circle cx="980" cy="344" r="2" fill="#fff" />
      <circle cx="170" cy="360" r="2" fill="#fff" />
      <circle cx="340" cy="402" r="2" fill="#fff" />
    </g>

    <circle cx="600" cy="260" r="146" fill="url(#glow)">
      <animate attributeName="r" values="132;156;132" dur="8s" repeatCount="indefinite" />
    </circle>

    <g filter="url(#shadow)">
      <rect x="330" y="150" width="540" height="200" rx="28" fill="#0B1220" stroke="rgba(255,255,255,0.10)" />
      <text x="600" y="214" fill="#E2E8F0" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="700" text-anchor="middle">GuardrailX</text>
      <text x="600" y="258" fill="#94A3B8" font-family="Inter, Arial, sans-serif" font-size="18" text-anchor="middle">Policy-driven AI governance runtime for enterprise LLM workloads</text>
      <text x="600" y="294" fill="#34D399" font-family="Inter, Arial, sans-serif" font-size="16" text-anchor="middle">Prompt injection • jailbreak detection • PII redaction • audit logging • routing</text>
    </g>

    <g>
      <circle cx="600" cy="260" r="210" fill="none" stroke="rgba(52,211,153,0.35)" stroke-width="2" stroke-dasharray="8 10">
        <animateTransform attributeName="transform" type="rotate" values="0 600 260;360 600 260" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="260" r="250" fill="none" stroke="rgba(96,165,250,0.28)" stroke-width="2" stroke-dasharray="4 14">
        <animateTransform attributeName="transform" type="rotate" values="360 600 260;0 600 260" dur="26s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="260" r="292" fill="none" stroke="rgba(245,158,11,0.22)" stroke-width="2" stroke-dasharray="2 16">
        <animateTransform attributeName="transform" type="rotate" values="0 600 260;360 600 260" dur="32s" repeatCount="indefinite" />
      </circle>
    </g>

    <g>
      <circle cx="790" cy="260" r="16" fill="#34D399">
        <animateTransform attributeName="transform" type="rotate" values="0 600 260;360 600 260" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="600" cy="10" r="16" fill="#60A5FA">
        <animateTransform attributeName="transform" type="rotate" values="0 600 260;360 600 260" dur="26s" repeatCount="indefinite" />
      </circle>
      <circle cx="308" cy="260" r="16" fill="#F59E0B">
        <animateTransform attributeName="transform" type="rotate" values="0 600 260;360 600 260" dur="32s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
</p>

GuardrailX is a production-grade policy-driven AI governance runtime for enterprise LLM workloads.

## What it does

GuardrailX is designed to inspect prompts and responses, score risk, route providers, enforce policy-as-code, redact sensitive data, and record everything in an audit trail.

## Architecture

- Backend: FastAPI, PostgreSQL, SQLAlchemy, Alembic
- Frontend: React, TypeScript, Tailwind
- Observability: OpenTelemetry, Prometheus, Grafana
- Providers: OpenAI, Ollama, vLLM

## Repository Layout

- `backend/`: API, services, repositories, models, and migrations
- `frontend/`: React UI and GitHub Pages deployment target
- `policies/`: policy-as-code artifacts and domain controls
- `docs/`: architecture, API, compliance, and ADR documentation
- `infrastructure/`: container, observability, and platform assets
- `tests/`: top-level test workspace

## Frontend

The frontend is a static Vite app with relative asset paths, Tailwind styling, and an animated product surface. It is suitable for GitHub Pages deployment.

## Run Locally

Backend (development):

```bash
cd backend
python -m uvicorn app.main:app --reload
```

Frontend (development):

```bash
cd frontend
npm install
npm run dev
```

## Continuous Integration & Deployment

- A lightweight CI workflow (`.github/workflows/ci.yml`) runs on push and pull requests to `main`. It installs backend dependencies and runs tests if any are present, and lints/builds the frontend.
- GitHub Pages: `.github/workflows/deploy-pages.yml` builds `frontend/` and publishes `frontend/dist` to GitHub Pages on pushes to `main`.

To publish the frontend manually from a local machine:

```bash
cd frontend
npm ci
npm run build
# then copy the generated frontend/dist into your Pages branch or use the Actions workflow
```
