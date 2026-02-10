"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useExchanges } from "@/lib/hooks/use-exchanges";
import { useCryptoPrices } from "@/lib/hooks/use-crypto-prices";
import { ChevronDown } from "lucide-react";

const fiatOptions = [
  { code: "ves", label: "VES" },
  { code: "ars", label: "ARS" },
  { code: "bob", label: "BOB" },
  { code: "cop", label: "COP" },
  { code: "mxn", label: "MXN" },
  { code: "clp", label: "CLP" },
  { code: "brl", label: "BRL" },
  { code: "uyu", label: "UYU" },
  { code: "usd", label: "USD" },
];

export default function ExchangesPage() {
  const [crypto, setCrypto] = useState("btc");
  const [fiat, setFiat] = useState("ves");

  const { prices } = useCryptoPrices();
  const { exchanges, isLoading } = useExchanges(crypto, fiat);

  const cryptoOptions = [
    ...prices.slice(0, 3).map((p) => ({
      symbol: p.symbol.toLowerCase(),
      label: p.symbol,
    })),
    { symbol: "usdt", label: "USDT" },
  ];

  const bestAsk = exchanges.length > 0 ? exchanges[0].btcUsd : null;

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="label" className="mb-2 block text-text-tertiary">Herramientas</Text>
        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-8">
          Comparador de Exchanges
        </h1>

        {/* Filters */}
        <Card className="p-5 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <select
                value={crypto}
                onChange={(e) => setCrypto(e.target.value)}
                className="appearance-none bg-bg border border-border rounded-[4px] px-3 py-2 pr-8 font-mono text-xs text-text-primary min-h-[44px] cursor-pointer"
              >
                {cryptoOptions.map((c) => (
                  <option key={c.symbol} value={c.symbol}>{c.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
            <span className="text-text-tertiary">&rarr;</span>
            <div className="relative">
              <select
                value={fiat}
                onChange={(e) => setFiat(e.target.value)}
                className="appearance-none bg-bg border border-border rounded-[4px] px-3 py-2 pr-8 font-mono text-xs text-text-primary min-h-[44px] cursor-pointer"
              >
                {fiatOptions.map((f) => (
                  <option key={f.code} value={f.code}>{f.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <p className="font-mono text-2xs text-text-tertiary">Cargando exchanges...</p>
          ) : exchanges.length === 0 ? (
            <p className="font-mono text-2xs text-text-tertiary">No hay datos para {crypto.toUpperCase()}/{fiat.toUpperCase()}</p>
          ) : (
            <div className="space-y-0">
              {/* Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
                <span className="font-mono text-2xs text-text-tertiary flex-1">Exchange</span>
                <span className="font-mono text-2xs text-text-tertiary w-[100px] text-right">Precio</span>
                <span className="font-mono text-2xs text-text-tertiary w-[70px] text-right">Spread</span>
              </div>
              {exchanges.map((ex, i) => {
                const isBest = ex.btcUsd === bestAsk;
                return (
                  <div
                    key={ex.name}
                    className={`flex items-center gap-2 py-2.5 ${i < exchanges.length - 1 ? "border-b border-border-subtle" : ""}`}
                  >
                    <span className="font-sans text-xs text-text-secondary flex-1">
                      {isBest && <span className="text-positive mr-1">&#9679;</span>}
                      {ex.name}
                    </span>
                    <span className={`font-mono text-xs w-[100px] text-right ${isBest ? "text-positive font-semibold" : "text-text-primary"}`}>
                      {formatPrice(ex.btcUsd, ex.btcUsd < 100 ? 4 : ex.btcUsd < 1000 ? 2 : 0)}
                    </span>
                    <span className="font-mono text-2xs text-text-tertiary w-[70px] text-right">
                      {ex.spread.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <p className="font-mono text-2xs text-text-tertiary mt-4">
            Datos de CriptoYa. Se actualiza cada 30 min. Ordenado por precio de compra (ask) menor.
          </p>
        </Card>

        <Separator className="my-8" />

        {/* Info */}
        <section>
          <Text variant="label" className="mb-3 block text-text-tertiary">Sobre el Comparador</Text>
          <p className="text-xs text-text-secondary leading-relaxed">
            Compara precios de compra y venta de {crypto.toUpperCase()} entre los principales exchanges y plataformas P2P disponibles
            en {fiat.toUpperCase()}. El spread indica la diferencia porcentual entre el precio de compra (ask) y venta (bid) de cada exchange.
            Un spread menor significa menores costos de transacci&oacute;n.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
