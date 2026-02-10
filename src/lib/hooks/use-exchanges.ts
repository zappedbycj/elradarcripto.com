"use client";

import useSWR from "swr";
import { fetchExchanges } from "@/lib/api/exchanges";
import { mockExchanges, type ExchangePrice } from "@/data/mock/exchanges";

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 min

export function useExchanges(crypto: string = "btc", fiat: string = "usd") {
  const { data, error, isLoading } = useSWR<ExchangePrice[]>(
    `exchange-prices-${crypto}-${fiat}`,
    () => fetchExchanges(crypto, fiat),
    {
      refreshInterval: REFRESH_INTERVAL,
      fallbackData: mockExchanges,
      revalidateOnFocus: false,
    }
  );

  return {
    exchanges: data ?? mockExchanges,
    isLoading,
    error,
  };
}
