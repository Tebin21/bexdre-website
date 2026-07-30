import React from 'react';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

/**
 * Hero video showcase placeholder. Purely decorative today — no real media is
 * wired up. Reveals on scroll (useGSAPReveal), matching every other home-page
 * section, since the hero is now tall enough that this block often sits below
 * the initial viewport.
 */
export const HeroVideo: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ y: 48, duration: 1 });

  return (
    <div ref={ref} className="w-full max-w-[1160px] mx-auto">
      {/* Label pill — reuses Badge.tsx's visual language directly */}
      <div className="flex justify-center mb-5 md:mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border bg-[rgba(36,172,124,0.12)] border-[rgba(36,172,124,0.25)] text-[#24AC7C]">
          Project Showcase
        </span>
      </div>

      {/* Glass/dark frame, 16:9 */}
      <div
        className="relative w-full aspect-video rounded-[28px] md:rounded-[32px] overflow-hidden
          border border-white/[0.08]
          bg-[linear-gradient(135deg,rgba(15,20,24,0.92),rgba(5,7,10,0.96)_60%,rgba(36,172,124,0.08))]
          shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)_inset]"
      >
        {/* Brand-green ambient glow around the frame */}
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(36,172,124,0.18),transparent_70%)] blur-2xl opacity-60 pointer-events-none"
        />

        {/* Subtle grid pattern — NOT a stock image, just a decorative placeholder texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:40px_40px]"
        />

        {/*
          ── FUTURE VIDEO INSERTION POINT ──
          Replace everything between this comment and the play button below with
          the real media element, e.g.:

            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={videoSrc}
              poster={posterSrc}
              controls
              playsInline
            />

          or an embed:

            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl}
              title="BEXDRE Project Showcase"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />

          Props the real component would need: `videoSrc`/`embedUrl` (string),
          optional `posterSrc` (string), `title` (string, for the iframe a11y label).
          The play button below would then also need real onClick wiring to toggle
          playback state instead of being a no-op placeholder.
        */}

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-[#24AC7C]/20 blur-md showcase-pulse pointer-events-none"
            />
            <button
              type="button"
              aria-label="Play project showcase video (coming soon)"
              className="group relative flex items-center justify-center h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:scale-110 hover:bg-[#24AC7C]/90 hover:border-[#24AC7C]
                hover:shadow-[0_0_50px_rgba(36,172,124,0.6)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="relative h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-white translate-x-0.5"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
