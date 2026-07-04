import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Does Aegis add latency to my requests?",
    a: "Aegis is written in Rust and highly optimized. Standard policy evaluation (routing, basic rate limits) adds < 2ms of latency. Complex policies like synchronous PII redaction or ML-based toxicity checks take slightly longer, but can often run asynchronously."
  },
  {
    q: "Can I deploy Aegis on my own infrastructure?",
    a: "Yes. Aegis is available as a managed SaaS or as a Docker container you can deploy in your own VPC (AWS, GCP, Azure). This ensures your data never leaves your environment."
  },
  {
    q: "Which LLM providers do you support?",
    a: "We currently support OpenAI, Anthropic, Google Gemini, and any provider that conforms to the OpenAI chat completions schema (e.g., vLLM, Ollama, Together AI)."
  },
  {
    q: "How does the PII redaction work?",
    a: "We use a combination of fast regex patterns for structured data (SSN, credit cards) and a specialized, lightweight local NLP model for contextual PII detection (names, addresses)."
  }
];

export default function FaqSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-12 text-center">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-lg font-medium">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
