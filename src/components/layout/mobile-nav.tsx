"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, Wrench, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/noticias", label: "Noticias", icon: Newspaper },
  { href: "/mercados", label: "Mercados", icon: BarChart3 },
  { href: "/herramientas", label: "Herramientas", icon: Wrench },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg/95 backdrop-blur-sm safe-area-bottom">
      <div className="flex">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 min-h-[44px] gap-0.5 transition-colors duration-150",
                active ? "text-accent" : "text-text-tertiary"
              )}
            >
              <Icon size={20} />
              <span className="font-mono text-[10px] uppercase tracking-[0.05em]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
