import type { Metadata } from "next";
import { generateBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Herramientas Cripto y Divisas",
  description:
    "Convertidor cripto a fiat, comparador de exchanges, calculadora de spread, ganancia y tasas de dólar paralelo para América Latina.",
  alternates: { canonical: "https://elradarcripto.com/herramientas" },
};

export default function HerramientasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Herramientas", href: "/herramientas" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {children}
    </>
  );
}
