import React, { useState, useEffect } from 'react';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { NAV_LINKS } from '@/data/nav';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close the mobile menu on any route change (covers link clicks, back/forward, programmatic nav).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop header ── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[rgba(5,7,10,0.85)] backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_4px_40px_rgba(0,0,0,0.3)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="max-w-[1400px] mx-auto px-10 max-sm:px-5">
          <nav aria-label="Primary" className="flex items-center justify-between h-[70px]">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <Logo />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
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

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button variant="primary" size="sm" to="/contact">
                Start Project
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-white/80 hover:bg-white/[0.08] transition-all duration-200"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <div
        // `inert` (not just opacity/pointer-events) so the closed menu's links drop out of
        // the tab order and the accessibility tree — otherwise keyboard/SR users tab through
        // invisible links before ever reaching the footer.
        inert={!mobileOpen}
        className={[
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          'bg-[rgba(5,7,10,0.97)] backdrop-blur-[30px]',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {/* Centre glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(36,172,124,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="flex flex-col items-center justify-center h-full gap-6 relative z-10">
          {NAV_LINKS.map((link, i) => (
            <RouterNavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                [
                  'text-3xl font-bold tracking-tight transition-all duration-200',
                  isActive ? 'text-white' : 'text-white/80 hover:text-white',
                ].join(' ')
              }
              style={{
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
                transition: `all 0.4s cubic-bezier(.25,.46,.45,.94) ${i * 0.05}s`,
              }}
            >
              {link.label}
            </RouterNavLink>
          ))}

          <div
            className="mt-4"
            style={{
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(.25,.46,.45,.94) 0.4s',
            }}
          >
            <Button variant="primary" size="lg" to="/contact">
              Start Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
