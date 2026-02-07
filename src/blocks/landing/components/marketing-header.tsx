import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MarketingHeader = () => {
  return (
    <nav className="glass-nav fixed inset-x-0 top-0 z-50 border-b border-border/50 dark:border-border/50">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-teal-accent text-primary-foreground shadow-lg">
            <Store className="h-5 w-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-foreground">PropertyPOS</span>
        </div>

        <div className="hidden items-center space-x-8 md:flex">
          <a href="#features" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary dark:text-muted-foreground">Features</a>
          <a href="#solutions" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary dark:text-muted-foreground">Solutions</a>
          <a href="#pricing" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary dark:text-muted-foreground">Pricing</a>
          <a href="#resources" className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary dark:text-muted-foreground">Resources</a>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="md" className="hidden sm:inline-flex">Login</Button>
          <Button variant="primary" size="md">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};
