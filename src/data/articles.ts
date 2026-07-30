import type { InsightArticle, InsightCategory } from '@/types';
import { PLACEHOLDER_COPY } from './placeholders';

function buildArticle(
  slug: string,
  title: string,
  category: InsightCategory,
  publishedAt: string,
  featured: boolean,
): InsightArticle {
  return {
    slug,
    title,
    category,
    excerpt: PLACEHOLDER_COPY,
    body: [PLACEHOLDER_COPY, PLACEHOLDER_COPY, PLACEHOLDER_COPY],
    author: 'BEXDRE Team',
    publishedAt,
    readTimeMinutes: 5,
    featured,
    isPlaceholder: true,
  };
}

export const ARTICLES: InsightArticle[] = [
  buildArticle('placeholder-article-1', 'Placeholder Article Title 1', 'Articles', '2026-06-01', true),
  buildArticle('placeholder-article-2', 'Placeholder Article Title 2', 'Articles', '2026-05-20', false),
  buildArticle('placeholder-tutorial-1', 'Placeholder Tutorial Title 1', 'Tutorials', '2026-06-10', true),
  buildArticle('placeholder-tutorial-2', 'Placeholder Tutorial Title 2', 'Tutorials', '2026-05-15', false),
  buildArticle('placeholder-company-news-1', 'Placeholder Company News Title 1', 'Company News', '2026-06-20', true),
  buildArticle('placeholder-company-news-2', 'Placeholder Company News Title 2', 'Company News', '2026-05-05', false),
  buildArticle('placeholder-technology-1', 'Placeholder Technology Title 1', 'Technology', '2026-06-05', false),
  buildArticle('placeholder-technology-2', 'Placeholder Technology Title 2', 'Technology', '2026-04-28', false),
];

export const FEATURED_ARTICLES: InsightArticle[] = ARTICLES.filter((article) => article.featured);

export const INSIGHT_CATEGORIES: InsightCategory[] = ['Articles', 'Tutorials', 'Company News', 'Technology'];

export function getArticleBySlug(slug: string | undefined): InsightArticle | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

export function getRelatedArticles(currentSlug: string, count = 3): InsightArticle[] {
  return ARTICLES.filter((article) => article.slug !== currentSlug).slice(0, count);
}
