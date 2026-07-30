import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Rocket, Phone, Mail, MessageSquare, CalendarClock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { BOTTOM_NAV_TABS, MORE_LINKS, getActiveTabId } from '@/data/bottomNav';
import type { BottomNavTabId } from '@/data/bottomNav';
import { LEGAL_LINKS } from '@/data/nav';
import { CONTACT_INFO } from '@/data/contact';
import { useRipple } from '@/hooks/useRipple';

interface QuickAction {
  icon: LucideIcon;
  label: string;
  to?: string;
  href?: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  { icon: Rocket, label: 'Start a Project', to: '/contact' },
  { icon: Phone, label: 'Book a Call', href: `tel:${CONTACT_INFO.phone.replace(/[^\d+]/g, '')}` },
  { icon: Mail, label: 'Email Us', href: `mailto:${CONTACT_INFO.email}` },
  { icon: MessageSquare, label: 'WhatsApp', href: CONTACT_INFO.whatsapp },
  { icon: CalendarClock, label: 'Schedule a Meeting', href: CONTACT_INFO.scheduleMeetingUrl },
];

const rowClasses =
  'flex items-center gap-4 px-5 py-4 text-[15px] font-medium text-white/80 hover:text-white hover:bg-white/[0.06] transition-colors duration-200 first:rounded-t-[28px] last:rounded-b-[28px]';

// Note: every class below is written as a complete literal string (never assembled via
// template-literal interpolation of a shared variant prefix) — Tailwind's build-time
// scanner matches literal text in source files, so a dynamically-concatenated variant
// like `${prefix}:hover:...` would silently fail to generate any CSS.

/** Shared press/hover/color treatment for both the Link tabs and the More button. */
const tabClasses = (active: boolean) =>
  [
    'group relative z-10 flex flex-col items-center justify-center gap-1 h-full overflow-hidden',
    'transition-[color,transform] duration-200 ease-spring motion-reduce:transition-none',
    'active:scale-[0.96]',
    // Hover-only glass halo via a pseudo-element — no extra DOM node — gated to
    // hover-capable pointers so it can't get stuck "on" after a tap on touch devices.
    "before:content-[''] before:absolute before:inset-x-2 before:inset-y-1.5 before:rounded-2xl before:opacity-0",
    'before:bg-white/[0.05] before:shadow-[0_2px_10px_rgba(0,0,0,0.25),0_0_18px_rgba(36,172,124,0.16)]',
    'before:transition-opacity before:duration-200 motion-reduce:before:transition-none',
    '[@media(hover:hover)_and_(pointer:fine)]:hover:before:opacity-100',
    active
      ? 'text-white'
      : 'text-white/60 [@media(hover:hover)_and_(pointer:fine)]:hover:text-white/90',
  ].join(' ');

const tabIconClasses = (active: boolean) =>
  [
    'transition-transform duration-300 ease-spring motion-reduce:transition-none',
    active
      ? 'scale-[1.08]'
      : 'scale-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-105',
  ].join(' ');

