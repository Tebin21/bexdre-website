import type React from 'react';
import type { CSSProperties } from 'react';
import type { CodePanel, TokenKind } from './types';
import { WEBDEV_PANELS } from './webdevSnippets';

const TOKEN_COLOR: Record<TokenKind, string> = {
  keyword: 'text-[#24AC7C]',
  tag: 'text-[#24AC7C]',
  attr: 'text-[#24AC7C]/70',
  function: 'text-[#24AC7C]/70',
  property: 'text-[#24AC7C]/70',
  string: 'text-white/70',
  number: 'text-white/70',
  type: 'text-white/70',
  comment: 'text-white/30 italic',
  punctuation: 'text-white/45',
  plain: 'text-white/45',
};

interface PanelLayout {
  panel: CodePanel;
  style: CSSProperties;
  /** Seconds before this panel's first token starts revealing. */
  startOffset: number;
  /** Seconds added per token — a lower value reads as faster typing. */
  tokenStep: number;
  showCompileIndicator: boolean;
}

const PANEL_LAYOUT: Omit<PanelLayout, 'panel'>[] = [
  { style: { top: '4%', left: '4%', width: '62%' }, startOffset: 0, tokenStep: 0.09, showCompileIndicator: true },
  { style: { top: '6%', right: '3%', width: '46%' }, startOffset: 0.3, tokenStep: 0.14, showCompileIndicator: false },
  { style: { bottom: '20%', left: '9%', width: '50%' }, startOffset: 0.6, tokenStep: 0.11, showCompileIndicator: true },
  { style: { bottom: '4%', right: '5%', width: '55%' }, startOffset: 0.9, tokenStep: 0.16, showCompileIndicator: false },
];

/**
 * Four "glass terminal" panels typing BEXDRE-themed code (TSX, CSS, API/JSON, SQL) at
 * different speeds. Reveal timing is entirely CSS: each token's animation-delay is
 * computed once here from its position in the panel, so there is no per-frame JS —
 * see bg-webdev-token-in in src/index.css.
 */
export const TypingCodeLayer: React.FC = () => (
  <div className="bg-webdev-panel-fade absolute inset-0">
    {WEBDEV_PANELS.map((panel, panelIndex) => {
      const layout = PANEL_LAYOUT[panelIndex];
      let tokenIndex = 0;

      return (
        <div
          key={panel.id}
          className="absolute rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2"
          style={layout.style}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-[5px] h-[5px] rounded-full bg-white/20" />
            <span className="w-[5px] h-[5px] rounded-full bg-white/20" />
            <span className="w-[5px] h-[5px] rounded-full bg-white/20" />
            {layout.showCompileIndicator && (
              <span className="ml-auto flex items-center gap-1">
                <span className="w-[3px] h-[3px] rounded-full bg-[#24AC7C] bg-pulse" style={{ animationDelay: '0s' }} />
                <span className="w-[3px] h-[3px] rounded-full bg-[#24AC7C] bg-pulse" style={{ animationDelay: '.3s' }} />
                <span className="w-[3px] h-[3px] rounded-full bg-[#24AC7C] bg-pulse" style={{ animationDelay: '.6s' }} />
              </span>
            )}
          </div>

          <div className="bg-drift font-mono text-[9px] leading-[1.7] whitespace-pre">
            {panel.lines.map((codeLine, lineIndex) => (
              <div key={lineIndex} style={{ paddingLeft: `${(codeLine.indent ?? 0) * 12}px` }}>
                {codeLine.tokens.map((token, i) => {
                  const delay = layout.startOffset + tokenIndex * layout.tokenStep;
                  tokenIndex += 1;
                  return (
                    <span
                      key={i}
                      className={`bg-webdev-token-in ${TOKEN_COLOR[token.kind]}`}
                      style={{ animationDelay: `${delay}s` }}
                    >
                      {token.text}
                    </span>
                  );
                })}
                {lineIndex === panel.lines.length - 1 && (
                  <span
                    className="bg-webdev-cursor-blink inline-block w-[2px] h-[10px] bg-[#24AC7C] align-middle ml-[1px]"
                    style={{ animationDelay: `${layout.startOffset + tokenIndex * layout.tokenStep}s` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);
