import React, { lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { PageTransitionOverlay } from '@/components/layout/PageTransitionOverlay';
import { usePageTransition } from '@/hooks/usePageTransition';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ServicesHubPage = lazy(() => import('@/pages/ServicesHubPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const WorkHubPage = lazy(() => import('@/pages/WorkHubPage'));
const CaseStudyDetailPage = lazy(() => import('@/pages/CaseStudyDetailPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const InsightsHubPage = lazy(() => import('@/pages/InsightsHubPage'));
const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  const { displayLocation, phase, label, overlayRef, dotRef, titleRef } = usePageTransition(location);

  return (
    <>
      <PageTransitionOverlay
        active={phase !== 'idle'}
        label={label}
        overlayRef={overlayRef}
        dotRef={dotRef}
        titleRef={titleRef}
      />
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesHubPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/work" element={<WorkHubPage />} />
          <Route path="/work/:slug" element={<CaseStudyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsHubPage />} />
          <Route path="/insights/:slug" element={<ArticleDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
