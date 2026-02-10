import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: "Términos y condiciones de uso de Radar Cripto. Naturaleza informativa del contenido, limitación de responsabilidad y política de datos de mercado.",
  alternates: { canonical: "https://elradarcripto.com/terminos" },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto prose-sm">
        <Text variant="h2" className="mb-6">Términos de Uso</Text>
        <p className="text-2xs text-text-tertiary mb-6">Última actualización: febrero 2026</p>

        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">1. Naturaleza del contenido</h3>
            <p>
              Radar Cripto es un medio informativo. Todo el contenido publicado — incluyendo noticias, análisis, tasas de cambio y resultados de herramientas — tiene carácter exclusivamente informativo y educativo. No constituye asesoría financiera, de inversión, legal ni fiscal.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">2. Sin recomendación de inversión</h3>
            <p>
              Ningún contenido de este sitio debe interpretarse como una recomendación de compra, venta o tenencia de criptomonedas u otros activos financieros. Las decisiones de inversión son responsabilidad exclusiva del usuario. Consulta con un profesional financiero antes de tomar decisiones de inversión.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">3. Precisión de los datos</h3>
            <p>
              Los precios de criptomonedas, tasas de dólar paralelo y datos de exchanges se obtienen de fuentes de terceros y se muestran tal cual. Hacemos nuestro mejor esfuerzo por mantener datos actualizados, pero no garantizamos exactitud, completitud ni oportunidad. Los precios pueden diferir de los del exchange al momento de la transacción.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">4. Herramientas de cálculo</h3>
            <p>
              Las calculadoras y herramientas (convertidor, spread, ganancia, comparador de exchanges) ofrecen resultados estimados basados en datos de mercado en tiempo real. No incluyen comisiones de exchanges, impuestos ni otros costos operativos. Los resultados son aproximados y de referencia.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">5. Limitación de responsabilidad</h3>
            <p>
              Radar Cripto no será responsable por pérdidas, daños o perjuicios derivados del uso de la información o herramientas publicadas en este sitio. El uso del sitio es bajo tu propio riesgo.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">6. Propiedad intelectual</h3>
            <p>
              El contenido original de este sitio está protegido por derechos de autor. Puedes compartir enlaces a nuestros artículos, pero no reproducir contenido completo sin autorización.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">7. Modificaciones</h3>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. La fecha de última actualización se indica al inicio de esta página.
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
