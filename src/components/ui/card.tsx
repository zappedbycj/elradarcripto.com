import { cn } from "@/lib/utils";
import { type ComponentPropsWithoutRef } from "react";

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  hoverable?: boolean;
}

export function Card({ hoverable = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[6px] border border-border bg-surface",
        hoverable && "transition-shadow duration-150 hover:shadow-[0_0_0_1px_var(--border),0_2px_4px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.04)]",
        className
      )}
      {...props}
    />
  );
}
