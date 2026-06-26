import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal, Shield, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-radial-grid mix-blend-screen" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-6 rounded-full border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              GuardrailX 1.0 is now available
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            The governance runtime for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">
              enterprise AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
          >
            Secure every prompt, route every model, and keep every decision auditable with sub-millisecond latency. Built for production LLM workloads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base w-full sm:w-auto">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base w-full sm:w-auto border-border/50 bg-background/50 backdrop-blur-sm">
              <Terminal className="mr-2 h-4 w-4 text-muted-foreground" />
              npm install @guardrailx/node
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-primary/20 to-transparent blur-xl opacity-50" />
          <div className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
            {/* Mockup Header */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <div className="ml-4 flex-1">
                <div className="mx-auto h-6 w-64 rounded-md bg-background/50 flex items-center justify-center text-xs text-muted-foreground font-mono">
                  aegis.your-domain.com
                </div>
              </div>
            </div>
            {/* Mockup Content */}
            <div className="p-6 grid gap-6 md:grid-cols-3">
              <div className="col-span-2 space-y-4">
                <div className="h-40 rounded-xl border border-border/50 bg-background/50 p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Request Traffic</span>
                    <span className="text-xs text-muted-foreground">Last 24h</span>
                  </div>
                  {/* Fake Chart */}
                  <div className="flex items-end gap-1 h-20">
                    {[40, 70, 45, 90, 65, 85, 100, 75, 50, 80, 60, 95].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/20 rounded-t-sm transition-all hover:bg-primary/40" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border/50 bg-background/50 p-4">
                    <span className="text-sm text-muted-foreground block mb-1">Blocked Requests</span>
                    <span className="text-2xl font-semibold text-red-400">1,204</span>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-background/50 p-4">
                    <span className="text-sm text-muted-foreground block mb-1">Avg Latency</span>
                    <span className="text-2xl font-semibold text-emerald-400">1.2ms</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-border/50 bg-background/50 p-4 h-full">
                  <h3 className="text-sm font-medium mb-4">Active Policies</h3>
                  <div className="space-y-3">
                    {[
                      { name: "PII Redaction", icon: Shield, status: "Active" },
                      { name: "Prompt Injection", icon: Shield, status: "Active" },
                      { name: "Rate Limiting", icon: Zap, status: "Active" },
                    ].map((policy, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <policy.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm">{policy.name}</span>
                        </div>
                        <span className="text-xs text-emerald-400">{policy.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
