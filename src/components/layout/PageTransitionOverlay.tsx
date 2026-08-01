import React from 'react';

interface PageTransitionOverlayProps {
  active: boolean;
  label: string;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  dotRef: React.RefObject<HTMLSpanElement | null>;
  titleRef: React.RefObject<HTMLSpanElement | null>;
}

/**
 * Cinematic route-change overlay: near-black cover, a single accent-green
 * dot sitting inline beside the destination page name, the pair centered
 * together on screen. No logo, no other graphics — deliberately minimal.
 * All motion (fade/scale/translate)
 * is driven imperatively by usePageTransition via WAAPI; the `opacity-0` /
 * `scale-*` / `translate-y-*` classes below are just the correct resting
 * state for the very first paint, before that animation takes over.
 */
export const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({
  active,
  label,
  overlayRef,
  dotRef,
  titleRef,
}) => {
  if (!active) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[190] bg-[#05070A] opacity-0 flex items-center justify-center px-6"
    >
      <div className="flex items-center gap-4 sm:gap-5 md:gap-6 max-w-[90vw]">
        <span
          ref={dotRef}
          className="block h-5 w-5 shrink-0 rounded-full bg-[#24AC7C] opacity-0 scale-[0.8] shadow-[0_0_16px_rgba(36,172,124,0.6),0_0_4px_rgba(36,172,124,0.45)]"
        />
        <span
          ref={titleRef}
          className="block opacity-0 translate-y-[6px] font-sans font-bold text-[28px] sm:text-[36px] md:text-[52px] tracking-[0.08em] text-white uppercase"
        >
          {label}
        </span>
      </div>
    </div>
  );
};
