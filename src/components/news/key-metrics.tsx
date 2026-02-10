import type { ArticleMetric } from "@/lib/types/article";

interface KeyMetricsProps {
  metrics: ArticleMetric[];
}

export function KeyMetrics({ metrics }: KeyMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-lg bg-surface border border-border mb-8">
      {metrics.slice(0, 4).map((m, i) => (
        <div key={i} className="border-l-2 border-accent pl-3">
          <span className="font-mono text-2xs text-text-tertiary uppercase tracking-wider block">
            {m.label}
          </span>
          <span className="font-mono text-sm text-text-primary font-semibold">
            {m.value}
          </span>
        </div>
      ))}
    </div>
  );
}
