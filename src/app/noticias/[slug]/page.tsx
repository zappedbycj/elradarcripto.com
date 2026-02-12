import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { ArticleBody } from "@/components/news/article-body";
import { KeyMetrics } from "@/components/news/key-metrics";
import { LivePriceWidget } from "@/components/news/live-price-widget";
import { fetchArticles, fetchArticleBySlug } from "@/lib/api/news";
import { relativeTime } from "@/lib/utils";
import { generateArticleSchema, generateBreadcrumbs, SITE_URL } from "@/lib/seo";

export const revalidate = 900;

export async function generateStaticParams() {
  const articles = await fetchArticles(200);
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `${SITE_URL}/noticias/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.published_at,
      modifiedTime: article.published_at,
      section: article.category,
      authors: [article.author_name],
      ...(article.image_url && {
        images: [{ url: article.image_url, width: 1200, height: 675 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      ...(article.image_url && { images: [article.image_url] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await fetchArticles(50);
  const sameCategory = allArticles.filter(
    (a) => a.id !== article.id && a.category === article.category
  );
  const otherCategories = allArticles.filter(
    (a) => a.id !== article.id && a.category !== article.category
  );
  const related = [...sameCategory, ...otherCategories].slice(0, 3);

  const articleLd = generateArticleSchema(article);
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Noticias", href: "/noticias" },
    { name: article.title, href: `/noticias/${article.slug}` },
  ]);

  return (
    <PageContainer narrow>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article>
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.image_alt ?? article.title.split(" ").slice(0, 8).join(" ")}
            width={1200}
            height={675}
            priority
            sizes="(max-width: 640px) 100vw, 640px"
            className="w-full aspect-video object-cover rounded-lg mb-6"
          />
        )}

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge>{article.category}</Badge>
            <LivePriceWidget ticker={article.related_ticker} />
            <span className="font-mono text-2xs text-text-tertiary">
              {new Date(article.published_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })} ({relativeTime(new Date(article.published_at))})
            </span>
          </div>

          <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-text-primary leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 mt-4 text-text-tertiary">
            <span className="font-mono text-2xs">
              {article.reading_time} min de lectura
            </span>
            <span className="font-mono text-2xs">
              Por{" "}
              <a
                href={article.author_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {article.author_name}
              </a>
            </span>
          </div>
        </div>

        <KeyMetrics metrics={article.key_metrics} />

        <Separator className="mb-8" />

        <ArticleBody body={article.body} sources={article.sources} />

        <Separator className="my-8" />

        {/* Author bio */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-surface-alt border border-border-subtle mb-8">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-accent">
              {article.author_name.charAt(0)}
            </span>
          </div>
          <div>
            <a
              href={article.author_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs font-medium text-text-primary hover:text-accent transition-colors"
            >
              {article.author_name}
            </a>
            <p className="text-2xs text-text-tertiary mt-1">
              Analista y editor en Radar Cripto. Cobertura diaria de
              criptomonedas, divisas y finanzas en América Latina.
            </p>
          </div>
        </div>

        <div>
          <Text variant="label" className="mb-4 block text-text-tertiary">
            Relacionados
          </Text>
          <div className="space-y-3">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/noticias/${item.slug}`}
                className="block text-sm text-text-secondary hover:text-accent transition-colors duration-150"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </PageContainer>
  );
}
