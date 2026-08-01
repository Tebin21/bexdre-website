import React from 'react';
import { Grid3x3, PenTool } from 'lucide-react';
import { CardBackground } from './CardBackground';

export const UiUxBackground: React.FC = () => (
  <CardBackground>
    <Grid3x3
      size={240}
      strokeWidth={0.75}
      className="absolute -bottom-14 -right-14 text-[#24AC7C] rotate-[6deg]"
    />
    <PenTool size={56} strokeWidth={1} className="absolute top-8 right-10 text-[#24AC7C]" />
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
      <rect
        x={60}
        y={70}
        width={18}
        height={18}
        fill="none"
        stroke="#24AC7C"
        strokeWidth={1}
        className="bg-drift"
        style={{ animationDelay: '0s', animationDuration: '5s' }}
      />
      <rect
        x={140}
        y={160}
        width={18}
        height={18}
        fill="none"
        stroke="#24AC7C"
        strokeWidth={1}
        className="bg-drift"
        style={{ animationDelay: '1.2s', animationDuration: '7s' }}
      />
      <rect
        x={220}
        y={100}
        width={18}
        height={18}
        fill="none"
        stroke="#24AC7C"
        strokeWidth={1}
        className="bg-drift"
        style={{ animationDelay: '2.4s', animationDuration: '6s' }}
      />
      <rect
        x={100}
        y={130}
        width={120}
        height={80}
        rx={6}
        fill="none"
        stroke="#24AC7C"
        strokeWidth={1}
        strokeDasharray="4 4"
        className="bg-select"
      />
    </svg>
  </CardBackground>
);
