import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AuroraBackground } from '@/components/ui/AuroraBackground';
import { PageLoader } from '@/components/ui/PageLoader';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SkipLink } from './SkipLink';
import { ScrollToTop } from './ScrollToTop';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05070A] text-[rgba(255,255,255,0.72)] font-sans antialiased overflow-x-hidden">
      <AuroraBackground />
      <ScrollToTop />
      <SkipLink />

      <div className="relative z-10">
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
    </div>
  );
};
