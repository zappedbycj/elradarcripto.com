import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase";
import { getAuthorByCategory } from "@/lib/authors";

export const maxDuration = 120;

const VALUESERP_KEY = process.env.VALUESERP_API_KEY!;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY!;
const JINA_KEY = process.env.JINA_API_KEY!;
const CRON_SECRET = process.env.CRON_SECRET!;

// ─── Step 1: Editorial Director ─────────────────────────────────────
// Reads source, extracts structured intelligence for the writer.

const DIRECTOR_PROMPT = `Eres un director editorial de un medio cripto de nivel Cointelegraph/CriptoNoticias.

Tu trabajo: analizar el artículo fuente y producir un BRIEF EDITORIAL estructurado que un redactor usará para escribir el artículo final.

Extrae con precisión quirúrgica:

## namedSources
Personas REALES mencionadas con nombre y apellido en el artículo. Solo humanos, no medios ni organizaciones.
- name: nombre completo exacto como aparece
- role: cargo + organización (ej: "CEO de MicroStrategy", "Analista senior de JPMorgan")
- quote: cita textual si existe, null si no

Si el artículo NO menciona a ninguna persona por nombre → devuelve array vacío. NUNCA inventes nombres.

## keyMetrics
Datos numéricos concretos del artículo. Solo números reales que aparezcan en la fuente.
- label: descripción corta (2-3 palabras)
- value: el dato exacto con unidad ($, %, fecha, cantidad)

Si no hay datos numéricos claros → devuelve array vacío. NUNCA inventes cifras.

## h2Candidates
Exactamente 3 propuestas de H2 declarativos para el redactor. CADA UNO debe ser distinto en enfoque y estilo.

Reglas:
- Cada H2 DEBE contener un número o dato específico del artículo
- NUNCA uses H2 genéricos: "Por qué importa", "El contexto", "Impacto en el mercado", "Qué vigilar"
- Los 3 H2s deben cubrir ángulos DIFERENTES del artículo:
  - h2Candidates[0]: El dato principal / la noticia dura (ej: "MicroStrategy compra 1,142 BTC por $90 millones")
  - h2Candidates[1]: El contra-ángulo o matiz (ej: "Precio de compra de $78,815 supera el costo base de la empresa")
  - h2Candidates[2]: La implicación futura con dato (ej: "Soporte de $60,000 será la prueba para las reservas de Saylor")

Varía el estilo entre artículos. Ejemplos de patrones válidos:
- "[Sujeto] + [acción] + [número]" → "Bernstein mantiene objetivo de $150,000 para BTC"
- "[Número] + [contexto]" → "$40 mil millones en liquidaciones sacuden el mercado"
- "[Pregunta retórica con dato]" → "¿Puede Bitcoin sostener los $70,000 con outflows de $200M?"
- "[Condición] + [consecuencia]" → "Si BTC pierde $65,000, los ETFs enfrentan primera prueba real"

## angle
El ángulo noticioso principal en 1 oración. ¿Cuál es LA noticia?

## counterAngle
La perspectiva contraria o matiz. ¿Quién no está de acuerdo o qué riesgo existe? Si no hay contra-ángulo claro en la fuente, propón uno basado en el contexto del mercado.

## relatedTicker
BTC, ETH, SOL, BNB, XRP o ADA. El activo más relevante. Default: BTC.

## category
Mercados, Regulación, Divisas, Tecnología, Exchanges o Adopción.

## isRelevant
¿Este artículo trata PRINCIPALMENTE sobre criptomonedas, blockchain, activos digitales, exchanges, DeFi o finanzas cripto-adyacentes (stablecoins, CBDC, remesas cripto)?
- true: sí, el tema central es cripto/blockchain/finanzas digitales
- false: no, el tema es otro (combustibles, deportes, política general, radio, entretenimiento) aunque mencione "blockchain" o "dólar" de pasada

## imagePrompt
Prompt corto en inglés para una ilustración editorial abstracta del tema.`;

