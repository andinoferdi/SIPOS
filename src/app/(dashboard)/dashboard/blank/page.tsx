import PageBreadcrumb from "@/features/dashboard/components/common/PageBreadCrumb";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next.js Blank Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Blank Page TailAdmin Dashboard Template",
};

export default function BlankPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Blank Page" />
      <div className="min-h-screen rounded-2xl border border-[var(--token-gray-200)] bg-[var(--token-white)] px-5 py-7 dark:border-[var(--token-gray-800)] dark:bg-[var(--token-white-3)] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[630px] text-center">
          <h3 className="mb-4 font-semibold text-[var(--token-gray-800)] text-theme-xl dark:text-[var(--token-white-90)] sm:text-2xl">
            Card Title Here
          </h3>
          <p className="text-sm text-[var(--token-gray-500)] dark:text-[var(--token-gray-400)] sm:text-base">
            Start putting content on grids or panels, you can also use different
            combinations of grids.Please check out the dashboard and other pages
          </p>
        </div>
      </div>
    </div>
  );
}
