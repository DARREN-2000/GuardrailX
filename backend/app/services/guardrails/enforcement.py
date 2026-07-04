import os
from typing import Any, Dict

from app.services.guardrails.content_safety import analyze_content_safety
from app.services.guardrails.hallucination import assess_hallucination_risk
from app.services.guardrails.jailbreak import detect_jailbreak
from app.services.guardrails.pii import redact_pii
from app.services.guardrails.prompt_injection import detect_prompt_injection


def evaluate_guardrails(text: str) -> Dict[str, Any]:
    # 1. PII Redaction
    pii_results = redact_pii(text)

    # 2. Prompt Injection
    prompt_injection_results = detect_prompt_injection(text)

    # 3. Jailbreak
    jailbreak_results = detect_jailbreak(text)

    # 4. Content Safety
    content_safety_results = analyze_content_safety(text)

    # 5. Hallucination Risk
    hallucination_results = assess_hallucination_risk(text)

    # Evaluate decision
    decision = "allow"
    reasons = []

    prompt_injection_threshold = float(os.getenv("GUARDRAIL_PROMPT_INJECTION_THRESHOLD", "0.7"))
    jailbreak_threshold = float(os.getenv("GUARDRAIL_JAILBREAK_THRESHOLD", "0.7"))
    hallucination_threshold = float(os.getenv("GUARDRAIL_HALLUCINATION_THRESHOLD", "0.7"))

    if content_safety_results["blocked"]:
        decision = "block"
        reasons.append("content_safety_violation")

    if prompt_injection_results["risk_score"] > prompt_injection_threshold:
        decision = "block"
        reasons.append("prompt_injection_detected")

    if jailbreak_results["risk_score"] > jailbreak_threshold:
        decision = "block"
        reasons.append("jailbreak_detected")

    if hallucination_results["risk_score"] > hallucination_threshold:
        # High hallucination risk might just flag it for review, but let's say it blocks it or flags
        if decision == "allow":
            decision = "review"
        reasons.append("high_hallucination_risk")

    # If not blocked but PII was redacted, we consider it a redact action
    if decision not in ("block", "review") and len(pii_results["entities"]) > 0:
        decision = "redact"
        reasons.append("pii_redacted")
    elif decision == "review" and len(pii_results["entities"]) > 0:
        # Priority for redact over review if PII is there
        decision = "redact"
        reasons.append("pii_redacted")

    return {
        "decision": decision,
        "reasons": reasons,
        "per_detector_results": {
            "pii": pii_results,
            "prompt_injection": prompt_injection_results,
            "jailbreak": jailbreak_results,
            "content_safety": content_safety_results,
            "hallucination": hallucination_results,
        },
    }
