import re
from typing import Any, Dict

HALLUCINATION_PATTERNS = [
    (r"(?i)\b(?:predict|forecast|future|will\s+happen)\b", "future_prediction"),
    (r"(?i)\b(?:exact\s+quote|quote\s+exactly|verbatim)\b", "exact_quotes"),
    (r"(?i)\b(?:recent\s+news|latest\s+news|yesterday|today|current\s+events)\b", "recent_events"),
    (r"(?i)\b(?:exact\s+statistics|give\s+me\s+numbers|exact\s+figures)\b", "exact_statistics"),
    (r"(?i)\b(?:who\s+won|score\s+of|result\s+of)\b", "sports_results"),
    (r"(?i)\b(?:stock\s+price\s+of|market\s+trend)\b", "financial_data"),
]

def assess_hallucination_risk(text: str) -> Dict[str, Any]:
    matched_signals = []

    for pattern, signal_name in HALLUCINATION_PATTERNS:
        if re.search(pattern, text):
            if signal_name not in matched_signals:
                matched_signals.append(signal_name)

    risk_score = 0.0
    if len(matched_signals) > 0:
        # Base risk score based on number of signals, capped at 1.0
        risk_score = min(1.0, len(matched_signals) * 0.3 + 0.3)

    return {"risk_score": risk_score, "matched_signals": matched_signals}
