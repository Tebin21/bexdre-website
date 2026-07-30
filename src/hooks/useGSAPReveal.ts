import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface UseGSAPRevealOptions {
  /** CSS selector for child elements to stagger; if omitted, animates the container itself */
  selector?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
  once?: boolean;
}

/**
 * Attaches a GSAP ScrollTrigger fade-up reveal to a container ref.
 * Returns a ref to attach to the container element.
 */
export function useGSAPReveal<T extends HTMLElement>(options: UseGSAPRevealOptions = {}) {
  const ref = useRef<T>(null);
  const {
    selector,
    stagger = 0.1,
    duration = 0.9,
    y = 40,
    delay = 0,
    once = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = selector ? el.querySelectorAll<HTMLElement>(selector) : [el];
    if (!targets.length) return;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    // Set initial state
    gsap.set(targets, { opacity: 0, y });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => st.trigger === el && st.kill());
    };
  }, [selector, stagger, duration, y, delay, once]);

  return ref;
}
