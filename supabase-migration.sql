-- Run this in Supabase SQL Editor

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  source_url TEXT,
  source_title TEXT,
  author_name TEXT NOT NULL DEFAULT 'El Radar de César',
  author_url TEXT NOT NULL DEFAULT 'https://x.com/ElRadardeCesar',
  reading_time INTEGER NOT NULL DEFAULT 4,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_source_url ON articles(source_url);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON articles FOR SELECT USING (true);
