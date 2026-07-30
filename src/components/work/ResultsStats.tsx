import React from 'react';
import type { ProjectResultMetric } from '@/types';

interface ResultsStatsProps {
  metrics: ProjectResultMetric[];
}

export const ResultsStats: React.FC<ResultsStatsProps> = ({ metrics }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    {metrics.map((metric) => (
      <div key={metric.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 text-center">
        <p className="text-[28px] font-bold text-[#24AC7C] mb-1">{metric.value}</p>
        <p className="text-[13px] text-white/50">{metric.label}</p>
      </div>
    ))}
  </div>
);
