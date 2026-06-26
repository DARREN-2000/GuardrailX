import { motion } from "framer-motion";
import { ShieldAlert, Database, Network } from "lucide-react";

export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4 text-red-400">
            The AI adoption bottleneck
          </h2>
          <p className="text-lg text-muted-foreground">
            Integrating LLMs into production exposes enterprises to new attack vectors, unpredictable costs, and compliance risks.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: ShieldAlert, title: "Security Vulnerabilities", desc: "Prompt injection, data exfiltration, and toxic outputs are difficult to catch at the application layer." },
            { icon: Database, title: "Compliance Risks", desc: "Sending PII and sensitive data to external API providers violates GDPR, HIPAA, and SOC2 requirements." },
            { icon: Network, title: "Operational Blindspots", desc: "Without a centralized control plane, auditing who requested what, and from which model, becomes impossible." }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-border/50 bg-card/30"
            >
              <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
