import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span className={cn(
      "font-mono text-2xs uppercase tracking-[0.1em] text-text-secondary",
      "px-1.5 py-0.5 rounded-[2px] border border-border-subtle",
      className
    )}>
      {children}
    </span>
  );
}
