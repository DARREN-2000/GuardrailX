# GuardrailX Architecture

This document provides a high-level overview of the GuardrailX system architecture. For a deeper technical dive into the codebase, refer to `docs/internals.md`.

## Core Philosophy
GuardrailX acts as a deterministic security gateway for non-deterministic LLM workloads. It is designed to be:
1. **Asynchronous & Fast:** Minimal latency overhead using FastAPI and async execution.
2. **Stateless (mostly):** The core proxy engine evaluates requests entirely in memory. State is only maintained for policy configuration, tenant isolation, and audit logging.
3. **Modular:** Evaluators (e.g., PII redaction, Jailbreak detection) operate independently and can be composed via Policy rules.

## High-Level Components

### 1. The Proxy API (FastAPI)
The entry point for all application traffic. It intercepts requests bound for LLM providers (e.g., OpenAI), performs tenant resolution, and hands the payload to the Policy Engine.

### 2. The Policy Engine
Executes configured rules against the incoming prompt concurrently. It utilizes various Guardrails:
*   **PII Redaction:** Uses Microsoft Presidio and regex patterns to mask sensitive data.
*   **Prompt Injection / Jailbreak:** Utilizes heuristics and rule-based detectors to block malicious instructions.
*   **Content Safety:** Evaluates text against lexicons for hate speech, self-harm, etc.

### 3. Provider Router
If the request passes the Policy Engine, the router forwards the request to the specified upstream LLM provider.

### 4. Audit & Telemetry
Every action, decision, and latency metric is logged and emitted via OpenTelemetry to standard backends (Prometheus, Grafana, MLflow).

## Data Flow
1. Client App -> GuardrailX (`/v1/chat/completions`)
2. GuardrailX -> Load Tenant & Policy
3. GuardrailX -> Execute Guardrails (Block/Redact)
4. GuardrailX -> Forward to OpenAI
5. OpenAI -> GuardrailX -> Client App
