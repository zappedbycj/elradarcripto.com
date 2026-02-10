"use client";

import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  mono?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ mono, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full rounded-[4px] border border-border bg-bg px-3 py-2",
          "text-[16px] text-text-primary placeholder:text-text-tertiary",
          "transition-colors duration-150",
          "hover:border-text-tertiary focus:border-accent focus:outline-none",
          mono && "font-mono tabular-nums",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
