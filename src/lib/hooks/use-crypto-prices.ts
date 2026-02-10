"use client";

import useSWR from "swr";
import { fetchCryptoPrices } from "@/lib/api/crypto";
import { mockPrices, type CryptoPrice } from "@/data/mock/prices";

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 min

export function useCryptoPrices() {
  const { data, error, isLoading } = useSWR<CryptoPrice[]>(
    "crypto-prices",
    fetchCryptoPrices,
    {
      refreshInterval: REFRESH_INTERVAL,
      fallbackData: mockPrices,
      revalidateOnFocus: false,
    }
  );

  return {
    prices: data ?? mockPrices,
    isLoading,
    error,
  };
}
