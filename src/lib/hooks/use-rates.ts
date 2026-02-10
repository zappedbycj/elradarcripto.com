"use client";

import useSWR from "swr";
import { fetchRates } from "@/lib/api/rates";
import { mockRates, type CountryRate } from "@/data/mock/rates";

const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 min

export function useRates() {
  const { data, error, isLoading } = useSWR<CountryRate[]>(
    "country-rates",
    fetchRates,
    {
      refreshInterval: REFRESH_INTERVAL,
      fallbackData: mockRates,
      revalidateOnFocus: false,
    }
  );

  return {
    rates: data ?? mockRates,
    isLoading,
    error,
  };
}
