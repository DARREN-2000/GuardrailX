# Observability

GuardrailX uses an industry-standard open source observability stack to provide deep visibility into LLM usage and proxy performance.

## Stack

* **OpenTelemetry (OTEL):** Instruments the FastAPI backend and SQLAlchemy queries to collect traces and metrics automatically.
* **Prometheus & Grafana:** Intended for aggregating the OTEL metrics and creating dashboards (like Latency, Token Usage, Blocked Requests).
* **MLflow:** Used specifically for tracking policy evaluations, parameterizing rules (e.g. `risk_score`, `has_pii`), and storing model-specific performance metrics across tenant workloads.
