import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesPreviewSection } from '@/components/home/ServicesPreviewSection';
import { SelectedProjectsSection } from '@/components/home/SelectedProjectsSection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { WhyBexdreSection } from '@/components/home/WhyBexdreSection';
import { LatestInsightsSection } from '@/components/home/LatestInsightsSection';
import { CTASection } from '@/components/ui/CTASection';

const HomePage: React.FC = () => {
  usePageTitle('Home');

  return (
    <>
      <HeroSection />
      <ServicesPreviewSection />
      <SelectedProjectsSection />
      <ProcessSection />
      <WhyBexdreSection />
      <LatestInsightsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
