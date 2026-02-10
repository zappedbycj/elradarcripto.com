import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { generateBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre Nosotros — Cripto y Divisas para LATAM",
  description:
    "Radar Cripto es un medio digital independiente especializado en criptomonedas, divisas y finanzas para América Latina.",
  alternates: { canonical: "https://elradarcripto.com/sobre" },
};

export default function SobrePage() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Sobre Nosotros", href: "/sobre" },
  ]);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-[640px] mx-auto">
        <Text variant="h2" className="mb-6">
          Sobre Radar Cripto
        </Text>

        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <p>
            Radar Cripto es un medio digital independiente enfocado en
            criptomonedas, divisas y herramientas financieras para América
            Latina. Cubrimos Bitcoin, Ethereum, altcoins, tasas de dólar
            paralelo y regulación cripto en la región.
          </p>

          <p>
            Nuestra misión es democratizar el acceso a información financiera
            de calidad en español. En una región donde el dólar paralelo, la
            inflación y la adopción cripto son parte del día a día, creemos que
            la información precisa y oportuna es una herramienta de libertad
            económica.
          </p>
        </div>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-4 block text-text-tertiary">
            Qué hacemos
          </Text>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0">{'>'}</span>
              <span>
                Noticias cripto en español con datos verificados, fuentes
                nombradas y análisis editorial riguroso.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0">{'>'}</span>
              <span>
                Tasas de dólar paralelo en 9 países LATAM actualizadas cada 15
                minutos.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent flex-shrink-0">{'>'}</span>
              <span>
                Herramientas gratuitas: convertidor cripto a fiat, comparador de
                exchanges, calculadora de spread y ganancia.
              </span>
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-4 block text-text-tertiary">
            Equipo editorial
          </Text>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-surface-alt border border-border-subtle">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-accent">C</span>
            </div>
            <div>
              <p className="font-sans text-xs font-medium text-text-primary">
                Radar Cripto
              </p>
              <p className="text-2xs text-text-tertiary mt-1">
                Equipo editorial especializado en criptomonedas y finanzas
                LATAM. Análisis de mercado, cobertura regulatoria y herramientas
                para inversores hispanohablantes.
              </p>
              <a
                href="https://x.com/ElRadardeCesar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-2xs text-accent hover:underline"
              >
                @ElRadardeCesar en X
              </a>
            </div>
          </div>
        </section>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-4 block text-text-tertiary">
            Contacto
          </Text>
          <p className="text-sm text-text-secondary">
            Para consultas editoriales, correcciones o colaboraciones, escríbenos
            a través de{" "}
            <a
              href="https://x.com/ElRadardeCesar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              X (@ElRadardeCesar)
            </a>
            .
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
