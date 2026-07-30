import { prefersReducedMotion } from '@/lib/motion';

/**
 * Spawns a short-lived expanding ripple span from the pointer-down position.
 * Spread the returned `onPointerDown` onto a `position: relative; overflow: hidden` element.
 */
export function useRipple<T extends HTMLElement = HTMLElement>(
  color: string = 'rgba(255,255,255,0.35)',
) {
  const onPointerDown = (e: React.PointerEvent<T>) => {
    if (prefersReducedMotion()) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.4;
    const span = document.createElement('span');
    span.style.cssText = `
      position: absolute;
      left: ${e.clientX - rect.left - size / 2}px;
      top: ${e.clientY - rect.top - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      border-radius: 9999px;
      background: ${color};
      pointer-events: none;
      transform: scale(0);
      opacity: 0.6;
      animation: fab-ripple 600ms ease-out forwards;
    `;
    el.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  };

  return { onPointerDown };
}
