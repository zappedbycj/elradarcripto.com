"use client";

import { cn, formatPrice, formatDelta } from "@/lib/utils";

interface PriceDisplayProps {
  value: number;
  delta?: number;
  decimals?: number;
  prefix?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function PriceDisplay({ value, delta, decimals = 2, prefix = "$", size = "md", className }: PriceDisplayProps) {
  return (
    <span className={cn("font-mono tabular-nums inline-flex items-center gap-2", sizeStyles[size], className)}>
      <span className="text-text-primary">
        {prefix}{formatPrice(value, decimals)}
      </span>
      {delta !== undefined && (
        <span className={cn(
          "text-2xs",
          delta >= 0 ? "text-positive" : "text-negative"
        )}>
          {formatDelta(delta)}
        </span>
      )}
    </span>
  );
}
