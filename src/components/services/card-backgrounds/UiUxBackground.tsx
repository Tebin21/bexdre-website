import type React from 'react';
import { useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { CardBackground } from './CardBackground';
import Strands from './uiux/Strands';
import { useVisibilityPause } from '@/hooks/useVisibilityPause';

/**
 * prefers-reduced-motion fallback: the static grid/pen glyphs that used to be this
 * card's whole background, kept as-is so the reduced-motion path has no animation.
 */
const StaticUiUxFrame: React.FC = () => (
  <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
    <rect
      x={100}
      y={130}
      width={120}
      height={80}
      rx={6}
      fill="none"
      stroke="#24AC7C"
      strokeWidth={1}
      strokeDasharray="4 4"
    />
  </svg>
);

export const UiUxBackground: React.FC = () => {
  const [reducedMotion] = useState(prefersReducedMotion);
  const paused = useVisibilityPause();

  if (reducedMotion) {
    return (
      <CardBackground>
        <StaticUiUxFrame />
      </CardBackground>
    );
  }

  return (
    // Strands carries its own three-color palette as the point of the motif, so it opts
    // out of CardBackground's flat opacity-[0.06] contract (tuned for single-color line
    // art) in favor of a higher opacity that keeps the colors readable.
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.3]">
      <Strands
        colors={['#24AC7C', '#7C3AED', '#06B6D4']}
        count={3}
        speed={0.4}
        amplitude={1.7}
        waviness={1.3}
        thickness={0.55}
        glow={1.9}
        taper={1.3}
        spread={1.5}
        intensity={0.55}
        saturation={2.1}
        scale={1.8}
        paused={paused}
      />
    </div>
  );
};
