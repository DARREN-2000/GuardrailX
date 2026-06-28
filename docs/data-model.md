# Data Model

The GuardrailX PostgreSQL database contains several core entities that model the AI governance platform:

## Core Entities

* **Tenant:** Represents an isolated organizational environment. All downstream entities belong to a single tenant.
* **User:** Members of a tenant, managing access, roles, and profiles.
* **Provider:** An external LLM API service (like OpenAI or Anthropic). Includes configuration like base URL, default status, and routing priority.
* **Policy / PolicyVersion:** Represents rules (e.g., prompt injection thresholds, PII masking). Can be versioned to enable dry runs or fast rollbacks.
* **RiskAssessment:** Output of evaluating a prompt against policies. Contains a risk score and detected violations.
* **GovernanceDecision:** Represents the final outcome of an evaluation (Allowed, Blocked, Modified). Links back to a `RiskAssessment` and `Provider`.
* **AuditEvent:** A system-level log for configuration changes, authentications, and other critical events.
