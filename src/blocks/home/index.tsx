import BenefitsGrid from "@/components/sections/benefits-grid";
import TestimonialsSection from "@/components/sections/client-testimonial";
import { CoreFeatures } from "@/components/sections/core-features";
import FaqAccordion from "@/components/sections/faq-accordion";
import HeroSection from "@/components/sections/hero-section";
import PricingSection from "@/components/sections/pricing";
import ToolsTab from "@/components/sections/tools-tab";

export const HomeBlock = () => {
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
};
