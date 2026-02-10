export interface ArticleMetric {
  label: string;
  value: string;
}

export interface ArticleSource {
  name: string;
  role: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: string;
  image_url: string | null;
  image_alt: string | null;
  source_url: string | null;
  source_title: string | null;
  author_name: string;
  author_url: string;
  reading_time: number;
  published_at: string;
  created_at: string;
  key_metrics: ArticleMetric[];
  sources: ArticleSource[];
  related_ticker: string | null;
}
