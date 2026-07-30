import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { DIFFERENTIATORS, DIFFERENTIATOR_ICON_MAP } from '@/data/differentiators';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

export const WhyBexdreSection: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.differentiator-card', stagger: 0.08 });

  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Why BEXDRE" title="Why Choose Us" className="mb-16" />
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DIFFERENTIATORS.map((item) => {
          const Icon = DIFFERENTIATOR_ICON_MAP[item.icon];
          return (
            <GlassCard key={item.id} className="differentiator-card flex flex-col gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[rgba(36,172,124,0.12)] border border-[rgba(36,172,124,0.25)]">
                {Icon && <Icon size={22} className="text-[#24AC7C]" aria-hidden="true" />}
              </div>
              <h3 className="text-[18px] font-bold text-white">{item.title}</h3>
              <p className="text-[15px] leading-[1.7] text-white/60">{item.description}</p>
            </GlassCard>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
