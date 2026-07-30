import React from 'react';

export const SkipLink: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:rounded-xl focus:bg-[#24AC7C] focus:text-white focus:font-bold"
  >
    Skip to content
  </a>
);
