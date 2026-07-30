import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArticleCard } from '@/components/insights/ArticleCard';
import { FEATURED_ARTICLES } from '@/data/articles';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';

export const LatestInsightsSection: React.FC = () => {
  const ref = useGSAPReveal<HTMLDivElement>({ selector: '.article-card', stagger: 0.08 });

  return (
    <SectionWrapper>
      <SectionHeading eyebrow="Insights" title="Latest Insights" className="mb-16" />
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURED_ARTICLES.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <Button to="/insights" variant="ghost" size="md">
          View All Insights
        </Button>
      </div>
    </SectionWrapper>
  );
};
