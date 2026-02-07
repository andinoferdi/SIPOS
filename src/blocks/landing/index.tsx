import { Features } from "@/blocks/landing/components/features";
import { Hero } from "@/blocks/landing/components/hero";
import { MarketingFooter } from "@/blocks/landing/components/marketing-footer";
import { MarketingHeader } from "@/blocks/landing/components/marketing-header";
import { Pricing } from "@/blocks/landing/components/pricing";
import { ProblemSolution } from "@/blocks/landing/components/problem-solution";
import { SocialProof } from "@/blocks/landing/components/social-proof";

export const LandingPage = () => {
  return (
    <div className="overflow-x-hidden bg-background text-foreground">
      <MarketingHeader />
      <Hero />
      <Features />
      <ProblemSolution />
      <Pricing />
      <SocialProof />
      <MarketingFooter />
    </div>
  );
};