export const MobileBottomNav: React.FC = () => {
  const { pathname } = useLocation();
  const activeId = getActiveTabId(pathname);

  const [moreOpen, setMoreOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const tabRefs = useRef<Partial<Record<BottomNavTabId, HTMLElement | null>>>({});
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, width: 0 });
  const ripple = useRipple<HTMLButtonElement>();
  const navRipple = useRipple<HTMLElement>('rgba(36,172,124,0.35)');

  const measureIndicator = () => {
    const el = tabRefs.current[activeId];
    if (el) setIndicator({ x: el.offsetLeft, width: el.offsetWidth });
  };

  useLayoutEffect(measureIndicator, [activeId]);

  useEffect(() => {
    window.addEventListener('resize', measureIndicator);
    return () => window.removeEventListener('resize', measureIndicator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  useEffect(() => {
    setMoreOpen(false);
    setActionsOpen(false);
  }, [pathname]);

  const toggleMore = () => {
    setActionsOpen(false);
    setMoreOpen((v) => !v);
  };

  const toggleActions = () => {
    setMoreOpen(false);
    setActionsOpen((v) => !v);
  };

  return (
    <>
      <nav
        aria-label="Primary mobile"
        className="lg:hidden fixed bottom-0 inset-x-0 z-50 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)]"
      >
        <div className="relative grid grid-cols-5 items-stretch h-16 rounded-[28px] backdrop-blur-xl bg-[rgba(15,20,24,0.72)] border border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.04)_inset]">
          {/* Sliding active indicator */}
          <span
            aria-hidden="true"
            className="absolute top-1 h-[calc(100%-8px)] rounded-2xl bg-[rgba(36,172,124,0.10)] shadow-[0_0_0_1px_rgba(36,172,124,0.14)_inset,0_0_20px_rgba(36,172,124,0.28)] transition-[transform,width] duration-[420ms] ease-[cubic-bezier(.25,.46,.45,.94)] motion-reduce:transition-none"
            style={{ transform: `translateX(${indicator.x}px)`, width: `${indicator.width}px` }}
          />

          {BOTTOM_NAV_TABS.flatMap((tab, i) => {
            const isActive = activeId === tab.id;
            const Icon = tab.icon;

            const node =
              tab.id === 'more' ? (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current.more = el;
                    moreButtonRef.current = el;
                  }}
                  onPointerDown={navRipple.onPointerDown}
                  onClick={toggleMore}
                  aria-expanded={moreOpen}
                  aria-controls="more-sheet"
                  className={tabClasses(isActive || moreOpen)}
                >
                  <Icon size={20} strokeWidth={2} className={tabIconClasses(isActive || moreOpen)} />
                  <span className="text-[11px] font-medium tracking-tight transition-colors duration-200">
                    {tab.label}
                  </span>
                </button>
              ) : (
                <Link
                  key={tab.id}
                  to={tab.to}
                  ref={(el) => {
                    tabRefs.current[tab.id] = el;
                  }}
                  onPointerDown={navRipple.onPointerDown}
                  className={tabClasses(isActive)}
                >
                  <Icon size={20} strokeWidth={2} className={tabIconClasses(isActive)} />
                  <span className="text-[11px] font-medium tracking-tight transition-colors duration-200">
                    {tab.label}
                  </span>
                </Link>
              );

            // Reserved FAB spacer is inserted as its own grid cell right before "work"
            // (index 2) rather than replacing it, so all 4 tabs still render — DOM order
            // becomes Home, Services, [spacer], Work, More for the grid-cols-5 track.
            return i === 2 ? [<div key="fab-spacer" aria-hidden="true" />, node] : [node];
          })}
        </div>

        {/* Floating center action button */}
        <button
          ref={fabRef}
          onPointerDown={ripple.onPointerDown}
          onClick={toggleActions}
          aria-haspopup="dialog"
          aria-expanded={actionsOpen}
          aria-controls="quick-actions-sheet"
          aria-label="Quick actions"
          className={[
            'fab-pulse motion-reduce:animate-none',
            'absolute left-1/2 -translate-x-1/2 -top-7 w-16 h-16 rounded-full overflow-hidden',
            'flex items-center justify-center text-white',
            'bg-gradient-to-br from-[#24AC7C] to-[#1a8a62]',
            'shadow-[0_4px_20px_rgba(36,172,124,0.45)]',
            'transition-transform duration-300 ease-spring motion-reduce:transition-none',
            '[@media(hover:hover)_and_(pointer:fine)]:hover:scale-[1.08] active:scale-[0.94]',
          ].join(' ')}
        >
          <MessageCircle size={26} strokeWidth={2} />
        </button>
      </nav>

      {/* "More" sheet */}
      <BottomSheet
        id="more-sheet"
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        triggerRef={moreButtonRef}
        labelledBy="more-sheet-heading"
        align="end"
      >
        <h2 id="more-sheet-heading" className="sr-only">
          More navigation
        </h2>
        <div className="py-2">
          {MORE_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.to} to={link.to} className={rowClasses}>
                <Icon size={19} strokeWidth={2} className="text-[#24AC7C]" />
                {link.label}
              </Link>
            );
          })}
          <div
            aria-hidden="true"
            className="mx-5 my-1 h-px bg-gradient-to-r from-transparent via-white/[0.14] to-transparent"
          />
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-5 py-3 text-[13px] text-white/50 hover:text-white/75 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </BottomSheet>

      {/* FAB quick-actions sheet */}
      <BottomSheet
        id="quick-actions-sheet"
        open={actionsOpen}
        onClose={() => setActionsOpen(false)}
        triggerRef={fabRef}
        labelledBy="quick-actions-heading"
      >
        <h2 id="quick-actions-heading" className="sr-only">
          Quick actions
        </h2>
        <div className="py-2">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            const content = (
              <>
                <span className="w-9 h-9 rounded-full flex items-center justify-center bg-[rgba(36,172,124,0.12)] text-[#24AC7C]">
                  <Icon size={17} strokeWidth={2} />
                </span>
                {action.label}
              </>
            );
            return action.to ? (
              <Link key={action.label} to={action.to} className={rowClasses}>
                {content}
              </Link>
            ) : (
              <a key={action.label} href={action.href} className={rowClasses}>
                {content}
              </a>
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
};
