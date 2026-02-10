import { createPublicClient } from "@/lib/supabase";

export const revalidate = 900;

export async function GET() {
  const supabase = createPublicClient();
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  const { data: articles } = await supabase
    .from("articles")
    .select("title, slug, published_at, category, image_url, image_alt")
    .gte("published_at", cutoff)
    .order("published_at", { ascending: false })
    .limit(1000);

  const entries = (articles ?? [])
    .map(
      (a) => `  <url>
    <loc>https://elradarcripto.com/noticias/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Radar Cripto</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${a.published_at}</news:publication_date>
      <news:title>${escapeXml(a.title)}</news:title>
    </news:news>${a.image_url ? `
    <image:image>
      <image:loc>${escapeXml(a.image_url)}</image:loc>
      <image:title>${escapeXml(a.image_alt ?? a.title)}</image:title>
    </image:image>` : ""}
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=900, s-maxage=900",
    },
  });
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
