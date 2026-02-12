import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { Badge } from "@/components/ui/badge";
import { fetchArticles } from "@/lib/api/news";
import { relativeTime } from "@/lib/utils";
import { generateBreadcrumbs } from "@/lib/seo";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Noticias Cripto",
  description:
    "Últimas noticias de Bitcoin, Ethereum y criptomonedas en español. Análisis de mercado, regulación y adopción en América Latina.",
  alternates: { canonical: "https://elradarcripto.com/noticias" },
  openGraph: {
    title: "Noticias Cripto — Radar Cripto",
    description:
      "Últimas noticias de Bitcoin, Ethereum y criptomonedas en español. Análisis de mercado, regulación y adopción en América Latina.",
    url: "https://elradarcripto.com/noticias",
    type: "website",
    images: [{ url: "https://elradarcripto.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noticias Cripto — Radar Cripto",
    description:
      "Últimas noticias de Bitcoin, Ethereum y criptomonedas en español.",
    images: ["https://elradarcripto.com/og-image.png"],
  },
};

export default async function NoticiasPage() {
  const articles = await fetchArticles();
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Noticias", href: "/noticias" },
  ]);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-[640px] mx-auto">
        <Text variant="h2" className="mb-8">Noticias</Text>
        <div className="space-y-5">
          {articles.map((item) => (
            <Link
              key={item.id}
              href={`/noticias/${item.slug}`}
              className="block group"
            >
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full aspect-video object-cover rounded-lg mb-3"
                  loading="lazy"
                />
              )}
              <h3 className="font-sans text-sm text-text-primary group-hover:text-accent transition-colors duration-150 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-text-tertiary mt-1 line-clamp-2">{item.excerpt}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge>{item.category}</Badge>
                <span className="font-mono text-2xs text-text-tertiary">
                  {relativeTime(new Date(item.published_at))}
                </span>
                <span className="font-mono text-2xs text-text-tertiary">
                  {item.reading_time} min
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
