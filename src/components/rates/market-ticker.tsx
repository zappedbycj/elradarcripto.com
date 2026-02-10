"use client";

import { useCryptoPrices } from "@/lib/hooks/use-crypto-prices";
import { PriceDisplay } from "@/components/ui/price-display";
import { Sparkline } from "@/components/ui/sparkline";
import { Text } from "@/components/ui/text";


export function MarketTicker() {
  const { prices, isLoading } = useCryptoPrices();

  return (
    <section>
      <Text variant="label" className="mb-4 block text-text-tertiary">Mercados</Text>
      <div className="space-y-3">
        {prices.slice(0, 4).map((coin) => (
          <div key={coin.symbol} className="flex items-center gap-4">
            <span className="font-mono text-xs text-text-secondary w-10">{coin.symbol}</span>
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
  );
}
