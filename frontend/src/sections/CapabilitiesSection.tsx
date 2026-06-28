import { motion } from "framer-motion";
import { Shield, Zap, Lock, Activity, Scale, Server } from "lucide-react";

const capabilities = [
  {
    title: "Content Safety",
    description: "Real-time moderation for prompt injection, toxicity, and unauthorized content.",
    icon: Shield,
  },
  {
    title: "PII Redaction",
    description: "Automatically detect and mask sensitive data before it reaches external APIs.",
    icon: Lock,
  },
  {
    title: "Smart Routing",
    description: "Dynamically route requests based on latency, cost, and model availability.",
    icon: Zap,
  },
  {
    title: "Observability",
    description: "Granular audit logs, metrics, and tracing for every LLM interaction.",
    icon: Activity,
  },
  {
    title: "Rate Limiting",
    description: "Intelligent quotas and cost controls at the user, org, and model level.",
    icon: Scale,
  },
  {
    title: "VPC Deployment",
    description: "Deploy in your own infrastructure to meet strict compliance requirements.",
    icon: Server,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CapabilitiesSection() {
  return (
    <section id="features" className="py-24 bg-background border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl mb-4 text-white">
            A complete control plane
          </h2>
          <p className="text-lg text-white/50 font-light">
            Everything you need to secure, monitor, and scale your AI applications in production.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {capabilities.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <div className="h-full rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-sm p-6 hover:bg-white/[0.03] transition-all duration-300 hover:border-white/10 group">
                <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                  <feature.icon className="h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-white/90">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
