"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCryptoPrices } from "@/lib/hooks/use-crypto-prices";
import { ChevronDown } from "lucide-react";

type Mode = "unica" | "periodica";

export default function GananciaPage() {
  const { prices } = useCryptoPrices();
  const cryptoOptions = prices.slice(0, 3);

  const [cryptoIdx, setCryptoIdx] = useState(0);
  const [mode, setMode] = useState<Mode>("unica");
  const [investment, setInvestment] = useState("1000");
  const [buyPriceStr, setBuyPriceStr] = useState("");

  // Periodic (DCA) fields
  const [dcaAmount, setDcaAmount] = useState("100");
  const [dcaPeriods, setDcaPeriods] = useState("12");
  const [dcaAvgPrice, setDcaAvgPrice] = useState("");

  const coin = cryptoOptions[cryptoIdx] ?? cryptoOptions[0];
  const currentPrice = coin?.price ?? 0;

  // Single purchase calc
  const lumpInvest = parseFloat(investment) || 0;
  const lumpBuyPrice = parseFloat(buyPriceStr) || 0;
  const lumpCoins = lumpBuyPrice > 0 ? lumpInvest / lumpBuyPrice : 0;
  const lumpCurrentValue = lumpCoins * currentPrice;
  const lumpPnl = lumpCurrentValue - lumpInvest;
  const lumpRoi = lumpInvest > 0 ? (lumpPnl / lumpInvest) * 100 : 0;

  // Periodic (DCA) calc
  const dcaAmt = parseFloat(dcaAmount) || 0;
  const dcaPer = parseInt(dcaPeriods) || 0;
  const dcaAvg = parseFloat(dcaAvgPrice) || 0;
  const dcaTotalInvest = dcaAmt * dcaPer;
  const dcaCoins = dcaAvg > 0 ? dcaTotalInvest / dcaAvg : 0;
  const dcaCurrentValue = dcaCoins * currentPrice;
  const dcaPnl = dcaCurrentValue - dcaTotalInvest;
  const dcaRoi = dcaTotalInvest > 0 ? (dcaPnl / dcaTotalInvest) * 100 : 0;

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="label" className="mb-2 block text-text-tertiary">Herramientas</Text>
        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-2">
          Calculadora de Ganancia Cripto
        </h1>
        <p className="text-xs text-text-tertiary mb-8 leading-relaxed">
          Ingresa a qu&eacute; precio compraste y calcula cu&aacute;nto ganar&iacute;as (o perder&iacute;as) al precio de hoy.
        </p>

        <Card className="p-5 mb-8">
          {/* Crypto selector */}
          <div className="flex items-center gap-4 mb-5">
            <div>
              <label className="font-mono text-2xs text-text-tertiary block mb-1.5">Criptomoneda</label>
              <div className="relative">
                <select
                  value={cryptoIdx}
                  onChange={(e) => setCryptoIdx(Number(e.target.value))}
                  className="appearance-none bg-bg border border-border rounded-[4px] px-3 py-2 pr-8 font-mono text-xs text-text-primary min-h-[44px] cursor-pointer"
                >
                  {cryptoOptions.map((c, i) => (
                    <option key={c.symbol} value={i}>{c.symbol}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
              </div>
            </div>
            <div className="pt-5">
              <span className="font-mono text-xs text-text-primary">
                ${formatPrice(currentPrice, currentPrice < 100 ? 2 : 0)}
              </span>
              <span className="font-mono text-2xs text-text-tertiary ml-1">ahora</span>
            </div>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-0 mb-1 border border-border rounded-[4px] overflow-hidden w-fit">
            <button
              onClick={() => setMode("unica")}
              className={`px-4 py-2 font-mono text-2xs min-h-[36px] transition-colors ${mode === "unica" ? "bg-accent text-white" : "bg-bg text-text-secondary hover:bg-surface"}`}
            >
              Compra &uacute;nica
            </button>
            <button
              onClick={() => setMode("periodica")}
              className={`px-4 py-2 font-mono text-2xs min-h-[36px] transition-colors ${mode === "periodica" ? "bg-accent text-white" : "bg-bg text-text-secondary hover:bg-surface"}`}
            >
              Compras peri&oacute;dicas
            </button>
          </div>
          <p className="font-mono text-2xs text-text-tertiary mb-5">
            {mode === "unica"
              ? "Compraste todo de una vez"
              : "Compraste un monto fijo cada semana o mes (DCA)"}
          </p>

          {mode === "unica" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                    &iquest;Cu&aacute;nto invertiste?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-tertiary">$</span>
                    <Input mono type="number" value={investment} onChange={(e) => setInvestment(e.target.value)} min="0" step="any" className="w-full pl-7" />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                    &iquest;A qu&eacute; precio compraste?
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-tertiary">$</span>
                    <Input mono type="number" value={buyPriceStr} onChange={(e) => setBuyPriceStr(e.target.value)} min="0" step="any" placeholder={`ej. ${formatPrice(currentPrice * 0.7, 0)}`} className="w-full pl-7" />
                  </div>
                </div>
              </div>

              {lumpBuyPrice > 0 && lumpInvest > 0 && (
                <>
                  <Separator className="my-4" />
                  {/* Big result */}
                  <div className="text-center py-2">
                    <p className="font-mono text-2xs text-text-tertiary mb-1">
                      {lumpPnl >= 0 ? "Ganancia" : "P\u00e9rdida"}
                    </p>
                    <p className={`font-mono text-2xl font-bold ${lumpPnl >= 0 ? "text-positive" : "text-negative"}`}>
                      {lumpPnl >= 0 ? "+" : "-"}${formatPrice(Math.abs(lumpPnl), 2)}
                    </p>
                    <p className={`font-mono text-sm ${lumpRoi >= 0 ? "text-positive" : "text-negative"}`}>
                      {lumpRoi >= 0 ? "+" : ""}{lumpRoi.toFixed(1)}%
                    </p>
                  </div>

                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-2xs text-text-tertiary">{coin.symbol} que tendr&iacute;as</span>
                      <span className="font-mono text-xs text-text-primary">{lumpCoins.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-2xs text-text-tertiary">Invertiste</span>
                      <span className="font-mono text-xs text-text-secondary">${formatPrice(lumpInvest, 2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-2xs text-text-tertiary">Valor hoy</span>
                      <span className="font-mono text-xs text-text-primary">${formatPrice(lumpCurrentValue, 2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                    Monto cada vez
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-tertiary">$</span>
                    <Input mono type="number" value={dcaAmount} onChange={(e) => setDcaAmount(e.target.value)} min="0" step="any" className="w-full pl-7" />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                    &iquest;Cu&aacute;ntas veces?
                  </label>
                  <Input mono type="number" value={dcaPeriods} onChange={(e) => setDcaPeriods(e.target.value)} min="1" step="1" className="w-full" />
                </div>
                <div>
                  <label className="font-mono text-2xs text-text-tertiary block mb-1.5">
                    Precio prom.
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-text-tertiary">$</span>
                    <Input mono type="number" value={dcaAvgPrice} onChange={(e) => setDcaAvgPrice(e.target.value)} min="0" step="any" placeholder={`ej. ${formatPrice(currentPrice * 0.85, 0)}`} className="w-full pl-7" />
                  </div>
                </div>
              </div>
              <p className="font-mono text-2xs text-text-tertiary">
                Ej: $100 cada mes &times; 12 meses = ${formatPrice(dcaTotalInvest, 0)} invertidos en total
              </p>

              {dcaAvg > 0 && dcaTotalInvest > 0 && (
                <>
                  <Separator className="my-4" />
                  {/* Big result */}
                  <div className="text-center py-2">
                    <p className="font-mono text-2xs text-text-tertiary mb-1">
                      {dcaPnl >= 0 ? "Ganancia" : "P\u00e9rdida"}
                    </p>
                    <p className={`font-mono text-2xl font-bold ${dcaPnl >= 0 ? "text-positive" : "text-negative"}`}>
                      {dcaPnl >= 0 ? "+" : "-"}${formatPrice(Math.abs(dcaPnl), 2)}
                    </p>
                    <p className={`font-mono text-sm ${dcaRoi >= 0 ? "text-positive" : "text-negative"}`}>
                      {dcaRoi >= 0 ? "+" : ""}{dcaRoi.toFixed(1)}% retorno
                    </p>
                  </div>

                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-2xs text-text-tertiary">Total invertido</span>
                      <span className="font-mono text-xs text-text-secondary">${formatPrice(dcaTotalInvest, 2)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-2xs text-text-tertiary">{coin.symbol} acumulados</span>
                      <span className="font-mono text-xs text-text-primary">{dcaCoins.toFixed(6)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-2xs text-text-tertiary">Valor hoy</span>
                      <span className="font-mono text-xs text-text-primary">${formatPrice(dcaCurrentValue, 2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          <p className="font-mono text-2xs text-text-tertiary mt-5">
            Precio actual en tiempo real. El precio de compra lo ingresas t&uacute; (simulaci&oacute;n, no datos hist&oacute;ricos).
          </p>
        </Card>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-3 block text-text-tertiary">&iquest;C&oacute;mo funciona?</Text>
          <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
            <p>
              <strong>Compra &uacute;nica:</strong> Imagina que compraste $1,000 de Bitcoin cuando estaba a $60,000.
              Habr&iacute;as obtenido 0.01667 BTC. Si hoy vale $97,000, tus 0.01667 BTC valen $1,616 &mdash; una ganancia de $616 (+61.6%).
            </p>
            <p>
              <strong>Compras peri&oacute;dicas (DCA):</strong> En vez de comprar todo de una vez, compras un monto fijo
              cada semana o mes. Esto suaviza el efecto de la volatilidad. Ingresa cu&aacute;nto compraste cada vez,
              cu&aacute;ntas veces lo hiciste, y el precio promedio al que te toc&oacute; comprar.
            </p>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
