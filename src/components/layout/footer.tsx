import Link from "next/link";

const footerLinks = [
  { href: "/noticias", label: "Noticias" },
  { href: "/mercados", label: "Mercados" },
  { href: "/herramientas", label: "Herramientas" },
];

const legalLinks = [
  { href: "/sobre", label: "Sobre nosotros" },
  { href: "/metodologia", label: "Metodología" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-16 py-8">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-6">
          <div>
            <Link href="/" className="font-mono text-2xs font-bold tracking-[0.15em] uppercase text-text-secondary">
              Radar Cripto
            </Link>
            <p className="text-2xs text-text-tertiary mt-1 max-w-[300px]">
              Cripto, divisas y herramientas financieras para América Latina.
            </p>
          </div>

          <div className="flex gap-8">
            <nav className="flex flex-col gap-1.5">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-2xs text-text-tertiary hover:text-text-secondary transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="flex flex-col gap-1.5">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-2xs text-text-tertiary hover:text-text-secondary transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-mono text-2xs text-text-tertiary">
            &copy; {new Date().getFullYear()} Radar Cripto
          </span>
          <a
            href="https://x.com/ElRadardeCesar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-2xs text-text-tertiary hover:text-accent transition-colors duration-150"
          >
            @ElRadardeCesar
          </a>
        </div>
      </div>
    </footer>
  );
}
