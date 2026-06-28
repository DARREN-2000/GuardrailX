# Core Concepts

Understanding Aegis requires familiarity with a few core primitives.

## Tenants
A Tenant is the top-level organizational unit in Aegis. It typically represents a business unit, a specific application, or a customer in a B2B SaaS environment. Everything in Aegis (Policies, Providers, Audit Logs) is scoped to a Tenant.

## Providers
A Provider is an external LLM service (e.g., OpenAI, Anthropic) or a local model (e.g., Ollama, vLLM). Aegis acts as a proxy to these providers. You can configure multiple providers per Tenant to ensure high availability and prevent vendor lock-in.

## Policies
Policies are the core logic engines of Aegis. They are evaluated inline during the request/response lifecycle.
- **Input Policies:** Evaluated against the user's prompt (e.g., PII Redaction, Injection Detection).
- **Output Policies:** Evaluated against the LLM's response (e.g., Toxicity Filtering, Hallucination Detection).

## Audit Events
Every action (API calls, policy evaluations, administrative changes) generates an Audit Event. These are immutable records used for compliance, billing, and debugging.
