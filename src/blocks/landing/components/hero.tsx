import Image from "next/image";
import { CheckCircle2, PlayCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-40" id="hero">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-soft-teal/50 to-card dark:from-muted dark:to-background" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-1/2 bg-gradient-to-bl from-soft-teal/70 to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="z-10 flex flex-col gap-6 text-center lg:text-left">
            <div className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 shadow-sm lg:mx-0">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-accent" />
              <span className="text-xs font-bold uppercase tracking-wide text-foreground">New Version 2.0</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl lg:text-6xl dark:text-foreground">Effortless POS for <span className="bg-gradient-to-r from-primary to-teal-accent bg-clip-text text-transparent">Modern Hospitality</span></h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0 dark:text-muted-foreground">Streamline operations, delight guests, and boost revenue with the POS designed for the future of hospitality. Beautifully simple, powerfully effective.</p>
            <div className="mt-2 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button variant="primary" size="lg">Start Free Trial</Button>
              <Button variant="outline" size="lg" className="gap-2"><PlayCircle className="h-5 w-5" />View Demo</Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-muted-foreground lg:justify-start dark:text-muted-foreground">
              <div className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-success" /><span>No credit card required</span></div>
              <div className="flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-success" /><span>14-day free trial</span></div>
            </div>
          </div>

          <div className="perspective-container relative hidden lg:block">
            <div className="floating-card relative overflow-hidden rounded-[1.5rem] border border-border bg-card p-2 shadow-2xl">
              <Image src="/landing/hero-dashboard.webp" alt="Modern Point of Sale dashboard showing table layout and analytics" width={1200} height={900} className="aspect-[4/3] h-auto w-full rounded-2xl object-cover" priority />
              <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-soft-teal text-success"><TrendingUp className="h-5 w-5" /></div>
                <div><p className="text-xs text-muted-foreground">Daily Revenue</p><p className="text-lg font-bold text-foreground">+$12,450</p></div>
              </div>
              <div className="absolute -right-4 -top-4 flex items-center gap-2 rounded-2xl border border-border bg-card p-3 shadow-xl">
                <div className="flex -space-x-2">
                  <Image src="/landing/avatar-1.webp" alt="User avatar 1" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-card object-cover" />
                  <Image src="/landing/avatar-2.webp" alt="User avatar 2" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-card object-cover" />
                  <Image src="/landing/avatar-3.webp" alt="User avatar 3" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-card object-cover" />
                </div>
                <span className="text-xs font-semibold text-muted-foreground">Online Staff</span>
              </div>
            </div>
          </div>

          <div className="mt-8 lg:hidden">
            <Image src="/landing/mobile-dashboard.webp" alt="Modern Point of Sale dashboard on tablet" width={1200} height={900} className="h-auto w-full rounded-2xl shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};
