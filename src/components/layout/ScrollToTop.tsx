import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** On every route change: jump to top (instant, not smooth — smooth-scrolling on nav is disorienting) and move focus/SR announcement to the new page. */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main-content')?.focus();
  }, [pathname]);

  return null;
};