const DIRECTOR_SCHEMA = {
  name: "editorial_brief",
  strict: true,
  schema: {
    type: "object",
    required: [
      "namedSources",
      "keyMetrics",
      "h2Candidates",
      "angle",
      "counterAngle",
      "relatedTicker",
      "category",
      "isRelevant",
      "imagePrompt",
    ],
    additionalProperties: false,
    properties: {
      isRelevant: { type: "boolean" },
      namedSources: {
        type: "array",
        items: {
          type: "object",
          required: ["name", "role", "quote"],
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            role: { type: "string" },
            quote: { type: ["string", "null"] },
          },
        },
      },
      keyMetrics: {
        type: "array",
        items: {
          type: "object",
          required: ["label", "value"],
          additionalProperties: false,
          properties: {
            label: { type: "string" },
            value: { type: "string" },
          },
        },
      },
      h2Candidates: {
        type: "array",
        items: { type: "string" },
      },
      angle: { type: "string" },
      counterAngle: { type: "string" },
      relatedTicker: { type: "string" },
      category: { type: "string" },
      imagePrompt: { type: "string" },
    },
  },
};

// ─── Step 2: Writer ─────────────────────────────────────────────────
// Receives the source + editorial brief, writes the final article.

// ─── Step 2: Analyst (LATAM enrichment) ─────────────────────────────

const ANALYST_PROMPT = `Eres un analista editorial especializado en el impacto de noticias cripto en América Latina.

Recibirás un brief editorial con la noticia. Tu trabajo: enriquecer con ángulo LATAM SOLO cuando sea relevante.

Devuelve 4 campos:

## latamAngle
Impacto específico para América Latina: remesas, P2P, dólar paralelo, regulación regional, adopción local. Ejemplos: efecto en remesas México-LATAM, impacto en P2P Venezuela/Argentina, regulación Brasil/El Salvador. Si la noticia NO tiene impacto regional directo → devuelve "Sin impacto directo".

## localDataContext
Datos reales de LATAM que contextualicen la noticia. Ejemplos: volumen P2P en LocalBitcoins/Binance P2P Venezuela, % de adopción cripto en LATAM (Chainalysis), remesas vía cripto. Si no hay datos relevantes → devuelve string vacío.

## contrarian
Una perspectiva original o contraria que NO esté en el artículo fuente. Puede ser escéptica, optimista diferenciada, o un matiz que los medios ignoran. Si no hay ángulo contrario útil → devuelve string vacío.

## enrichmentData
Comparaciones históricas o de escala que den contexto. Ejemplo: "La última vez que BTC cayó 20% en una semana fue en junio 2022, cuando pasó de $30K a $17K". Si no hay comparación útil → devuelve string vacío.

REGLA CRÍTICA: Es MEJOR devolver strings vacíos que inventar datos. NUNCA inventes estadísticas.`;

const ANALYST_SCHEMA = {
  name: "analyst_enrichment",
  strict: true,
  schema: {
    type: "object",
    required: ["latamAngle", "localDataContext", "contrarian", "enrichmentData"],
    additionalProperties: false,
    properties: {
      latamAngle: { type: "string" },
      localDataContext: { type: "string" },
      contrarian: { type: "string" },
      enrichmentData: { type: "string" },
    },
  },
};

interface AnalystEnrichment {
  latamAngle: string;
  localDataContext: string;
  contrarian: string;
  enrichmentData: string;
}

// ─── Step 3: Writer ─────────────────────────────────────────────────
// Receives the source + editorial brief + analyst enrichment, writes the final article.

