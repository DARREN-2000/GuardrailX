import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 bg-background border-t border-white/5 relative">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl mb-6 text-white">
              Opinionated boundaries,<br />clean dependencies
            </h2>
            <p className="text-lg text-white/50 mb-8 font-light leading-relaxed">
              Aegis is designed as a modular proxy. It sits between your application and your LLM providers, intercepting requests to enforce policies before they reach the model.
            </p>

            <ul className="space-y-8">
              {[
                { title: "Stateless Edge", desc: "Deploy close to your users for minimal latency overhead." },
                { title: "Pluggable Policies", desc: "Write custom rules in TypeScript or Python." },
                { title: "Standard Protocols", desc: "Native support for OpenAI and Anthropic API formats." }
              ].map((item, i) => (
                <li key={i} className="flex gap-6 group">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-white/5 border border-white/10 text-white/70 group-hover:bg-white/10 group-hover:text-white transition-colors mt-1">
                    <span className="text-sm font-medium">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-white/90 mb-1">{item.title}</h3>
                    <p className="text-white/50 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-white/10 to-transparent blur-3xl rounded-full opacity-30" />
            <div className="relative border border-white/10 rounded-2xl bg-[#0A0A0A] p-8 shadow-2xl">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center bg-white/[0.03] p-4 rounded-xl border border-white/10">
                  <span className="font-medium text-white/80">Your Application</span>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-white/20 rotate-90" />
                </div>

                <div className="bg-white/[0.02] p-6 rounded-xl border border-white/10 relative overflow-hidden">
                  <h3 className="font-medium mb-4 text-white">Aegis Proxy</h3>
                  <div className="grid gap-3">
                    <div className="bg-[#050505] p-3 rounded-lg text-sm border border-white/5 text-center text-white/70 font-light">Auth & Rate Limiting</div>
                    <div className="bg-[#050505] p-3 rounded-lg text-sm border border-white/5 text-center text-white/70 font-light">Policy Engine (PII, Safety)</div>
                    <div className="bg-[#050505] p-3 rounded-lg text-sm border border-white/5 text-center text-white/70 font-light">Smart Router</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-white/20 rotate-90" />
                </div>

                <div className="flex justify-between gap-4">
                  <div className="flex-1 bg-white/[0.03] p-4 rounded-xl border border-white/10 text-center text-sm text-white/80">OpenAI</div>
                  <div className="flex-1 bg-white/[0.03] p-4 rounded-xl border border-white/10 text-center text-sm text-white/80">Anthropic</div>
                  <div className="flex-1 bg-white/[0.03] p-4 rounded-xl border border-white/10 text-center text-sm text-white/80">Custom LLM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
