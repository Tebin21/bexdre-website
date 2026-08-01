import React, { useState } from 'react';
import { useIntroSequence } from '@/hooks/useIntroSequence';
import { decideIntro } from '@/lib/introSession';

/**
 * Full-screen brand-introduction sequence shown once per browser session,
 * before the homepage becomes visible. A single glowing dot in the brand
 * color sits inline beside a crossfading multilingual greeting, then
 * everything fades away to reveal the page underneath. Deliberately
 * minimal — no logo, no motion beyond opacity.
 */
export const IntroOverlay: React.FC = () => {
  const [shouldPlay] = useState(() => decideIntro());
  const [visible, setVisible] = useState(true);
  const { overlayRef, dotRef, textARef, textBRef } = useIntroSequence(() => setVisible(false));

  if (!shouldPlay || !visible) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center gap-20 md:gap-22 px-18"
    >
      <span
        ref={dotRef}
        className="block h-4 w-4 shrink-0 rounded-full bg-[#24AC7C] shadow-[0_0_16px_rgba(36,172,124,0.6),0_0_4px_rgba(36,172,124,0.45)]"
      />
      <div className="relative h-[56px] md:h-[72px] flex items-center justify-center px-6">
        <span
          ref={textARef}
          className="absolute inline-block text-[40px] md:text-[56px] font-sans font-normal tracking-[-0.02em] text-white whitespace-nowrap"
        />
        <span
          ref={textBRef}
          className="absolute inline-block text-[40px] md:text-[56px] font-sans font-normal tracking-[-0.02em] text-white whitespace-nowrap"
        />
      </div>
    </div>
  );
};
