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
                 <svg className="absolute inset-0 w-full h-full opacity-80" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path d="M0,80 Q10,70 20,60 T40,65 T60,50 T80,40 T100,20 L100,100 L0,100 Z" fill="url(#grad1)" />
                    <path d="M0,80 Q10,70 20,60 T40,65 T60,50 T80,40 T100,20" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />

                    <path d="M0,90 Q15,85 30,75 T50,80 T70,65 T90,55 T100,45" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.2" opacity="0.5" />
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                 </svg>
                 <div className="absolute inset-x-0 bottom-0 flex justify-between px-4 pb-2 text-[10px] text-muted-foreground font-mono">
                    <span>12:00</span>
                    <span>13:00</span>
                    <span>14:00</span>
                    <span>15:00</span>
                    <span>16:00</span>
                 </div>
                 <div className="absolute inset-y-0 left-0 flex flex-col justify-between py-4 pl-2 text-[10px] text-muted-foreground font-mono">
                    <span>20k</span>
                    <span>15k</span>
                    <span>10k</span>
                    <span>5k</span>
                    <span>0</span>
                 </div>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
