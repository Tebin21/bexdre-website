import React from 'react';
import './StarBorder.css';

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  className?: string;
  /** Applied to the inner content box — use to strip its default black/bordered
      button skin (e.g. `!bg-transparent !border-0 !p-0`) when wrapping content
      that already has its own background, like a glass surface. */
  innerClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: React.ReactNode;
}

/** Full React Bits StarBorder primitive — a container with an animated comet-light
    border and a default button-like inner skin. Use for standalone CTAs/badges. */
export const StarBorder: React.FC<StarBorderProps> = ({
  as: Component = 'button',
  className = '',
  innerClassName = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  children,
  style,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{ padding: `${thickness}px 0`, ...style }}
      {...rest}
    >
      <StarBorderGlow color={color} speed={speed} />
      <div className={`inner-content ${innerClassName}`}>{children}</div>
    </Component>
  );
};

interface StarBorderGlowProps {
  color?: string;
  speed?: string;
  /** Height (px) of the visible band hugging the container's top/bottom edge —
      keep this small relative to the container so it reads as a thin edge trace
      rather than a wash covering the middle of the content. */
  thickness?: number;
  /** Fixed radius (px) of the bright comet core. Kept independent of the
      container's own size (unlike the original source, whose default gradient
      sizes to the element's box) so it stays a tight, consistent-looking spark
      whether it's tracing a small pill or a large one. */
  coreSize?: number;
}

/** Just the animated comet-light layer from StarBorder, with no wrapping element,
    padding, or inner skin — the "shape" half of the component on its own. Drop it
    inside any `relative overflow-hidden` container to trace that container's own
    edge with the moving glow, without inheriting StarBorder's button styling. */
export const StarBorderGlow: React.FC<StarBorderGlowProps> = ({
  color = 'white',
  speed = '6s',
  thickness = 10,
  coreSize = 60,
}) => {
  const background = `radial-gradient(circle ${coreSize}px at center, ${color}, transparent 70%)`;

  return (
    <>
      {/* Flush with the edge (not centered on it) so the whole band lands inside the
          clipping container instead of half being clipped away. */}
      <div
        aria-hidden="true"
        className="border-gradient-bottom motion-reduce:hidden"
        style={{ background, animationDuration: speed, height: thickness, bottom: 0 }}
      />
      <div
        aria-hidden="true"
        className="border-gradient-top motion-reduce:hidden"
        style={{ background, animationDuration: speed, height: thickness, top: 0 }}
      />
    </>
  );
};

export default StarBorder;
