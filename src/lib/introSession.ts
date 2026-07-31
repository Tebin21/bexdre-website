const INTRO_SEEN_KEY = 'bexdre-intro-seen';

/** Fired the instant the intro's own fade-out begins, so waiting entrances can overlap it. */
export const INTRO_COMPLETE_EVENT = 'bexdre:intro-complete';

function hasSeenIntro(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === '1';
  } catch {
    // Storage inaccessible (e.g. private browsing) — treat as seen so the
    // homepage never breaks over the intro flourish.
    return true;
  }
}

function markIntroSeen(): void {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1');
  } catch {
    // Nothing we can do — hasSeenIntro() already defaults to true in this case.
  }
}

let introDecided = false;
let introShouldPlay = false;

/**
 * Whether the intro should play for this session, decided exactly once per
 * page load. Memoized at module scope (rather than derived independently by
 * each caller) so IntroOverlay and HeroSection — siblings with no guaranteed
 * effect ordering — always agree, regardless of which one asks first.
 */
export function decideIntro(): boolean {
  if (!introDecided) {
    introDecided = true;
    introShouldPlay = !hasSeenIntro();
    if (introShouldPlay) markIntroSeen();
  }
  return introShouldPlay;
}

let introCompleteFlag = false;

/** Marks the intro as complete and notifies anyone already waiting. */
export function markIntroComplete(): void {
  introCompleteFlag = true;
  window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
}

/** True once markIntroComplete() has run — lets late mounters skip waiting for the event. */
export function isIntroComplete(): boolean {
  return introCompleteFlag;
}
