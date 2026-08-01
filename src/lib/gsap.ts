import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register all GSAP plugins actually used app-wide (Flip was registered but never used
// anywhere — dropped to avoid shipping dead plugin code). SplitText is *not* registered
// here: HeroSection is its only consumer, and eagerly bundling it into this shared
// module meant every single page paid to download/parse it as part of the
// `useGSAPReveal` chunk. HeroSection dynamically imports it on demand instead.
gsap.registerPlugin(ScrollTrigger);

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

export { gsap, ScrollTrigger };
