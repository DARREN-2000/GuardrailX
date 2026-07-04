import { motion } from "framer-motion";
import { Code, Settings, Activity } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-background border-t border-white/5">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-white">
            How it works
          </h2>
          <p className="text-lg text-white/50 font-light">
            Drop Aegis into your infrastructure and configure policies as code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Deploy the Proxy", desc: "Run the lightweight Aegis container in your VPC or use our managed cloud.", icon: Settings },
            { step: "02", title: "Write Policies", desc: "Define rate limits, PII redaction rules, and routing logic using YAML or TypeScript.", icon: Code },
            { step: "03", title: "Monitor Traffic", desc: "Watch requests flow through the proxy in real-time. Export traces to Datadog or Grafana.", icon: Activity }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
            >
              <div className="text-4xl font-display font-bold text-white/5 absolute top-6 right-6 select-none transition-colors group-hover:text-white/10">
                {item.step}
              </div>
              <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                <item.icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-medium mb-3 text-white/90">{item.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
