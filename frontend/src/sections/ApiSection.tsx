import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";

export default function ApiSection() {
  return (
    <section className="py-24 bg-muted/20 border-t border-border/40">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <BookOpen className="h-12 w-12 text-primary mx-auto mb-6 opacity-80" />
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-6">
          Powerful REST & GraphQL APIs
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Automate policy management, provision API keys dynamically, and extract audit logs programmatically. Every feature in the dashboard is available via API.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" variant="outline" className="rounded-full bg-background">
            Explore API Reference
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
