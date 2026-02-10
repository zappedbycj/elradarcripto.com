import { fetchArticles } from "@/lib/api/news";

export async function GET() {
  const articles = await fetchArticles(50);
  const siteUrl = "https://elradarcripto.com";

  const items = articles
    .map(
      (a) => `    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${siteUrl}/noticias/${a.slug}</link>
      <description><![CDATA[${a.excerpt}]]></description>
      <pubDate>${new Date(a.published_at).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/noticias/${a.slug}</guid>
      <author>${a.author_name}</author>${a.image_url ? `\n      <enclosure url="${a.image_url}" type="image/png" />` : ""}
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Radar Cripto — Noticias</title>
    <link>${siteUrl}/noticias</link>
    <description>Noticias de criptomonedas y finanzas para América Latina</description>
    <language>es</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=900, stale-while-revalidate",
    },
  });
}
