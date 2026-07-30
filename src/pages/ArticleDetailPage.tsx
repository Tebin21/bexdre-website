import React from 'react';
import { useParams } from 'react-router-dom';
import { usePageTitle } from '@/hooks/usePageTitle';
import { getArticleBySlug, getRelatedArticles } from '@/data/articles';
import { PageHero } from '@/components/ui/PageHero';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTASection } from '@/components/ui/CTASection';
import { ArticleCard } from '@/components/insights/ArticleCard';
import { useGSAPReveal } from '@/hooks/useGSAPReveal';
import NotFoundPage from './NotFoundPage';

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);

  usePageTitle(article ? article.title : 'Article Not Found');
  const revealRef = useGSAPReveal<HTMLDivElement>();

  if (!article) return <NotFoundPage />;

  const related = getRelatedArticles(article.slug);
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        breadcrumbs={[{ label: 'Insights', to: '/insights' }, { label: article.title }]}
      />

      <SectionWrapper size="sm">
        <div ref={revealRef} className="max-w-[720px] mx-auto">
          <div className="flex items-center justify-center gap-3 text-[13px] text-white/55 mb-10">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{publishedDate}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTimeMinutes} min read</span>
          </div>

          <div className="flex flex-col gap-6">
            {article.body.map((paragraph, i) => (
              <p key={i} className="text-[16px] leading-[1.8] text-white/70">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {related.length > 0 && (
        <SectionWrapper size="sm">
          <SectionHeading eyebrow="More Insights" title="Related Articles" className="mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </SectionWrapper>
      )}

      <CTASection />
    </>
  );
};

export default ArticleDetailPage;
