import type React from 'react';
import { useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { CardBackground } from './CardBackground';
import { Node } from './primitives';
import SoftAurora from './branding/SoftAurora';
import { useVisibilityPause } from '@/hooks/useVisibilityPause';

/**
 * prefers-reduced-motion fallback: the static logo-construction guides that used to be
 * this card's whole background, kept as-is so the reduced-motion path has no animation.
 */
const StaticBrandingFrame: React.FC = () => (
  <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
    {/* Logo-construction guides: concentric circles + a rotated square, slowly
        revolving as one unit. The group's own bounding box is centered on
        (300,150) by symmetry, so transform-box: fill-box (index.css) rotates
        it cleanly around its visual center without extra origin math here. */}
    <g className="bg-rotate-slow">
      <circle cx={300} cy={150} r={70} fill="none" stroke="#24AC7C" strokeWidth={1} />
      <circle cx={300} cy={150} r={46} fill="none" stroke="#24AC7C" strokeWidth={1} />
      <rect
        x={264}
        y={114}
        width={72}
        height={72}
        fill="none"
        stroke="#24AC7C"
        strokeWidth={1}
        transform="rotate(45 300 150)"
      />
      <line x1={300} y1={80} x2={300} y2={220} stroke="#24AC7C" strokeWidth={0.75} />
      <line x1={230} y1={150} x2={370} y2={150} stroke="#24AC7C" strokeWidth={0.75} />
    </g>
    <Node cx={300} cy={80} r={3} delay={0} />
    <Node cx={370} cy={150} r={3} delay={1} />
    <Node cx={300} cy={220} r={3} delay={2} />
  </svg>
);

export const BrandingBackground: React.FC = () => {
  const [reducedMotion] = useState(prefersReducedMotion);
  const paused = useVisibilityPause();

  if (reducedMotion) {
    return (
      <CardBackground>
        <StaticBrandingFrame />
      </CardBackground>
    );
  }

  return (
    // SoftAurora carries its own two-color gradient as the point of the motif, so it
    // opts out of CardBackground's flat opacity-[0.06] contract (tuned for single-color
    // line art) in favor of a higher opacity that keeps the glow vivid and full-bleed.
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.42]">
      <SoftAurora
        speed={0.5}
        scale={1.8}
        brightness={1.5}
        color1="#24AC7C"
        color2="#F5B94A"
        noiseFrequency={2.2}
        noiseAmplitude={1.0}
        bandHeight={0.5}
        bandSpread={1.4}
        octaveDecay={0.15}
        layerOffset={1.2}
        colorSpeed={0.8}
        paused={paused}
      />
    </div>
  );
};
