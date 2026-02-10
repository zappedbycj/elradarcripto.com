"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useRates } from "@/lib/hooks/use-rates";
import { ChevronDown } from "lucide-react";

export default function SpreadPage() {
  const { rates } = useRates();
  const [countryIdx, setCountryIdx] = useState(-1); // -1 = manual
  const [buyPrice, setBuyPrice] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [convertAmount, setConvertAmount] = useState("1000");

  // Auto-fill from country
  const selectedRate = countryIdx >= 0 ? rates[countryIdx] : null;
  const buy = selectedRate ? selectedRate.official : parseFloat(buyPrice) || 0;
  const sell = selectedRate ? selectedRate.parallel : parseFloat(sellPrice) || 0;

  const mid = (buy + sell) / 2;
  const spreadPct = mid > 0 ? ((sell - buy) / buy) * 100 : 0;
  const absDiff = sell - buy;
  const amount = parseFloat(convertAmount) || 0;
  const lossPerUnit = mid > 0 ? absDiff / sell : 0;
  const lossTotal = amount * lossPerUnit;

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="label" className="mb-2 block text-text-tertiary">Herramientas</Text>
        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-8">
          Calculadora de Spread
        </h1>

        <Card className="p-5 mb-8">
          {/* Country selector */}
          <div className="mb-5">
            <label className="font-mono text-2xs text-text-tertiary block mb-1.5">Auto-rellenar desde pa&iacute;s</label>
            <div className="relative">
              <select
                value={countryIdx}
                onChange={(e) => {
                  const idx = Number(e.target.value);
                  setCountryIdx(idx);
                  if (idx >= 0 && rates[idx]) {
                    setBuyPrice(String(rates[idx].official));
                    setSellPrice(String(rates[idx].parallel));
                  }
                }}
                className="appearance-none bg-bg border border-border rounded-[4px] px-3 py-2 pr-8 font-mono text-xs text-text-primary min-h-[44px] cursor-pointer w-full"
              >
                <option value={-1}>Manual</option>
                {rates.map((r, i) => (
                  <option key={r.code} value={i}>{r.flag} {r.country} ({r.code})</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
          </div>

          {/* Price inputs */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                {selectedRate ? "Tasa oficial" : "Precio de compra"}
              </label>
              <Input
                mono
                type="number"
                value={selectedRate ? String(buy) : buyPrice}
                onChange={(e) => { setCountryIdx(-1); setBuyPrice(e.target.value); }}
                min="0"
                step="any"
                className="w-full"
              />
            </div>
            <div>
              <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                {selectedRate ? "Tasa paralelo" : "Precio de venta"}
              </label>
              <Input
                mono
                type="number"
                value={selectedRate ? String(sell) : sellPrice}
                onChange={(e) => { setCountryIdx(-1); setSellPrice(e.target.value); }}
                min="0"
                step="any"
                className="w-full"
              />
            </div>
          </div>

          <Separator className="my-5" />

          {/* Results */}
          {buy > 0 && sell > 0 ? (
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-2xs text-text-tertiary">Spread</span>
                <span className={`font-mono text-base font-semibold ${spreadPct > 20 ? "text-negative" : spreadPct > 5 ? "text-warning" : "text-positive"}`}>
                  {spreadPct.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-2xs text-text-tertiary">Diferencia absoluta</span>
                <span className="font-mono text-sm text-text-primary">{formatPrice(absDiff, 2)}</span>
              </div>

              <Separator className="my-4" />

              {/* Cost simulation */}
              <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                Si conviertes (USD)
              </label>
              <Input
                mono
                type="number"
                value={convertAmount}
                onChange={(e) => setConvertAmount(e.target.value)}
                min="0"
                step="any"
                className="max-w-[160px] mb-3"
              />
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-2xs text-text-tertiary">Costo efectivo del spread</span>
                <span className="font-mono text-sm font-semibold text-negative">
                  ${formatPrice(lossTotal, 2)} USD
                </span>
              </div>
            </div>
          ) : (
            <p className="font-mono text-2xs text-text-tertiary">Ingresa dos precios para calcular el spread.</p>
          )}
        </Card>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-3 block text-text-tertiary">Sobre el Spread</Text>
          <p className="text-xs text-text-secondary leading-relaxed">
            El spread es la diferencia porcentual entre dos precios (compra/venta, oficial/paralelo).
            Un spread alto significa mayor costo de conversi&oacute;n. En pa&iacute;ses con controles cambiarios,
            el spread entre tasa oficial y paralela puede superar el 100%.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
