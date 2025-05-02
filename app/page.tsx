
{/* section components */}
import Script from 'next/script';
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
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      />
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
    </>
  );
}
