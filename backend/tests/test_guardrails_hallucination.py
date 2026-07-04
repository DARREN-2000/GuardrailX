from app.services.guardrails.hallucination import assess_hallucination_risk


def test_hallucination_safe():
    result = assess_hallucination_risk("Hello, how are you?")
    assert result["risk_score"] == 0.0
    assert len(result["matched_signals"]) == 0


def test_hallucination_future_prediction():
    result = assess_hallucination_risk("Predict what will happen to the stock market tomorrow.")
    assert result["risk_score"] > 0.0
    assert "future_prediction" in result["matched_signals"]


def test_hallucination_exact_quotes():
    result = assess_hallucination_risk("Give me an exact quote from the CEO's speech.")
    assert result["risk_score"] > 0.0
    assert "exact_quotes" in result["matched_signals"]


def test_hallucination_multiple_signals():
    result = assess_hallucination_risk("Predict what will happen in the recent news regarding exact statistics.")
    assert result["risk_score"] > 0.0
    assert "future_prediction" in result["matched_signals"]
    assert "recent_events" in result["matched_signals"]
    assert "exact_statistics" in result["matched_signals"]
