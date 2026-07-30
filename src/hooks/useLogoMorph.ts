import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/motion';

const HOLD_MARK = 3; // seconds x.png stays fully visible
const HOLD_WORDMARK = 7; // seconds bexdrelogo.png stays fully visible
const MORPH_DURATION = 0.9; // seconds per crossfade
const WORDMARK_REST_SCALE = 1.08; // bexdrelogo.png rests slightly larger than x.png for visual balance

/**
 * Drives the infinite x.png <-> bexdrelogo.png morph on the brand mark.
 * Returns refs to attach to the two <img> elements.
 */
export function useLogoMorph<T extends HTMLElement>() {
  const markRef = useRef<T>(null);
  const wordmarkRef = useRef<T>(null);

  useEffect(() => {
    const markEl = markRef.current;
    const wordmarkEl = wordmarkRef.current;
    if (!markEl || !wordmarkEl) return;

    if (prefersReducedMotion()) {
      gsap.set(markEl, { opacity: 1, scale: 1 });
      gsap.set(wordmarkEl, { opacity: 0, scale: WORDMARK_REST_SCALE });

      const tl = gsap.timeline({ repeat: -1 })
        .to(markEl, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, `+=${HOLD_MARK}`)
        .to(wordmarkEl, { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, '<')
        .to(wordmarkEl, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, `+=${HOLD_WORDMARK}`)
        .to(markEl, { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, '<');

      return () => {
        tl.kill();
      };
    }

    gsap.set(markEl, { opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' });
    gsap.set(wordmarkEl, {
      opacity: 0,
      scale: WORDMARK_REST_SCALE + 0.08,
      rotate: -2,
      filter: 'blur(6px)',
    });

    const tl = gsap.timeline({ repeat: -1 })
      .to({}, { duration: HOLD_MARK })
      .to(markEl, {
        opacity: 0,
        scale: 0.9,
        rotate: 2,
        filter: 'blur(6px)',
        duration: MORPH_DURATION,
        ease: 'power2.in',
      })
      .to(
        wordmarkEl,
        {
          opacity: 1,
          scale: WORDMARK_REST_SCALE,
          rotate: 0,
          filter: 'blur(0px)',
          duration: MORPH_DURATION,
          ease: 'back.out(1.4)',
        },
        '<0.05',
      )
      .to({}, { duration: HOLD_WORDMARK })
      .to(wordmarkEl, {
        opacity: 0,
        scale: WORDMARK_REST_SCALE - 0.08,
        rotate: -2,
        filter: 'blur(6px)',
        duration: MORPH_DURATION,
        ease: 'power2.in',
      })
      .to(
        markEl,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          filter: 'blur(0px)',
          duration: MORPH_DURATION,
          ease: 'back.out(1.4)',
        },
        '<0.05',
      );

    return () => {
      tl.kill();
    };
  }, []);

  return { markRef, wordmarkRef };
}
