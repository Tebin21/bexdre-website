import React from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { CTASection } from '@/components/ui/CTASection';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { SERVICES } from '@/data/services';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

const ServicesHubPage: React.FC = () => {
  usePageTitle('Services');
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.service-card', stagger: 0.08 });

  return (
    <>
      <PageHero eyebrow="Services" title="Our Services" subtitle="Placeholder copy — content pending." />
      <SectionWrapper size="sm">
        <div ref={ref}>
          <ServicesGrid services={SERVICES} />
        </div>
      </SectionWrapper>
      <CTASection />
    </>
  );
};

export default ServicesHubPage;
