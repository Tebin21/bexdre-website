import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

interface UseParallaxOptions {
  /** Multiplier for movement strength (default: 0.03) */
  strength?: number;
}

/**
 * Attaches a mouse-move parallax effect to elements within the container.
 * Returns a ref to attach to the container element.
 */
export function useParallax<T extends HTMLElement>(options: UseParallaxOptions = {}) {
  const ref = useRef<T>(null);
  const { strength = 0.03 } = options;

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    if (prefersReducedMotion()) return;

    const orbs = container.querySelectorAll<HTMLElement>('[data-parallax]');

    // Raw mousemove can fire well over 60 times/sec — coalesce to one GSAP tween
    // update per animation frame instead of spawning one per event.
    let rafId: number | null = null;
    let pendingDx = 0;
    let pendingDy = 0;

    const applyParallax = () => {
      rafId = null;
      orbs.forEach((orb) => {
        const factor = parseFloat(orb.dataset.parallax ?? '1');
        gsap.to(orb, {
          x: pendingDx * strength * factor,
          y: pendingDy * strength * factor,
          duration: 1.2,
          ease: 'power2.out',
        });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      pendingDx = e.clientX - cx;
      pendingDy = e.clientY - cy;
      if (rafId === null) rafId = requestAnimationFrame(applyParallax);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [strength]);

  return ref;
}
