import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentationSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/50 bg-muted/20 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="max-w-2xl">
             <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <FileText className="h-6 w-6 text-primary" />
             </div>
             <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
               Comprehensive documentation
             </h2>
             <p className="text-lg text-muted-foreground">
               Detailed guides on deploying to AWS/GCP, writing custom policy modules in Rust or Python, and configuring SSO.
             </p>
           </div>
           <Button size="lg" className="rounded-full shrink-0">
             Read the Docs
             <ArrowRight className="ml-2 h-4 w-4" />
           </Button>
        </div>
      </div>
    </section>
  );
}
