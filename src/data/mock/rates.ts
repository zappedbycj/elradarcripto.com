export interface CountryRate {
  country: string;
  code: string;
  flag: string;
  currency: string;
  parallel: number;
  official: number;
  delta24h: number;
}

export const mockRates: CountryRate[] = [
  { country: "Venezuela", code: "VES", flag: "🇻🇪", currency: "Bs", parallel: 78.5, official: 36.6, delta24h: 0.4 },
  { country: "Argentina", code: "ARS", flag: "🇦🇷", currency: "$", parallel: 1245, official: 1065, delta24h: 1.2 },
  { country: "Bolivia", code: "BOB", flag: "🇧🇴", currency: "Bs", parallel: 14.2, official: 6.96, delta24h: -0.1 },
  { country: "Colombia", code: "COP", flag: "🇨🇴", currency: "$", parallel: 4380, official: 4320, delta24h: 0.3 },
  { country: "Perú", code: "PEN", flag: "🇵🇪", currency: "S/", parallel: 3.78, official: 3.75, delta24h: -0.2 },
  { country: "México", code: "MXN", flag: "🇲🇽", currency: "$", parallel: 17.45, official: 17.38, delta24h: 0.1 },
  { country: "Chile", code: "CLP", flag: "🇨🇱", currency: "$", parallel: 978, official: 970, delta24h: -0.4 },
  { country: "Brasil", code: "BRL", flag: "🇧🇷", currency: "R$", parallel: 5.92, official: 5.88, delta24h: 0.6 },
  { country: "Uruguay", code: "UYU", flag: "🇺🇾", currency: "$", parallel: 42.8, official: 42.5, delta24h: 0.2 },
];
