import { motion } from "framer-motion";
import { Code, Settings, Activity } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Drop GuardrailX into your infrastructure and configure policies as code.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Deploy the Proxy", desc: "Run the lightweight GuardrailX container in your VPC or use our managed cloud.", icon: Settings },
            { step: "02", title: "Write Policies", desc: "Define rate limits, PII redaction rules, and routing logic using YAML or TypeScript.", icon: Code },
            { step: "03", title: "Monitor Traffic", desc: "Watch requests flow through the proxy in real-time. Export traces to Datadog or Grafana.", icon: Activity }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl border border-border/50 bg-muted/30"
            >
              <div className="text-4xl font-display font-bold text-muted/50 absolute top-6 right-6 select-none">
                {item.step}
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
