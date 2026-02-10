import type { ExchangePrice } from "@/data/mock/exchanges";

interface CriptoYaResponse {
  [exchange: string]: {
    ask: number;
    totalAsk?: number;
    bid: number;
    totalBid?: number;
    time: number;
  };
}

export async function fetchExchanges(
  crypto: string = "btc",
  fiat: string = "usd"
): Promise<ExchangePrice[]> {
  const res = await fetch(`https://criptoya.com/api/${crypto.toLowerCase()}/${fiat.toLowerCase()}`);
  if (!res.ok) throw new Error(`CriptoYa error: ${res.status}`);
  const data: CriptoYaResponse = await res.json();

  return Object.entries(data)
    .filter(([, v]) => typeof v === "object" && v.ask > 0 && v.bid > 0)
    .map(([name, d]) => {
      const mid = (d.ask + d.bid) / 2;
      const spread = ((d.ask - d.bid) / mid) * 100;
      return {
        name: formatName(name),
        btcUsd: d.ask,
        btcLocal: d.ask,
        currency: fiat.toUpperCase(),
        spread: Math.round(spread * 100) / 100,
      };
    })
    .sort((a, b) => a.btcUsd - b.btcUsd)
    .slice(0, 8);
}

function formatName(key: string): string {
  const names: Record<string, string> = {
    binancep2p: "Binance P2P",
    okexp2p: "OKX P2P",
    bybitp2p: "Bybit P2P",
    bitgetp2p: "Bitget P2P",
    mexcp2p: "MEXC P2P",
    satoshitango: "SatoshiTango",
    ripio: "Ripio",
    buenbit: "Buenbit",
    letsbit: "Let's Bit",
    decrypto: "Decrypto",
    tiendacrypto: "Tienda Crypto",
    fiwind: "Fiwind",
    lemoncash: "Lemon Cash",
    belo: "Belo",
    bitsoalpha: "Bitso",
    xapo: "Xapo",
    saldo: "Saldo",
    universalcoins: "Universal Coins",
    vitawallet: "Vita Wallet",
  };
  return names[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}
