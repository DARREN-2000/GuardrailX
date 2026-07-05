# System Design

See the root `DESIGN.md` for core design principles.

## Policy Engine Design
The policy engine relies on deterministic evaluation. Instead of using another LLM to grade prompts (which introduces latency, cost, and hallucination risks to the security layer itself), GuardrailX uses:
- **Lexicons:** For content safety.
- **Regex & Presidio:** For PII detection.
- **Heuristics:** For jailbreaks and prompt injections.
