import type React from 'react';
import type { CSSProperties } from 'react';
import { BEXDRE_FRAGMENTS } from './bexdreFragments';

type FragmentStyle = CSSProperties & {
  '--x-from'?: string;
  '--y-from'?: string;
};

/**
 * The "resolved" phase of the loop: ~100 tiny code-fragment glyphs fly in from a
 * scattered position to a static target (sampled from a dot-matrix "BEXDRE") while a
 * crisp gradient wordmark sits on top for legibility. Every fragment only animates
 * transform/opacity — see bg-webdev-fragment-assemble in src/index.css.
 */
export const WordAssemblyLayer: React.FC = () => (
  <div className="bg-webdev-word-fade absolute inset-0">
    {BEXDRE_FRAGMENTS.map((fragment) => {
      const style: FragmentStyle = {
        left: `${fragment.targetXPct}%`,
        top: `${fragment.targetYPct}%`,
        '--x-from': `${fragment.scatterX}px`,
        '--y-from': `${fragment.scatterY}px`,
        animationDelay: `${fragment.delay}s`,
      };

      return (
        <span
          key={fragment.id}
          className="bg-webdev-fragment-assemble absolute font-mono text-[6px] text-[#24AC7C]"
          style={style}
        >
          {fragment.glyph}
        </span>
      );
    })}

    <div
      className="bg-webdev-word-glow absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-bold tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-[#24AC7C] to-white/80"
      style={{ fontSize: 'clamp(22px, 5vw, 34px)' }}
    >
      BEXDRE
    </div>
  </div>
);
