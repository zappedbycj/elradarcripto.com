import fs from "fs";
import path from "path";

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY!;

const STYLE = `Generate a 1200x630 editorial illustration for a fintech tool page.
Style: Modern minimalist fintech aesthetic. Dark background (#0A0A09).
Use muted blue (#6B8FC5) and teal (#3DAB8F) as accent colors.
Clean geometric shapes, subtle gradients, NO text overlay, NO words, NO letters.
Professional, not cartoonish. Think Bloomberg Terminal meets modern design.
Abstract/symbolic representation. No stock photo look.

Topic: `;

const tools = [
  {
    name: "convertir",
    prompt: "Cryptocurrency to fiat currency conversion. Abstract arrows flowing between a Bitcoin symbol and Latin American currency symbols (bolivar, peso). Exchange rate visualization.",
  },
  {
    name: "exchanges",
    prompt: "Comparing crypto exchange prices side by side. Abstract columns or bars representing different exchanges (Binance, Kraken, Coinbase) with price levels. Trading comparison dashboard.",
  },
  {
    name: "tasas",
    prompt: "Parallel dollar exchange rates across Latin America. Abstract map outline of South America with floating currency indicators and rate differentials. Financial data overlay.",
  },
  {
    name: "spread",
    prompt: "Spread calculation between official and parallel exchange rates. Two diverging price lines with a gap between them highlighted in teal. Arbitrage opportunity visualization.",
  },
  {
    name: "ganancia",
    prompt: "Crypto profit calculator showing portfolio growth over time. Upward trending abstract chart with DCA buy points marked. Investment returns visualization.",
  },
  {
    name: "p2p",
    prompt: "Peer-to-peer crypto buying with local fiat currency. Two people exchanging money represented as abstract nodes connected by a line, with Bitcoin and Latin American currency symbols. P2P marketplace visualization.",
  },
];

async function generateImage(tool: (typeof tools)[number]) {
  console.log(`Generating OG image for: ${tool.name}...`);

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENROUTER_KEY}`,
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages: [
        { role: "user", content: STYLE + tool.prompt },
      ],
      modalities: ["image", "text"],
      image_config: {
        aspect_ratio: "16:9",
        image_size: "2K",
      },
    }),
  });

  const data = await res.json();
  const base64Image = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

  if (!base64Image) {
    console.error(`  FAILED for ${tool.name}:`, JSON.stringify(data.error ?? data).slice(0, 200));
    return false;
  }

  const isJpeg = base64Image.startsWith("data:image/jpeg");
  const ext = isJpeg ? "jpg" : "png";
  const buffer = Buffer.from(
    base64Image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const outPath = path.join(process.cwd(), "public", `og-tool-${tool.name}.${ext}`);
  fs.writeFileSync(outPath, buffer);
  console.log(`  Saved: ${outPath} (${(buffer.length / 1024).toFixed(0)} KB)`);
  return true;
}

async function main() {
  if (!OPENROUTER_KEY) {
    console.error("Missing OPENROUTER_API_KEY env var");
    process.exit(1);
  }

  console.log(`Generating ${tools.length} OG images via Nano Banana Pro...\n`);

  let success = 0;
  for (const tool of tools) {
    const ok = await generateImage(tool);
    if (ok) success++;
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\nDone: ${success}/${tools.length} images generated.`);
}

main();
