import React, { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { PageLoader } from '@/components/ui/PageLoader';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Logo } from './Logo';
import { SkipLink } from './SkipLink';
import { ScrollToTop } from './ScrollToTop';
import { MobileBottomNav } from './MobileBottomNav';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05070A] text-[rgba(255,255,255,0.72)] font-sans antialiased overflow-x-hidden">
      <AuroraBackground />
      <ScrollToTop />
      <SkipLink />

      {/* Reserves space for the floating mobile bottom nav so page content/Footer is never
          hidden behind it. Applied here (outside Suspense, present at first paint) rather
          than toggled later, so it can't itself introduce a layout shift. */}
      <div className="relative z-10 pb-[calc(env(safe-area-inset-bottom)+96px)] lg:pb-0">
        {/* Mobile-only: the single animated brand mark, standalone above the page content.
            On desktop the equivalent lives inside Navbar instead — never both at once. */}
        <div className="lg:hidden w-full flex justify-center pt-8 pb-2">
          <Link to="/" aria-label="BEXDRE — Home" className="inline-flex">
            <Logo markSize="mobileTop" />
          </Link>
        </div>
        <Navbar />
        {/* Footer lives inside the same Suspense boundary as the routed page: if it sat
            outside, it would render immediately (at the tiny loading-spinner height)
            and then jump dramatically once the lazy page chunk resolves — a real,
            measurable layout shift (confirmed via Lighthouse CLS) on slower connections. */}
        <Suspense fallback={<PageLoader />}>
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            <Outlet />
          </main>
          <Footer />
        </Suspense>
      </div>

      <MobileBottomNav />
    </div>
  );
};
