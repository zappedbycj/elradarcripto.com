import { createPublicClient } from "@/lib/supabase";
import type { Article } from "@/lib/types/article";

/** Fetch latest articles from Supabase */
export async function fetchArticles(limit = 20): Promise<Article[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data ?? [];
  } catch {
    return [];
  }
}

/** Fetch single article by slug */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data ?? null;
  } catch {
    return null;
  }
}
