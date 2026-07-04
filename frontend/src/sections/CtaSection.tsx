import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-32 bg-background relative overflow-hidden border-t border-border/40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-radial-grid mix-blend-screen" />
      </div>

      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
          Ready to secure your AI workloads?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Start using Aegis today. Deploy your first policy in under 5 minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="rounded-full px-8 h-14 text-base w-full sm:w-auto">
            Start Building for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base w-full sm:w-auto bg-background/50 backdrop-blur">
            Request Enterprise Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
