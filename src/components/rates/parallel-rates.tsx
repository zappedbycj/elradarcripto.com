"use client";

import { useState } from "react";
import { useRates } from "@/lib/hooks/use-rates";
import { PriceDisplay } from "@/components/ui/price-display";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";

export function ParallelRates() {
  const [expanded, setExpanded] = useState(false);
  const { rates } = useRates();
  const visible = expanded ? rates : rates.slice(0, 3);

  return (
    <section>
      <Text variant="label" className="mb-4 block text-text-tertiary">Dólar Paralelo</Text>
      <div className="space-y-3">
        {visible.map((rate) => (
          <div key={rate.code} className="flex items-center gap-4">
            <span className="text-base">{rate.flag}</span>
            <span className="font-sans text-xs text-text-secondary w-24">{rate.country}</span>
            <PriceDisplay
              value={rate.parallel}
              delta={rate.delta24h}
              prefix={`${rate.currency} `}
              decimals={rate.parallel < 100 ? 2 : 0}
              size="md"
            />
            <span className="font-mono text-2xs text-text-tertiary ml-auto">
              Oficial: {rate.currency} {rate.official.toLocaleString("es-419")}
            </span>
          </div>
        ))}
      </div>
      {!expanded && rates.length > 3 && (
        <button
          onClick={() => setExpanded(true)}
          className={cn(
            "mt-3 font-mono text-2xs text-accent hover:text-accent/80 transition-colors duration-150",
            "min-h-[44px] flex items-center"
          )}
        >
          + {rates.length - 3} más
        </button>
      )}
    </section>
  );
}