const WRITER_PROMPT = `Eres un redactor senior de criptofinanzas. Recibirás un BRIEF EDITORIAL y el contenido fuente original.

FORMATO DEL CAMPO "body" — SIGUE ESTE FORMATO EXACTO:

El campo body es un string con saltos de línea. Usa EXACTAMENTE esta estructura:

[Párrafo lead — 2-3 oraciones. Primera oración: QUIÉN + QUÉ + NÚMERO + CUÁNDO.]

## [h2Candidates[0] del brief — COPIA EXACTA]
[Párrafo 1 de análisis con datos del brief]
[Párrafo 2 de análisis — separado por línea vacía]

## [h2Candidates[1] del brief — COPIA EXACTA]
[Párrafo que empieza con "Sin embargo" o "No obstante" + contra-ángulo]

## [h2Candidates[2] del brief — COPIA EXACTA]
[1 párrafo de cierre con datos concretos. NUNCA uses "Qué vigilar" como H2.]

REGLAS CRÍTICAS DE FORMATO:
1. Los H2 se escriben con "## " al inicio de la línea (dos hashes + espacio). SIEMPRE.
2. Después de cada "## Título" va un salto de línea \\n y luego el párrafo.
3. Entre párrafos va UNA línea vacía (\\n\\n).
4. NUNCA uses **bold** ni *italic* — texto plano solamente.
5. NUNCA uses "- " ni "* " para listas — usa "• " (bullet unicode + espacio).
6. Blockquotes: "> cita textual\\n> — Nombre, Cargo"
7. NO agregues H1 (#). Solo H2 (##).
8. El último H2 NO siempre debe ser "Qué vigilar". Varía según el artículo:
   - Si hay evento futuro con fecha → "## Qué vigilar" (con fecha y nivel concreto)
   - Si hay dato clave de mercado → "## [Dato específico, ej: Soporte en $60,000 será la prueba]"
   - Si hay implicación regulatoria → "## [Implicación, ej: SEC podría actuar antes de marzo]"
   NUNCA repitas el mismo último H2 entre artículos.

EJEMPLO EXACTO de cómo debe verse el body:

Michael Saylor anunció la compra de 1,142 BTC por $90 millones, elevando las reservas de MicroStrategy a 714,644 BTC con un costo promedio de $76,056 por moneda.

## MicroStrategy acumula 714,644 BTC tras compra de $90 millones
La firma de inteligencia empresarial realizó su última adquisición a un precio promedio de $78,815 por Bitcoin, según reportes del 10 de febrero.

> Los inversores institucionales están acelerando sus compras de Bitcoin
> — Michael Saylor, Executive Chairman de MicroStrategy

El costo total de las reservas asciende a $54.35 mil millones.

## Precio promedio de $78,815 supera el costo base de $76,056
Sin embargo, la compra se ejecutó por encima del costo promedio actual de la empresa, lo que indica una apuesta agresiva en un momento de volatilidad.

## Soporte en $60,000 será la prueba para MicroStrategy
Las acciones de MSTR cerraron en $135 tras un rebote del 26% desde los $107. Si Bitcoin pierde el nivel de $60,000, el costo base de $76,056 quedaría significativamente bajo agua.

FIN DEL EJEMPLO.

REGLAS DE CONTENIDO:
- Primera oración = lead noticioso. NUNCA "En un contexto de..." ni "El mundo cripto..."
- Asume conocimiento del lector. NUNCA expliques qué es Bitcoin.
- Cada afirmación necesita un número del brief. Sin número → no hagas la afirmación.
- Nombres reales del brief: "según [Nombre], [cargo]". NUNCA inventes personas.
- Enfoque LATAM cuando sea relevante.

INTEGRACIÓN DE ANÁLISIS LATAM:
- Si recibes un bloque "ANÁLISIS LATAM" con el brief, intégralo así:
  - latamAngle (si NO es "Sin impacto directo"): menciónalo naturalmente en un H2, no como sección separada.
  - contrarian: úsalo como base para el segundo H2 (contra-ángulo). Si está vacío, usa el counterAngle del brief.
  - enrichmentData: intercala como contexto histórico donde encaje. No fuerces.
  - localDataContext: úsalo para dar escala LATAM. Si está vacío, no inventes datos locales.
- NUNCA fuerces un ángulo LATAM. Si el análisis dice "Sin impacto directo", escribe normalmente.

RESTRICCIONES DE LONGITUD (CRÍTICAS — respétalas siempre):
- Título: MÁXIMO 55 caracteres. Conciso, dato clave. El sitio agrega " | Radar Cripto" automáticamente. NO repitas el nombre del sitio.
- Slug: MÁXIMO 5-7 palabras. Solo keywords, minúsculas, guiones, sin acentos ni ñ. Ejemplo: "ripple-xrp-regulacion-interbancaria" NO la oración completa.
- Excerpt: MÁXIMO 155 caracteres. 1 oración con el dato principal.
- imageAlt: 2-5 palabras describiendo la imagen. Ejemplo: "Gráfico Bitcoin soporte 60000".`;

