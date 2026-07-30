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

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;

      orbs.forEach((orb) => {
        const factor = parseFloat(orb.dataset.parallax ?? '1');
        gsap.to(orb, {
          x: dx * strength * factor,
          y: dy * strength * factor,
          duration: 1.2,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return ref;
}
