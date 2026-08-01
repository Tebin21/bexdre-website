import type React from 'react';
import { useState } from 'react';
import { prefersReducedMotion } from '@/lib/motion';
import { TypingCodeLayer } from './TypingCodeLayer';
import { WordAssemblyLayer } from './WordAssemblyLayer';
import { StaticWebDevFrame } from './StaticWebDevFrame';
import { useVisibilityPause } from '@/hooks/useVisibilityPause';

/**
 * Orchestrates the Web Development card's cinematic scene. The typing <-> word-assembly
 * loop is driven entirely by CSS (see the bg-webdev-* keyframes in src/index.css) — this
 * component's only jobs are the one-time reduced-motion gate and pausing the scene while
 * the tab is hidden, matching the convention in useParallax.ts/useGSAPReveal.ts.
 */
export const CodeSceneBackground: React.FC = () => {
  const [reducedMotion] = useState(prefersReducedMotion);
  const paused = useVisibilityPause();

  if (reducedMotion) {
    return <StaticWebDevFrame />;
  }

  return (
    <div className="webdev-bg-scene absolute inset-0" data-bg-paused={paused}>
      <TypingCodeLayer />
      <WordAssemblyLayer />
    </div>
  );
};
