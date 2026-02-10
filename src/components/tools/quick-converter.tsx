"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { formatPrice } from "@/lib/utils";
import { useCryptoPrices } from "@/lib/hooks/use-crypto-prices";
import { useRates } from "@/lib/hooks/use-rates";

export function QuickConverter() {
  const [amount, setAmount] = useState("1");
  const { prices } = useCryptoPrices();
  const { rates } = useRates();

  const btcPrice = prices.find((p) => p.symbol === "BTC")?.price ?? 0;
  const vesRate = rates.find((r) => r.code === "VES");
  const parallelRate = vesRate?.parallel ?? 0;
  const officialRate = vesRate?.official ?? 0;

  const numAmount = parseFloat(amount) || 0;
  const usdValue = numAmount * btcPrice;
  const parallelValue = usdValue * parallelRate;
  const officialValue = usdValue * officialRate;

  return (
    <section>
      <Text variant="label" className="mb-4 block text-text-tertiary">Convertir</Text>
      <div className="flex items-center gap-3">
        <Input
          mono
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="max-w-[120px]"
          min="0"
          step="any"
        />
        <span className="font-mono text-xs text-text-secondary">BTC</span>
        <span className="text-text-tertiary">&rarr;</span>
        <span className="font-mono text-xs text-text-secondary">VES</span>
      </div>
      <div className="mt-3 space-y-1">
        <p className="font-mono text-sm text-text-primary">
          = Bs {formatPrice(parallelValue, 2)}
          <span className="text-text-tertiary text-2xs ml-2">(paralelo)</span>
        </p>
        <p className="font-mono text-xs text-text-secondary">
          = Bs {formatPrice(officialValue, 2)}
          <span className="text-text-tertiary text-2xs ml-2">(oficial)</span>
        </p>
      </div>
    </section>
  );
}
