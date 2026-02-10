export interface CryptoPrice {
  symbol: string;
  name: string;
  price: number;
  delta24h: number;
  sparkline: number[];
}

export const mockPrices: CryptoPrice[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 97234,
    delta24h: 2.3,
    sparkline: [94200, 94800, 95100, 94600, 95500, 96200, 96800, 97100, 96900, 97234],
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 2641,
    delta24h: -1.1,
    sparkline: [2710, 2690, 2680, 2660, 2670, 2650, 2640, 2655, 2648, 2641],
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 142.5,
    delta24h: 4.2,
    sparkline: [134, 135, 136, 137, 138, 139, 140, 141, 141.5, 142.5],
  },
  {
    symbol: "BNB",
    name: "BNB",
    price: 612.8,
    delta24h: 0.8,
    sparkline: [605, 607, 608, 610, 609, 611, 610, 612, 611, 612.8],
  },
  {
    symbol: "XRP",
    name: "XRP",
    price: 2.41,
    delta24h: -0.5,
    sparkline: [2.45, 2.44, 2.43, 2.42, 2.43, 2.42, 2.41, 2.42, 2.41, 2.41],
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.742,
    delta24h: 1.6,
    sparkline: [0.72, 0.725, 0.73, 0.728, 0.735, 0.738, 0.74, 0.739, 0.741, 0.742],
  },
];
