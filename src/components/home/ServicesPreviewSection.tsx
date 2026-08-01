import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { LogoLoop } from '@/components/ui/LogoLoop';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { SERVICES } from '@/data/services';
import { TECH_STACK_LOGOS } from '@/data/techStack';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

export const ServicesPreviewSection: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.service-card', stagger: 0.08 });

  return (
    <SectionWrapper>
      <div style={{ height: '64px', position: 'relative', overflow: 'hidden' }} className="mb-16">
        <LogoLoop
          logos={TECH_STACK_LOGOS}
          speed={80}
          direction="left"
          logoHeight={32}
          gap={48}
          fadeOut
          fadeOutColor="#05070A"
          scaleOnHover
          ariaLabel="Technologies we work with"
        />
      </div>
      <SectionHeading eyebrow="Services" title="What We Do" className="mb-16" />
      <div ref={ref}>
        <ServicesGrid services={SERVICES} />
      </div>
      <div className="flex justify-center mt-12">
        <Button to="/services" variant="ghost" size="md">
          View All Services
        </Button>
      </div>
    </SectionWrapper>
  );
};
