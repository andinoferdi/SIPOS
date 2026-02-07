import FaqAccordion from '@/components/sections/faq-accordion';
import type { Metadata } from 'next';
import PricingSection from '@/components/sections/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
};

const PricingPage = () => {
  return (
    <>
      <PricingSection />
      <FaqAccordion />
    </>
  );
};

export default PricingPage;
