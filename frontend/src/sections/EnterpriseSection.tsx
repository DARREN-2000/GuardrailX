import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function EnterpriseSection() {
  return (
    <section id="enterprise" className="py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary/20 to-transparent opacity-50" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl mb-4">
                Enterprise-grade by design
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Deploy GuardrailX in your own VPC, connect to your existing SSO, and stream audit logs directly to your SIEM.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "SOC2 Type II Compliant",
                  "SSO / SAML Integration",
                  "Role-based Access Control (RBAC)",
                  "Custom Data Retention Policies",
                  "Dedicated Support Engineer"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="mailto:sales@guardrailx.com">
                    Contact Sales
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full">
                  View Security Docs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative h-full min-h-[300px] hidden lg:block">
              {/* Abstract Security Graphic */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-primary/20 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-primary/40 rounded-full animate-[spin_15s_linear_infinite_reverse] flex items-center justify-center">
                    <div className="w-32 h-32 border-2 border-primary/60 rounded-full flex items-center justify-center bg-background shadow-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">SOC2</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Type II</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
