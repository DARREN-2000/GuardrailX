# Configuration

GuardrailX is primarily configured via environment variables and policy documents.

## Environment Variables (Backend)

The backend service (`backend/.env` or system env vars) accepts the following configuration:

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `DATABASE_URL` | The PostgreSQL connection string. | `postgresql+asyncpg://guardrailx:guardrailx@localhost:5432/guardrailx` |
| `OPENAI_API_KEY` | Your OpenAI API key for downstream routing. | *(empty)* |
| `OTEL_ENABLED` | Enable OpenTelemetry tracing. | `true` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The OTLP endpoint (e.g., Jaeger or Honeycomb). | `http://localhost:4317` |

## Environment Variables (Frontend)

The frontend build requires the following variables:

| Variable | Description | Default |
| -------- | ----------- | ------- |
| `VITE_API_BASE_URL` | The URL of the GuardrailX API. | `http://localhost:8000` |

## Policy Configuration

Policies define how requests are evaluated. Currently, policies are managed through the API or the UI Dashboard. Future versions will support declarative YAML `Policy` objects loaded at startup.
