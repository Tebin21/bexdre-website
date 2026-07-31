import React, { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { PageLoader } from '@/components/ui/PageLoader';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SkipLink } from './SkipLink';
import { ScrollToTop } from './ScrollToTop';
import { MobileBottomNav } from './MobileBottomNav';
import { IntroOverlay } from './IntroOverlay';

// Single dial for the mobile hero mark's visual size. The <img>'s own box
// (w-[180px] sm:w-[220px]) stays fixed — that's what the surrounding flex
// layout measures — so this purely visual transform can grow the mark
// without shifting anything below it by even a pixel. Bump this one number
// to resize the mark everywhere it's used.
const HERO_LOGO_SCALE = 1.7;

// Single dial for the vertical gap between the mobile hero mark and the
// headline below it. ~40% tighter than the original 40px (pb-10). Bump this
// one number to retune the gap without touching the logo, headline, or any
// other Hero spacing.
const HERO_LOGO_GAP = 24;

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05070A] text-[rgba(255,255,255,0.72)] font-sans antialiased overflow-x-hidden">
      <IntroOverlay />
      <AuroraBackground />
      <ScrollToTop />
      <SkipLink />

      {/* Reserves space for the floating mobile bottom nav so page content/Footer is never
          hidden behind it. Applied here (outside Suspense, present at first paint) rather
          than toggled later, so it can't itself introduce a layout shift. */}
      <div className="relative z-10 pb-[calc(env(safe-area-inset-bottom)+96px)] lg:pb-0">
        {/* Mobile-only: the single static brand mark, standalone above the page content.
            On desktop the equivalent lives inside Navbar instead — never both at once. */}
        <div className="lg:hidden w-full flex justify-center pt-14" style={{ paddingBottom: HERO_LOGO_GAP }}>
          <Link to="/" aria-label="BEXDRE — Home" className="inline-flex">
            <img
              src="/images/bexdrelogo.png"
              alt="BEXDRE"
              className="w-[180px] sm:w-[220px] h-auto object-contain"
              style={{ transform: `scale(${HERO_LOGO_SCALE})` }}
            />
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
