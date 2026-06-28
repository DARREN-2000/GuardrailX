# Security & Compliance

Aegis handles highly sensitive data. Security is our absolute highest priority. This document outlines our security architecture and compliance posture.

## Authentication & Authorization

Aegis utilizes a multi-layered security model.

- **Dashboard Access:** Secured via OIDC / OAuth2. Users are mapped to specific Tenants.
- **API Access (SDKs/Clients):** Authenticated using Bearer Tokens (API Keys). Keys are scoped to specific Tenants and can have granular permissions (e.g., `read:policies`, `execute:inference`).
- **Role-Based Access Control (RBAC):** Users are assigned roles (e.g., `Admin`, `Auditor`, `Developer`) that dictate their permissions within a Tenant.

## Secrets Management

Aegis requires API keys for upstream providers (OpenAI, Anthropic).

- **Encryption at Rest:** All provider API keys are encrypted in the PostgreSQL database using AES-256-GCM.
- **Encryption Key:** The master encryption key must be provided via the `ENCRYPTION_KEY` environment variable. Never commit this key to version control. Inject it securely using AWS KMS, HashiCorp Vault, or Kubernetes Secrets.

## Threat Model

Aegis mitigates several key threats to AI applications:
1. **Prompt Injection:** Attackers crafting inputs to bypass system instructions. Mitigated by our injection classification policies.
2. **Data Exfiltration:** Sensitive data (PII) leaking to third-party LLMs. Mitigated by edge-based Regex and NER redaction policies.
3. **Denial of Wallet:** Attackers spamming endpoints to drive up LLM API costs. Mitigated by Tenant and User-level rate limiting via Redis.

## Compliance

Aegis is designed to help enterprises meet regulatory requirements:
- **SOC2 Type II:** Architecture supports SOC2 controls (audit logging, encryption, RBAC).
- **HIPAA:** Capable of redacting PHI before it leaves the VPC. Deploys inside customer VPCs to maintain BAA compliance.
- **GDPR:** Redacts EU citizen data and provides localized audit logging.

## Audit Logging

Every interaction with the Aegis Proxy is recorded in the `audit_events` table. This provides a complete cryptographic chain of custody for every prompt, policy decision, and LLM response.

## Security Recommendations

1. **Always deploy inside a VPC.** Do not expose the Aegis database or Redis directly to the internet.
2. **Use TLS 1.3.** Ensure your Ingress controller terminates TLS securely.
3. **Rotate Secrets.** Regularly rotate the master `ENCRYPTION_KEY` and upstream provider API keys.
