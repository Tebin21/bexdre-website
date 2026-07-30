import React, { useEffect, useRef } from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProcessStepRow } from './ProcessStepRow';
import { PROCESS_STEPS } from '@/data/process';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

/**
 * The site's one signature scroll moment. Deliberately restrained: a vertical stack
 * (not a pinned/horizontal-hijacked sequence) with a single scrub-bound rail fill on
 * desktop only — mobile gets plain sequential reveals via each row's own reveal hook.
 */
export const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rail = railFillRef.current;
    if (!container || !rail || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const tween = gsap.fromTo(
        rail,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: 0.5,
          },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Our Process" title="How We Work" className="mb-16" />

      <div ref={containerRef} className="relative">
        {/* Rail sits in the gutter between the letter column (160px) and the text column
            (gap-10 = 40px), so it never overlaps the letter glyphs or the copy. */}
        <div className="hidden md:block absolute left-[180px] top-2 bottom-2 w-px bg-white/10">
          <div ref={railFillRef} className="w-full bg-gradient-to-b from-[#24AC7C] to-[#1a8a62]" style={{ height: '0%' }} />
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {PROCESS_STEPS.map((step) => (
            <ProcessStepRow key={step.step} step={step} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
