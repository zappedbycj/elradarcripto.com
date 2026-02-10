import type { Metadata } from "next";
import { generateBreadcrumbs, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tasas de Dólar Paralelo — 9 Países de América Latina",
  description:
    "Dólar paralelo vs oficial en Venezuela, Argentina, Bolivia, Colombia, Cuba, Brasil y más. Spread porcentual actualizado cada 30 minutos.",
  alternates: { canonical: "https://elradarcripto.com/herramientas/tasas" },
  openGraph: {
    images: [{ url: "https://elradarcripto.com/og-tool-tasas.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  { question: "¿Por qué existe un dólar paralelo?", answer: "El dólar paralelo surge cuando hay controles cambiarios que restringen el acceso a divisas al precio oficial. La demanda insatisfecha crea un mercado informal donde el dólar se cotiza a un precio diferente al oficial." },
  { question: "¿Qué países tienen dólar paralelo?", answer: "Los países con mayor brecha cambiaria en LATAM son Venezuela, Argentina, Bolivia, Cuba y en menor medida Colombia, Brasil, Perú, Chile y México." },
  { question: "¿Qué tan confiables son estas tasas?", answer: "Las tasas provienen de fuentes reconocidas en cada país como CriptoYa, Monitor Dólar y otros agregadores locales. Se actualizan cada 15-30 minutos." },
];

export default function TasasLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Herramientas", href: "/herramientas" },
    { name: "Tasas", href: "/herramientas/tasas" },
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
