import React from 'react';
import { Smartphone } from 'lucide-react';
import { CardBackground } from './CardBackground';

export const MobileAppsBackground: React.FC = () => (
  <CardBackground>
    <div className="absolute -bottom-16 -right-14 bg-drift" style={{ animationDelay: '0.3s' }}>
      <Smartphone size={240} strokeWidth={1} className="text-[#24AC7C]" />
    </div>
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
      {/* Two stacked "screen" states cross-fade to simulate a UI transition.
          The second group uses a negative delay so both are correctly offset
          from the very first frame instead of both being visible during the
          first half-cycle. */}
      <g className="bg-crossfade">
        <rect x={250} y={140} width="60" height="6" rx="3" fill="#24AC7C" />
        <rect x={250} y={156} width="40" height="6" rx="3" fill="#24AC7C" />
        <rect x={250} y={172} width="50" height="6" rx="3" fill="#24AC7C" />
      </g>
      <g className="bg-crossfade" style={{ animationDelay: '-3s' }}>
        <rect x={250} y={140} width="30" height="6" rx="3" fill="#24AC7C" />
        <rect x={250} y={156} width="55" height="6" rx="3" fill="#24AC7C" />
        <rect x={250} y={172} width="35" height="6" rx="3" fill="#24AC7C" />
      </g>
    </svg>
  </CardBackground>
);
