import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  narrow?: boolean;
  className?: string;
}

export function PageContainer({ children, narrow, className }: PageContainerProps) {
  return (
    <div className={cn(
      "mx-auto px-4 py-8",
      narrow ? "max-w-[720px]" : "max-w-[1200px]",
      className
    )}>
      {children}
    </div>
  );
}
