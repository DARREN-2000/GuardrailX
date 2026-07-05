# GuardrailX Roadmap

This roadmap outlines the planned features and architectural improvements for GuardrailX.

## Q3 2024: Advanced Enforcement & Observability
- [ ] **Hallucination Risk Scoring:** Implement statistical and semantic variance checks to score the likelihood of hallucination on model responses.
- [ ] **Dynamic Context Limits:** Enforce policies based on prompt token count.
- [ ] **Grafana Dashboards:** Provide official, pre-built Grafana dashboards for latency, policy blocks, and throughput.

## Q4 2024: Provider Resiliency
- [ ] **Provider Load Balancing:** Automated fallback and weighted routing across multiple LLM endpoints (e.g., fallback from OpenAI to local vLLM).
- [ ] **Response Validation:** Enforce strict JSON schema validation and outbound PII scrubbing on LLM responses.
- [ ] **RBAC (Role-Based Access Control):** Introduce granular permissions for policy management in the UI.

## Q1 2025: Enterprise Integrations
- [ ] **SSO/SAML Integration:** Support for enterprise identity providers.
- [ ] **SIEM Streaming:** Native integrations to stream audit logs to Datadog, Splunk, and Azure Sentinel.
