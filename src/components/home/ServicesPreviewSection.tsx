import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { SERVICES } from '@/data/services';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

export const ServicesPreviewSection: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.service-card', stagger: 0.08 });

  return (
    <SectionWrapper>
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
