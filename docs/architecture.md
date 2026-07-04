# Architecture

Aegis is designed as a secure, fast, and modular proxy layer sitting between enterprise applications and Large Language Model (LLM) providers like OpenAI and Anthropic.

## Technology Stack

* **Backend:** Built with Python and FastAPI for high-throughput, async IO operations.
* **Database:** PostgreSQL is used as the primary data store, using SQLAlchemy (async) and Alembic for migrations.
* **Frontend:** Built with React 19, TypeScript, and Vite, utilizing Tailwind CSS for styling.
* **Observability:** Metrics, traces, and policy evaluation decisions are recorded using OpenTelemetry and logged to MLflow (for MLOps tracking).

## Proxy Flow

1. An application request is routed through Aegis.
2. The `PolicyEngine` intercepts the request and runs heuristics (such as PII Redaction and Prompt Injection detection).
3. The `ProviderRouter` determines the most suitable destination model based on priority and health.
4. The request is forwarded to the external API, and the response is logged and returned to the application.
