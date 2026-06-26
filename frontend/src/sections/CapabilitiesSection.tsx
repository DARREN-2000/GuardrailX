import { motion } from "framer-motion";
import { Shield, Zap, Lock, Activity, Scale, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            A complete control plane
          </h2>
          <p className="text-lg text-muted-foreground">
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
              <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
