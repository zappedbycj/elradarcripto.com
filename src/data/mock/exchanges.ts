export interface ExchangePrice {
  name: string;
  btcUsd: number;
  btcLocal: number;
  currency: string;
  spread: number;
}

export const mockExchanges: ExchangePrice[] = [
  { name: "Binance", btcUsd: 97234, btcLocal: 7587234.5, currency: "VES", spread: 0.1 },
  { name: "Kraken", btcUsd: 97198.5, btcLocal: 7584468.3, currency: "VES", spread: 0.15 },
  { name: "Coinbase", btcUsd: 97250, btcLocal: 7588485, currency: "VES", spread: 0.08 },
  { name: "OKX", btcUsd: 97180, btcLocal: 7583024, currency: "VES", spread: 0.12 },
  { name: "Binance P2P", btcUsd: 97500, btcLocal: 7610250, currency: "VES", spread: 0.35 },
];
