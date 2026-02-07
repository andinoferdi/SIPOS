import { Linkedin, Store, Twitter } from "lucide-react";

export const MarketingFooter = () => {
  return (
    <footer className="border-t border-slate-100 bg-card pb-8 pt-16 dark:border-slate-200" id="footer">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Store className="h-4 w-4" /></div><span className="text-xl font-extrabold text-slate-900 dark:text-slate-900">PropertyPOS</span></div>
            <p className="mb-6 max-w-xs text-sm text-slate-500 dark:text-slate-500">Modernizing hospitality one transaction at a time. Built for speed, reliability, and growth.</p>
            <div className="flex gap-4"><a href="#" className="text-slate-400 transition-colors hover:text-primary" aria-label="Twitter"><Twitter className="h-5 w-5" /></a><a href="#" className="text-slate-400 transition-colors hover:text-primary" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a></div>
          </div>
          <div><h4 className="mb-4 font-bold text-slate-900 dark:text-slate-900">Product</h4><ul className="space-y-3 text-sm text-slate-600 dark:text-slate-600"><li><a className="transition-colors hover:text-primary" href="#features">Features</a></li><li><a className="transition-colors hover:text-primary" href="#">Integrations</a></li><li><a className="transition-colors hover:text-primary" href="#">Hardware</a></li><li><a className="transition-colors hover:text-primary" href="#pricing">Pricing</a></li></ul></div>
          <div><h4 className="mb-4 font-bold text-slate-900 dark:text-slate-900">Support</h4><ul className="space-y-3 text-sm text-slate-600 dark:text-slate-600"><li><a className="transition-colors hover:text-primary" href="#">Help Center</a></li><li><a className="transition-colors hover:text-primary" href="#">API Docs</a></li><li><a className="transition-colors hover:text-primary" href="#">Community</a></li><li><a className="transition-colors hover:text-primary" href="#">Status</a></li></ul></div>
          <div><h4 className="mb-4 font-bold text-slate-900 dark:text-slate-900">Company</h4><ul className="space-y-3 text-sm text-slate-600 dark:text-slate-600"><li><a className="transition-colors hover:text-primary" href="#">About Us</a></li><li><a className="transition-colors hover:text-primary" href="#">Careers</a></li><li><a className="transition-colors hover:text-primary" href="#">Legal</a></li><li><a className="transition-colors hover:text-primary" href="#">Contact</a></li></ul></div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 md:flex-row dark:border-slate-200"><p className="text-xs text-slate-400">© 2023 PropertyPOS Inc. All rights reserved.</p><div className="flex gap-6 text-xs text-slate-400"><a className="hover:text-slate-600" href="#">Privacy Policy</a><a className="hover:text-slate-600" href="#">Terms of Service</a></div></div>
      </div>
    </footer>
  );
};
