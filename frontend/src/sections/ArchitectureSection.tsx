import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
              Opinionated boundaries,<br />clean dependencies
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              GuardrailX is designed as a modular proxy. It sits between your application and your LLM providers, intercepting requests to enforce policies before they reach the model.
            </p>

            <ul className="space-y-6">
              {[
                { title: "Stateless Edge", desc: "Deploy close to your users for minimal latency overhead." },
                { title: "Pluggable Policies", desc: "Write custom rules in TypeScript or Python." },
                { title: "Standard Protocols", desc: "Native support for OpenAI and Anthropic API formats." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary mt-1">
                    <span className="text-sm font-semibold">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent blur-2xl rounded-full opacity-50" />
            <div className="relative border border-border/50 rounded-2xl bg-card p-8 shadow-xl">
              {/* Architecture Diagram Mock */}
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-muted/50 p-4 rounded-lg border border-border/50">
                  <span className="font-medium">Your Application</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                </div>

                <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">🛡️</div>
                  <h3 className="font-semibold mb-4 text-primary">GuardrailX Proxy</h3>
                  <div className="grid gap-3">
                    <div className="bg-background p-3 rounded-md text-sm border border-border/50 text-center">Auth & Rate Limiting</div>
                    <div className="bg-background p-3 rounded-md text-sm border border-border/50 text-center">Policy Engine (PII, Safety)</div>
                    <div className="bg-background p-3 rounded-md text-sm border border-border/50 text-center">Smart Router</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                </div>

                <div className="flex justify-between gap-4">
                  <div className="flex-1 bg-muted/50 p-4 rounded-lg border border-border/50 text-center text-sm">OpenAI</div>
                  <div className="flex-1 bg-muted/50 p-4 rounded-lg border border-border/50 text-center text-sm">Anthropic</div>
                  <div className="flex-1 bg-muted/50 p-4 rounded-lg border border-border/50 text-center text-sm">Custom LLM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
