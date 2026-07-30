import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { InsightArticle } from '@/types';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';

interface ArticleCardProps {
  article: InsightArticle;
}

/** Shared by Home "Latest Insights", the Insights hub, and related-articles lists. */
export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => (
  <Link to={`/insights/${article.slug}`} className="article-card block group h-full">
    <GlassCard className="h-full flex flex-col gap-4">
      <Badge>{article.category}</Badge>
      <h3 className="text-[18px] font-bold text-white leading-[1.3]">{article.title}</h3>
      <p className="text-[15px] leading-[1.7] text-white/60">{article.excerpt}</p>
      <div className="mt-auto flex items-center justify-between text-[13px] text-white/50">
        <span>{article.readTimeMinutes} min read</span>
        <span className="inline-flex items-center gap-1.5 font-bold text-[#24AC7C] group-hover:gap-2.5 transition-all duration-300">
          Read <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </GlassCard>
  </Link>
);
