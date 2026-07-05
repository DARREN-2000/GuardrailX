# Performance Characteristics

GuardrailX is engineered to add minimal latency to your LLM requests.

## Architecture Decisions for Speed
1. **Async Execution:** Using Python's `asyncio` and FastAPI allows GuardrailX to handle thousands of concurrent connections efficiently.
2. **Concurrent Evaluation:** All configured policies (PII, Injection, Safety) are executed concurrently. Total evaluation time is determined by the single slowest active guardrail.
3. **Regex over ML (where possible):** We prioritize deterministic regex and heuristics over heavy machine learning models to minimize compute overhead and maintain predictable latency.

## Latency Estimates
- **Basic Routing (No Guardrails):** < 2ms
- **Regex-based Guardrails (Injection/Safety):** < 5ms
- **PII Redaction (Presidio + SpaCy):** ~20-50ms (depending on payload size).
