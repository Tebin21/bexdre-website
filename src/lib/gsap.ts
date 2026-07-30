import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register all GSAP plugins actually used by the app (Flip was registered but never
// used anywhere — dropped to avoid shipping dead plugin code).
gsap.registerPlugin(ScrollTrigger, SplitText);

// Default GSAP config
gsap.config({
  nullTargetWarn: false,
});

// `font-display: swap` can reflow the page after ScrollTrigger has already cached
// trigger positions from the fallback-font layout — refresh once Batica Sans is
// actually painted so reveal positions stay accurate on first-time page loads.
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

// Shared defaults for scroll-triggered fade-up
export const scrollRevealDefaults = {
  y: 40,
  opacity: 0,
  duration: 0.9,
  ease: 'power3.out',
};

export const staggerDefaults = {
  stagger: 0.1,
  duration: 0.8,
  ease: 'power3.out',
};

export { gsap, ScrollTrigger, SplitText };
