import Footer from '@/app/home/components/layout/footer';
import Header from '@/app/home/components/layout/navbar/navbar';
import type { ReactNode } from 'react';

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="marketing-dark-canvas flex flex-1 flex-col">
      <Header />
      <div className="relative z-10 isolate flex flex-1 flex-col">{children}</div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
