import Link from "next/link";
import { fetchArticles } from "@/lib/api/news";
import { relativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import type { Article } from "@/lib/types/article";

function groupByTime(items: Article[]) {
  const now = Date.now();
  const hr = 3600000;
  const groups: { label: string; items: Article[] }[] = [
    { label: "Última hora", items: [] },
    { label: "Hoy", items: [] },
    { label: "Esta semana", items: [] },
  ];

  for (const item of items) {
    const age = now - new Date(item.published_at).getTime();
    if (age < hr) groups[0].items.push(item);
    else if (age < 24 * hr) groups[1].items.push(item);
    else groups[2].items.push(item);
  }

  return groups.filter((g) => g.items.length > 0);
}

export async function NewsFeed() {
  const articles = await fetchArticles(10);
  const groups = groupByTime(articles);

  return (
    <section>
      <Text variant="label" className="mb-4 block text-text-tertiary">Noticias</Text>
      <div className="space-y-6">
        {groups.map((group) => (
          <div key={group.label}>
            <Text variant="label" className="text-2xs text-text-tertiary mb-3 block">
              {group.label}
            </Text>
            <div className="space-y-4">
              {group.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/noticias/${item.slug}`}
                  className="block group"
                >
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans text-sm text-text-primary group-hover:text-accent transition-colors duration-150 leading-snug">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge>{item.category}</Badge>
                        <span className="font-mono text-2xs text-text-tertiary">
                          {relativeTime(new Date(item.published_at))}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