const WRITER_SCHEMA = {
  name: "article",
  strict: true,
  schema: {
    type: "object",
    required: ["title", "slug", "excerpt", "body", "imageAlt"],
    additionalProperties: false,
    properties: {
      title: { type: "string" },
      slug: { type: "string" },
      excerpt: { type: "string" },
      body: { type: "string" },
      imageAlt: { type: "string" },
    },
  },
};

const IMAGE_STYLE_PROMPT = `Generate a 16:9 editorial illustration for a crypto news article.
Style: Modern minimalist fintech aesthetic. Dark background (#0A0A09).
Use muted blue (#6B8FC5) and teal (#3DAB8F) as accent colors.
Clean geometric shapes, subtle gradients, no text overlay.
Professional, not cartoonish. Think Bloomberg Terminal meets modern design.
No stock photo look. Abstract/symbolic representation of the topic.

Topic: `;

// ─── Types ──────────────────────────────────────────────────────────

interface EditorialBrief {
  isRelevant: boolean;
  namedSources: { name: string; role: string; quote: string | null }[];
  keyMetrics: { label: string; value: string }[];
  h2Candidates: string[];
  angle: string;
  counterAngle: string;
  relatedTicker: string;
  category: string;
  imagePrompt: string;
}

interface WrittenArticle {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  imageAlt: string;
}

// ─── Helpers ────────────────────────────────────────────────────────

