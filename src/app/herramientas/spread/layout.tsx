import type { Metadata } from "next";
import { generateBreadcrumbs, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calculadora de Spread — Oficial vs Paralelo",
  description:
    "Calcula el spread entre tasa oficial y paralela del dólar. Encuentra oportunidades de arbitraje en Venezuela, Argentina, Bolivia y más.",
  alternates: { canonical: "https://elradarcripto.com/herramientas/spread" },
  openGraph: {
    images: [{ url: "https://elradarcripto.com/og-tool-spread.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  { question: "¿Qué es el spread cambiario?", answer: "El spread cambiario es la diferencia porcentual entre dos tasas de cambio, como la oficial y la paralela. Un spread del 50% significa que el dólar paralelo cuesta 50% más que el oficial." },
  { question: "¿Cómo se calcula el spread?", answer: "Se resta la tasa menor de la mayor, se divide entre la tasa menor y se multiplica por 100. Fórmula: ((Paralelo - Oficial) / Oficial) × 100." },
  { question: "¿Es legal operar con el dólar paralelo?", answer: "La legalidad varía por país. En algunos países las operaciones en el mercado paralelo están en una zona gris legal, mientras que en otros hay restricciones explícitas. Consulta la regulación de tu país." },
];

export default function SpreadLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Herramientas", href: "/herramientas" },
    { name: "Spread", href: "/herramientas/spread" },
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
