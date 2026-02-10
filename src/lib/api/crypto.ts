import type { CryptoPrice } from "@/data/mock/prices";

const API_URL = "https://api.freecryptoapi.com/v1/getData";
const API_KEY = "idw8clya42zvjzbm36gr";

const COINS = [
  { symbol: "BTC", name: "Bitcoin" },
  { symbol: "ETH", name: "Ethereum" },
  { symbol: "SOL", name: "Solana" },
  { symbol: "BNB", name: "BNB" },
  { symbol: "XRP", name: "XRP" },
  { symbol: "ADA", name: "Cardano" },
] as const;

interface FreeCryptoResponse {
  status: string;
  symbols: Array<{
    symbol: string;
    last: number;
    lowest: number;
    highest: number;
    daily_change_percentage: number;
    date: string;
  }>;
}

export async function fetchCryptoPrices(): Promise<CryptoPrice[]> {
  const results = await Promise.all(
    COINS.map(async (coin) => {
      const res = await fetch(`${API_URL}?symbol=${coin.symbol}`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      if (!res.ok) throw new Error(`FreeCryptoAPI error: ${res.status}`);
      const data: FreeCryptoResponse = await res.json();
      const s = data.symbols?.[0];
      if (!s) throw new Error(`No data for ${coin.symbol}`);
      return {
        symbol: coin.symbol,
        name: coin.name,
        price: Number(s.last) || 0,
        delta24h: Number(s.daily_change_percentage) || 0,
        sparkline: [] as number[], // not available on free tier
      };
    })
  );
  return results;
}
