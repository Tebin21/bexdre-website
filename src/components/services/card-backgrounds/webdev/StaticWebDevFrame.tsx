import type React from 'react';

/**
 * prefers-reduced-motion fallback: the resolved wordmark at rest over a couple of
 * static code lines. No animation classes anywhere in this component — kept separate
 * from the animated layers so the reduced-motion path is trivial to audit.
 */
export const StaticWebDevFrame: React.FC = () => (
  <div className="absolute inset-0">
    <div className="absolute top-[8%] left-[6%] font-mono text-[9px] leading-[1.7] text-white/30 whitespace-pre">
      <div>{'const platform = "BEXDRE";'}</div>
      <div>{"SELECT * FROM bexdre_projects;"}</div>
    </div>

    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-[#24AC7C] to-white/80"
      style={{ fontSize: 'clamp(22px, 5vw, 34px)' }}
    >
      BEXDRE
    </div>
  </div>
);
