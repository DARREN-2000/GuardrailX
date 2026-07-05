# Architecture Overview

GuardrailX operates as a high-performance proxy between your enterprise applications and your LLM providers.

## Component Flow

```mermaid
graph TD
    App[Enterprise App] -->|Request| Gateway[API Gateway (FastAPI)]

    subgraph GuardrailX Engine
        Gateway --> Resolve[Tenant & Policy Resolution]
        Resolve --> Execution[Policy Execution Engine]

        Execution --> G1[PII Guardrail]
        Execution --> G2[Injection Guardrail]
        Execution --> G3[Safety Guardrail]
    end

    Execution -->|Pass/Redact| Router[Provider Router]
    Execution -.->|Block| Deny[Error Response]

    Router --> Provider[LLM Provider]
    Provider -->|Response| Gateway
    Gateway --> App
```

## Scalability

The backend is built on **FastAPI** leveraging async Python. The policy engine evaluates all active guardrails concurrently using `asyncio.gather`, ensuring that the latency added to any request is only as slow as the single slowest guardrail check.
