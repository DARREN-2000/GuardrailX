import { motion } from "framer-motion";

export default function TrustedBySection() {
  return (
    <section className="py-12 border-b border-border/40 bg-muted/20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
          Securing AI workloads for innovative teams
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {["Vercel", "Linear", "Cursor", "Anthropic", "Stripe"].map((brand, i) => (
             <div key={i} className="text-xl md:text-2xl font-bold font-display tracking-tight text-foreground flex items-center justify-center">
               {brand}
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
