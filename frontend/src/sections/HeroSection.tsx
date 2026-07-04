import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Terminal } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-40 bg-[#000]">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-radial-grid mix-blend-screen" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-8 rounded-full border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-white/80 mr-2" />
              Aegis 1.0 is now available
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl font-display text-5xl font-medium tracking-tight sm:text-6xl lg:text-7xl text-white"
          >
            The governance runtime for{" "}
            <span className="text-white/60">
              enterprise AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-white/60 leading-relaxed font-light"
          >
            Secure every prompt, route every model, and keep every decision auditable with sub-millisecond latency. Built for production LLM workloads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 px-8 h-11 text-sm font-medium w-full sm:w-auto">
              Start Building
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-11 text-sm font-medium w-full sm:w-auto border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-sm">
              <Terminal className="mr-2 h-4 w-4 text-white/60" />
              npm install @aegis/node
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-24 relative mx-auto max-w-4xl"
        >
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent blur-xl opacity-50" />
          <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              </div>
              <div className="ml-4 flex-1">
                <div className="mx-auto h-5 w-48 rounded bg-white/5 flex items-center justify-center text-[10px] text-white/40 font-mono tracking-wider">
                  aegis.config.ts
                </div>
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed text-white/80">
                <code className="block">
                  <span className="text-[#c678dd]">import</span> {"{ Aegis }"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'@aegis/node'</span>;{"\n\n"}
                  <span className="text-[#c678dd]">export default</span> <span className="text-[#e5c07b]">new</span> Aegis({"{\n"}
                  {"  "}projectId: <span className="text-[#98c379]">'prj_ai_governance_1'</span>,{"\n"}
                  {"  "}policies: [{"\n"}
                  {"    "}{"{"}{"\n"}
                  {"      "}type: <span className="text-[#98c379]">'pii_redaction'</span>,{"\n"}
                  {"      "}action: <span className="text-[#98c379]">'mask'</span>,{"\n"}
                  {"      "}fields: [<span className="text-[#98c379]">'email'</span>, <span className="text-[#98c379]">'ssn'</span>, <span className="text-[#98c379]">'phone'</span>]{"\n"}
                  {"    "}{"}"},{"\n"}
                  {"    "}{"{"}{"\n"}
                  {"      "}type: <span className="text-[#98c379]">'prompt_injection'</span>,{"\n"}
                  {"      "}action: <span className="text-[#98c379]">'block'</span>,{"\n"}
                  {"      "}sensitivity: <span className="text-[#d19a66]">0.95</span>{"\n"}
                  {"    "}{"}"}{"\n"}
                  {"  "}],{"\n"}
                  {"  "}routing: {"{"}{"\n"}
                  {"    "}fallback: <span className="text-[#98c379]">'anthropic.claude-3-haiku'</span>,{"\n"}
                  {"    "}timeoutMs: <span className="text-[#d19a66]">1500</span>{"\n"}
                  {"  "}{"}"}{"\n"}
                  {"}"});
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
