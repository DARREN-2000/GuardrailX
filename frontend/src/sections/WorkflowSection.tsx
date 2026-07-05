import { motion } from "framer-motion";

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[400px] rounded-2xl border border-border/50 bg-card overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-zinc-950 text-zinc-300 font-mono text-sm p-4 pt-12 overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
                 <div className="w-3 h-3 rounded-full bg-green-500" />
               </div>
               <div className="space-y-2 opacity-80">
                 <p className="text-emerald-400">$ cat policy.yaml</p>
                 <pre className="text-zinc-400">
{`name: enterprise-strict
rules:
  - type: pii_redaction
    action: mask
    entities: [EMAIL, CREDIT_CARD, SSN]
  - type: rate_limit
    limit: 100
    window: 1m
  - type: routing
    condition: cost > 0.01
    fallback: claude-3-haiku`}
                 </pre>
                 <p className="text-emerald-400 mt-4">$ guardrailx apply -f policy.yaml</p>
                 <p className="text-zinc-300">✓ Policy 'enterprise-strict' applied successfully.</p>
                 <span className="inline-block w-2 h-4 bg-zinc-400 animate-pulse mt-2" />
               </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
              Policies as Code
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Manage your AI governance rules just like your infrastructure. Version control your policies, integrate with CI/CD, and deploy changes with confidence.
            </p>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Declarative YAML configuration
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> GitOps ready
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Dry-run testing environments
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
