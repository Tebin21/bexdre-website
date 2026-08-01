import { useEffect, useRef, useState } from 'react';

interface UseInViewportOptions {
  /** Expands the viewport bounds used for intersection checks. */
  rootMargin?: string;
}

/**
 * Tracks whether an element is within (or near) the viewport, so callers can pause
 * compositor/GPU-heavy work (rAF loops, WebGL contexts, video playback) while it's
 * scrolled off-screen. Unlike a one-shot "mount when visible" observer, this keeps
 * watching for the whole lifetime of the component so callers can react to scrolling
 * back out of view too.
 */
export function useInViewport<T extends HTMLElement>(options: UseInViewportOptions = {}) {
  const { rootMargin = '200px 0px' } = options;
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => setIsInView(entries[0]?.isIntersecting ?? false),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, isInView };
}
