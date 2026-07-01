import re
from typing import Any, Dict, List

JAILBREAK_PATTERNS = [
    (r"(?i)\bDAN\b", "dan_mention"),
    (r"(?i)\bdo\s+anything\s+now\b", "dan_expanded"),
    (r"(?i)\bpretend\s+to\s+be\b", "persona_escape"),
    (r"(?i)\bact\s+as\s+(?:a|an)\b", "persona_escape"),
    (r"(?i)\b(?:you\s+are|you're)\s+now\b", "persona_escape"),
    (r"(?i)\bdeveloper\s+mode\b", "dev_mode"),
    (r"(?i)\buncensored\b", "uncensored_request"),
    (r"(?i)\bwithout\s+(?:any\s+)?(?:rules|restrictions|filters|guardrails)\b", "no_rules"),
    (r"(?i)\b(?:disregard|ignore)\s+(?:all\s+)?(?:rules|restrictions)\b", "no_rules"),
]

# Very simple heuristics for obfuscation
BASE64_PATTERN = r"(?:[A-Za-z0-9+/]{4}){5,}(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?"
LEETSPEAK_PATTERN = r"(?i)\b[a-z0-9]*[013457][a-z0-9]*\b"  # Word with digits in it


def detect_jailbreak(text: str) -> Dict[str, Any]:
    matched_signals = []

    for pattern, signal_name in JAILBREAK_PATTERNS:
        if re.search(pattern, text):
            if signal_name not in matched_signals:
                matched_signals.append(signal_name)

    if re.search(BASE64_PATTERN, text):
        matched_signals.append("base64_obfuscation")

    # Check leetspeak threshold
    words = text.split()
    leet_count = sum(1 for w in words if re.search(LEETSPEAK_PATTERN, w) and len(w) > 3 and any(c.isalpha() for c in w))
    if len(words) > 5 and leet_count / len(words) > 0.3:
        matched_signals.append("leetspeak_obfuscation")

    risk_score = 0.0
    if len(matched_signals) > 0:
        risk_score = min(1.0, len(matched_signals) * 0.35 + 0.5)

    return {"risk_score": risk_score, "matched_signals": matched_signals}
