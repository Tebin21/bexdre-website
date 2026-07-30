// Shared helpers for marking not-yet-written copy.
//
// The BEXDRE structure document defines section names, service/process/differentiator
// titles, and CTA labels verbatim — those are real content. It does not supply body
// copy (descriptions, features, case-study detail, testimonial quotes, article bodies).
// Rather than inventing fictional brand claims, every such field uses this neutral,
// honestly-labeled filler text so the UI reads as finished while staying clearly
// flagged in code (via these helpers + each record's `isPlaceholder` field) for a
// future real-content pass.

export const PLACEHOLDER_COPY = 'Placeholder copy — content pending.';

export function placeholderList(prefix: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${prefix} ${i + 1}`);
}
