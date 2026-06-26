import { motion } from "framer-motion";

const metrics = [
  { label: "Added Latency", value: "< 2ms", detail: "p99 overhead for standard policy evaluation" },
  { label: "Throughput", value: "10k+", detail: "requests per second per node" },
  { label: "Uptime", value: "99.99%", detail: "SLA for managed cloud deployments" }
];

export default function PerformanceSection() {
  return (
    <section id="performance" className="py-24 bg-background border-y border-border/40">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            Built for speed
          </h2>
          <p className="text-lg text-muted-foreground">
            Security shouldn't compromise user experience. GuardrailX is written in Rust to ensure minimal overhead.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-8 rounded-2xl border border-border/50 bg-card overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {metric.label}
              </p>
              <div className="text-4xl md:text-5xl font-semibold text-foreground mb-4">
                {metric.value}
              </div>
              <p className="text-sm text-muted-foreground">
                {metric.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
