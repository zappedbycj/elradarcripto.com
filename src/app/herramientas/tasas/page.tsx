"use client";

import { PageContainer } from "@/components/layout/page-container";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useRates } from "@/lib/hooks/use-rates";

export default function TasasPage() {
  const { rates, isLoading } = useRates();

  return (
    <PageContainer>
      <div className="max-w-[640px] mx-auto">
        <Text variant="label" className="mb-2 block text-text-tertiary">Herramientas</Text>
        <h1 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-8">
          Tasas de D&oacute;lar Paralelo
        </h1>

        <Card className="p-5 mb-8">
          {isLoading ? (
            <p className="font-mono text-2xs text-text-tertiary">Cargando tasas...</p>
          ) : (
            <div className="space-y-0">
              {/* Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-border-subtle">
                <span className="font-mono text-2xs text-text-tertiary w-[140px]">Pa&iacute;s</span>
                <span className="font-mono text-2xs text-text-tertiary w-[80px] text-right">Paralelo</span>
                <span className="font-mono text-2xs text-text-tertiary w-[80px] text-right">Oficial</span>
                <span className="font-mono text-2xs text-text-tertiary flex-1 text-right">Spread</span>
              </div>
              {rates.map((r, i) => {
                const spread = r.official > 0 ? ((r.parallel - r.official) / r.official) * 100 : 0;
                const spreadAbs = spread;
                // Bar width: max spread ~100%, cap visual at 100
                const barWidth = Math.min(Math.abs(spread), 100);
                return (
                  <div
                    key={r.code}
                    className={`flex items-center gap-2 py-2.5 ${i < rates.length - 1 ? "border-b border-border-subtle" : ""}`}
                  >
                    <span className="font-sans text-xs text-text-secondary w-[140px] flex items-center gap-2">
                      <span>{r.flag}</span>
                      <span>{r.country}</span>
                    </span>
                    <span className="font-mono text-xs text-text-primary w-[80px] text-right">
                      {formatPrice(r.parallel, r.parallel < 100 ? 2 : 0)}
                    </span>
                    <span className="font-mono text-xs text-text-tertiary w-[80px] text-right">
                      {formatPrice(r.official, r.official < 100 ? 2 : 0)}
                    </span>
                    <div className="flex-1 flex items-center justify-end gap-2">
                      <div className="w-[60px] h-[6px] rounded-full bg-border-subtle overflow-hidden hidden sm:block">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                      <span className={`font-mono text-2xs w-[50px] text-right ${spreadAbs > 20 ? "text-negative" : spreadAbs > 5 ? "text-warning" : "text-positive"}`}>
                        {spread.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="font-mono text-2xs text-text-tertiary mt-4">
            Se actualiza cada 30 min. Spread = ((paralelo - oficial) / oficial) &times; 100.
          </p>
        </Card>

        <Separator className="my-8" />

        <section>
          <Text variant="label" className="mb-3 block text-text-tertiary">Sobre las Tasas</Text>
          <p className="text-xs text-text-secondary leading-relaxed">
            El d&oacute;lar paralelo es el tipo de cambio del mercado informal. La brecha (spread) entre paralelo y oficial indica
            el nivel de distorsi&oacute;n cambiaria. Pa&iacute;ses como Venezuela y Argentina suelen tener las mayores brechas,
            mientras que econom&iacute;as como Chile o Uruguay mantienen spreads bajos.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
