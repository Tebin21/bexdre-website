import React from 'react';

interface CardBackgroundProps {
  children: React.ReactNode;
}

/**
 * Shared positioning/opacity/accessibility contract for every service card's
 * animated motif — sits behind the card content (see ServiceCard.tsx's
 * relative z-10 wrapper) and stays out of the accessibility tree and hit-testing.
 */
export const CardBackground: React.FC<CardBackgroundProps> = ({ children }) => (
  <div
    aria-hidden="true"
    className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.06]"
  >
    {children}
  </div>
);
