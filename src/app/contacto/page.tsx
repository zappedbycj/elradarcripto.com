import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { generateBreadcrumbs } from "@/lib/seo";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contacto — Radar Cripto",
  description:
    "Contacta al equipo editorial de Radar Cripto para consultas, correcciones, colaboraciones o sugerencias.",
  alternates: { canonical: "https://elradarcripto.com/contacto" },
  robots: { index: true, follow: true },
};

export default function ContactoPage() {
  const breadcrumbLd = generateBreadcrumbs([
    { name: "Inicio", href: "/" },
    { name: "Contacto", href: "/contacto" },
  ]);

  return (
    <PageContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="max-w-[640px] mx-auto">
        <Text variant="h2" className="mb-6">
          Contacto
        </Text>

        <div className="space-y-4 text-sm text-text-secondary leading-relaxed">
          <p>
            Si tienes consultas editoriales, correcciones, sugerencias o
            propuestas de colaboración, puedes contactarnos a través del
            formulario o directamente en X.
          </p>
        </div>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-4 block text-text-tertiary">
            Formulario de contacto
          </Text>
          <ContactForm />
        </section>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-4 block text-text-tertiary">
            Redes sociales
          </Text>
          <p className="text-sm text-text-secondary">
            También puedes escribirnos por mensaje directo en{" "}
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
