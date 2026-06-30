import re
from typing import Any, Dict, List

INJECTION_PATTERNS = [
    (r"(?i)\bignore\s+(?:all\s+)?(?:previous\s+)?(?:instructions|directions|prompts)\b", "ignore_instructions"),
    (r"(?i)\bforget\s+(?:all\s+)?(?:previous\s+)?(?:instructions|directions|prompts)\b", "forget_instructions"),
    (r"(?i)\b(?:print|reveal|show|display)\s+(?:the\s+)?(?:system\s+)?prompt\b", "reveal_prompt"),
    (r"(?i)\bbypass\s+(?:all\s+)?(?:rules|filters|guardrails)\b", "bypass_filters"),
    (r"(?i)system(?:\s+|_+)?prompt", "mention_system_prompt"),
    (r"(?i)^(?:user|assistant|system):\s", "role_override"),
    (r"(?i)\[(?:user|assistant|system)\]", "role_override"),
]

def detect_prompt_injection(text: str) -> Dict[str, Any]:
    matched_signals = []

    for pattern, signal_name in INJECTION_PATTERNS:
        if re.search(pattern, text):
            if signal_name not in matched_signals:
                matched_signals.append(signal_name)

    risk_score = 0.0
    if len(matched_signals) > 0:
        # Base risk score based on number of signals, capped at 1.0
        risk_score = min(1.0, len(matched_signals) * 0.4 + 0.5)

    return {
        "risk_score": risk_score,
        "matched_signals": matched_signals
    }
