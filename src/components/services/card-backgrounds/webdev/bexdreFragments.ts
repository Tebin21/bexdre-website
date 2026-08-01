import type { FragmentSpec } from './types';

/** Classic 5x7 dot-matrix glyphs — 1 = filled cell, 0 = empty. */
const B = ['11110', '10001', '10001', '11110', '10001', '10001', '11110'];
const E = ['11111', '10000', '10000', '11110', '10000', '10000', '11111'];
const X = ['10001', '10001', '01010', '00100', '01010', '10001', '10001'];
const D = ['11110', '10001', '10001', '10001', '10001', '10001', '11110'];
const R = ['11110', '10001', '10001', '11110', '10100', '10010', '10001'];

const WORD = [B, E, X, D, R, E];

const GLYPH_COLS = 5;
const GLYPH_ROWS = 7;
const LETTER_GAP = 1;
const TOTAL_COLS = WORD.length * GLYPH_COLS + (WORD.length - 1) * LETTER_GAP;

/** Small code-ish glyphs used for the flying fragment tokens. */
const FRAGMENT_GLYPHS = ['{}', '</>', '=>', '01', 'fn', ';', '#', '[]', '()', '::'];

/** Deterministic PRNG so the scatter layout is stable and reviewable in code. */
function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildFragments(): FragmentSpec[] {
  const random = mulberry32(0xbe0d5e);
  const fragments: FragmentSpec[] = [];
  let id = 0;
  let colOffset = 0;

  for (const glyph of WORD) {
    for (let row = 0; row < GLYPH_ROWS; row += 1) {
      for (let col = 0; col < GLYPH_COLS; col += 1) {
        if (glyph[row][col] !== '1') continue;

        const totalCol = colOffset + col;
        const targetXPct = 8 + ((totalCol + 0.5) / TOTAL_COLS) * 84;
        const targetYPct = 41 + ((row + 0.5) / GLYPH_ROWS) * 18;
        const angle = random() * Math.PI * 2;
        const distance = 40 + random() * 70;

        fragments.push({
          id: id++,
          targetXPct,
          targetYPct,
          scatterX: Math.cos(angle) * distance,
          scatterY: Math.sin(angle) * distance,
          glyph: FRAGMENT_GLYPHS[Math.floor(random() * FRAGMENT_GLYPHS.length)],
          delay: random() * 0.4,
        });
      }
    }
    colOffset += GLYPH_COLS + LETTER_GAP;
  }

  return fragments;
}

export const BEXDRE_FRAGMENTS: FragmentSpec[] = buildFragments();
