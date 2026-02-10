import type { Metadata } from "next";
import { generateBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mercados — Criptomonedas y Dólar Paralelo en Tiempo Real",
  description:
    "Precios en vivo de Bitcoin, Ethereum, Solana y tasas de dólar paralelo en 9 países de América Latina. Datos actualizados cada minuto.",
  alternates: { canonical: "https://elradarcripto.com/mercados" },
};

export default function MercadosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Mercados", href: "/mercados" },
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
