import type { Metadata } from "next";
import { generateBreadcrumbs, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Convertidor Cripto a Fiat — BTC, ETH, SOL a Bolívares, Pesos",
  description:
    "Convierte Bitcoin, Ethereum y Solana a bolívares, pesos argentinos, colombianos y más con tasas paralelo, oficial y P2P en tiempo real.",
  alternates: { canonical: "https://elradarcripto.com/herramientas/convertir" },
  openGraph: {
    images: [{ url: "https://elradarcripto.com/og-tool-convertir.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  { question: "¿Qué es la tasa paralelo?", answer: "La tasa paralelo es el precio del dólar en el mercado informal, determinado por la oferta y demanda fuera del sistema bancario oficial. En países como Venezuela, Argentina y Bolivia suele ser significativamente mayor que la tasa oficial." },
  { question: "¿Cómo se calcula la conversión de cripto a moneda local?", answer: "Primero se convierte la criptomoneda a dólares usando el precio de mercado, y luego se multiplica por la tasa paralelo, oficial o P2P del país seleccionado." },
  { question: "¿Con qué frecuencia se actualizan las tasas?", answer: "Las tasas de criptomonedas se actualizan cada minuto. Las tasas de dólar paralelo se actualizan cada 15-30 minutos dependiendo del país." },
  { question: "¿Qué diferencia hay entre tasa paralelo, oficial y P2P?", answer: "La tasa oficial es fijada por el gobierno o banco central. La paralelo refleja el mercado informal. La P2P es el precio en plataformas peer-to-peer como Binance P2P, donde compradores y vendedores negocian directamente." },
];

export default function ConvertirLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Herramientas", href: "/herramientas" },
    { name: "Convertidor", href: "/herramientas/convertir" },
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