async function callOpenRouter(
  model: string,
  systemPrompt: string,
  userContent: string,
  schema: Record<string, unknown>
): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      response_format: { type: "json_schema", json_schema: schema },
    }),
  });
  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Route ──────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const results = { generated: 0, skipped: 0, errors: [] as string[] };

  try {
    // 1. Search Google News via ValueSERP — rotate queries for diversity
    const queries = [
      "Bitcoin",
      "Ethereum",
      "DeFi crypto",
      "Blockchain crypto",
      "Cryptocurrency",
      "Crypto Exchanges",
    ];
    // Pick 2 queries per run based on hour to rotate
    const hour = new Date().getUTCHours();
    const q1 = queries[hour % queries.length];
    const q2 = queries[(hour + 1) % queries.length];

    const fetchNews = async (q: string) => {
      const serpUrl = new URL("https://api.valueserp.com/search");
      serpUrl.searchParams.set("api_key", VALUESERP_KEY);
      serpUrl.searchParams.set("q", q);
      serpUrl.searchParams.set("search_type", "news");
      serpUrl.searchParams.set("sort_by", "date");
      serpUrl.searchParams.set("num", "5");
      serpUrl.searchParams.set("hl", "en");
      serpUrl.searchParams.set("google_domain", "google.com");
      serpUrl.searchParams.set("time_period", "last_hour");
      serpUrl.searchParams.set("show_duplicates", "false");
      serpUrl.searchParams.set("news_type", "all");
      const res = await fetch(serpUrl.toString());
      const data = await res.json();
      return (data.news_results ?? []) as { title: string; link: string }[];
    };

    const [news1, news2] = await Promise.all([fetchNews(q1), fetchNews(q2)]);
    // Merge and dedupe by link
    const seen = new Set<string>();
    const newsResults: { title: string; link: string }[] = [];
    for (const n of [...news1, ...news2]) {
      if (!seen.has(n.link)) {
        seen.add(n.link);
        newsResults.push(n);
      }
    }

    if (newsResults.length === 0) {
      return NextResponse.json({
        ...results,
        message: "No news results found",
      });
    }

    // 2. Deduplicate against existing articles
    const sourceUrls = newsResults.map((n) => n.link);
    const { data: existing } = await supabase
      .from("articles")
      .select("source_url")
      .in("source_url", sourceUrls);

    const existingUrls = new Set((existing ?? []).map((e) => e.source_url));
    const newSources = newsResults.filter((n) => !existingUrls.has(n.link));
    results.skipped = newsResults.length - newSources.length;

    // 3. Process top 2 new sources
    const toProcess = newSources.slice(0, 2);

    for (const source of toProcess) {
      try {
        // 3a. Scrape source via Jina
        const jinaRes = await fetch(`https://r.jina.ai/${source.link}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${JINA_KEY}`,
            "X-Return-Format": "markdown",
          },
        });
        const jinaData = await jinaRes.json();
        const sourceContent =
          jinaData.data?.content ?? jinaData.content ?? "";

        if (!sourceContent || sourceContent.length < 200) {
          results.errors.push(`Jina: too short for ${source.link}`);
          continue;
        }

        const truncatedSource = sourceContent.slice(0, 8000);

        // 3b. STEP 1 — Editorial Director analyzes the source
        const briefRaw = await callOpenRouter(
          "google/gemini-2.5-flash",
          DIRECTOR_PROMPT,
          `Fuente: ${source.title}\nURL: ${source.link}\n\nContenido:\n${truncatedSource}`,
          DIRECTOR_SCHEMA
        );
        const brief: EditorialBrief = JSON.parse(briefRaw);

        // Relevance gate — skip off-topic articles
        if (!brief.isRelevant) {
          results.errors.push(
            `Relevance gate: off-topic — ${source.title}`
          );
          continue;
        }

        // Quality gate — skip if Director found no metrics AND no named sources
        if (brief.keyMetrics.length === 0 && brief.namedSources.length === 0) {
          results.errors.push(
            `Quality gate: skipped thin source (no metrics/sources) — ${source.title}`
          );
          continue;
        }

        // 3c. STEP 2 — Analyst enriches with LATAM context
        const analystRaw = await callOpenRouter(
          "google/gemini-2.5-flash",
          ANALYST_PROMPT,
          `BRIEF:\nÁngulo: ${brief.angle}\nCategoría: ${brief.category}\nTicker: ${brief.relatedTicker}\n\nFUENTE:\n${truncatedSource.slice(0, 4000)}`,
          ANALYST_SCHEMA
        );
        const analyst: AnalystEnrichment = JSON.parse(analystRaw);

        // 3d. STEP 3 — Writer executes the brief + analyst enrichment
        const briefSummary = [
          `ÁNGULO: ${brief.angle}`,
          `CONTRA-ÁNGULO: ${brief.counterAngle}`,
          `H2s: ${brief.h2Candidates.join(" | ")}`,
          `MÉTRICAS: ${brief.keyMetrics.map((m) => `${m.label}: ${m.value}`).join(", ") || "Ninguna disponible"}`,
          `FUENTES NOMBRADAS: ${brief.namedSources.map((s) => `${s.name} (${s.role})${s.quote ? ` — "${s.quote}"` : ""}`).join("; ") || "Ninguna — no cites personas"}`,
          `TICKER: ${brief.relatedTicker}`,
          `CATEGORÍA: ${brief.category}`,
        ].join("\n");

        const analystBlock = [
          `\n\nANÁLISIS LATAM:`,
          `LATAM: ${analyst.latamAngle}`,
          `Datos LATAM: ${analyst.localDataContext || "(sin datos)"}`,
          `Contrarian: ${analyst.contrarian || "(sin ángulo contrario)"}`,
          `Contexto histórico: ${analyst.enrichmentData || "(sin datos)"}`,
        ].join("\n");

        const articleRaw = await callOpenRouter(
          "google/gemini-2.5-flash",
          WRITER_PROMPT,
          `BRIEF EDITORIAL:\n${briefSummary}${analystBlock}\n\n---\n\nFUENTE ORIGINAL:\n${truncatedSource}`,
          WRITER_SCHEMA
        );
        const article: WrittenArticle = JSON.parse(articleRaw);

        // Assign author by category
        const author = getAuthorByCategory(brief.category);

        // Convert director's namedSources to article sources format
        const articleSources = brief.namedSources.map((s) => ({
          name: s.name,
          role: s.role,
        }));

        // 3e. Generate image with retry + fallback model
        const IMAGE_MODELS = [
          "google/gemini-2.5-flash-image",
          "google/gemini-3-pro-image-preview",
        ];

        let imageUrl: string | null = null;
        for (const imageModel of IMAGE_MODELS) {
          if (imageUrl) break;
          try {
            const imageRes = await fetch(
              "https://openrouter.ai/api/v1/chat/completions",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${OPENROUTER_KEY}`,
                },
                body: JSON.stringify({
                  model: imageModel,
                  messages: [
                    {
                      role: "user",
                      content: IMAGE_STYLE_PROMPT + brief.imagePrompt,
                    },
                  ],
                  modalities: ["image", "text"],
                  image_config: {
                    aspect_ratio: "16:9",
                    image_size: "2K",
                  },
                }),
              }
            );

            const imageData = await imageRes.json();
            const base64Image =
              imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

            if (!base64Image) {
              results.errors.push(
                `Image (${imageModel}): no base64 for ${source.link}`
              );
              continue;
            }

            const isJpeg = base64Image.startsWith("data:image/jpeg");
            const ext = isJpeg ? "jpg" : "png";
            const contentType = isJpeg ? "image/jpeg" : "image/png";

            const imageBuffer = Buffer.from(
              base64Image.replace(/^data:image\/\w+;base64,/, ""),
              "base64"
            );
            const imagePath = `${article.slug}.${ext}`;

            const { error: uploadError } = await supabase.storage
              .from("article-images")
              .upload(imagePath, imageBuffer, {
                contentType,
                upsert: true,
              });

            if (!uploadError) {
              const {
                data: { publicUrl },
              } = supabase.storage
                .from("article-images")
                .getPublicUrl(imagePath);
              imageUrl = publicUrl;
            } else {
              results.errors.push(`Image upload: ${uploadError.message}`);
            }
          } catch (e) {
            results.errors.push(
              `Image gen (${imageModel}): ${e instanceof Error ? e.message : String(e)}`
            );
          }
        }

        // 3f. Insert article
        const { error: insertError } = await supabase
          .from("articles")
          .insert({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            body: article.body,
            category: brief.category,
            image_url: imageUrl,
            source_url: source.link,
            source_title: source.title,
            key_metrics: brief.keyMetrics,
            sources: articleSources,
            related_ticker: brief.relatedTicker,
            image_alt: article.imageAlt,
            author_name: author.name,
            author_url: `/sobre#${author.slug}`,
          });

        if (insertError) {
          results.errors.push(`Insert: ${insertError.message}`);
        } else {
          results.generated++;
        }
      } catch (e) {
        results.errors.push(
          `Pipeline: ${e instanceof Error ? e.message : String(e)}`
        );
      }
    }

    // 4. Revalidate
    if (results.generated > 0) {
      revalidatePath("/noticias");
      revalidatePath("/");
    }
  } catch (e) {
    results.errors.push(
      `Top-level: ${e instanceof Error ? e.message : String(e)}`
    );
  }

  return NextResponse.json(results);
}
