import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Radar Cripto. No recopilamos datos personales ni usamos cookies de seguimiento. Solo analítica anónima.",
  alternates: { canonical: "https://elradarcripto.com/privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto prose-sm">
        <Text variant="h2" className="mb-6">Política de Privacidad</Text>
        <p className="text-2xs text-text-tertiary mb-6">Última actualización: febrero 2026</p>

        <div className="space-y-6 text-sm text-text-secondary leading-relaxed">
          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">1. Información que recopilamos</h3>
            <p>
              Radar Cripto no recopila datos personales identificables. No requerimos registro ni inicio de sesión. No utilizamos cookies de seguimiento de terceros con fines publicitarios.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">2. Analítica</h3>
            <p>
              Podemos utilizar herramientas de analítica anónima para entender cómo se utiliza el sitio (páginas visitadas, duración, país de origen). Estos datos son agregados y no identifican a usuarios individuales.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">3. Datos de mercado</h3>
            <p>
              Los precios de criptomonedas y tasas de cambio se obtienen de APIs públicas de terceros (CoinGecko, CriptoYa, entre otros). No almacenamos datos de transacciones ni información financiera personal de los usuarios.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">4. Cookies</h3>
            <p>
              Utilizamos una cookie local (localStorage) únicamente para recordar tu preferencia de tema (claro/oscuro). No se comparte con terceros.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">5. Enlaces a terceros</h3>
            <p>
              Este sitio puede contener enlaces a exchanges, plataformas y fuentes de noticias externas. No somos responsables de las políticas de privacidad de sitios de terceros.
            </p>
          </section>

          <section>
            <h3 className="font-sans text-xs font-medium text-text-primary mb-2">6. Contacto</h3>
            <p>
              Para consultas sobre privacidad, contáctanos a través de{" "}
              <a href="https://x.com/ElRadardeCesar" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                X (@ElRadardeCesar)
              </a>.
            </p>
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
