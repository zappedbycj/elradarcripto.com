import { fetchCryptoPrices } from "@/lib/api/crypto";

interface LivePriceWidgetProps {
  ticker: string | null;
}

export async function LivePriceWidget({ ticker }: LivePriceWidgetProps) {
  if (!ticker) return null;

  const symbol = ticker.toUpperCase();

  try {
    const prices = await fetchCryptoPrices();
    const coin = prices.find((p) => p.symbol === symbol);
    if (!coin) return null;

    const isPositive = coin.delta24h >= 0;

    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface border border-border font-mono text-2xs">
        <span className="text-text-secondary">{coin.symbol}</span>
        <span className="text-text-primary font-semibold">
          ${coin.price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
        </span>
        <span className={isPositive ? "text-green-400" : "text-red-400"}>
          {isPositive ? "+" : ""}
          {coin.delta24h.toFixed(2)}%
        </span>
      </div>
    );
  } catch {
    return null;
  }
}
