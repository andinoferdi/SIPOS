import ContractSection from "@/app/home/components/contract-section";
import CtaSection from "@/app/home/components/cta-section";
import FlowSection from "@/app/home/components/flow-section";
import HeroSection from "@/app/home/components/hero-section";
import PricingSection from "@/app/home/components/pricing-section";
import TrustBar from "@/app/home/components/trust-bar";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <FlowSection />
      <ContractSection />
      <PricingSection />
      <CtaSection />
    </>
  );
}