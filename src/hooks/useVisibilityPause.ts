import { useEffect, useState } from 'react';

/**
 * Tracks whether the document is hidden so the caller can pause a compositor-heavy
 * animated scene while the tab is backgrounded.
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
