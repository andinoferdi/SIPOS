import { ArrowLeftRight, ArrowRight, BarChart3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const ProblemSolution = () => {
  return (
    <section className="bg-muted py-24 dark:bg-muted" id="solutions">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 space-y-8 lg:order-1">
          <Card className="cursor-default rounded-2xl border-border bg-card p-6 opacity-70 transition-opacity hover:opacity-100"><CardContent className="flex items-start gap-4 p-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground"><X className="h-5 w-5" /></div><div><h4 className="mb-1 text-lg font-bold text-foreground">Manual Entry Errors</h4><p className="text-sm text-muted-foreground">Spreadsheets cause human error and costly accounting mistakes.</p></div></CardContent></Card>
          <Card className="translate-x-4 rounded-2xl border-l-4 border-l-primary bg-card p-6 shadow-lg"><CardContent className="flex items-start gap-4 p-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-teal text-teal-accent"><ArrowLeftRight className="h-5 w-5" /></div><div><h4 className="mb-1 text-lg font-bold text-foreground">Automated Syncing</h4><p className="text-sm text-muted-foreground">Sales, inventory, and labor data sync in real time as one source of truth.</p></div></CardContent></Card>
          <Card className="cursor-default rounded-2xl border-border bg-card p-6 opacity-70 transition-opacity hover:opacity-100"><CardContent className="flex items-start gap-4 p-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft-teal text-primary"><BarChart3 className="h-5 w-5" /></div><div><h4 className="mb-1 text-lg font-bold text-foreground">Data-Driven Decisions</h4><p className="text-sm text-muted-foreground">Use real data to understand peak hours, popular items, and staff performance.</p></div></CardContent></Card>
        </div>
        <div className="order-1 lg:order-2"><h2 className="mb-6 text-3xl font-extrabold leading-tight text-foreground md:text-4xl dark:text-foreground">Stop wrestling with spread sheets</h2><p className="mb-8 text-lg leading-relaxed text-muted-foreground">Automate your back office and focus on your guests. PropertyPOS handles repetitive work so you can deliver better experiences.</p><Button variant="primary" size="md" className="inline-flex gap-2">See How It Works<ArrowRight className="h-4 w-4" /></Button></div>
      </div>
    </section>
  );
};
