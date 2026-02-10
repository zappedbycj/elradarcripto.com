import type { Metadata } from "next";
import { generateBreadcrumbs, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Calculadora de Ganancia Cripto — DCA y Lump Sum",
  description:
    "Simula cuánto habrías ganado comprando Bitcoin, Ethereum o Solana en una fecha pasada. Compara estrategias DCA vs inversión única.",
  alternates: { canonical: "https://elradarcripto.com/herramientas/ganancia" },
  openGraph: {
    images: [{ url: "https://elradarcripto.com/og-tool-ganancia.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  { question: "¿Qué es DCA en criptomonedas?", answer: "DCA (Dollar-Cost Averaging) es una estrategia donde inviertes una cantidad fija de dinero en intervalos regulares, sin importar el precio. Esto reduce el impacto de la volatilidad en tu inversión total." },
  { question: "¿Es mejor DCA o invertir todo de una vez?", answer: "Históricamente, en un mercado alcista la inversión lump sum tiende a rendir más. En mercados laterales o bajistas, DCA reduce el riesgo. Nuestra calculadora te permite comparar ambas estrategias." },
  { question: "¿Los resultados de la calculadora son exactos?", answer: "Los cálculos usan precios históricos reales. Sin embargo, no incluyen comisiones de exchanges ni impuestos, que varían por plataforma y país." },
];

export default function GananciaLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Herramientas", href: "/herramientas" },
    { name: "Ganancia", href: "/herramientas/ganancia" },
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
