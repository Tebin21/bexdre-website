import React from 'react';

/**
 * Full-screen fixed aurora background — layered radial green glows + noise texture.
 * Pure Tailwind with CSS arbitrary values and keyframe animations.
 */
export const AuroraBackground: React.FC = () => {
  return (
    <>
      {/* ── Base dark gradient ── */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#05070A]" />

      {/* ── Glow orbs ──
          Note: this wrapper previously carried `animation: 'pulse-glow ...'`, but no
          `@keyframes pulse-glow` exists anywhere in the stylesheet (only `aurora-shift`,
          which nothing references) — the animation was already a silent no-op, so
          removing it is a no-op cleanup, not a behavior change.
          Blur radius is reduced below `lg`: these are the largest, most expensive blur
          filters in the app (700-900px elements blurred 60-80px), sitting permanently
          fixed underneath every backdrop-filter card on the page — every one of those
          cards has to sample through this layer, so its cost compounds. Halving the
          radius on mobile cuts that GPU sampling cost substantially; desktop is
          untouched. */}
      <div className="fixed inset-0 z-0 pointer-events-none aurora-pulse">
        {/* Top-left orb */}
        <div
          className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full blur-[32px] lg:blur-[60px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(36,172,124,0.18) 0%, transparent 65%)',
          }}
        />
        {/* Bottom-right orb */}
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[32px] lg:blur-[60px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(36,172,124,0.13) 0%, transparent 65%)',
          }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-[40px] lg:blur-[80px]"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(36,172,124,0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Noise texture overlay ── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px',
        }}
      />
    </>
  );
};
