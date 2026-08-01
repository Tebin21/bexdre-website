import React from 'react';
import { CardBackground } from './CardBackground';
import { Node } from './primitives';

export const BrandingBackground: React.FC = () => (
  <CardBackground>
    <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
      {/* Logo-construction guides: concentric circles + a rotated square, slowly
          revolving as one unit. The group's own bounding box is centered on
          (300,150) by symmetry, so transform-box: fill-box (index.css) rotates
          it cleanly around its visual center without extra origin math here. */}
      <g className="bg-rotate-slow">
        <circle cx={300} cy={150} r={70} fill="none" stroke="#24AC7C" strokeWidth={1} />
        <circle cx={300} cy={150} r={46} fill="none" stroke="#24AC7C" strokeWidth={1} />
        <rect
          x={264}
          y={114}
          width={72}
          height={72}
          fill="none"
          stroke="#24AC7C"
          strokeWidth={1}
          transform="rotate(45 300 150)"
        />
        <line x1={300} y1={80} x2={300} y2={220} stroke="#24AC7C" strokeWidth={0.75} />
        <line x1={230} y1={150} x2={370} y2={150} stroke="#24AC7C" strokeWidth={0.75} />
      </g>
      <Node cx={300} cy={80} r={3} delay={0} />
      <Node cx={370} cy={150} r={3} delay={1} />
      <Node cx={300} cy={220} r={3} delay={2} />
    </svg>
  </CardBackground>
);
