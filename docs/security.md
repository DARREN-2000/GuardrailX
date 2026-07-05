# Security Architecture

## Tenant Isolation
GuardrailX is designed for multi-tenancy. Every request must include a `tenant_id`. Policies, audit logs, and risk assessments are strictly partitioned by tenant ID at the database level using SQLAlchemy filtering.

## Safe Evaluation
The policy engine itself does not execute arbitrary code. Rule evaluations are strictly defined by regular expressions, lexicons, and the Microsoft Presidio analyzer.

## Reporting Vulnerabilities
Please refer to the root `SECURITY.md` file for instructions on securely reporting vulnerabilities.
