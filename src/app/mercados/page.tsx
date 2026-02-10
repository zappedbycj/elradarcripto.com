"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { PriceDisplay } from "@/components/ui/price-display";
import { Sparkline } from "@/components/ui/sparkline";
import { Separator } from "@/components/ui/separator";
import { useCryptoPrices } from "@/lib/hooks/use-crypto-prices";
import { useRates } from "@/lib/hooks/use-rates";

export default function MercadosPage() {
  const { prices } = useCryptoPrices();
  const { rates } = useRates();

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="h2" className="mb-8">Mercados</Text>

        <section className="mb-8">
          <Text variant="label" className="mb-4 block text-text-tertiary">Criptomonedas</Text>
          <div className="space-y-3">
            {prices.map((coin) => (
              <div key={coin.symbol} className="flex items-center gap-4">
                <span className="font-mono text-xs text-text-secondary w-10">{coin.symbol}</span>
                <span className="text-xs text-text-tertiary w-20 hidden sm:block">{coin.name}</span>
                <PriceDisplay
                  value={coin.price}
                  delta={coin.delta24h}
                  decimals={coin.price < 10 ? 3 : coin.price < 1000 ? 1 : 0}
                  size="md"
                  className="w-40"
                />
                {coin.sparkline.length > 0 && (
                  <Sparkline
                    data={coin.sparkline}
                    positive={coin.delta24h >= 0}
                    width={72}
                    height={20}
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-4 block text-text-tertiary">Dólar Paralelo — Todos los países</Text>
          <div className="space-y-3">
            {rates.map((rate) => (
              <div key={rate.code} className="flex items-center gap-4">
                <span className="text-base">{rate.flag}</span>
                <span className="font-sans text-xs text-text-secondary w-24">{rate.country}</span>
                <div className="flex-1">
                  <PriceDisplay
                    value={rate.parallel}
                    delta={rate.delta24h}
                    prefix={`${rate.currency} `}
                    decimals={rate.parallel < 100 ? 2 : 0}
                    size="md"
                  />
                </div>
                <span className="font-mono text-2xs text-text-tertiary">
                  Oficial: {rate.currency} {rate.official.toLocaleString("es-419")}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
