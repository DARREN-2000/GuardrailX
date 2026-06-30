from __future__ import annotations

import asyncio
import re
import time
import uuid
from typing import Any

import mlflow

from app.models.policy import Policy
from app.repositories.policies import PolicyRepository
from app.services.base import CRUDService


class PolicyService(CRUDService[Policy]):
    repository: PolicyRepository

    def __init__(self, repository: PolicyRepository) -> None:
        super().__init__(repository)

    async def get_by_name(self, tenant_id, name: str) -> Policy | None:
        return await self.repository.get_by_name(tenant_id, name)

    async def evaluate_policy(self, tenant_id: uuid.UUID, name: str, prompt: str) -> dict[str, Any]:
        """Evaluate a prompt against a policy, checking for PII and prompt injection.
        Logs metrics and evaluation details to MLflow.
        """
        start_time = time.time()
        policy = await self.get_by_name(tenant_id, name)

        # Real heuristic evaluation logic
        is_safe = True
        risk_score = 0.0

        # 1. PII Redaction Check (Email and basic phone numbers)
        email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        phone_pattern = r"\b\d{3}[-.]?\d{3}[-.]?\d{4}\b"

        has_pii = False
        if re.search(email_pattern, prompt) or re.search(phone_pattern, prompt):
            has_pii = True
            risk_score += 0.4

        # 2. Prompt Injection Detection (Keywords)
        injection_keywords = ["ignore previous instructions", "system prompt", "bypass", "jailbreak", "you are now"]
        has_injection = False

        lower_prompt = prompt.lower()
        if any(keyword in lower_prompt for keyword in injection_keywords):
            has_injection = True
            risk_score += 0.6

        if risk_score > 0.5:
            is_safe = False

        tokens_used = len(prompt.split()) + 10
        latency = time.time() - start_time

        # Offload MLflow logging to avoid blocking the async event loop
        def _log_to_mlflow():
            try:
                nested = mlflow.active_run() is not None
                with mlflow.start_run(run_name=f"evaluate_policy_{name}", nested=nested):
                    mlflow.log_param("tenant_id", str(tenant_id))
                    mlflow.log_param("policy_name", name)
                    if policy:
                        mlflow.log_param("policy_id", str(policy.id))
                    mlflow.log_metric("latency_seconds", latency)
                    mlflow.log_metric("tokens_used", tokens_used)
                    mlflow.log_metric("risk_score", risk_score)
                    mlflow.log_param("is_safe", str(is_safe))
                    mlflow.log_param("has_pii", str(has_pii))
                    mlflow.log_param("has_injection", str(has_injection))
            except Exception as e:
                from app.core.logging import get_logger

                logger = get_logger(__name__)
                logger.error("Failed to log metrics to MLflow: %s", e)

        asyncio.create_task(asyncio.to_thread(_log_to_mlflow))

        return {
            "is_safe": is_safe,
            "risk_score": risk_score,
            "tokens_used": tokens_used,
            "latency": latency,
            "policy": policy.name if policy else None,
            "has_pii": has_pii,
            "has_injection": has_injection,
        }
