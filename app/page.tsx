
{/* section components */}
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import WhatIsMetaOSSection from "@/components/landing/WhatIsMetaOS";
import Navigation from "@/components/landing/Navigation";
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';

export default function LandingPage() {

  return (
    <div>
      {/* Navigation */}
      <Navigation />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. What is MetaOS? */}
      <WhatIsMetaOSSection />
      
      {/* 새로운 SaaS 가격 정책 섹션 */}
      <PricingSection />

      {/* 3. Features */}
      <FeaturesSection />

      {/* 4. How it works */}
      <HowItWorksSection />

      {/* 5. Testimonials */}
      <TestimonialsSection />

      {/* 6. CTA */}
      <CTASection />
    </div>
  );
}
