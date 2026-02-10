import type { ReactNode } from "react";
import type { ArticleSource } from "@/lib/types/article";

interface ArticleBodyProps {
  body: string;
  sources?: ArticleSource[];
}

/** Keyword → internal link map, ordered longest-first for greedy matching */
const INTERNAL_LINKS: { pattern: RegExp; href: string }[] = [
  { pattern: /Binance\s+P2P/i, href: "/herramientas/p2p" },
  { pattern: /OKX\s+P2P/i, href: "/herramientas/p2p" },
  { pattern: /dólar\s+paralelo/i, href: "/herramientas/tasas" },
  { pattern: /tasa\s+paralelo/i, href: "/herramientas/tasas" },
  { pattern: /tipo\s+de\s+cambio/i, href: "/herramientas/tasas" },
  { pattern: /\bexchanges\b/i, href: "/herramientas/exchanges" },
  { pattern: /\bconvertir\b/i, href: "/herramientas/convertir" },
  { pattern: /\bconversor\b/i, href: "/herramientas/convertir" },
  { pattern: /\bspread\b/i, href: "/herramientas/spread" },
  { pattern: /\bP2P\b/i, href: "/herramientas/p2p" },
  { pattern: /\bBitcoin\b/i, href: "/mercados" },
  { pattern: /\bEthereum\b/i, href: "/mercados" },
  { pattern: /\bSolana\b/i, href: "/mercados" },
];

/** Convert markdown bold/italic to HTML + contextual internal links */
function parseInline(text: string, linkedTerms?: Set<string>): string {
  let result = text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");

  if (linkedTerms) {
    for (const { pattern, href } of INTERNAL_LINKS) {
      const key = pattern.source;
      if (linkedTerms.has(key)) continue;
      const match = result.match(pattern);
      if (match) {
        linkedTerms.add(key);
        result = result.replace(
          pattern,
          `<a href="${href}" class="text-accent hover:underline">${match[0]}</a>`
        );
      }
    }
  }

  return result;
}

/**
 * Parse body into semantic elements line-by-line.
 * Handles: ## headings, > blockquotes, • bullets, --- separators, paragraphs.
 * Adjacent non-heading/non-special lines merge into paragraphs.
 */
function parseBody(body: string): ReactNode[] {
  const lines = body.split("\n");
  const elements: ReactNode[] = [];
  let paragraphBuffer: string[] = [];
  let isFirstParagraph = true;
  let key = 0;
  const linkedTerms = new Set<string>();

  function flushParagraph() {
    if (paragraphBuffer.length === 0) return;
    const text = paragraphBuffer.join(" ").trim();
    if (!text) {
      paragraphBuffer = [];
      return;
    }
    const isLead = isFirstParagraph;
    isFirstParagraph = false;
    elements.push(
      <p
        key={key++}
        className={`text-sm text-text-primary leading-relaxed ${isLead ? "font-medium" : ""}`}
        dangerouslySetInnerHTML={{ __html: parseInline(text, linkedTerms) }}
      />
    );
    paragraphBuffer = [];
  }

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();

    // Empty line — flush paragraph buffer
    if (line.trim() === "") {
      flushParagraph();
      i++;
      continue;
    }

    // H2 heading
    if (line.startsWith("## ")) {
      flushParagraph();
      elements.push(
        <h2
          key={key++}
          className="font-sans text-base font-semibold text-text-primary mt-8 mb-3"
        >
          {line.replace(/^##\s+/, "")}
        </h2>
      );
      i++;
      continue;
    }

    // H3 heading
    if (line.startsWith("### ")) {
      flushParagraph();
      elements.push(
        <h3
          key={key++}
          className="font-sans text-sm font-semibold text-text-primary mt-6 mb-2"
        >
          {line.replace(/^###\s+/, "")}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote — collect consecutive > lines
    if (line.startsWith("> ")) {
      flushParagraph();
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].replace(/^>\s*/, ""));
        i++;
      }
      const quoteText = quoteLines
        .filter((l) => !l.startsWith("—"))
        .join(" ")
        .replace(/^"/, "")
        .replace(/"$/, "");
      const attribution = quoteLines.find((l) => l.startsWith("—"));

      elements.push(
        <blockquote key={key++} className="border-l-2 border-accent pl-4">
          <p className="text-sm text-text-secondary italic">{quoteText}</p>
          {attribution && (
            <cite className="block mt-1 text-xs text-text-tertiary not-italic">
              {attribution}
            </cite>
          )}
        </blockquote>
      );
      continue;
    }

    // Bullet list — collect consecutive bullet lines
    if (/^[•\-*]\s/.test(line.trim())) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^[•\-*]\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[•\-*]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="space-y-2 pl-1">
          {items.map((item, j) => (
            <li
              key={j}
              className="text-sm text-text-primary leading-relaxed flex gap-2"
            >
              <span className="text-accent mt-0.5">•</span>
              <span
                dangerouslySetInnerHTML={{ __html: parseInline(item, linkedTerms) }}
              />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Separator
    if (line.trim() === "---") {
      flushParagraph();
      elements.push(<hr key={key++} className="border-border my-6" />);
      i++;
      continue;
    }

    // Regular text — accumulate into paragraph
    paragraphBuffer.push(line.trim());
    i++;
  }

  flushParagraph();
  return elements;
}

export function ArticleBody({ body, sources }: ArticleBodyProps) {
  const elements = parseBody(body);

  return (
    <div className="prose-custom space-y-5">
      {elements}

      {/* Sources cited — only show real named people, not generic media outlets */}
      {(() => {
        const realSources = (sources ?? []).filter(
          (s) =>
            s.role &&
            s.role !== "null" &&
            !/^medio\s/i.test(s.role) &&
            !/^fuente\s/i.test(s.role)
        );
        if (realSources.length === 0) return null;
        return (
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-sans text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
              Fuentes citadas
            </h3>
            <ul className="space-y-1">
              {realSources.map((s, i) => (
                <li key={i} className="text-xs text-text-secondary">
                  <span className="font-medium text-text-primary">
                    {s.name}
                  </span>
                  <span className="text-text-tertiary"> — {s.role}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })()}
    </div>
  );
}
