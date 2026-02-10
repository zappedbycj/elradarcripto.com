import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: [
      "https://elradarcripto.com/sitemap.xml",
      "https://elradarcripto.com/news-sitemap.xml",
    ],
  };
}
