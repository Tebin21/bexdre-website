import React from 'react';

/** CSS custom properties consumed by the .bg-travel keyframe (src/index.css). */
type TravelStyle = React.CSSProperties & {
  '--x-from'?: string;
  '--y-from'?: string;
  '--x-to'?: string;
  '--y-to'?: string;
};

const BRAND_GREEN = '#24AC7C';

interface NodeProps {
  cx: number;
  cy: number;
  r?: number;
  delay?: number;
}

/** A pulsing connection point, reused across every card's node graph. */
export const Node: React.FC<NodeProps> = ({ cx, cy, r = 4, delay = 0 }) => (
  <circle
    cx={cx}
    cy={cy}
    r={r}
    fill={BRAND_GREEN}
    className="bg-pulse"
    style={{ animationDelay: `${delay}s` }}
  />
);

interface ConnectorProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/** A static line between two nodes. */
export const Connector: React.FC<ConnectorProps> = ({ x1, y1, x2, y2 }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={BRAND_GREEN} strokeWidth={1} />
);

interface TravelDotProps {
  xFrom: number;
  yFrom: number;
  xTo: number;
  yTo: number;
  r?: number;
  delay?: number;
  duration?: number;
}

/**
 * A dot that travels from one point to another and fades at each end, looping.
 * Every instance shares the single .bg-travel keyframe in index.css — only the
 * translate distance (via --x-to/--y-to) and timing differ per usage.
 */
export const TravelDot: React.FC<TravelDotProps> = ({
  xFrom,
  yFrom,
  xTo,
  yTo,
  r = 3,
  delay = 0,
  duration = 4.5,
}) => {
  const style: TravelStyle = {
    '--x-from': '0px',
    '--y-from': '0px',
    '--x-to': `${xTo - xFrom}px`,
    '--y-to': `${yTo - yFrom}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  return <circle cx={xFrom} cy={yFrom} r={r} fill={BRAND_GREEN} className="bg-travel" style={style} />;
};
