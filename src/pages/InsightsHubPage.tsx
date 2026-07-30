import React, { useState, useMemo } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { CategoryFilterTabs } from '@/components/ui/CategoryFilterTabs';
import { CTASection } from '@/components/ui/CTASection';
import { ArticleCard } from '@/components/insights/ArticleCard';
import { ARTICLES, INSIGHT_CATEGORIES } from '@/data/articles';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

const InsightsHubPage: React.FC = () => {
  usePageTitle('Insights');
  const [active, setActive] = useState('All');
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.article-card', stagger: 0.08 });

  const filtered = useMemo(
    () => (active === 'All' ? ARTICLES : ARTICLES.filter((article) => article.category === active)),
    [active],
  );

  return (
    <>
      <PageHero eyebrow="Insights" title="Latest Insights" subtitle="Placeholder copy — content pending." />
      <SectionWrapper size="sm">
        <div className="mb-12">
          <CategoryFilterTabs categories={INSIGHT_CATEGORIES} active={active} onChange={setActive} />
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </SectionWrapper>
      <CTASection />
    </>
  );
};

export default InsightsHubPage;
