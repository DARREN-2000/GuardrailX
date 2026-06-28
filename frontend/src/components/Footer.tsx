import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 transition-opacity hover:opacity-80">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-primary ring-1 ring-primary/20">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-display font-medium tracking-tight text-lg">GuardrailX</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              The policy-driven AI governance runtime. Secure every prompt, route every model, and keep every decision auditable.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {/* Social icons */}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a></li>
              <li><a href="#performance" className="hover:text-foreground transition-colors">Performance</a></li>
              <li><a href="#enterprise" className="hover:text-foreground transition-colors">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GuardrailX Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
