import type { Metadata } from "next";
import { generateBreadcrumbs, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Conversor P2P — Cuánto Cripto Puedo Comprar",
  description:
    "Calcula cuánto Bitcoin, Ethereum o Solana puedes comprar con bolívares, pesos o reales. Compara tasas P2P en Binance, OKX y más.",
  alternates: { canonical: "https://elradarcripto.com/herramientas/p2p" },
  openGraph: {
    images: [{ url: "https://elradarcripto.com/og-tool-p2p.jpg", width: 1200, height: 630 }],
  },
};

const faqs = [
  { question: "¿Cómo comprar Bitcoin con bolívares?", answer: "La forma más común es a través de plataformas P2P como Binance P2P u OKX P2P. Publicas una orden de compra, un vendedor acepta, transfieres bolívares por banco o pago móvil, y recibes BTC en tu wallet." },
  { question: "¿Qué es Binance P2P?", answer: "Binance P2P es un mercado peer-to-peer dentro de Binance donde compradores y vendedores negocian directamente el precio de criptomonedas en moneda local. Binance actúa como intermediario con un sistema de escrow para proteger ambas partes." },
  { question: "¿Cuál P2P tiene mejor precio?", answer: "Depende del momento y la moneda local. Generalmente Binance P2P tiene más liquidez y mejores precios para VES y ARS. OKX P2P puede ofrecer mejores tasas en COP y MXN. Compara siempre antes de operar." },
  { question: "¿Es seguro comprar cripto P2P?", answer: "Sí, siempre que uses plataformas con sistema de escrow como Binance P2P u OKX P2P. Nunca envíes dinero fuera de la plataforma y verifica la reputación del vendedor antes de operar." },
];

export default function P2PLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Herramientas", href: "/herramientas" },
    { name: "Conversor P2P", href: "/herramientas/p2p" },
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
