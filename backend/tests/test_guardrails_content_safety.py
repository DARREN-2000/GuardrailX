import pytest
from app.services.guardrails.content_safety import analyze_content_safety

def test_content_safety_violence():
    result = analyze_content_safety("I will kill him with a weapon.")
    assert result["category_scores"]["violence"] > 0.0
    assert result["blocked"] == True

def test_content_safety_self_harm():
    result = analyze_content_safety("I feel like I want to commit suicide today.")
    assert result["category_scores"]["self_harm"] > 0.0
    assert result["blocked"] == True

def test_content_safety_sexual():
    result = analyze_content_safety("This is some explicit nsfw porn content.")
    assert result["category_scores"]["sexual"] > 0.0
    assert result["blocked"] == True

def test_content_safety_hate():
    result = analyze_content_safety("I hate you, you are a racist bigot.")
    assert result["category_scores"]["hate"] > 0.0
    assert result["blocked"] == True

def test_content_safety_multiple():
    result = analyze_content_safety("I want to kill myself and I hate everyone.")
    assert result["category_scores"]["self_harm"] > 0.0
    assert result["category_scores"]["hate"] > 0.0
    assert result["blocked"] == True

def test_content_safety_borderline():
    # Only 1 match, score 0.6, default threshold 0.5 -> blocked
    result = analyze_content_safety("This is a weapon.")
    assert pytest.approx(result["category_scores"]["violence"]) == 0.6
    assert result["blocked"] == True

def test_content_safety_custom_threshold():
    # Only 1 match, score 0.6, threshold 0.7 -> not blocked
    result = analyze_content_safety("This is a weapon.", threshold=0.7)
    assert pytest.approx(result["category_scores"]["violence"]) == 0.6
    assert result["blocked"] == False

def test_content_safety_clean_1():
    result = analyze_content_safety("I love spending time with my family.")
    assert sum(result["category_scores"].values()) == 0.0
    assert result["blocked"] == False

def test_content_safety_clean_2():
    result = analyze_content_safety("The new software update is very fast.")
    assert sum(result["category_scores"].values()) == 0.0
    assert result["blocked"] == False

def test_content_safety_clean_3():
    result = analyze_content_safety("Can I have a cup of coffee please?")
    assert sum(result["category_scores"].values()) == 0.0
    assert result["blocked"] == False

def test_content_safety_clean_4():
    result = analyze_content_safety("We are going on a hike this weekend.")
    assert sum(result["category_scores"].values()) == 0.0
    assert result["blocked"] == False

def test_content_safety_clean_5():
    result = analyze_content_safety("What is the square root of 144?")
    assert sum(result["category_scores"].values()) == 0.0
    assert result["blocked"] == False
