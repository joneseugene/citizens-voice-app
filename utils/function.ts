import { STOPWORDS } from "./const";

// Tokenize
export function tokenize(texts: string[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const text of texts) {
    if (!text) continue;

    const words = text
      .toLowerCase()
      .replace(/[^a-z\s'-]/g, " ")
      .split(/\s+/);

    for (const raw of words) {
      const word = raw.trim();

      if (word.length < 3) continue;
      if (STOPWORDS.has(word)) continue;

      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  return counts;
}