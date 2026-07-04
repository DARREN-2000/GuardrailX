# API

This document details the backend APIs available in Aegis.

## Core Endpoints

* `GET /api/v1/health/live`: Healthcheck endpoint indicating if the server is running.
* `GET /api/v1/health/ready`: Checks if dependencies (like PostgreSQL) are connected.
* `GET /api/v1/tenants/{tenant_id}/providers`: Lists all available LLM providers configured for a tenant.
* `GET /api/v1/tenants/{tenant_id}/providers/default`: Retrieves the configured default provider.
* `POST /api/v1/tenants/{tenant_id}/providers/route`: Invokes the provider routing logic to pick the best provider based on `routing_priority`, `is_default`, and `enabled` statuses.
* `POST /api/v1/policies`: Creates a new policy logic.
* `GET /api/v1/policies`: Lists all configured policies.

## Integration

Aegis's endpoints are built using FastAPI and are fully documented automatically via Swagger UI. Once the backend is running, navigate to `http://localhost:8000/docs` to see the complete, interactive OpenAPI schema.
