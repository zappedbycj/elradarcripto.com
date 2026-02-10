import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Metodología — Cómo Obtenemos los Datos",
  description: "Fuentes de datos, frecuencia de actualización y metodología de las herramientas y noticias de Radar Cripto.",
  alternates: { canonical: "https://elradarcripto.com/metodologia" },
};

export default function MetodologiaPage() {
  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="h2" className="mb-2">Metodología</Text>
        <p className="text-xs text-text-tertiary mb-8">
          Cómo obtenemos, procesamos y mostramos los datos en Radar Cripto.
        </p>

        <div className="space-y-8">
          <section>
            <h3 className="font-sans text-sm font-medium text-text-primary mb-3">Precios de criptomonedas</h3>
            <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Fuente:</strong> CoinGecko API</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Frecuencia:</strong> Cada 60 segundos</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Activos:</strong> BTC, ETH, SOL, BNB, XRP, ADA</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Datos:</strong> Precio USD, variación 24h, sparkline 7 días</span>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="font-sans text-sm font-medium text-text-primary mb-3">Tasas de dólar paralelo</h3>
            <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Fuente:</strong> CriptoYa API y agregadores locales</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Frecuencia:</strong> Cada 15-30 minutos según país</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Países:</strong> Venezuela, Argentina, Bolivia, Colombia, Cuba, Brasil, Perú, Chile, México</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Datos:</strong> Tasa paralelo, tasa oficial, spread porcentual</span>
              </div>
              <p className="text-xs text-text-tertiary mt-2">
                Las tasas paralelo reflejan el precio promedio del mercado informal según las fuentes agregadoras. Pueden variar respecto al precio que encuentres en la calle o en plataformas P2P.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="font-sans text-sm font-medium text-text-primary mb-3">Comparador de exchanges</h3>
            <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Fuente:</strong> CriptoYa Exchange API</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Exchanges:</strong> Binance, Kraken, Coinbase, OKX, Binance P2P</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Datos:</strong> Precio ask (compra), spread vs mejor precio</span>
              </div>
              <p className="text-xs text-text-tertiary mt-2">
                Los precios no incluyen comisiones de la plataforma ni fees de red. El precio final de compra puede variar.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="font-sans text-sm font-medium text-text-primary mb-3">Noticias</h3>
            <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Fuentes:</strong> Medios internacionales de criptomonedas (Cointelegraph, CoinDesk, The Block, etc.)</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Frecuencia:</strong> Publicación continua, varias veces al día</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Proceso editorial:</strong> Cada artículo es analizado por un director editorial que extrae datos verificados, fuentes nombradas y métricas clave. Un redactor produce el artículo final en español con enfoque LATAM.</span>
              </div>
              <div className="flex gap-2">
                <span className="text-accent flex-shrink-0">{'>'}</span>
                <span><strong className="text-text-primary font-medium">Criterios de calidad:</strong> Solo publicamos noticias con datos numéricos verificables o fuentes nombradas. Las noticias sin datos concretos son descartadas automáticamente.</span>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="font-sans text-sm font-medium text-text-primary mb-3">Calculadoras</h3>
            <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
              <p>
                Las herramientas de cálculo (convertidor, spread, ganancia) usan los datos de mercado en tiempo real descritos arriba. Los resultados son estimaciones que no incluyen:
              </p>
              <ul className="space-y-1 ml-4 text-xs text-text-tertiary">
                <li>Comisiones del exchange (0.1% - 1% típico)</li>
                <li>Fees de red (gas fees, withdrawal fees)</li>
                <li>Slippage en órdenes grandes</li>
                <li>Impuestos aplicables en tu jurisdicción</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
