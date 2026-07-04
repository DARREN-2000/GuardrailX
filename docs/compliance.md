# Compliance

Aegis is built with enterprise security and compliance in mind from day one.

## Core Compliance Features

* **Data Minimization & Redaction:** Policies can be enforced at the proxy level to automatically scrub Personally Identifiable Information (PII) before it is transmitted to external providers. This ensures data privacy compliance with GDPR, CCPA, and HIPAA.
* **Audit Logging:** Every prompt, decision, and system modification is logged in the `AuditEvent` and `GovernanceDecision` models.
* **Role-Based Access Control (RBAC):** Users are assigned roles (e.g., `admin`, `analyst`), restricting sensitive changes to configuration and policy logic.

All decisions and audit trails are timestamped and immutable in the system logs.
