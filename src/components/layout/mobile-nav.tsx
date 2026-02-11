"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, Wrench, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/noticias", label: "Noticias", icon: Newspaper },
  { href: "/mercados", label: "Mercados", icon: BarChart3 },
  { href: "/herramientas", label: "Tools", icon: Wrench },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/95 backdrop-blur-sm safe-area-bottom">
      <div className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2.5 min-h-[56px] gap-1 transition-colors duration-150",
                active ? "text-[#008a43]" : "text-text-secondary"
              )}
            >
              <span className={cn("relative", active && "animate-icon-glow")}>
                <Icon size={28} strokeWidth={active ? 2.5 : 1.8} />
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#008a43]" />
                )}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.04em] font-medium">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
