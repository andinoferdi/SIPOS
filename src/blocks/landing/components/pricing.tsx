import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PricingItemProps {
  label: string;
}

const PricingItem = ({ label }: PricingItemProps) => {
  return (
    <li className="flex items-center gap-3 text-sm text-foreground">
      <Check className="h-4 w-4 text-success" />
      {label}
    </li>
  );
};

export const Pricing = () => {
  return (
    <section className="relative bg-card py-24" id="pricing">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-soft-teal/50 blur-3xl" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center"><h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl dark:text-foreground">Simple, transparent pricing</h2><p className="text-lg text-muted-foreground">Choose the plan that fits your property size. No hidden fees.</p></div>
        <div className="grid items-start gap-8 md:grid-cols-3">
          <Card className="rounded-3xl border-border bg-card p-8"><CardContent className="p-0"><h3 className="text-xl font-bold text-foreground">Starter</h3><p className="mb-6 mt-1 text-sm text-muted-foreground">Perfect for small cafes and trucks</p><div className="mb-6 flex items-baseline"><span className="text-4xl font-extrabold text-foreground">$0</span><span className="ml-2 font-medium text-muted-foreground">/mo</span></div><Button variant="secondary" size="lg" className="mb-8 w-full">Sign Up Free</Button><ul className="space-y-4"><PricingItem label="1 Terminal" /><PricingItem label="Basic Reporting" /><PricingItem label="Email Support" /></ul></CardContent></Card>
          <Card className="relative z-10 rounded-3xl border-2 border-primary bg-card p-8 shadow-xl md:-translate-y-4"><div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">Most Popular</div><CardContent className="p-0"><h3 className="text-xl font-bold text-foreground">Pro</h3><p className="mb-6 mt-1 text-sm text-muted-foreground">For growing restaurants</p><div className="mb-6 flex items-baseline"><span className="text-5xl font-extrabold text-foreground">$79</span><span className="ml-2 font-medium text-muted-foreground">/mo</span></div><Button variant="primary" size="lg" className="mb-8 w-full">Start Pro Trial</Button><ul className="space-y-4"><PricingItem label="3 Terminals" /><PricingItem label="Advanced Inventory" /><PricingItem label="24/7 Priority Support" /><PricingItem label="Table Management" /></ul></CardContent></Card>
          <Card className="rounded-3xl border-border bg-card p-8"><CardContent className="p-0"><h3 className="text-xl font-bold text-foreground">Enterprise</h3><p className="mb-6 mt-1 text-sm text-muted-foreground">For chains and hotels</p><div className="mb-6 flex items-baseline"><span className="text-4xl font-extrabold text-foreground">$199</span><span className="ml-2 font-medium text-muted-foreground">/mo</span></div><Button variant="secondary" size="lg" className="mb-8 w-full">Contact Sales</Button><ul className="space-y-4"><PricingItem label="Unlimited Terminals" /><PricingItem label="API Access" /><PricingItem label="Dedicated Account Manager" /><PricingItem label="Multi-location Support" /></ul></CardContent></Card>
        </div>
      </div>
    </section>
  );
};
