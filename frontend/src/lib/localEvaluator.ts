import { EvaluationResult } from "../pages/DashboardPage";

// Define patterns for PII detection
const PII_PATTERNS = {
  EMAIL_ADDRESS: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  PHONE_NUMBER: /\b(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})\b/g,
  CREDIT_CARD: /\b(?:\d[ -]*?){13,16}\b/g,
  IP_ADDRESS: /\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g,
};

// Define keywords for other detectors
const INJECTION_KEYWORDS = [
  "ignore all previous instructions", "override", "system prompt",
  "disregard", "forget your instructions", "you are a new",
  "bypassed", "skip filters"
];

const JAILBREAK_KEYWORDS = [
  "dan", "do anything now", "developer mode", "jailbreak",
  "unrestricted", "evil AI", "god mode", "sudo"
];

const CONTENT_SAFETY_KEYWORDS = {
  toxicity: ["idiot", "stupid", "moron", "dumb"],
  hate: ["hate", "kill", "destroy"],
  violence: ["blood", "murder", "weapon", "shoot", "attack"]
};

const HALLUCINATION_KEYWORDS = [
  "predict the future", "stock price tomorrow", "will I win",
  "fortune telling", "exact date of", "guaranteed return"
];

export function evaluateLocally(text: string): EvaluationResult {
  const result: EvaluationResult = {
    decision: "allow",
    reasons: [],
    per_detector_results: {
      pii: { redacted_text: text, entities: [] },
      prompt_injection: { risk_score: 0.0, matched_signals: [] },
      jailbreak: { risk_score: 0.0, matched_signals: [] },
      content_safety: { category_scores: { toxicity: 0.0, hate: 0.0, violence: 0.0 }, blocked: false },
      hallucination: { risk_score: 0.0, matched_signals: [] },
    }
  };

  // 1. PII Detection
  Object.entries(PII_PATTERNS).forEach(([type, regex]) => {
    let match;
    while ((match = regex.exec(text)) !== null) {
      result.per_detector_results.pii.entities.push({
        type,
        span: [match.index, match.index + match[0].length],
        score: 0.99
      });
    }
  });

  // Safe replacement logic
  let finalRedactedText = "";
  let currentIndex = 0;
  // Sort entities by start span to avoid overlapping replacement issues
  result.per_detector_results.pii.entities.sort((a, b) => a.span[0] - b.span[0]).forEach(entity => {
      finalRedactedText += text.substring(currentIndex, entity.span[0]) + `<${entity.type}>`;
      currentIndex = entity.span[1];
  });
  finalRedactedText += text.substring(currentIndex);

  if (result.per_detector_results.pii.entities.length === 0) {
      finalRedactedText = text;
  }

  result.per_detector_results.pii.redacted_text = finalRedactedText;

  if (result.per_detector_results.pii.entities.length > 0) {
    result.reasons.push("PII detected");
    result.decision = "redact";
  }

  const lowerText = text.toLowerCase();

  // 2. Prompt Injection
  INJECTION_KEYWORDS.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      result.per_detector_results.prompt_injection.matched_signals.push(keyword);
    }
  });
  if (result.per_detector_results.prompt_injection.matched_signals.length > 0) {
    result.per_detector_results.prompt_injection.risk_score = 0.95;
    result.reasons.push("Prompt injection detected");
    result.decision = "block";
  }

  // 3. Jailbreak
  JAILBREAK_KEYWORDS.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      result.per_detector_results.jailbreak.matched_signals.push(keyword);
    }
  });
  if (result.per_detector_results.jailbreak.matched_signals.length > 0) {
    result.per_detector_results.jailbreak.risk_score = 0.98;
    if (!result.reasons.includes("Jailbreak detected")) {
      result.reasons.push("Jailbreak detected");
    }
    result.decision = "block";
  }

  // 4. Content Safety
  let contentSafetyBlocked = false;
  Object.entries(CONTENT_SAFETY_KEYWORDS).forEach(([category, keywords]) => {
    let matched = false;
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        matched = true;
      }
    });
    if (matched) {
      result.per_detector_results.content_safety.category_scores[category] = 0.9;
      contentSafetyBlocked = true;
    } else {
      result.per_detector_results.content_safety.category_scores[category] = 0.0;
    }
  });

  if (contentSafetyBlocked) {
      result.per_detector_results.content_safety.blocked = true;
      if (!result.reasons.includes("Content safety violation")) {
          result.reasons.push("Content safety violation");
      }
      result.decision = "block";
  }

  // 5. Hallucination
  HALLUCINATION_KEYWORDS.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      result.per_detector_results.hallucination.matched_signals.push(keyword);
    }
  });
  if (result.per_detector_results.hallucination.matched_signals.length > 0) {
    result.per_detector_results.hallucination.risk_score = 0.85;
    // Usually hallucination doesn't block by itself in this simple logic unless we want to, let's just flag it.
    // If we wanted it to block:
    // result.decision = "block";
    // result.reasons.push("High hallucination risk");
  }

  return result;
}
