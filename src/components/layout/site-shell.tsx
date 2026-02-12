import Footer from '@/features/marketing/components/layout/footer';
import Header from '@/features/marketing/components/layout/header/header';
import type { ReactNode } from 'react';

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="dark:bg-[var(--color-gray-900)] flex flex-col flex-1">
      <Header />
      <div className="isolate flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
}
