import { useEffect, useRef } from 'react';
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

const DOT_FADE_IN = 500;
const PAUSE_AFTER_DOT = 150;
const FIRST_GREETING_FADE_IN = 350;
const HOLD_FIRST = 250;
const HOLD_BETWEEN = 180;
const FADE_OUT = 220;
const FADE_IN = 280;
const CROSSFADE_OVERLAP = 80; // incoming greeting starts fading in while outgoing is still fading out
const LAST_FADE_OUT = 300;
const PAUSE_BEFORE_DOT_OUT = 200;
const DOT_FADE_OUT = 450;
const OVERLAY_FADE_OUT = 500;

// Close cubic-bezier stand-ins for the GSAP power eases this sequence used to run on —
// picked so the crossfade keeps the same deceleration/settle feel, not for exact
// polynomial equivalence (irrelevant at these durations for an opacity-only fade).
const EASE_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'; // ~power2.out
const EASE_IN_OUT = 'cubic-bezier(0.45, 0, 0.55, 1)'; // ~power1.inOut / power2.inOut

/**
 * Drives the calm, opacity-only sequence for the welcome intro: a single dot
 * fades in and holds for the whole sequence, greetings crossfade beneath it
 * (two stacked spans alternate, next greeting's text swapped onto the hidden
 * one right before it fades in, so there's never a visible "gap" frame), then
 * the greeting, the dot, and finally the overlay itself fade away in turn.
 * Deliberately opacity-only throughout — no scale/movement/rotation — so it
 * needs no separate prefers-reduced-motion branch.
 *
 * Built on the native Web Animations API rather than GSAP: this component sits
 * inside Layout (always eager, never lazy-loaded), so pulling in GSAP here would
 * force it into the app's critical entry chunk for every visitor, even though
 * every other GSAP use in the app (scroll reveals, parallax) is safely behind a
 * lazy-loaded page chunk. WAAPI gets the identical crossfade with zero dependency.
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

    async function fade(el: HTMLElement, from: number, to: number, duration: number, easing: string) {
      const anim = el.animate([{ opacity: from }, { opacity: to }], { duration, easing, fill: 'forwards' });
      activeAnimations.add(anim);
      try {
        await anim.finished;
      } catch {
        // Cancelled mid-flight (unmount) — the cancelled flag below short-circuits the caller.
      }
      activeAnimations.delete(anim);
      if (cancelled) return;
      anim.commitStyles();
      anim.cancel();
    }

    function applyGreeting(el: HTMLSpanElement, greeting: Greeting) {
      el.textContent = greeting.text;
      el.lang = greeting.lang;
      el.dir = greeting.dir;
    }

    const spans = [textA, textB];

    const run = async () => {
      applyGreeting(textA, GREETINGS[0]);
      dot.style.opacity = '0';
      textA.style.opacity = '0';
      textB.style.opacity = '0';

      await fade(dot, 0, 1, DOT_FADE_IN, EASE_OUT);
      if (cancelled) return;
      await wait(PAUSE_AFTER_DOT);
      if (cancelled) return;

      await fade(textA, 0, 1, FIRST_GREETING_FADE_IN, EASE_OUT);
      if (cancelled) return;
      await wait(HOLD_FIRST);
      if (cancelled) return;

      for (let i = 1; i < GREETINGS.length; i++) {
        const incoming = spans[i % 2];
        const outgoing = spans[(i - 1) % 2];
        const greeting = GREETINGS[i];

        applyGreeting(incoming, greeting);
        const outgoingFade = fade(outgoing, 1, 0, FADE_OUT, EASE_IN_OUT);
        await wait(CROSSFADE_OVERLAP);
        if (cancelled) return;
        const incomingFade = fade(incoming, 0, 1, FADE_IN, EASE_IN_OUT);
        await Promise.all([outgoingFade, incomingFade]);
        if (cancelled) return;
        await wait(HOLD_BETWEEN);
        if (cancelled) return;
      }

      const lastVisible = spans[(GREETINGS.length - 1) % 2];
      await fade(lastVisible, 1, 0, LAST_FADE_OUT, EASE_IN_OUT);
      if (cancelled) return;
      await wait(PAUSE_BEFORE_DOT_OUT);
      if (cancelled) return;
      await fade(dot, 1, 0, DOT_FADE_OUT, EASE_IN_OUT);
      if (cancelled) return;

      markIntroComplete();
      await fade(overlay, 1, 0, OVERLAY_FADE_OUT, EASE_IN_OUT);
      if (cancelled) return;

      onCompleteRef.current();
    };

    run();

    return () => {
      cancelled = true;
      pendingTimeouts.forEach((id) => window.clearTimeout(id));
      activeAnimations.forEach((anim) => anim.cancel());
    };
  }, []);

  return { overlayRef, dotRef, textARef, textBRef };
}
