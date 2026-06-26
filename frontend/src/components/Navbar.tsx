import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-display font-semibold tracking-tight text-lg">GuardrailX</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#architecture" className="transition-colors hover:text-foreground">Architecture</a>
          <a href="#performance" className="transition-colors hover:text-foreground">Performance</a>
          <a href="#enterprise" className="transition-colors hover:text-foreground">Enterprise</a>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Documentation
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
}
