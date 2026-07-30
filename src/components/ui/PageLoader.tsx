import React from 'react';

export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Loading page">
    <div className="w-10 h-10 rounded-full border-2 border-white/10 border-t-[#24AC7C] animate-spin" />
  </div>
);
