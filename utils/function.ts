import { stopwords } from "./stop_words";

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
      if (stopwords.has(word)) continue;

      counts.set(word, (counts.get(word) ?? 0) + 1);
    }
  }

  return counts;
}

// Capitalize
export function capitalizeWords(text?: string | null): string {
  if (!text) return "";

  return text
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((word) =>
      word
        .split("-")
        .map(
          (part) =>
            part.charAt(0).toUpperCase() + part.slice(1)
        )
        .join("-")
    )
    .join(" ");
}

// Format Day Labelling
export function formatDayLabel(day: string) {
  const date = new Date(day);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}