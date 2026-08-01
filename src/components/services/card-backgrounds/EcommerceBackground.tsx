import React from 'react';
import { CreditCard } from 'lucide-react';
import { CardBackground } from './CardBackground';
import { Node, Connector, TravelDot } from './primitives';

export const EcommerceBackground: React.FC = () => (
  <CardBackground>
    <CreditCard
      size={200}
      strokeWidth={1}
      className="absolute -bottom-8 -right-10 text-[#24AC7C] -rotate-[10deg]"
    />
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
      <Connector x1={70} y1={220} x2={200} y2={220} />
      <Connector x1={200} y1={220} x2={330} y2={220} />
      <Node cx={70} cy={220} r={5} delay={0} />
      <Node cx={200} cy={220} r={5} delay={0.6} />
      <Node cx={330} cy={220} r={5} delay={1.2} />
      <TravelDot xFrom={70} yFrom={220} xTo={330} yTo={220} r={3.5} delay={0} duration={5} />
    </svg>
  </CardBackground>
);
