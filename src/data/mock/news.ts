export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  timestamp: Date;
  readingTime: number;
  slug: string;
  body: string;
}

// Fixed reference point to avoid hydration mismatch
const ref = new Date("2026-02-09T17:00:00Z").getTime();
const min = 60000;
const hr = 3600000;

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Bitcoin supera los $97,000 en medio de tensiones regulatorias en Venezuela",
    excerpt: "El precio de Bitcoin alcanzó un nuevo máximo local mientras el gobierno venezolano intensifica controles sobre exchanges.",
    category: "Mercados",
    timestamp: new Date(ref - 14 * min),
    readingTime: 4,
    slug: "bitcoin-supera-97000-tensiones-venezuela",
    body: `El precio de Bitcoin ha alcanzado los $97,234 en las últimas horas, marcando un nuevo máximo local en medio de un contexto geopolítico complejo en América Latina.\n\nEl rally coincide con el anuncio del Banco Central de Venezuela de nuevas restricciones sobre las transacciones en criptomonedas a través de exchanges locales. La medida, que entrará en vigor la próxima semana, obligará a los exchanges que operan en el país a reportar todas las transacciones superiores a $1,000.\n\n> "Las restricciones podrían empujar a más venezolanos hacia el mercado P2P, donde Bitcoin ya es la principal herramienta de ahorro y transferencia de valor", explicó María González, analista de mercados digitales en Caracas.\n\nEl volumen de operaciones P2P en Venezuela aumentó un 34% durante la última semana, según datos de Binance P2P y LocalBitcoins. Este incremento refleja la creciente demanda de criptomonedas como mecanismo de protección frente a la devaluación del bolívar.\n\nMientras tanto, Argentina también experimenta un aumento en la adopción cripto. El dólar blue superó los $1,245 pesos argentinos, y el spread con el dólar cripto se mantiene por debajo del 2%, lo que convierte a Bitcoin en una alternativa cada vez más atractiva para el ahorro.\n\nAnalistas consultados coinciden en que el nivel de $100,000 es el próximo objetivo técnico, con un soporte sólido establecido en la zona de $95,000.`,
  },
  {
    id: "2",
    title: "Venezuela endurece control sobre exchanges de criptomonedas",
    excerpt: "El BCV anuncia nuevas regulaciones que afectarán a todos los exchanges que operan en territorio venezolano.",
    category: "Regulación",
    timestamp: new Date(ref - 2 * hr),
    readingTime: 5,
    slug: "venezuela-endurece-control-exchanges",
    body: "Contenido completo del artículo sobre regulación venezolana...",
  },
  {
    id: "3",
    title: "El dólar paralelo en Bolivia alcanza niveles récord frente al boliviano",
    excerpt: "La brecha entre el tipo de cambio oficial y paralelo supera el 100% por primera vez desde 2023.",
    category: "Divisas",
    timestamp: new Date(ref - 4 * hr),
    readingTime: 3,
    slug: "dolar-paralelo-bolivia-record",
    body: "Contenido completo del artículo sobre el dólar paralelo en Bolivia...",
  },
  {
    id: "4",
    title: "Solana registra rally del 15% semanal impulsada por memecoins",
    excerpt: "El ecosistema de Solana vuelve a captar la atención del mercado con un incremento sostenido en volumen de DEX.",
    category: "Mercados",
    timestamp: new Date(ref - 6 * hr),
    readingTime: 4,
    slug: "solana-rally-semanal-memecoins",
    body: "Contenido completo del artículo sobre Solana...",
  },
  {
    id: "5",
    title: "Argentina debate la regulación cripto en el Congreso",
    excerpt: "Un nuevo proyecto de ley busca establecer un marco regulatorio integral para activos digitales en Argentina.",
    category: "Regulación",
    timestamp: new Date(ref - 8 * hr),
    readingTime: 6,
    slug: "argentina-debate-regulacion-cripto",
    body: "Contenido completo del artículo sobre regulación argentina...",
  },
  {
    id: "6",
    title: "Binance P2P duplica volumen en LATAM durante enero",
    excerpt: "El exchange reporta un crecimiento récord en operaciones P2P en Venezuela, Argentina y Colombia.",
    category: "Exchanges",
    timestamp: new Date(ref - 12 * hr),
    readingTime: 3,
    slug: "binance-p2p-duplica-volumen-latam",
    body: "Contenido completo del artículo sobre Binance P2P...",
  },
  {
    id: "7",
    title: "El peso colombiano se debilita frente al dólar: impacto en cripto",
    excerpt: "La depreciación del COP impulsa la demanda de stablecoins como USDT entre inversores colombianos.",
    category: "Divisas",
    timestamp: new Date(ref - 18 * hr),
    readingTime: 4,
    slug: "peso-colombiano-debilita-cripto",
    body: "Contenido completo del artículo sobre el peso colombiano...",
  },
  {
    id: "8",
    title: "Ethereum se prepara para la actualización Pectra: lo que debes saber",
    excerpt: "La próxima actualización de Ethereum promete mejoras significativas en escalabilidad y experiencia de usuario.",
    category: "Tecnología",
    timestamp: new Date(ref - 26 * hr),
    readingTime: 7,
    slug: "ethereum-actualizacion-pectra",
    body: "Contenido completo del artículo sobre Ethereum Pectra...",
  },
  {
    id: "9",
    title: "Brasil avanza en la regulación de stablecoins con nuevo decreto",
    excerpt: "El Banco Central de Brasil establece directrices para la emisión y operación de stablecoins en el país.",
    category: "Regulación",
    timestamp: new Date(ref - 30 * hr),
    readingTime: 5,
    slug: "brasil-regulacion-stablecoins",
    body: "Contenido completo del artículo sobre regulación en Brasil...",
  },
  {
    id: "10",
    title: "México lidera adopción de Bitcoin en Centroamérica según reporte",
    excerpt: "Un nuevo estudio posiciona a México como el principal mercado de criptomonedas en la región centroamericana.",
    category: "Adopción",
    timestamp: new Date(ref - 48 * hr),
    readingTime: 4,
    slug: "mexico-lidera-adopcion-bitcoin",
    body: "Contenido completo del artículo sobre adopción en México...",
  },
];
