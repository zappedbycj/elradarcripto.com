import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { generateBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Política Editorial — Radar Cripto",
  description:
    "Estándares editoriales, verificación de datos, política de correcciones y declaración de conflictos de interés de Radar Cripto.",
  alternates: { canonical: "https://elradarcripto.com/politica-editorial" },
  robots: { index: true, follow: true },
};

export default function PoliticaEditorialPage() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Política Editorial", href: "/politica-editorial" },
  ]);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-[640px] mx-auto">
        <Text variant="h2" className="mb-6">
          Política Editorial
        </Text>
        <p className="text-2xs text-text-tertiary mb-6">
          Última actualización: febrero 2026
        </p>

        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">
              1. Estándares editoriales
            </h3>
            <p>
              Radar Cripto publica información verificada sobre criptomonedas,
              divisas y finanzas en América Latina. Todo artículo pasa por un
              proceso editorial que incluye verificación de fuentes, validación
              de datos numéricos y revisión de contexto antes de su publicación.
            </p>
            <p className="mt-2">
              Priorizamos fuentes primarias: documentos regulatorios, reportes
              oficiales de empresas, datos on-chain verificables y declaraciones
              directas de personas involucradas. Las fuentes se citan por nombre
              y cargo cuando están disponibles.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">
              2. Proceso de verificación de datos
            </h3>
            <p>
              Cada artículo incluye métricas y datos verificados contra la
              fuente original. No publicamos cifras que no podamos rastrear a una
              fuente identificable. Cuando los datos provienen de fuentes
              secundarias, lo indicamos explícitamente.
            </p>
            <p className="mt-2">
              Las cotizaciones de mercado se obtienen de APIs en tiempo real con
              intervalos de actualización de 15 a 30 minutos. Las tasas de dólar
              paralelo provienen de proveedores verificados en cada país.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">
              3. Política de correcciones
            </h3>
            <p>
              Si identificamos un error factual en un artículo publicado, lo
              corregimos en un plazo de 24 a 48 horas y agregamos una nota
              visible al final del artículo con el formato:
            </p>
            <p className="mt-2 p-3 rounded bg-surface-alt border border-border-subtle text-xs">
              Actualización [fecha]: [descripción de la corrección realizada].
            </p>
            <p className="mt-2">
              Si detectas un error en nuestro contenido, puedes reportarlo a
              través de nuestra{" "}
              <a
                href="/contacto"
                className="text-accent hover:underline"
              >
                página de contacto
              </a>{" "}
              o en{" "}
              <a
                href="https://x.com/ElRadardeCesar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                X (@ElRadardeCesar)
              </a>
              . Revisamos todas las solicitudes de corrección.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">
              4. Conflictos de interés
            </h3>
            <p>
              Radar Cripto no recibe compensación de proyectos cripto, exchanges
              ni empresas financieras por cobertura editorial. No publicamos
              contenido patrocinado sin marcarlo explícitamente como tal.
            </p>
            <p className="mt-2">
              Los miembros del equipo editorial pueden poseer criptomonedas a
              título personal. Estas posiciones no influyen en la línea
              editorial y no se realizan recomendaciones de inversión.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">
              5. Separación editorial y comercial
            </h3>
            <p>
              Las decisiones editoriales son independientes de cualquier
              relación comercial. Si en el futuro incluimos enlaces de afiliados
              o contenido patrocinado, se marcará claramente con etiquetas como
              &quot;Patrocinado&quot; o &quot;Enlace de afiliado&quot;.
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
