import { NAV_LINKS, LEGAL_LINKS } from '@/data/nav';

const LABEL_BY_SEGMENT: Record<string, string> = {};

for (const { label, to } of [...NAV_LINKS, ...LEGAL_LINKS]) {
  const segment = to === '/' ? '' : to.slice(1);
  LABEL_BY_SEGMENT[segment] = label;
}

/** Uppercase destination label for the page-transition overlay, derived from the site's own nav copy so it can never drift out of sync. Sub-routes (e.g. /work/:slug) fall back to their parent section's label. */
export function getPageTransitionLabel(pathname: string): string {
  const segment = pathname === '/' ? '' : (pathname.split('/')[1] ?? '');
  return (LABEL_BY_SEGMENT[segment] ?? 'BEXDRE').toUpperCase();
}
