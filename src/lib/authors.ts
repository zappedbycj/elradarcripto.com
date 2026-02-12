export interface Author {
  name: string;
  slug: string;
  bio: string;
  categories: string[];
  initial: string;
}

export const authors: Author[] = [
  {
    name: "Sofía Mendoza",
    slug: "sofia-mendoza",
    bio: "Analista de mercados cripto y tecnología blockchain. Especialista en datos on-chain y métricas de adopción institucional.",
    categories: ["Mercados", "Tecnología"],
    initial: "S",
  },
  {
    name: "Miguel Herrera",
    slug: "miguel-herrera",
    bio: "Periodista especializado en regulación cripto y adopción en América Latina. Cubre el impacto de políticas financieras en la región.",
    categories: ["Regulación", "Adopción"],
    initial: "M",
  },
  {
    name: "César Ramírez",
    slug: "cesar-ramirez",
    bio: "Editor y analista de exchanges, P2P y divisas. Enfocado en remesas, dólar paralelo y herramientas prácticas para usuarios LATAM.",
    categories: ["Exchanges", "Divisas"],
    initial: "C",
  },
];

export function getAuthorByCategory(category: string): Author {
  const match = authors.find((a) =>
    a.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
  // César Ramírez is the fallback author
  return match ?? authors[2];
}
