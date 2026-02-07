import { Coffee, Croissant, Hotel, UtensilsCrossed } from "lucide-react";

export const SocialProof = () => {
  return (
    <section className="border-t border-slate-200 bg-slate-light py-20 dark:border-slate-200 dark:bg-slate-50" id="resources">
      <div className="mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-8 text-sm font-semibold uppercase tracking-wider text-slate-500">Trusted by modern hospitality brands</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-70 grayscale transition-all duration-500 hover:grayscale-0 md:gap-16">
          <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-700"><UtensilsCrossed className="h-5 w-5" />Bistro</div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-700"><Coffee className="h-5 w-5" />BrewCo</div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-700"><Hotel className="h-5 w-5" />LuxStay</div>
          <div className="flex items-center gap-2 text-xl font-bold text-slate-700 dark:text-slate-700"><Croissant className="h-5 w-5" />Grain&Co</div>
        </div>
      </div>
    </section>
  );
};
