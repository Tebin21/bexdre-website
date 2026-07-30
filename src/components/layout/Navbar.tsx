import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { NAV_LINKS } from '@/data/nav';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        // Desktop-only: on mobile, navigation is handled entirely by MobileBottomNav
        // plus the standalone animated logo at the top of the page (see Layout).
        'hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[rgba(5,7,10,0.85)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.3)]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="max-w-[1400px] mx-auto px-10">
        <nav aria-label="Primary" className="flex items-center justify-between py-4">
          {/* Logo — the single animated brand mark on desktop, vertically centered via flex */}
          <Link to="/" className="flex items-center group">
            <Logo markSize="navbar" />
          </Link>

          <div className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'px-4 py-2 rounded-xl text-[14px] font-normal transition-all duration-200',
                    isActive ? 'text-white bg-white/[0.06]' : 'text-white/65 hover:text-white hover:bg-white/[0.06]',
                  ].join(' ')
                }
              >
                {link.label}
              </RouterNavLink>
            ))}
          </div>

          <Button variant="primary" size="sm" to="/contact">
            Start Project
          </Button>
        </nav>
      </div>
    </header>
  );
};
