# API Reference

The primary interface for GuardrailX is a RESTful API powered by FastAPI.

For full, interactive API documentation, run the backend server and navigate to `/docs` (Swagger UI) or `/redoc` (ReDoc).

## Core Endpoints

### `POST /api/v1/guardrails/evaluate`
Evaluates a prompt against active guardrails.

**Request:**
```json
{
  "text": "The prompt to evaluate",
  "tenant_id": "tenant-uuid"
}
```

**Response (Success/Redacted):**
```json
{
  "action": "allow",
  "processed_text": "The prompt with [REDACTED] information.",
  "risk_score": 0.1
}
```

### `POST /api/v1/chat/completions` (Routing)
*(Implementation pending - see Roadmap)*
Acts as a drop-in replacement for standard OpenAI client libraries.
