import { motion } from "framer-motion";

export default function ScreenshotsSection() {
  return (
    <section className="py-24 bg-background border-y border-border/40 overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            Unprecedented visibility
          </h2>
          <p className="text-lg text-muted-foreground">
            Understand exactly how your LLM applications are performing, what they cost, and what users are asking.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
           <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-transparent blur-2xl rounded-3xl opacity-30" />
           <motion.div
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl overflow-hidden"
           >
             <div className="flex items-center gap-2 border-b border-border/50 bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="ml-4 text-xs font-medium text-muted-foreground">Analytics Dashboard</div>
             </div>

             <div className="p-8 grid gap-8">
               <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Total Requests", val: "1.2M", up: true },
                    { label: "Avg Latency", val: "245ms", up: false },
                    { label: "Est. Cost", val: "$450.20", up: true },
                    { label: "Blocked Prompts", val: "3,402", up: true }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl border border-border/50 bg-background/50">
                      <div className="text-xs text-muted-foreground mb-2">{stat.label}</div>
                      <div className="text-2xl font-semibold">{stat.val}</div>
                    </div>
                  ))}
               </div>

               <div className="h-64 rounded-xl border border-border/50 bg-background/50 p-4 relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-medium">
                   [ Time-Series Chart Visualization ]
                 </div>
                 {/* Decorative chart lines */}
                 <svg className="absolute inset-0 w-full h-full opacity-50" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,80 Q20,60 40,70 T80,40 T100,50 L100,100 L0,100 Z" fill="url(#grad1)" />
                    <path d="M0,80 Q20,60 40,70 T80,40 T100,50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                 </svg>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
