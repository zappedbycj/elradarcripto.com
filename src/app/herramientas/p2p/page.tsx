"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCryptoPrices } from "@/lib/hooks/use-crypto-prices";
import { useRates } from "@/lib/hooks/use-rates";
import { useExchanges } from "@/lib/hooks/use-exchanges";
import { ChevronDown } from "lucide-react";

const fiatOptions = [
  { code: "VES", name: "Bolívar" },
  { code: "ARS", name: "Peso argentino" },
  { code: "BOB", name: "Boliviano" },
  { code: "COP", name: "Peso colombiano" },
  { code: "MXN", name: "Peso mexicano" },
  { code: "CLP", name: "Peso chileno" },
  { code: "BRL", name: "Real brasileño" },
  { code: "UYU", name: "Peso uruguayo" },
];

const faqItems = [
  {
    q: "¿Cómo comprar Bitcoin con bolívares?",
    a: "La forma más común es a través de plataformas P2P como Binance P2P u OKX P2P. Publicas una orden de compra, un vendedor acepta, transfieres bolívares por banco o pago móvil, y recibes BTC en tu wallet.",
  },
  {
    q: "¿Qué es Binance P2P?",
    a: "Binance P2P es un mercado peer-to-peer dentro de Binance donde compradores y vendedores negocian directamente el precio de criptomonedas en moneda local. Binance actúa como intermediario con un sistema de escrow para proteger ambas partes.",
  },
  {
    q: "¿Cuál P2P tiene mejor precio?",
    a: "Depende del momento y la moneda local. Generalmente Binance P2P tiene más liquidez y mejores precios para VES y ARS. OKX P2P puede ofrecer mejores tasas en COP y MXN. Compara siempre antes de operar.",
  },
  {
    q: "¿Es seguro comprar cripto P2P?",
    a: "Sí, siempre que uses plataformas con sistema de escrow como Binance P2P u OKX P2P. Nunca envíes dinero fuera de la plataforma y verifica la reputación del vendedor antes de operar.",
  },
];

