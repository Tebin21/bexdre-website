import React from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';
import { SectionWrapper } from './SectionWrapper';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

/** Verbatim closing CTA from the BEXDRE structure doc, reused across every hub/detail page. */
export const CTASection: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>();

  return (
    <SectionWrapper size="sm">
      <div ref={ref}>
        <GlassCard glow padding="lg" className="flex flex-col items-center text-center gap-8 max-w-[820px] mx-auto">
          <h2 className="text-[28px] md:text-[42px] leading-[1.15] tracking-[-0.02em] font-bold text-white">
            Have an idea? Let's build it together.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button to="/contact" variant="primary" size="lg">
              Start a Project
            </Button>
            <Button to="/work" variant="ghost" size="lg">
              View Work
            </Button>
          </div>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
};
