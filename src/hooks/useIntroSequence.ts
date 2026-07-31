import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { markIntroComplete } from '@/lib/introSession';

interface Greeting {
  text: string;
  lang: string;
  dir: 'ltr' | 'rtl';
}

const GREETINGS: Greeting[] = [
  { text: 'Hello', lang: 'en', dir: 'ltr' },
  { text: 'سڵاو', lang: 'ckb', dir: 'rtl' },
  { text: 'مرحباً', lang: 'ar', dir: 'rtl' },
  { text: 'Bonjour', lang: 'fr', dir: 'ltr' },
  { text: 'Hallo', lang: 'de', dir: 'ltr' },
  { text: 'Ciao', lang: 'it', dir: 'ltr' },
  { text: 'Hello', lang: 'en', dir: 'ltr' },
];

const DOT_FADE_IN = 0.5;
const PAUSE_AFTER_DOT = 0.15;
const FIRST_GREETING_FADE_IN = 0.35;
const HOLD_FIRST = 0.25;
const HOLD_BETWEEN = 0.18;
const FADE_OUT = 0.22;
const FADE_IN = 0.28;
const CROSSFADE_OVERLAP = 0.08; // incoming greeting starts fading in while outgoing is still fading out
const LAST_FADE_OUT = 0.3;
const PAUSE_BEFORE_DOT_OUT = 0.2;
const DOT_FADE_OUT = 0.45;
const OVERLAY_FADE_OUT = 0.5;

/**
 * Drives the calm, opacity-only sequence for the welcome intro: a single dot
 * fades in and holds for the whole sequence, greetings crossfade beneath it
 * (two stacked spans alternate, next greeting's text swapped onto the hidden
 * one right before it fades in, so there's never a visible "gap" frame), then
 * the greeting, the dot, and finally the overlay itself fade away in turn.
 * Deliberately opacity-only throughout — no scale/movement/rotation — so it
 * needs no separate prefers-reduced-motion branch.
 */
export function useIntroSequence(onSequenceComplete: () => void) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const textARef = useRef<HTMLSpanElement>(null);
  const textBRef = useRef<HTMLSpanElement>(null);
  const onCompleteRef = useRef(onSequenceComplete);
  onCompleteRef.current = onSequenceComplete;

  useEffect(() => {
    const overlay = overlayRef.current;
    const dot = dotRef.current;
    const textA = textARef.current;
    const textB = textBRef.current;
    if (!overlay || !dot || !textA || !textB) return;

    const spans = [textA, textB];

    function applyGreeting(el: HTMLSpanElement, greeting: Greeting) {
      el.textContent = greeting.text;
      el.lang = greeting.lang;
      el.dir = greeting.dir;
    }

    applyGreeting(textA, GREETINGS[0]);
    gsap.set(dot, { opacity: 0 });
    gsap.set(textA, { opacity: 0 });
    gsap.set(textB, { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current(),
    });

    tl.to(dot, { opacity: 1, duration: DOT_FADE_IN, ease: 'power2.out' })
      .to({}, { duration: PAUSE_AFTER_DOT })
      .to(textA, { opacity: 1, duration: FIRST_GREETING_FADE_IN, ease: 'power2.out' })
      .to({}, { duration: HOLD_FIRST });

    for (let i = 1; i < GREETINGS.length; i++) {
      const incoming = spans[i % 2];
      const outgoing = spans[(i - 1) % 2];
      const greeting = GREETINGS[i];

      tl.call(() => applyGreeting(incoming, greeting));
      tl.to(outgoing, { opacity: 0, duration: FADE_OUT, ease: 'power1.inOut' })
        .to(incoming, { opacity: 1, duration: FADE_IN, ease: 'power1.inOut' }, `<${CROSSFADE_OVERLAP}`)
        .to({}, { duration: HOLD_BETWEEN });
    }

    const lastVisible = spans[(GREETINGS.length - 1) % 2];
    tl.to(lastVisible, { opacity: 0, duration: LAST_FADE_OUT, ease: 'power1.inOut' })
      .to({}, { duration: PAUSE_BEFORE_DOT_OUT })
      .to(dot, { opacity: 0, duration: DOT_FADE_OUT, ease: 'power2.inOut' })
      .call(() => markIntroComplete())
      .to(overlay, { opacity: 0, duration: OVERLAY_FADE_OUT, ease: 'power2.inOut' });

    return () => {
      tl.kill();
    };
  }, []);

  return { overlayRef, dotRef, textARef, textBRef };
}