export default function P2PConverterPage() {
  const [amount, setAmount] = useState("100000");
  const [fiatIdx, setFiatIdx] = useState(0);
  const [cryptoIdx, setCryptoIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { prices } = useCryptoPrices();
  const { rates } = useRates();

  const cryptoOptions = prices.slice(0, 3).map((p) => ({
    symbol: p.symbol,
    name: p.name,
    price: p.price,
  }));

  const fiat = fiatOptions[fiatIdx] ?? fiatOptions[0];
  const crypto = cryptoOptions[cryptoIdx] ?? cryptoOptions[0];

  const rate = rates.find((r) => r.code === fiat.code);
  const parallelRate = rate?.parallel ?? 0;
  const officialRate = rate?.official ?? 0;
  const p2pRate = parallelRate * 0.985;

  const exchangeFiat = fiat.code.toLowerCase();
  const { exchanges } = useExchanges(crypto?.symbol ?? "btc", exchangeFiat);

  // Filter P2P exchanges
  const p2pExchanges = exchanges.filter(
    (ex) => ex.name.toLowerCase().includes("p2p")
  );

  const numAmount = parseFloat(amount) || 0;

  // Inverse math: fiat → USD → crypto
  const calcCrypto = (fiatRate: number) => {
    if (!fiatRate || !crypto?.price) return 0;
    const usd = numAmount / fiatRate;
    return usd / crypto.price;
  };

  const results = [
    { label: "Paralelo", rate: parallelRate, crypto: calcCrypto(parallelRate) },
    { label: "Oficial", rate: officialRate, crypto: calcCrypto(officialRate) },
    { label: "Binance P2P", rate: p2pRate, crypto: calcCrypto(p2pRate) },
  ].filter((r) => r.rate > 0);

  // Best deal = most crypto
  const bestIdx = results.reduce(
    (best, r, i) => (r.crypto > (results[best]?.crypto ?? 0) ? i : best),
    0
  );

  // Format crypto amount with appropriate decimals
  const fmtCrypto = (val: number) => {
    if (val === 0) return "0";
    if (val >= 1) return val.toFixed(4);
    if (val >= 0.001) return val.toFixed(6);
    return val.toFixed(8);
  };

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="label" className="mb-2 block text-text-tertiary">Herramientas</Text>
        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-2">
          Conversor P2P — Fiat a Cripto
        </h1>
        <p className="font-sans text-sm text-text-secondary mb-8">
          Calcula cuánto {crypto?.name ?? "Bitcoin"} puedes comprar con {fiat.name}s
        </p>

        {/* Converter card */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <Input
              mono
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="max-w-[160px] text-base"
              min="0"
              step="any"
            />
            <div className="relative">
              <select
                value={fiatIdx}
                onChange={(e) => setFiatIdx(Number(e.target.value))}
                className="appearance-none bg-bg border border-border rounded-[4px] px-3 py-2 pr-8 font-mono text-xs text-text-primary min-h-[44px] cursor-pointer"
              >
                {fiatOptions.map((f, i) => (
                  <option key={f.code} value={i}>{f.code}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
            <span className="text-text-tertiary">&rarr;</span>
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

          {/* Results */}
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={r.label} className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-text-tertiary flex items-center gap-2">
                  {r.label}
                  {i === bestIdx && (
                    <span className="text-2xs font-sans px-1.5 py-0.5 rounded bg-green-500/10 text-green-400">
                      Mejor tasa
                    </span>
                  )}
                </span>
                <span className={`font-mono text-text-primary ${i === bestIdx ? "text-base font-semibold" : "text-sm"}`}>
                  {fmtCrypto(r.crypto)} {crypto?.symbol}
                </span>
              </div>
            ))}
          </div>

          {/* USD equivalent */}
          {parallelRate > 0 && (
            <p className="font-mono text-2xs text-text-tertiary mt-4">
              {formatPrice(numAmount, 0)} {fiat.code} &asymp; {formatPrice(numAmount / parallelRate, 2)} USD (paralelo)
            </p>
          )}
        </Card>

        {/* P2P Exchange table */}
        <section className="mb-8">
          <Text variant="label" className="mb-4 block text-text-tertiary">Precios P2P por Exchange</Text>
          {p2pExchanges.length > 0 ? (
            <div className="space-y-3">
              {p2pExchanges.map((ex) => {
                const cryptoForExchange = ex.btcLocal > 0 && crypto?.price
                  ? numAmount / ex.btcLocal
                  : 0;
                return (
                  <div key={ex.name} className="flex items-center justify-between">
                    <span className="font-sans text-xs text-text-secondary">{ex.name}</span>
                    <div className="text-right">
                      <span className="font-mono text-xs text-text-primary block">
                        {formatPrice(ex.btcLocal, ex.btcLocal < 1000 ? 2 : 0)} {ex.currency}/{crypto?.symbol}
                      </span>
                      {cryptoForExchange > 0 && (
                        <span className="font-mono text-2xs text-text-tertiary">
                          = {fmtCrypto(cryptoForExchange)} {crypto?.symbol}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              {exchanges.map((ex) => (
                <div key={ex.name} className="flex items-center justify-between">
                  <span className="font-sans text-xs text-text-secondary">{ex.name}</span>
                  <span className="font-mono text-xs text-text-primary">
                    {formatPrice(ex.btcUsd, ex.btcUsd < 1000 ? 2 : 0)} {ex.currency}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <Separator className="my-8" />

        {/* FAQ */}
        <section className="mb-8">
          <Text variant="label" className="mb-4 block text-text-tertiary">Preguntas Frecuentes</Text>
          <div className="space-y-2">
            {faqItems.map((item, i) => (
              <div key={i} className="border border-border rounded-[6px]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-4 py-3 flex items-center justify-between min-h-[44px]"
                >
                  <span className="font-sans text-xs text-text-primary">{item.q}</span>
                  <ChevronDown
                    size={14}
                    className={`text-text-tertiary transition-transform duration-200 flex-shrink-0 ml-2 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-3">
                    <p className="text-xs text-text-secondary leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}
