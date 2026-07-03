import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto max-w-6xl flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <span className="font-display font-medium tracking-tight text-lg">GuardrailX</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link to="#features" className="transition-colors hover:text-foreground">Features</Link>
          <Link to="#architecture" className="transition-colors hover:text-foreground">Architecture</Link>
          <Link to="#performance" className="transition-colors hover:text-foreground">Performance</Link>
          <Link to="#enterprise" className="transition-colors hover:text-foreground">Enterprise</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
            Documentation
          </Button>
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-primary hover:text-primary/80 border border-primary/20 bg-primary/10 mr-2">
              Playground
            </Button>
          </Link>
          <Button size="sm" className="h-8 rounded-full px-4">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
