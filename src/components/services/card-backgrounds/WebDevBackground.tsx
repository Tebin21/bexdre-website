import React from 'react';
import { GitBranch } from 'lucide-react';
import { CardBackground } from './CardBackground';
import { Node, Connector, TravelDot } from './primitives';

export const WebDevBackground: React.FC = () => (
  <CardBackground>
    <GitBranch
      size={220}
      strokeWidth={1}
      className="absolute -bottom-10 -right-10 text-[#24AC7C] rotate-[18deg]"
    />
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
      <Connector x1={60} y1={60} x2={150} y2={110} />
      <Connector x1={150} y1={110} x2={130} y2={200} />
      <Connector x1={150} y1={110} x2={250} y2={90} />
      <Connector x1={250} y1={90} x2={310} y2={170} />
      <Node cx={60} cy={60} delay={0} />
      <Node cx={150} cy={110} delay={0.4} />
      <Node cx={130} cy={200} delay={0.8} />
      <Node cx={250} cy={90} delay={1.2} />
      <Node cx={310} cy={170} delay={1.6} />
      <TravelDot xFrom={60} yFrom={60} xTo={150} yTo={110} delay={0} duration={3.5} />
      <TravelDot xFrom={250} yFrom={90} xTo={310} yTo={170} delay={1.8} duration={3.5} />
    </svg>
  </CardBackground>
);
