import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

const VIDEO_SRC = '/videos/bexdrevideo.mp4';

/**
 * Hero video showcase. Reveals on scroll (useGSAPReveal), matching every
 * other home-page section, since the hero is now tall enough that this
 * block often sits below the initial viewport — which is also why the
 * <video> itself is mounted lazily via IntersectionObserver rather than
 * eagerly on first paint.
 *
 * Plays continuously (autoplay + loop, never pauses) as a background
 * showcase reel; the only interactive control is mute/unmute.
 */
export const HeroVideo: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ y: 48, duration: 1 });
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, shouldLoad]);

  const toggleMute = () => setIsMuted((prev) => !prev);

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

        {shouldLoad && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted={isMuted}
            playsInline
            loop
            preload="auto"
          />
        )}

        {/* Mute/Unmute control — bottom-right, always visible glass button. */}
        <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5">
          <span
            aria-hidden="true"
            className="absolute -inset-2 rounded-full bg-[#24AC7C]/25 blur-md opacity-70 pointer-events-none transition-opacity duration-200 ease-out"
          />
          <button
            type="button"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            aria-pressed={isMuted}
            onClick={toggleMute}
            className="relative flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20
              shadow-[0_8px_30px_rgba(0,0,0,0.35)]
              transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              hover:scale-110 active:scale-95
              motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
          >
            <span className="relative grid h-5 w-5 md:h-6 md:w-6">
              <VolumeX
                className={`col-start-1 row-start-1 h-5 w-5 md:h-6 md:w-6 text-[#24AC7C] transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                  isMuted ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
              />
              <Volume2
                className={`col-start-1 row-start-1 h-5 w-5 md:h-6 md:w-6 text-[#24AC7C] transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                  isMuted ? 'opacity-0' : 'opacity-100'
                }`}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
