import type { CodeLine, CodePanel, CodeToken, TokenKind } from './types';

function tok(text: string, kind: TokenKind): CodeToken {
  return { text, kind };
}

const kw = (text: string) => tok(text, 'keyword');
const tag = (text: string) => tok(text, 'tag');
const attr = (text: string) => tok(text, 'attr');
const fn = (text: string) => tok(text, 'function');
const prop = (text: string) => tok(text, 'property');
const str = (text: string) => tok(text, 'string');
const num = (text: string) => tok(text, 'number');
const ty = (text: string) => tok(text, 'type');
const cm = (text: string) => tok(text, 'comment');
const p = (text: string) => tok(text, 'punctuation');
const pl = (text: string) => tok(text, 'plain');

function line(indent: number, tokens: CodeToken[]): CodeLine {
  return { indent, tokens };
}

/**
 * Four hand-authored, pre-tokenized snippets — content is fixed/curated so a
 * runtime tokenizer buys nothing. Together they cover the language breadth the
 * brief asked for (HTML via JSX tags, CSS, JS/TS/React, API calls, JSON, SQL)
 * without needing more than 4 panels on screen at once.
 */
export const WEBDEV_PANELS: CodePanel[] = [
  {
    id: 'tsx',
    language: 'tsx',
    lines: [
      line(0, [kw('import'), pl(' { '), prop('useState'), pl(' } '), kw('from'), pl(' '), str("'react'"), p(';')]),
      line(0, [kw('export'), pl(' '), kw('function'), pl(' '), fn('BexdreHero'), p('() {')]),
      line(1, [kw('const'), pl(' [live, setLive] = '), fn('useState'), p('('), kw('true'), p(');')]),
      line(1, [kw('return'), pl(' '), p('('), tag('<section'), pl(' '), attr('className'), p('='), str('"hero"'), tag('>')]),
      line(2, [tag('<h1>'), pl('BEXDRE is live'), tag('</h1>')]),
      line(1, [tag('</section>'), p(');')]),
    ],
  },
  {
    id: 'css',
    language: 'css',
    lines: [
      line(0, [p('.bexdre-card {')]),
      line(1, [prop('border-radius'), p(': '), num('24px'), p(';')]),
      line(1, [prop('backdrop-filter'), p(': '), fn('blur'), p('('), num('20px'), p(');')]),
      line(1, [prop('background'), p(': '), fn('rgba'), p('('), num('15, 20, 24, 0.72'), p(');')]),
      line(1, [prop('transition'), p(': '), ty('transform'), pl(' '), num('0.4s'), pl(' '), kw('ease'), p(';')]),
      line(0, [p('}')]),
    ],
  },
  {
    id: 'api',
    language: 'api',
    lines: [
      line(0, [kw('POST'), pl(' '), str('/api/bexdre/deploy')]),
      line(0, [prop('Content-Type'), p(': '), str('application/json')]),
      line(0, [p('{')]),
      line(1, [str('"platform"'), p(': '), str('"BEXDRE"'), p(',')]),
      line(1, [str('"status"'), p(': '), str('"success"')]),
      line(0, [p('}')]),
    ],
  },
  {
    id: 'sql',
    language: 'sql',
    lines: [
      line(0, [kw('SELECT'), pl(' id, name, status')]),
      line(0, [kw('FROM'), pl(' '), ty('bexdre_projects')]),
      line(0, [kw('WHERE'), pl(' status = '), str("'live'")]),
      line(0, [kw('ORDER BY'), pl(' updated_at '), kw('DESC')]),
      line(0, [kw('LIMIT'), pl(' '), num('10'), p(';')]),
      line(0, [cm('-- 42 rows returned')]),
    ],
  },
];
