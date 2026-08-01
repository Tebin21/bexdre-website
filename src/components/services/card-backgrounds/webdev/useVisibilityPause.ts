import { useEffect, useState } from 'react';

/**
 * Tracks whether the document is hidden so the caller can pause a compositor-heavy
 * animated scene while the tab is backgrounded. Local to the webdev card background —
 * promote to src/hooks/ if a second consumer shows up.
 */
export function useVisibilityPause(): boolean {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setPaused(document.visibilityState !== 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return paused;
}
