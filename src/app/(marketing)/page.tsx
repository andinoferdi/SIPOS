import BenefitsGrid from '@/features/marketing/components/sections/benefits-grid';
import TestimonialsSection from '@/features/marketing/components/sections/client-testimonial';
import FaqAccordion from '@/features/marketing/components/sections/faq-accordion';
import HeroSection from '@/features/marketing/components/sections/hero-section';
import ToolsTab from '@/features/marketing/components/sections/tools-tab';
import { CoreFeatures } from '@/features/marketing/components/sections/core-features';
import PricingSection from '@/features/marketing/components/sections/pricing';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <CoreFeatures />
      <ToolsTab />
      <BenefitsGrid />
      <TestimonialsSection />
      <PricingSection />
      <FaqAccordion />
    </>
  );
}
