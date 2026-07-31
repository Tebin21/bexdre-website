import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

const VIDEO_SRC = '/videos/bexdrevideo.mp4';

/**
 * Hero video showcase. Reveals on scroll (useGSAPReveal), matching every
 * other home-page section, since the hero is now tall enough that this
 * block often sits below the initial viewport — which is also why the
 * <video> itself is mounted lazily via IntersectionObserver rather than
 * eagerly on first paint.
 */
export const HeroVideo: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ y: 48, duration: 1 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayControl, setShowPlayControl] = useState(true);
  const idleTimerRef = useRef<number | null>(null);

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

  // Cleanup the idle-hide timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
    };
  }, []);

  const clearIdleTimer = () => {
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const scheduleIdleHide = () => {
    clearIdleTimer();
    idleTimerRef.current = window.setTimeout(() => {
      setShowPlayControl(false);
    }, 1000);
  };

  /** Reveals the Play/Pause button; if the video is currently playing, re-arms the 1s idle-hide timer. */
  const revealPlayControl = () => {
    setShowPlayControl(true);
    if (videoRef.current && !videoRef.current.paused) {
      scheduleIdleHide();
    } else {
      clearIdleTimer();
    }
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

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
          shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)_inset]
          cursor-pointer"
        onClick={togglePlayback}
        onMouseEnter={revealPlayControl}
        onMouseMove={revealPlayControl}
        onTouchStart={revealPlayControl}
      >
        {/* Brand-green ambient glow around the frame */}
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(36,172,124,0.18),transparent_70%)] blur-2xl opacity-60 pointer-events-none"
        />

        {shouldLoad && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted={isMuted}
            playsInline
            loop
            preload="auto"
            onPlay={() => {
              setIsPlaying(true);
              revealPlayControl();
            }}
            onPause={() => {
              setIsPlaying(false);
              clearIdleTimer();
              setShowPlayControl(true);
            }}
          />
        )}

        {/* Play/Pause control */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className={`relative flex items-center justify-center transition-opacity duration-300 ease-out
              ${isPlaying && !showPlayControl ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
          >
            <span
              aria-hidden="true"
              className="absolute -inset-3 rounded-full bg-[#24AC7C]/20 blur-md showcase-pulse pointer-events-none"
            />
            <button
              type="button"
              aria-label={isPlaying ? 'Pause project showcase video' : 'Play project showcase video'}
              aria-pressed={isPlaying}
              className="relative flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                shadow-[0_8px_30px_rgba(0,0,0,0.35)]
                transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                hover:scale-110 active:scale-95"
            >
              {isPlaying ? (
                <Pause
                  className="relative h-5 w-5 md:h-6 md:w-6 text-[#24AC7C]"
                  fill="currentColor"
                  aria-hidden="true"
                />
              ) : (
                <Play
                  className="relative h-5 w-5 md:h-6 md:w-6 text-[#24AC7C] translate-x-0.5"
                  fill="currentColor"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>

        {/* Mute/Unmute control — bottom-right, mirrors the Play/Pause button's glass style.
            Always visible (never fades) so audibility is obvious at a glance. */}
        <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5">
          <button
            type="button"
            aria-label={isMuted ? 'Unmute project showcase video' : 'Mute project showcase video'}
            aria-pressed={isMuted}
            onClick={toggleMute}
            className="relative flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-full
              bg-white/10 backdrop-blur-md border border-white/20
              shadow-[0_8px_30px_rgba(0,0,0,0.35)]
              transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              hover:scale-110 active:scale-95"
          >
            {isMuted ? (
              <VolumeX
                className="relative h-5 w-5 md:h-6 md:w-6 text-[#24AC7C]"
                aria-hidden="true"
              />
            ) : (
              <Volume2
                className="relative h-5 w-5 md:h-6 md:w-6 text-[#24AC7C]"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
