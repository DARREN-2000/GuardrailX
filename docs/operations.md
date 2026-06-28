# Operations & Observability

Operating Aegis in production requires deep visibility into system health, performance, and policy decisions.

## Observability Stack

Aegis is **OpenTelemetry Native**. We do not lock you into a specific APM vendor. You can export telemetry data to Datadog, Honeycomb, Grafana, or any OTLP-compatible backend.

### Monitoring & Metrics

The backend exposes a `/metrics` endpoint natively when configured with the Prometheus exporter.

Key Metrics to Monitor:
- `aegis_http_requests_total`: Total inbound requests.
- `aegis_http_request_duration_seconds`: API latency histogram.
- `aegis_policy_evaluation_duration_seconds`: Latency overhead added by the Policy Engine.
- `aegis_policy_violations_total`: Count of blocked requests by policy type.
- `aegis_llm_provider_latency_seconds`: Upstream latency from OpenAI/Anthropic.

### Tracing

Distributed tracing is essential for debugging latency issues. Every request passing through Aegis generates a trace containing spans for:
1. API request ingestion
2. Cache lookup
3. Policy evaluation (per-policy spans)
4. Upstream LLM network call
5. Database audit logging

Enable tracing by setting `OTEL_ENABLED=true` in your environment.

### Logging

Aegis uses structured JSON logging by default in production. This ensures logs can be easily parsed by ELK, Splunk, or Datadog.

```json
{
  "timestamp": "2023-10-27T10:00:00Z",
  "level": "INFO",
  "message": "Policy violation detected",
  "tenant_id": "tenant-123",
  "policy_id": "pii-redaction",
  "action": "block"
}
```

## Backups & Recovery

- **PostgreSQL:** Configure daily automated snapshots for your RDS instance. The database contains critical tenant configurations, policies, and audit logs.
- **Redis:** Redis is used for ephemeral data (caching, rate limits). While persistence (AOF/RDB) can be enabled, Aegis is designed to tolerate Redis data loss without affecting core routing capabilities (cache misses will just increase upstream latency).

## Maintenance

Routine maintenance involves:
1. Upgrading Aegis container images to the latest stable release.
2. Applying Alembic database migrations.
3. Rotating API keys for upstream LLM providers within the Aegis dashboard.
