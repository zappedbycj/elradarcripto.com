import type { MetadataRoute } from "next";
import { fetchArticles } from "@/lib/api/news";

const SITE_URL = "https://elradarcripto.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await fetchArticles(5000);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${SITE_URL}/noticias`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${SITE_URL}/mercados`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${SITE_URL}/herramientas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/herramientas/convertir`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/herramientas/exchanges`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/herramientas/tasas`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/herramientas/p2p`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/herramientas/spread`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/herramientas/ganancia`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/sobre`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/metodologia`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/terminos`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/noticias/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}
