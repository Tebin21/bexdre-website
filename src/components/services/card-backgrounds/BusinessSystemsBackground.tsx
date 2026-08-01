import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { CardBackground } from './CardBackground';
import { Node } from './primitives';

export const BusinessSystemsBackground: React.FC = () => (
  <CardBackground>
    <LayoutDashboard
      size={220}
      strokeWidth={1}
      className="absolute -top-10 -right-12 text-[#24AC7C] -rotate-[8deg]"
    />
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
      <rect x={40} y={170} width={90} height={70} rx={8} fill="none" stroke="#24AC7C" strokeWidth={1} />
      <rect x={150} y={150} width={90} height={90} rx={8} fill="none" stroke="#24AC7C" strokeWidth={1} />
      <rect x={260} y={190} width={80} height={50} rx={8} fill="none" stroke="#24AC7C" strokeWidth={1} />

      <rect x={170} y={205} width={10} height={25} fill="#24AC7C" className="bg-barchart" style={{ animationDelay: '0s' }} />
      <rect x={190} y={195} width={10} height={35} fill="#24AC7C" className="bg-barchart" style={{ animationDelay: '0.3s' }} />
      <rect x={210} y={210} width={10} height={20} fill="#24AC7C" className="bg-barchart" style={{ animationDelay: '0.6s' }} />

      <line x1={130} y1={200} x2={150} y2={195} stroke="#24AC7C" strokeWidth={1} />
      <line x1={240} y1={210} x2={260} y2={215} stroke="#24AC7C" strokeWidth={1} />
      <Node cx={140} cy={197} r={2.5} delay={0.2} />
      <Node cx={250} cy={212} r={2.5} delay={0.9} />
    </svg>
  </CardBackground>
);
