import re
from typing import Any, Dict, List

# Basic lexicons for demonstration purposes
SAFETY_LEXICONS = {
    "violence": [r"(?i)\bkill\b", r"(?i)\bmurder\b", r"(?i)\battack\b", r"(?i)\bblood\b", r"(?i)\bweapon\b", r"(?i)\bshoot\b"],
    "self_harm": [r"(?i)\bsuicide\b", r"(?i)\bkill\s+myself\b", r"(?i)\bcut\s+myself\b", r"(?i)\bend\s+it\s+all\b"],
    "sexual": [r"(?i)\bporn\b", r"(?i)\bsex\b", r"(?i)\bnsfw\b", r"(?i)\berotic\b"],
    "hate": [r"(?i)\bslur\b", r"(?i)\bhate\b", r"(?i)\bracist\b", r"(?i)\bbigot\b", r"(?i)\bdiscriminate\b"]
}

def analyze_content_safety(text: str, threshold: float = 0.5) -> Dict[str, Any]:
    category_scores = {
        "violence": 0.0,
        "self_harm": 0.0,
        "sexual": 0.0,
        "hate": 0.0
    }

    for category, patterns in SAFETY_LEXICONS.items():
        matches = 0
        for pattern in patterns:
            if re.search(pattern, text):
                matches += 1

        if matches > 0:
            # Simple scoring: 0.4 per match, max 1.0
            category_scores[category] = min(1.0, matches * 0.4 + 0.2)

    blocked = any(score >= threshold for score in category_scores.values())

    return {
        "category_scores": category_scores,
        "blocked": blocked
    }
