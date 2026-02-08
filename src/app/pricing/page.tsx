import FaqAccordion from '@/components/sections/faq-accordion';
import type { Metadata } from 'next';
import PricingSection from '@/components/sections/pricing';
import SiteShell from '@/components/layout/site-shell';

export const metadata: Metadata = {
  title: 'Pricing',
};

export default async function PricingPage() {
  return (
    <SiteShell>
      <PricingSection />
      <FaqAccordion />
    </SiteShell>
  );
}
