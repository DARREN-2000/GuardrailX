import { useState } from "react";

interface EvaluationResult {
  decision: "allow" | "redact" | "block";
  reasons: string[];
  per_detector_results: {
    pii: {
      redacted_text: string;
      entities: Array<{ type: string; span: number[]; score: number }>;
    };
    prompt_injection: {
      risk_score: number;
      matched_signals: string[];
    };
    jailbreak: {
      risk_score: number;
      matched_signals: string[];
    };
    content_safety: {
      category_scores: Record<string, number>;
      blocked: boolean;
    };
  };
}

export default function DashboardPage() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${baseUrl}/api/v1/guardrails/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }

      const data: EvaluationResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to evaluate prompt.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#EDEDED] font-sans pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">Guardrail Playground</h1>
          <p className="text-[#A1A1AA] text-lg max-w-2xl">
            Test your LLM prompts against our detectors in real-time. Enter a prompt below to see evaluation results.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <label htmlFor="prompt-input" className="block text-sm font-medium text-[#EDEDED]">
                Input Prompt
              </label>
              <textarea
                id="prompt-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter a prompt to evaluate..."
                className="w-full h-64 p-4 bg-[#111111] border border-[#333333] rounded-lg text-sm text-[#EDEDED] focus:outline-none focus:border-[#666666] focus:ring-1 focus:ring-[#666666] resize-none transition-colors"
              />
            </div>
            <button
              onClick={handleEvaluate}
              disabled={isLoading || !inputText.trim()}
              className="w-full py-3 px-4 bg-[#EDEDED] hover:bg-white text-[#0A0A0A] text-sm font-semibold rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Evaluating..." : "Evaluate Prompt"}
            </button>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 bg-[#111111] border border-[#333333] rounded-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Evaluation Results</h2>
                {result && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    result.decision === 'allow' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                    result.decision === 'block' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                  }`}>
                    {result.decision.toUpperCase()}
                  </div>
                )}
              </div>

              {!result ? (
                <div className="h-64 flex items-center justify-center text-[#666666] border border-dashed border-[#333333] rounded-lg">
                  Submit a prompt to view detailed evaluation results
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* PII Panel */}
                  <div className="p-4 bg-[#0A0A0A] border border-[#222222] rounded-md space-y-2">
                    <h3 className="text-sm font-semibold text-[#888888] uppercase tracking-wider">PII Redaction</h3>
                    <div className="text-sm">
                      {result.per_detector_results.pii.entities.length === 0 ? (
                        <span className="text-green-500">No PII detected</span>
                      ) : (
                        <div className="space-y-2">
                          <div className="text-yellow-500">{result.per_detector_results.pii.entities.length} entities found</div>
                          <div className="text-[#888888] break-all">{result.per_detector_results.pii.redacted_text}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Prompt Injection Panel */}
                  <div className="p-4 bg-[#0A0A0A] border border-[#222222] rounded-md space-y-2">
                    <h3 className="text-sm font-semibold text-[#888888] uppercase tracking-wider">Prompt Injection</h3>
                    <div className="text-sm">
                      <div className="mb-2">
                        Risk Score: <span className={result.per_detector_results.prompt_injection.risk_score > 0.5 ? "text-red-500" : "text-green-500"}>
                          {result.per_detector_results.prompt_injection.risk_score.toFixed(2)}
                        </span>
                      </div>
                      {result.per_detector_results.prompt_injection.matched_signals.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {result.per_detector_results.prompt_injection.matched_signals.map((sig, i) => (
                            <span key={i} className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded border border-red-500/20">{sig}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Jailbreak Panel */}
                  <div className="p-4 bg-[#0A0A0A] border border-[#222222] rounded-md space-y-2">
                    <h3 className="text-sm font-semibold text-[#888888] uppercase tracking-wider">Jailbreak Detection</h3>
                    <div className="text-sm">
                      <div className="mb-2">
                        Risk Score: <span className={result.per_detector_results.jailbreak.risk_score > 0.5 ? "text-red-500" : "text-green-500"}>
                          {result.per_detector_results.jailbreak.risk_score.toFixed(2)}
                        </span>
                      </div>
                      {result.per_detector_results.jailbreak.matched_signals.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {result.per_detector_results.jailbreak.matched_signals.map((sig, i) => (
                            <span key={i} className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded border border-red-500/20">{sig}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Safety Panel */}
                  <div className="p-4 bg-[#0A0A0A] border border-[#222222] rounded-md space-y-2">
                    <h3 className="text-sm font-semibold text-[#888888] uppercase tracking-wider">Content Safety</h3>
                    <div className="text-sm">
                      <div className="space-y-1">
                        {Object.entries(result.per_detector_results.content_safety.category_scores).map(([category, score]) => (
                          <div key={category} className="flex justify-between items-center">
                            <span className="capitalize">{category.replace('_', ' ')}</span>
                            <span className={score > 0.5 ? "text-red-500" : "text-green-500"}>{score.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
