import React, { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface BottomSheetProps {
  id: string;
  open: boolean;
  onClose: () => void;
  /** Element to restore focus to when the sheet closes. */
  triggerRef?: React.RefObject<HTMLElement | null>;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
  /**
   * 'center' (default): full-width panel centered under its trigger.
   * 'end': right-anchored panel that lines up under a trigger sitting at the bar's right
   * edge (More), so it reads as anchored to the button instead of a generic full sheet.
   */
  align?: 'center' | 'end';
}

/**
 * Shared glass bottom-sheet primitive for the mobile bottom nav's "More" menu: backdrop,
 * spring-in panel, scroll lock, Escape-to-close, and a focus trap that restores focus to
 * the trigger on close.
 */
export const BottomSheet: React.FC<BottomSheetProps> = ({
  id,
  open,
  onClose,
  triggerRef,
  labelledBy,
  children,
  className = '',
  align = 'center',
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      const panel = panelRef.current;
      const firstFocusable = panel?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      firstFocusable?.focus();
    } else {
      (triggerRef?.current ?? previouslyFocused.current)?.focus();
    }
  }, [open, triggerRef]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          'fixed inset-0 z-40 lg:hidden transition-opacity duration-300 motion-reduce:transition-none',
          'bg-[rgba(5,7,10,0.6)] backdrop-blur-sm',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      />

      {/* Panel */}
      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        inert={!open}
        className={[
          'fixed z-[60] lg:hidden',
          align === 'end' ? 'right-4 w-[min(78%,340px)] origin-bottom-right' : 'inset-x-0 mx-4 origin-bottom',
          'bottom-[calc(env(safe-area-inset-bottom)+92px)]',
          'rounded-[28px] backdrop-blur-md bg-[rgba(15,20,24,0.85)] border border-white/[0.08]',
          'shadow-[0_20px_60px_rgba(0,0,0,0.45),0_0_40px_rgba(36,172,124,0.12)]',
          'transition-all duration-[420ms] ease-spring motion-reduce:transition-none',
          open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none',
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </>
  );
};
