import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { HeroVideo } from './HeroVideo';
import { gsap } from '@/lib/gsap';
import { useParallax } from '@/hooks/useParallax';
import { prefersReducedMotion } from '@/lib/motion';
import { decideIntro, isIntroComplete, INTRO_COMPLETE_EVENT } from '@/lib/introSession';
import { PLACEHOLDER_COPY } from '@/data/placeholders';
import { CONTACT_INFO } from '@/data/contact';

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

    gsap.set([heading, subtext, cta], { opacity: 0 });

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    // SplitText is only needed for this one entrance animation, so it's loaded on
    // demand here instead of being bundled into the shared GSAP chunk every page pays
    // for (see lib/gsap.ts). `cancelled` guards against the effect unmounting while
    // the dynamic import is still in flight.
    async function playEntrance() {
      const { SplitText } = await import('gsap/SplitText');
      if (cancelled) return;
      gsap.registerPlugin(SplitText);

      const split = new SplitText(heading, { type: 'words' });
      gsap.set(heading, { opacity: 1 });
      gsap.set([subtext, cta], { opacity: 0, y: 20 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(split.words, { opacity: 0, y: 30, duration: 0.9, stagger: 0.06 })
        .to(subtext, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .to(cta, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5');

      cleanup = () => {
        tl.kill();
        split.revert();
      };
    }

    if (isIntroComplete() || !decideIntro()) {
      playEntrance();
      return () => {
        cancelled = true;
        cleanup?.();
      };
    }

    const handleIntroComplete = () => playEntrance();
    window.addEventListener(INTRO_COMPLETE_EVENT, handleIntroComplete, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener(INTRO_COMPLETE_EVENT, handleIntroComplete);
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={parallaxRef}
      className="relative overflow-hidden pt-10 lg:pt-[195px] xl:pt-[220px] pb-20 md:pb-28 lg:pb-32"
    >
      {/* Decorative parallax glow orbs */}
      {/* Blur radius reduced below `lg`: these sit permanently under every backdrop-filter
          card further down the page, so mobile GPUs pay for this sampling repeatedly.
          Desktop keeps the original radius. */}
      <div
        data-parallax="0.6"
        aria-hidden="true"
        className="absolute top-[12%] left-[6%] w-72 h-72 rounded-full bg-[#24AC7C]/20 blur-[48px] lg:blur-[100px] pointer-events-none"
      />
      <div
        data-parallax="1.1"
        aria-hidden="true"
        className="absolute bottom-[8%] right-[8%] w-96 h-96 rounded-full bg-[#24AC7C]/10 blur-[56px] lg:blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-10 max-sm:px-5 w-full">
        {/* Text column — centered, editorial hierarchy */}
        <div className="flex flex-col items-center text-center max-w-[1100px] mx-auto">
          <h1
            ref={headingRef}
            className="opacity-0 text-[42px] sm:text-[56px] md:text-[80px] lg:text-[104px] xl:text-[128px] leading-[1.05] md:leading-[1.02] tracking-[-0.03em] md:tracking-[-0.04em] font-bold text-white"
          >
            Engineering
            <br />
            Digital
            <br />
            Realities.
          </h1>
          <p
            ref={subtextRef}
            className="mt-8 md:mt-10 text-[17px] md:text-[19px] lg:text-[20px] leading-[1.6] text-white/65 max-w-[560px] mx-auto"
          >
            {PLACEHOLDER_COPY}
          </p>
          {/* Primary CTA. No technology-icon set exists in this codebase yet — once
              real logos are chosen they belong in this same row, beside the button. */}
          <div ref={ctaRef} className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-6">
            <Button href={CONTACT_INFO.scheduleMeetingUrl} variant="primary" size="lg">
              Book a Call
            </Button>
          </div>
        </div>

        {/* Hero video showcase — centered, sits below CTA */}
        <div className="w-full mt-20 md:mt-28 lg:mt-32">
          <HeroVideo />
        </div>
      </div>
    </section>
  );
};
