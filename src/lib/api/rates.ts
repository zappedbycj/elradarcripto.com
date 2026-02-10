import type { CountryRate } from "@/data/mock/rates";

interface DolarApiItem {
  casa?: string;
  fuente?: string;
  moneda?: string;
  moeda?: string;
  compra?: number;
  venta?: number;
  venda?: number;
  promedio?: number;
  fechaActualizacion?: string;
}

interface CountryConfig {
  country: string;
  code: string;
  flag: string;
  currency: string;
  url: string;
  parse: (data: DolarApiItem[]) => { parallel: number; official: number };
}

const COUNTRIES: CountryConfig[] = [
  {
    country: "Venezuela",
    code: "VES",
    flag: "\u{1F1FB}\u{1F1EA}",
    currency: "Bs",
    url: "https://ve.dolarapi.com/v1/dolares",
    parse: (data) => {
      const paralelo = data.find((d) => d.fuente === "paralelo");
      const oficial = data.find((d) => d.fuente === "oficial");
      return {
        parallel: paralelo?.promedio ?? 0,
        official: oficial?.promedio ?? 0,
      };
    },
  },
  {
    country: "Argentina",
    code: "ARS",
    flag: "\u{1F1E6}\u{1F1F7}",
    currency: "$",
    url: "https://dolarapi.com/v1/dolares",
    parse: (data) => {
      const blue = data.find((d) => d.casa === "blue");
      const oficial = data.find((d) => d.casa === "oficial");
      return {
        parallel: blue?.venta ?? 0,
        official: oficial?.venta ?? 0,
      };
    },
  },
  {
    country: "Bolivia",
    code: "BOB",
    flag: "\u{1F1E7}\u{1F1F4}",
    currency: "Bs",
    url: "https://bo.dolarapi.com/v1/dolares",
    parse: (data) => {
      const binance = data.find((d) => d.casa === "binance");
      const oficial = data.find((d) => d.casa === "oficial");
      return {
        parallel: binance?.venta ?? 0,
        official: oficial?.venta ?? 0,
      };
    },
  },
  {
    country: "Colombia",
    code: "COP",
    flag: "\u{1F1E8}\u{1F1F4}",
    currency: "$",
    url: "https://co.dolarapi.com/v1/cotizaciones",
    parse: (data) => {
      const usd = data.find((d) => d.moneda === "USD");
      return { parallel: usd?.venta ?? 0, official: usd?.compra ?? 0 };
    },
  },
  {
    country: "M\u00e9xico",
    code: "MXN",
    flag: "\u{1F1F2}\u{1F1FD}",
    currency: "$",
    url: "https://mx.dolarapi.com/v1/cotizaciones",
    parse: (data) => {
      const usd = data.find((d) => d.moneda === "USD");
      return { parallel: usd?.venta ?? 0, official: usd?.compra ?? 0 };
    },
  },
  {
    country: "Chile",
    code: "CLP",
    flag: "\u{1F1E8}\u{1F1F1}",
    currency: "$",
    url: "https://cl.dolarapi.com/v1/cotizaciones",
    parse: (data) => {
      const usd = data.find((d) => d.moneda === "USD");
      return { parallel: usd?.venta ?? 0, official: usd?.compra ?? 0 };
    },
  },
  {
    country: "Brasil",
    code: "BRL",
    flag: "\u{1F1E7}\u{1F1F7}",
    currency: "R$",
    url: "https://br.dolarapi.com/v1/cotacoes",
    parse: (data) => {
      const usd = data.find((d) => d.moeda === "USD");
      return { parallel: usd?.venda ?? 0, official: usd?.compra ?? 0 };
    },
  },
  {
    country: "Uruguay",
    code: "UYU",
    flag: "\u{1F1FA}\u{1F1FE}",
    currency: "$",
    url: "https://uy.dolarapi.com/v1/cotizaciones",
    parse: (data) => {
      const usd = data.find((d) => d.moneda === "USD");
      return { parallel: usd?.venta ?? 0, official: usd?.compra ?? 0 };
    },
  },
];

export async function fetchRates(): Promise<CountryRate[]> {
  const results = await Promise.allSettled(
    COUNTRIES.map(async (cfg) => {
      const res = await fetch(cfg.url);
      if (!res.ok) throw new Error(`DolarAPI ${cfg.country}: ${res.status}`);
      const data: DolarApiItem[] = await res.json();
      const { parallel, official } = cfg.parse(data);
      return {
        country: cfg.country,
        code: cfg.code,
        flag: cfg.flag,
        currency: cfg.currency,
        parallel,
        official,
        delta24h: 0, // DolarAPI doesn't provide 24h change
      };
    })
  );
  return results
    .filter((r): r is PromiseFulfilledResult<CountryRate> => r.status === "fulfilled")
    .map((r) => r.value);
}
