# Radar Cripto — Master Build Plan

## Context
Premium Spanish-language crypto news + LATAM rates + tools platform.
**Domain:** elradardecesar.com
**Repo:** github.com/zappedbycj/el-radar-financiero
**Stack:** Next.js App Router, static-first + client-side data fetching, Vercel Pro.

**Core thesis:** Nobody combines crypto news + LATAM parallel rates + tools in one beautiful place. We do.

**Data sources:**
- CriptoYa API — crypto exchange prices across all LATAM countries
- DolarAPI — parallel/official rates for VES, ARS, BOB, COP, MXN, BRL, CLP, PEN, UYU
- CoinGecko free API — global crypto prices, charts, market data
- ValueSERP — trending crypto news scraping
- Jina MCP — article content extraction
- OpenRouter — Spanish article generation + image generation

**Target countries:** Venezuela, Bolivia, Argentina, Colombia, Peru, Mexico, Chile, Brazil, Uruguay

---

## PHASE 1: Design System & UI Foundation ✅ DONE
- Project scaffolding (Next.js 15, Tailwind, TypeScript)
- Custom design system (dark theme, mono fonts, minimal UI)
- Core components: Card, Text, Input, Separator, PriceDisplay, etc.
- 3 page layouts: homepage, article, tool page
- Mock data for all sections

## PHASE 2: Data Layer & API Integration ✅ DONE
- CriptoYa API client (crypto prices per LATAM country)
- DolarAPI client (parallel/official rates)
- CoinGecko client (global prices, sparkline data)
- Client-side SWR polling with 30-min refresh
- Hooks: `useCryptoPrices`, `useRates`, `useExchanges`
- Replace all mock data with live data

## PHASE 2.5: Herramientas Pages ✅ DONE
- `/herramientas/convertir` — Crypto → Fiat converter
- `/herramientas/exchanges` — Exchange comparator (BTC/ETH/SOL/USDT across all fiat)
- `/herramientas/tasas` — Parallel dollar rates table (all 9 countries, spread bars)
- `/herramientas/spread` — Spread calculator (manual or auto-fill from country)
- `/herramientas/ganancia` — Profit calculator (lump sum + DCA modes)
- `/herramientas` index updated, Historial de Precios marked "Próximamente"

## PHASE 3: News Pipeline ⬅️ NEXT
- cron-job.org triggers every 30 min
- ValueSERP scrapes trending crypto news (Spanish)
- Jina extracts article content from source URLs
- OpenRouter (Gemini Flash) generates original Spanish article
- OpenRouter (Nano Banan) generates unique featured image per article (muted, monochrome aesthetic)
- Author byline: Dad's Twitter account on all articles
- Content saved to CMS (markdown files or Supabase)
- ISR revalidation via webhook
- 100% automated, no human review needed

## PHASE 4: SEO & Indexing
- Dynamic sitemap.xml (split at 50k)
- robots.txt
- BreadcrumbList schema on all pages
- FAQPage schema on tool pages
- NewsArticle schema on news pages
- Open Graph + Twitter cards
- Canonical URLs
- Google News Publisher Center registration
- Google Discover optimization (high-quality images)
- RSS feed for news
- hreflang (es-VE, es-AR, es-BO, es-419)

## PHASE 5: pSEO Scaling
- ConsensusBlueprint v2 for each page pattern
- Tool pages: /convertir/[crypto]/[fiat] — 50+ combinations
- Rate pages: /dolar-paralelo/[country] — 9 countries
- Price pages: /precio/[crypto] — top 20 cryptos
- Generate content via OpenRouter for each page pattern
- Internal linking automation (hub-and-spoke)

## PHASE 6: Launch & Growth
- Domain purchase & DNS setup
- Vercel deployment
- GSC registration
- Submit sitemap
- Monitor indexing
- Quick wins optimization via GSC data
- Expand content based on traffic patterns
