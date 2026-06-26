import { ShieldCheck, LockKeyhole, EyeOff } from "lucide-react";

export default function SecuritySection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 ring-8 ring-primary/5">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
            Security by default
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Designed to meet the most stringent enterprise compliance requirements from day one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { title: "Zero Trust Architecture", desc: "Every request is authenticated, authorized, and logged. No implicit trust anywhere in the chain.", icon: ShieldCheck },
            { title: "Data Minimization", desc: "PII and PHI are scrubbed before leaving your network. You control what the models see.", icon: EyeOff }
          ].map((item, i) => (
             <div key={i} className="flex gap-4 p-6 rounded-2xl border border-border/50 bg-background hover:border-primary/50 transition-colors">
               <div className="shrink-0 mt-1">
                 <item.icon className="h-6 w-6 text-primary" />
               </div>
               <div>
                 <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                 <p className="text-muted-foreground">{item.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
