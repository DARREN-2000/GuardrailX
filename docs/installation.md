# Installation Guide

GuardrailX can be installed and run in several ways, depending on your needs.

## 1. Docker (Recommended)

The recommended way to run GuardrailX is via Docker Compose.

```bash
git clone https://github.com/DARREN-2000/GuardrailX.git
cd GuardrailX/infrastructure/compose
docker compose up --build -d
```

## 2. Local Development (Native)

For contributing or local debugging without Docker.

### Backend
Requires Python 3.11+.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Run migrations (Requires a running PostgreSQL instance)
export DATABASE_URL="postgresql+asyncpg://user:pass@localhost:5432/guardrailx"
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --port 8000
```

### Frontend
Requires Node 20+.

```bash
cd frontend
npm ci --legacy-peer-deps
npm run build
```

## 3. Helm (Kubernetes)
*(Planned for a future release. See [Roadmap](../ROADMAP.md).)*
