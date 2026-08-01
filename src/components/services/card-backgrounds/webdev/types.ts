export type TokenKind =
  | 'keyword'
  | 'tag'
  | 'attr'
  | 'function'
  | 'property'
  | 'string'
  | 'number'
  | 'type'
  | 'comment'
  | 'punctuation'
  | 'plain';

export interface CodeToken {
  text: string;
  kind: TokenKind;
}

export interface CodeLine {
  tokens: CodeToken[];
  /** 0-3, multiplied by a fixed px unit for the auto-indent look. */
  indent?: number;
}

export type PanelLanguage = 'tsx' | 'css' | 'api' | 'sql';

export interface CodePanel {
  id: string;
  language: PanelLanguage;
  lines: CodeLine[];
}

export interface FragmentSpec {
  id: number;
  /** Static resting position, in % of the card — never animated. */
  targetXPct: number;
  targetYPct: number;
  /** Scatter offset in px, used as both the 0% and 100% keyframe value. */
  scatterX: number;
  scatterY: number;
  glyph: string;
  /** Seconds, small stagger within the assemble/disassemble window. */
  delay: number;
}
