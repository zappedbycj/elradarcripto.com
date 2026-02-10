"use client";

import { cn } from "@/lib/utils";
import { type ElementType, type ComponentPropsWithoutRef } from "react";

type Variant = "body" | "label" | "mono" | "h1" | "h2" | "h3" | "h4";

type TextProps<T extends ElementType = "span"> = {
  as?: T;
  variant?: Variant;
} & ComponentPropsWithoutRef<T>;

const variantStyles: Record<Variant, string> = {
  body: "font-sans text-text-primary",
  label: "font-mono text-2xs uppercase tracking-[0.1em] text-text-secondary",
  mono: "font-mono text-text-primary tabular-nums",
  h1: "font-sans text-2xl font-bold tracking-tight text-text-primary",
  h2: "font-sans text-xl font-semibold tracking-tight text-text-primary",
  h3: "font-sans text-lg font-semibold text-text-primary",
  h4: "font-sans text-base font-medium text-text-primary",
};

const defaultTags: Partial<Record<Variant, ElementType>> = {
  h1: "h1", h2: "h2", h3: "h3", h4: "h4", body: "p", label: "span", mono: "span",
};

export function Text<T extends ElementType = "span">({
  as,
  variant = "body",
  className,
  ...props
}: TextProps<T>) {
  const Component = as || defaultTags[variant] || "span";
  return <Component className={cn(variantStyles[variant], className)} {...props} />;
}
