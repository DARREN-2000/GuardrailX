# GuardrailX Design Principles

## 1. Security First, Latency Second
While we engineer for sub-millisecond overhead, if a security check requires slightly more time (e.g., a complex regex for PII), we accept the trade-off. Security is the core value proposition.

## 2. Determinism over Magic
We prefer deterministic, rule-based heuristics and regex for security checks rather than relying on another LLM (e.g., Llama Guard) to evaluate prompts. This ensures predictable, testable, and auditable decisions.

## 3. Drop-in Replacement
The developer experience must be frictionless. Integrating GuardrailX should require zero code changes other than updating the `BASE_URL` and providing an API key. We strictly adhere to standard provider interfaces (like the OpenAI spec).

## 4. Policy as Code
Governance rules should be versionable and deployable alongside application code. The architecture supports configuring policies via declarative YAML/JSON configurations.
