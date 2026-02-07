import { Boxes, Users, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Features = () => {
  return (
    <section className="bg-card py-24" id="features">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-slate-900 md:text-4xl dark:text-slate-900">Everything you need to run your property</h2>
          <p className="text-lg text-slate-600 dark:text-slate-600">From front-of-house to back-office, we have tools designed for speed, simplicity, and scalability.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="rounded-3xl border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:shadow-xl dark:border-slate-200 dark:bg-slate-100"><CardContent className="p-0"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-teal text-teal-accent"><Utensils className="h-7 w-7" /></div><h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-900">Smart Table Management</h3><p className="leading-relaxed text-slate-600 dark:text-slate-600">Optimize seating arrangements and turnover times with an intuitive visual floor plan.</p></CardContent></Card>
          <Card className="rounded-3xl border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:shadow-xl dark:border-slate-200 dark:bg-slate-100"><CardContent className="p-0"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-teal text-primary"><Boxes className="h-7 w-7" /></div><h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-900">Real-time Inventory</h3><p className="leading-relaxed text-slate-600 dark:text-slate-600">Track ingredients down to the gram and automate reordering to prevent stockouts.</p></CardContent></Card>
          <Card className="rounded-3xl border-slate-100 bg-slate-50 p-8 transition-all duration-300 hover:shadow-xl dark:border-slate-200 dark:bg-slate-100"><CardContent className="p-0"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-soft-teal text-teal-accent"><Users className="h-7 w-7" /></div><h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-slate-900">Staff Scheduling</h3><p className="leading-relaxed text-slate-600 dark:text-slate-600">Manage shifts, handle swaps, and forecast labor costs with integrated scheduling.</p></CardContent></Card>
        </div>
      </div>
    </section>
  );
};
