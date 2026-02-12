import type { Article } from "@/lib/types/article";

const SITE_URL = "https://elradarcripto.com";
const SITE_NAME = "Radar Cripto";
const LOGO_URL = `${SITE_URL}/logo.svg`;

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: [
      "https://x.com/ElRadardeCesar",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/noticias?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    articleBody: article.body.replace(/##\s/g, "").slice(0, 5000),
    image: article.image_url ?? undefined,
    datePublished: article.published_at,
    dateModified: article.published_at,
    author: {
      "@type": "Person",
      name: article.author_name,
      url: `${SITE_URL}${article.author_url}`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    mainEntityOfPage: `${SITE_URL}/noticias/${article.slug}`,
  };
}

export function generateBreadcrumbs(
  segments: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: segments.map((seg, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: seg.name,
      item: `${SITE_URL}${seg.href}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export { SITE_URL, SITE_NAME, LOGO_URL };
