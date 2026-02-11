"use client";

import { useState } from "react";
import Link from "next/link";
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

const faqItems = [
  {
    q: "\u00bfQu\u00e9 es el d\u00f3lar paralelo?",
    a: "El d\u00f3lar paralelo es el tipo de cambio que se establece en el mercado informal, fuera de los canales oficiales del banco central. Refleja la oferta y demanda real de divisas en cada pa\u00eds.",
  },
  {
    q: "\u00bfCon qu\u00e9 frecuencia se actualizan las tasas?",
    a: "Las tasas de criptomonedas y d\u00f3lar paralelo se actualizan cada 30 minutos desde FreeCryptoAPI, DolarAPI y CriptoYa.",
  },
  {
    q: "\u00bfCu\u00e1l es la diferencia entre tasa paralela y P2P?",
    a: "La tasa paralela refleja el mercado informal de divisas f\u00edsicas. La tasa P2P (peer-to-peer) es el precio al que se intercambian criptomonedas por moneda local en plataformas como Binance P2P.",
  },
  {
    q: "\u00bfEs legal comprar criptomonedas en Venezuela?",
    a: "S\u00ed, Venezuela permite la compra y venta de criptomonedas. Sin embargo, los exchanges deben cumplir con las regulaciones del BCV y SUNACRIP.",
  },
];

export default function ConverterPage() {
  const [amount, setAmount] = useState("1");
  const [cryptoIdx, setCryptoIdx] = useState(0);
  const [fiatIdx, setFiatIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { prices } = useCryptoPrices();
  const { rates } = useRates();

  const cryptoOptions = prices.slice(0, 3).map((p) => ({
    symbol: p.symbol,
    name: p.name,
    price: p.price,
  }));

  const fiatOptions = [
    { code: "USDT", name: "Tether (USD)" },
    { code: "VES", name: "Bolívar" },
    { code: "ARS", name: "Peso argentino" },
    { code: "BOB", name: "Boliviano" },
    { code: "COP", name: "Peso colombiano" },
    { code: "MXN", name: "Peso mexicano" },
    { code: "CLP", name: "Peso chileno" },
    { code: "BRL", name: "Real brasileño" },
    { code: "UYU", name: "Peso uruguayo" },
  ].map((f) => {
    if (f.code === "USDT") {
      return { ...f, parallel: 1, official: 1, p2p: 1 };
    }
    const r = rates.find((rate) => rate.code === f.code);
    return {
      ...f,
      parallel: r?.parallel ?? 0,
      official: r?.official ?? 0,
      p2p: (r?.parallel ?? 0) * 0.985,
    };
  });

  const crypto = cryptoOptions[cryptoIdx] ?? cryptoOptions[0];
  const fiat = fiatOptions[fiatIdx] ?? fiatOptions[0];
  const exchangeFiat = fiat?.code === "USDT" ? null : fiat?.code ?? "ves";
  const { exchanges } = useExchanges(
    crypto?.symbol ?? "btc",
    exchangeFiat ?? "usd"
  );
  const numAmount = parseFloat(amount) || 0;
  const usdValue = numAmount * (crypto?.price ?? 0);

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="label" className="mb-2 block text-text-tertiary">Herramientas</Text>
        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-8">
          Convertir {crypto?.name ?? "Bitcoin"} a {fiat?.name ?? "Bol\u00edvar"}s
        </h1>

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
              aria-label="Cantidad a convertir"
              name="convert-amount"
            />
            <div className="relative">
              <select
                value={cryptoIdx}
                onChange={(e) => setCryptoIdx(Number(e.target.value))}
                aria-label="Seleccionar criptomoneda"
                className="appearance-none bg-bg border border-border rounded-[4px] px-3 py-2 pr-8 font-mono text-xs text-text-primary min-h-[44px] cursor-pointer [&>option]:bg-bg [&>option]:text-text-primary"
              >
                {cryptoOptions.map((c, i) => (
                  <option key={c.symbol} value={i}>{c.symbol}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
            <span className="text-text-tertiary">&rarr;</span>
            <div className="relative">
              <select
                value={fiatIdx}
                onChange={(e) => setFiatIdx(Number(e.target.value))}
                aria-label="Seleccionar moneda fiat"
                className="appearance-none bg-bg border border-border rounded-[4px] px-3 py-2 pr-8 font-mono text-xs text-text-primary min-h-[44px] cursor-pointer [&>option]:bg-bg [&>option]:text-text-primary"
              >
                {fiatOptions.map((f, i) => (
                  <option key={f.code} value={i}>{f.code}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none" />
            </div>
          </div>

          {fiat.code === "USDT" ? (
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-xs text-text-tertiary">Precio</span>
              <span className="font-mono text-base font-semibold text-text-primary">
                {formatPrice(usdValue, 2)} USDT
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-text-tertiary">Paralelo</span>
                <span className="font-mono text-base font-semibold text-text-primary">
                  {formatPrice(usdValue * fiat.parallel, 2)} {fiat.code}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-text-tertiary">Oficial</span>
                <span className="font-mono text-sm text-text-secondary">
                  {formatPrice(usdValue * fiat.official, 2)} {fiat.code}
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-text-tertiary">Binance P2P</span>
                <span className="font-mono text-sm text-text-secondary">
                  {formatPrice(usdValue * fiat.p2p, 2)} {fiat.code}
                </span>
              </div>
            </div>
          )}

          <p className="font-mono text-2xs text-text-tertiary mt-4">Se actualiza cada 30 min</p>
        </Card>

        {/* Exchange comparison */}
        <section className="mb-8">
          <Text variant="label" className="mb-4 block text-text-tertiary">Tasas por Exchange</Text>
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

        <Separator className="my-8" />

        {/* Related news — links to real noticias page */}
        <section>
          <Text variant="label" className="mb-4 block text-text-tertiary">Noticias sobre {crypto?.name ?? "Bitcoin"}</Text>
          <Link
            href="/noticias"
            className="block text-sm text-accent hover:text-accent/80 transition-colors duration-150"
          >
            Ver todas las noticias &rarr;
          </Link>
        </section>
      </div>
    </PageContainer>
  );
}
