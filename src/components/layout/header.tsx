"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/mercados", label: "Mercados" },
  { href: "/herramientas", label: "Herramientas" },
  { href: "/noticias", label: "Noticias" },
];

function MatrixCripto() {
  const target = "CRIPTO";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const scramble = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((char, i) =>
              i < iteration ? char : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("")
        );
        iteration += 1 / 3;
        if (iteration >= target.length) clearInterval(interval);
      }, 40);
    };
    scramble();
    const loop = setInterval(scramble, 5000);
    return () => clearInterval(loop);
  }, []);

  return <span style={{ color: "#008a43" }}>{display}</span>;
}

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto max-w-[1200px] px-4 h-14 flex items-center gap-6">
        <Link href="/" className="font-mono text-sm font-bold tracking-[0.15em] uppercase text-text-primary flex-shrink-0">
          RADAR <MatrixCripto />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={(link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "page" : undefined}
              className="font-mono text-2xs uppercase tracking-[0.08em] text-text-secondary hover:text-text-primary px-3 py-2 rounded-[4px] transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <ThemeToggle />
      </div>
    </header>
  );
}
