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
              <span className="font-display font-medium tracking-tight text-lg">Aegis</span>
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
              <li><Link to="#features" className="hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="#architecture" className="hover:text-foreground transition-colors">Architecture</Link></li>
              <li><Link to="#performance" className="hover:text-foreground transition-colors">Performance</Link></li>
              <li><Link to="#enterprise" className="hover:text-foreground transition-colors">Enterprise</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors text-primary font-medium">Playground</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link to="/docs/api" className="hover:text-foreground transition-colors">API Reference</Link></li>
              <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/case-studies" className="hover:text-foreground transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Aegis Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
