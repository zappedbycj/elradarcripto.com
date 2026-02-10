import type { Metadata } from "next";
import { generateBreadcrumbs, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comparador de Exchanges — BTC y ETH en Tiempo Real",
  description:
    "Compara precios de compra y venta de Bitcoin y Ethereum entre los principales exchanges. Encuentra el menor spread y el mejor precio.",
  alternates: { canonical: "https://elradarcripto.com/herramientas/exchanges" },
  openGraph: {
    images: [{ url: "https://elradarcripto.com/og-tool-exchanges.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  { question: "¿Cuál exchange tiene el mejor precio de Bitcoin?", answer: "El precio varía cada segundo entre exchanges. Nuestro comparador muestra precios en tiempo real de Binance, Kraken, Coinbase y OKX para que encuentres el mejor precio al momento de tu compra." },
  { question: "¿Qué es el spread entre exchanges?", answer: "El spread es la diferencia porcentual entre el precio más bajo y el más alto entre exchanges. Un spread alto puede significar oportunidades de arbitraje o menor liquidez en algún exchange." },
  { question: "¿Puedo comprar cripto directamente desde esta herramienta?", answer: "No, esta herramienta es solo informativa. Muestra precios de referencia para que compares antes de ir al exchange de tu preferencia." },
];

export default function ExchangesLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Herramientas", href: "/herramientas" },
    { name: "Exchanges", href: "/herramientas/exchanges" },
  ]);
  const faqLd = generateFAQSchema(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {children}
    </>
  );
}
