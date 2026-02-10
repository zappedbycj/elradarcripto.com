import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { MarketTicker } from "@/components/rates/market-ticker";
import { ParallelRates } from "@/components/rates/parallel-rates";
import { QuickConverter } from "@/components/tools/quick-converter";
import { NewsFeed } from "@/components/news/news-feed";
import { Separator } from "@/components/ui/separator";
import { generateBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Radar Cripto — Divisas y cripto para LATAM",
  description:
    "Precios de criptomonedas en tiempo real, tasas de dólar paralelo y herramientas financieras para Venezuela, Argentina, Bolivia y toda América Latina.",
  alternates: { canonical: "https://elradarcripto.com" },
};

export default function HomePage() {
  const breadcrumbLd = generateBreadcrumbs([{ name: "Inicio", href: "/" }]);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-[640px] mx-auto space-y-6">
        <MarketTicker />
        <Separator />
        <ParallelRates />
        <Separator />
        <QuickConverter />
        <Separator />
        <NewsFeed />
      </div>
    </PageContainer>
  );
}
