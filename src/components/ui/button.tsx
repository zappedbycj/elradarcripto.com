"use client";

import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "ghost";
  loading?: boolean;
}

export function Button({ variant = "primary", loading, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[4px] px-4 py-2 text-xs font-medium transition-colors duration-150",
        "min-h-[44px] min-w-[44px]",
        variant === "primary" && "bg-accent text-white hover:bg-accent/90",
        variant === "ghost" && "text-text-secondary hover:text-text-primary hover:bg-border-subtle",
        (disabled || loading) && "opacity-50 pointer-events-none",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
