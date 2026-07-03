from typing import Any, Dict, List

from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

_analyzer = None
_anonymizer = None

def get_analyzer() -> AnalyzerEngine:
    global _analyzer
    if _analyzer is None:
        _analyzer = AnalyzerEngine()
    return _analyzer

def get_anonymizer() -> AnonymizerEngine:
    global _anonymizer
    if _anonymizer is None:
        _anonymizer = AnonymizerEngine()
    return _anonymizer


def redact_pii(text: str) -> Dict[str, Any]:
    analyzer = get_analyzer()
    anonymizer = get_anonymizer()
    entities_to_find = ["EMAIL_ADDRESS", "PHONE_NUMBER", "CREDIT_CARD", "IBAN_CODE", "IP_ADDRESS", "PERSON"]
    results = analyzer.analyze(text=text, entities=entities_to_find, language="en")

    entities = []
    for res in results:
        entities.append({"type": res.entity_type, "span": [res.start, res.end], "score": res.score})

    anonymized_result = anonymizer.anonymize(text=text, analyzer_results=results)

    return {"redacted_text": anonymized_result.text, "entities": entities}
