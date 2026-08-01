import { useEffect, useRef, useState } from 'react';
import type { Location } from 'react-router-dom';
import { prefersReducedMotion } from '@/lib/motion';
import { getPageTransitionLabel } from '@/lib/pageTransitionLabel';

export type PageTransitionPhase = 'idle' | 'covering' | 'holding' | 'revealing';

// Entrance's effective duration is whichever finishes last: title (delay +
// duration) is the longest pole at 250ms, so entrance + HOLD + REVEAL_FADE
// (plus the ~32ms double-rAF wait before it all starts) lands the total
// transition around 860ms, inside the 700-900ms target.
const COVER_FADE_IN = 200;
const DOT_DELAY = 30;
const DOT_SCALE_IN = 200;
const TITLE_DELAY = 60;
const TITLE_FADE_UP = 190;
const HOLD = 380;
const REVEAL_FADE = 220;

const REDUCED_COVER_FADE_IN = 120;
const REDUCED_REVEAL_FADE = 150;

const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.45, 0, 0.55, 1)';

/**
 * Drives the cinematic route-change overlay: cover the outgoing page in
 * near-black, hold on a centered brand dot + destination title, then swap
 * which route is actually rendered (invisibly, while fully covered) and
 * reveal the new page. Built on native WAAPI rather than GSAP — this hook
 * lives in the always-eager route tree (never lazy-loaded), matching the
 * same reasoning documented in useIntroSequence.ts for that overlay.
 *
 * Completely independent from the multilingual intro: it only ever reacts
 * to a change in location.pathname, which by definition cannot happen
 * before the first render (refresh/first load never trigger it), and
 * scroll never touches router location either.
 */
export function usePageTransition(location: Location) {
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState<PageTransitionPhase>('idle');
  const [label, setLabel] = useState(() => getPageTransitionLabel(location.pathname));

  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);

  const mountedRef = useRef(false);
  const displayLocationRef = useRef(displayLocation);
  displayLocationRef.current = displayLocation;

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (location.pathname === displayLocationRef.current.pathname) return;

    let cancelled = false;
    const pendingTimeouts = new Set<number>();
    const activeAnimations = new Set<Animation>();

    function wait(ms: number): Promise<void> {
      return new Promise((resolve) => {
        const id = window.setTimeout(() => {
          pendingTimeouts.delete(id);
          resolve();
        }, ms);
        pendingTimeouts.add(id);
      });
    }

    // Mirrors useIntroSequence's fade(): commits the animation's end state into
    // the element's real inline style (and frees the Animation) once it finishes
    // naturally. If cancelled mid-flight instead (a newer navigation interrupts
    // this one), skip the commit — cancel() already reverted to the last
    // committed style, which is exactly the safe state to restart the cycle
    // from (e.g. reveal interrupted -> snaps back to fully covered, not
    // half-transparent).
    async function animate(
      el: HTMLElement,
      keyframes: Keyframe[],
      duration: number,
      easing: string,
      delay = 0,
    ) {
      const anim = el.animate(keyframes, { duration, easing, delay, fill: 'forwards' });
      activeAnimations.add(anim);
      try {
        await anim.finished;
      } catch {
        // Cancelled mid-flight — handled by the cleanup that cancelled it.
      }
      activeAnimations.delete(anim);
      if (cancelled) return;
      anim.commitStyles();
      anim.cancel();
    }

    const run = async () => {
      setLabel(getPageTransitionLabel(location.pathname));
      setPhase('covering');

      // Wait until the overlay has actually been painted with the new phase
      // before touching its refs. This effect runs synchronously as part of
      // the same navigation-triggered render (flushSync from here would
      // collide with React still being mid-render), so a plain
      // setTimeout(0)/microtask isn't reliable either — the double
      // requestAnimationFrame is the standard, reliable way to wait past the
      // next paint after a state update.
      await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      if (cancelled) return;
      const overlay = overlayRef.current;
      const dot = dotRef.current;
      const title = titleRef.current;
      if (!overlay || !dot || !title) return;

      // Measuring the overlay's actual current opacity (rather than assuming 0)
      // keeps a restart mid-flight (rapid double navigation) visually continuous:
      // if a previous cycle had already covered the screen when this one
      // interrupted it, the entrance below just holds at full black instead of
      // snapping transparent-then-back, which would flash the outgoing page.
      // On a genuinely fresh mount this correctly reads 0 from the overlay's
      // own `opacity-0` default class (see PageTransitionOverlay).
      const startOpacity = Number.parseFloat(getComputedStyle(overlay).opacity) || 0;

      if (prefersReducedMotion()) {
        dot.style.opacity = '1';
        dot.style.transform = 'scale(1)';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';

        await animate(overlay, [{ opacity: startOpacity }, { opacity: 1 }], REDUCED_COVER_FADE_IN, EASE_OUT);
        if (cancelled) return;

        setDisplayLocation(location);
        setPhase('revealing');
        await animate(overlay, [{ opacity: 1 }, { opacity: 0 }], REDUCED_REVEAL_FADE, EASE_IN_OUT);
        if (cancelled) return;

        setPhase('idle');
        return;
      }

      dot.style.opacity = '0';
      dot.style.transform = 'scale(0.8)';
      title.style.opacity = '0';
      title.style.transform = 'translateY(6px)';

      const overlayIn = animate(overlay, [{ opacity: startOpacity }, { opacity: 1 }], COVER_FADE_IN, EASE_OUT);
      const dotIn = animate(
        dot,
        [
          { opacity: 0, transform: 'scale(0.8)' },
          { opacity: 1, transform: 'scale(1)' },
        ],
        DOT_SCALE_IN,
        EASE_OUT,
        DOT_DELAY,
      );
      const titleIn = animate(
        title,
        [
          { opacity: 0, transform: 'translateY(6px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        TITLE_FADE_UP,
        EASE_OUT,
        TITLE_DELAY,
      );
      await Promise.all([overlayIn, dotIn, titleIn]);
      if (cancelled) return;

      setPhase('holding');
      await wait(HOLD);
      if (cancelled) return;

      setDisplayLocation(location);
      setPhase('revealing');
      await animate(overlay, [{ opacity: 1 }, { opacity: 0 }], REVEAL_FADE, EASE_IN_OUT);
      if (cancelled) return;

      setPhase('idle');
    };

    run();

    return () => {
      cancelled = true;
      pendingTimeouts.forEach((id) => window.clearTimeout(id));
      activeAnimations.forEach((anim) => anim.cancel());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return { displayLocation, phase, label, overlayRef, dotRef, titleRef };
}
