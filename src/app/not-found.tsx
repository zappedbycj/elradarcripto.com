import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="max-w-[480px] mx-auto text-center py-20">
        <span className="font-mono text-6xl font-bold text-accent block mb-4">
          404
        </span>
        <h1 className="font-sans text-xl font-bold text-text-primary mb-3">
          Página no encontrada
        </h1>
        <p className="text-sm text-text-secondary mb-8">
          La página que buscas no existe, fue movida o el enlace es incorrecto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[6px] bg-accent text-bg font-sans text-xs font-medium min-h-[44px] hover:opacity-90 transition-opacity"
          >
            Ir al inicio
          </Link>
          <Link
            href="/noticias"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-[6px] border border-border text-text-secondary font-sans text-xs font-medium min-h-[44px] hover:text-text-primary hover:border-text-tertiary transition-colors"
          >
            Ver noticias
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle">
          <Text variant="label" className="mb-4 block text-text-tertiary">
            Páginas populares
          </Text>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: "/mercados", label: "Mercados" },
              { href: "/herramientas/convertir", label: "Convertidor" },
              { href: "/herramientas/p2p", label: "Conversor P2P" },
              { href: "/herramientas/tasas", label: "Tasas paralelo" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-2xs text-text-tertiary hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
