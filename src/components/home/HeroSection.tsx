import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { gsap, SplitText } from '@/lib/gsap';
import { useParallax } from '@/hooks/useParallax';
import { prefersReducedMotion } from '@/lib/motion';
import { PLACEHOLDER_COPY } from '@/data/placeholders';

export const HeroSection: React.FC = () => {
  const parallaxRef = useParallax<HTMLElement>({ strength: 0.02 });
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const subtext = subtextRef.current;
    const cta = ctaRef.current;
    if (!heading || !subtext || !cta) return;

    if (prefersReducedMotion()) {
      gsap.set([heading, subtext, cta], { opacity: 1, y: 0 });
      return;
    }

    const split = new SplitText(heading, { type: 'words' });
    gsap.set(heading, { opacity: 1 });
    gsap.set([subtext, cta], { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(split.words, { opacity: 0, y: 30, duration: 0.9, stagger: 0.06 })
      .to(subtext, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to(cta, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');

    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <section
      ref={parallaxRef}
      className="relative min-h-[92vh] flex items-center overflow-hidden pt-[70px]"
    >
      {/* Decorative parallax glow orbs */}
      <div
        data-parallax="0.6"
        aria-hidden="true"
        className="absolute top-[12%] left-[6%] w-72 h-72 rounded-full bg-[#24AC7C]/20 blur-[100px] pointer-events-none"
      />
      <div
        data-parallax="1.1"
        aria-hidden="true"
        className="absolute bottom-[8%] right-[8%] w-96 h-96 rounded-full bg-[#24AC7C]/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-10 max-sm:px-5 w-full">
        <div className="flex flex-col items-start gap-8 max-w-[900px]">
          <h1
            ref={headingRef}
            className="opacity-0 text-[44px] md:text-[72px] lg:text-[96px] leading-[1.05] tracking-[-0.03em] font-bold text-white"
          >
            Engineering Digital Realities.
          </h1>
          <p ref={subtextRef} className="text-[18px] md:text-[20px] leading-[1.6] text-white/65 max-w-[560px]">
            {PLACEHOLDER_COPY}
          </p>
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            <Button to="/contact" variant="primary" size="lg">
              Start a Project
            </Button>
            <Button to="/work" variant="ghost" size="lg">
              View Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
