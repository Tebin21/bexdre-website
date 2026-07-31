import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/data/nav';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // Desktop-only: on mobile, navigation is handled entirely by MobileBottomNav
    // plus the standalone animated logo at the top of the page (see Layout).
    // Outer header spans the viewport but stays click-through — only the pill itself,
    // below, is interactive — so it never swallows hover/click on content beside it.
    <header className="hidden lg:block fixed top-6 inset-x-0 z-50 px-6 xl:px-10 pointer-events-none">
      <nav
        aria-label="Primary"
        className={[
          // Content-width pill (not stretched full-bleed): logo, links, and CTA sit
          // close together as one grouped composition, with generous margin from the
          // viewport edges coming from the outer header's padding, not internal gaps.
          // Outer gap (logo+links group -> CTA) stays generous; the tighter inner
          // gap between the logo and the links lives on the group wrapper below,
          // so the logo reads as part of the nav rather than sitting isolated.
          'pointer-events-auto mx-auto flex h-20 w-fit max-w-[calc(100%-1px)] items-center gap-8 xl:gap-10',
          'rounded-full pl-5 pr-3 xl:pl-6 xl:pr-3.5',
          'bg-[rgba(15,20,24,0.72)] backdrop-blur-xl border border-white/[0.08]',
          'transition-shadow duration-500 ease-[cubic-bezier(.25,.46,.45,.94)]',
          scrolled
            ? 'shadow-[0_8px_44px_rgba(0,0,0,0.50),0_0_0_1px_rgba(255,255,255,0.07)_inset]'
            : 'shadow-[0_4px_32px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.04)_inset]',
        ].join(' ')}
      >
        {/* Logo + links share one tighter-gapped group so the mark reads as part of
            the navigation rather than sitting isolated on its own; the CTA keeps the
            wider outer gap since it's a distinct action, not part of the nav group. */}
        <div className="flex items-center gap-6 xl:gap-7 shrink-0">
          {/* Logo — the permanent x.png brand mark on desktop (no wordmark morph here).
              Its box is taller than the pill on purpose and is allowed to overflow the
              rounded edge, same technique as the FAB in MobileBottomNav. */}
          <Link to="/" aria-label="BEXDRE — Home" className="flex items-center shrink-0 group">
            <picture>
              <source srcSet="/images/x.webp" type="image/webp" />
              <img
                src="/images/x-opt.png"
                alt="BEXDRE"
                width={320}
                height={320}
                className="h-32 w-32 xl:h-36 xl:w-36 object-contain transition-transform duration-300 ease-spring group-hover:scale-[1.05]"
              />
            </picture>
          </Link>

          <div className="flex items-center gap-0.5 shrink-0">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'relative px-2.5 xl:px-3 py-2.5 rounded-full text-[16px] xl:text-[18px] font-medium tracking-[-0.01em] whitespace-nowrap',
                    'transition-all duration-300 ease-spring hover:-translate-y-px',
                    isActive
                      ? 'text-white bg-white/[0.06]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.04]',
                    "after:content-[''] after:absolute after:-bottom-px after:h-px",
                    'after:left-2.5 after:right-2.5 xl:after:left-3 xl:after:right-3',
                    'after:bg-gradient-to-r after:from-transparent after:via-[#24AC7C] after:to-transparent',
                    'after:origin-center after:scale-x-0 after:transition-transform after:duration-300 after:ease-spring',
                    isActive ? 'after:scale-x-100' : 'hover:after:scale-x-100',
                  ].join(' ')
                }
              >
                {link.label}
              </RouterNavLink>
            ))}
          </div>
        </div>

        <Button variant="primary" size="sm" to="/contact" className="shrink-0 active:scale-[0.97]">
          Start Project
        </Button>
      </nav>
    </header>
  );
};
