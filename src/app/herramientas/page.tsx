"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PriceDisplay } from "@/components/ui/price-display";
import { QuickConverter } from "@/components/tools/quick-converter";
import { ArrowRightLeft, BarChart3, TrendingUp, Globe, Calculator, Percent, Users } from "lucide-react";
import { useCryptoPrices } from "@/lib/hooks/use-crypto-prices";

const tools = [
  {
    href: "/herramientas/convertir",
    title: "Convertidor Cripto → Fiat",
    description: "Convierte BTC, ETH, SOL a bolívares, pesos, reales con tasas paralelo, oficial y P2P en tiempo real.",
    icon: ArrowRightLeft,
  },
  {
    href: "/herramientas/p2p",
    title: "Conversor P2P — Fiat → Cripto",
    description: "Calcula cuánto BTC, ETH o SOL puedes comprar con bolívares, pesos o reales. Compara tasas P2P en Binance, OKX y más.",
    icon: Users,
  },
  {
    href: "/herramientas/exchanges",
    title: "Comparador de Exchanges",
    description: "Compara precios de compra/venta entre Binance, Kraken, Coinbase, OKX y Binance P2P.",
    icon: BarChart3,
  },
  {
    href: "/herramientas/tasas",
    title: "Tasas de Dólar Paralelo",
    description: "Dólar paralelo vs oficial en 9 países LATAM. Venezuela, Argentina, Bolivia, Colombia y más.",
    icon: Globe,
  },
  {
    href: "/herramientas/spread",
    title: "Calculadora de Spread",
    description: "Calcula el spread entre tasa oficial y paralela para encontrar las mejores oportunidades de arbitraje.",
    icon: Percent,
  },
  {
    href: "/herramientas/ganancia",
    title: "Calculadora de Ganancia",
    description: "Simula cuánto habrías ganado comprando cripto en una fecha pasada. DCA y lump sum.",
    icon: Calculator,
  },
  {
    href: "#",
    title: "Historial de Precios",
    description: "Gráficos de 7, 30 y 90 días para Bitcoin, Ethereum y las principales criptomonedas.",
    icon: TrendingUp,
    badge: "Próximamente",
  },
];

export default function HerramientasPage() {
  const { prices } = useCryptoPrices();

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="h2" className="mb-2">Herramientas</Text>
        <p className="text-xs text-text-tertiary mb-8">
          Calculadoras y herramientas financieras para cripto y divisas en América Latina.
        </p>

        {/* Inline quick converter */}
        <Card className="p-5 mb-8">
          <QuickConverter />
        </Card>

        {/* Quick price reference */}
        <div className="flex items-center gap-6 mb-8 overflow-x-auto pb-1">
          {prices.slice(0, 4).map((coin) => (
            <div key={coin.symbol} className="flex items-center gap-2 flex-shrink-0">
              <span className="font-mono text-2xs text-text-tertiary">{coin.symbol}</span>
              <PriceDisplay
                value={coin.price}
                delta={coin.delta24h}
                decimals={coin.price < 10 ? 3 : coin.price < 1000 ? 1 : 0}
                size="sm"
              />
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Tool grid */}
        <Text variant="label" className="mb-4 block text-text-tertiary">Todas las herramientas</Text>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tools.map((tool) => {
            const inner = (
              <Card hoverable={!tool.badge} className={`p-4 h-full ${tool.badge ? "opacity-60" : ""}`}>
                <div className="flex items-start gap-3">
                  <tool.icon size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-sans text-xs font-medium text-text-primary leading-snug">
                      {tool.title}
                      {tool.badge && (
                        <span className="ml-2 font-mono text-2xs text-text-tertiary bg-surface-alt px-1.5 py-0.5 rounded-[3px] border border-border-subtle">
                          {tool.badge}
                        </span>
                      )}
                    </h3>
                    <p className="text-2xs text-text-tertiary mt-1 leading-relaxed">{tool.description}</p>
                  </div>
                </div>
              </Card>
            );
            if (tool.badge) return <div key={tool.title}>{inner}</div>;
            return <Link key={tool.title} href={tool.href}>{inner}</Link>;
          })}
        </div>
      </div>
    </PageContainer>
  );
}
