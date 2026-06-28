# Getting Started with Aegis

Welcome to Aegis, the trust layer for enterprise AI. This guide will walk you through setting up Aegis, configuring your first policy, and integrating it with your application.

## Prerequisites

Before you begin, ensure you have the following installed:
- Docker and Docker Compose (for local deployment)
- Python 3.11+ (for source deployment)
- Node.js 20+ (for frontend development)
- PostgreSQL 15+ (for production deployments)

## Installation Guide

### Option 1: Quickstart (Docker Compose)

The fastest way to evaluate Aegis locally is using our pre-configured Docker Compose stack.

```bash
git clone https://github.com/DARREN-2000/GuardrailX.git
cd GuardrailX/infrastructure/compose
docker compose up -d --build
```

This command provisions:
- Aegis Backend API (`http://localhost:8000`)
- Aegis Dashboard (`http://localhost:5173`)
- PostgreSQL Database
- Redis (for rate limiting and caching)

### Option 2: Building from Source

For development or custom deployments, you can build from source.

**1. Clone the repository**
```bash
git clone https://github.com/DARREN-2000/GuardrailX.git
cd GuardrailX
```

**2. Setup the Backend**
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env to point to your PostgreSQL instance
alembic upgrade head
uvicorn app.main:app --reload
```

**3. Setup the Frontend**
```bash
cd frontend
npm ci --legacy-peer-deps
npm run dev
```

## First Configuration

Once Aegis is running, you need to configure a Tenant and a Provider.

1. Navigate to the Dashboard at `http://localhost:5173`.
2. Create a new **Tenant** (representing a project or business unit).
3. Navigate to **Providers** and add your LLM API keys (e.g., OpenAI, Anthropic).
4. Create your first **Policy**. We recommend starting with a simple PII Redaction policy.

## Next Steps

- Review the [Concepts Guide](concepts.md) to understand Aegis's core primitives.
- Explore the [Architecture Guide](architecture.md) for a deep dive into the system design.
- Check out [Deployment](deployment.md) for production recommendations.
