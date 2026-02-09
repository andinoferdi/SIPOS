import FaqAccordion from '@/features/marketing/components/sections/faq-accordion';
import type { Metadata } from 'next';
import PricingSection from '@/features/marketing/components/sections/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
};

export default async function PricingPage() {
  return (
    <>
      <PricingSection />
      <FaqAccordion />
    </>
  );
}
