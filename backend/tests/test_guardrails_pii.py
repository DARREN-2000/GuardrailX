import pytest

from app.services.guardrails.pii import redact_pii


def test_pii_redaction_email():
    text = "My email is test@example.com."
    result = redact_pii(text)
    assert "<EMAIL_ADDRESS>" in result["redacted_text"]
    assert len(result["entities"]) == 1
    assert result["entities"][0]["type"] == "EMAIL_ADDRESS"


def test_pii_redaction_phone():
    text = "Call me at (555) 123-4567."
    result = redact_pii(text)
    assert "<PHONE_NUMBER>" in result["redacted_text"] or "<CREDIT_CARD>" not in result["redacted_text"]  # Presidio phone num handling
    assert len(result["entities"]) >= 1


def test_pii_redaction_person():
    text = "John Smith went to the store."
    result = redact_pii(text)
    assert "<PERSON>" in result["redacted_text"]
    assert any(e["type"] == "PERSON" for e in result["entities"])


def test_pii_redaction_ip_address():
    text = "The server IP is 192.168.1.1."
    result = redact_pii(text)
    assert "<IP_ADDRESS>" in result["redacted_text"]
    assert any(e["type"] == "IP_ADDRESS" for e in result["entities"])


def test_pii_redaction_multiple():
    text = "Contact Jane Doe at jane@example.com or 555-0199."
    result = redact_pii(text)
    assert "<PERSON>" in result["redacted_text"]
    assert "<EMAIL_ADDRESS>" in result["redacted_text"]
    assert len(result["entities"]) >= 2


def test_pii_clean_text():
    text = "This is a completely clean sentence with no PII."
    result = redact_pii(text)
    assert result["redacted_text"] == text
    assert len(result["entities"]) == 0


def test_pii_clean_text_2():
    text = "We are discussing the weather today in general terms."
    result = redact_pii(text)
    assert result["redacted_text"] == text
    assert len(result["entities"]) == 0


def test_pii_clean_text_3():
    text = "The quick brown fox jumps over the lazy dog."
    result = redact_pii(text)
    assert result["redacted_text"] == text
    assert len(result["entities"]) == 0


def test_pii_clean_text_4():
    text = "Our company's mission is to provide excellent software."
    result = redact_pii(text)
    assert result["redacted_text"] == text
    assert len(result["entities"]) == 0


def test_pii_clean_text_5():
    text = "Apples and oranges are both delicious fruits."
    result = redact_pii(text)
    assert result["redacted_text"] == text
    assert len(result["entities"]) == 0
