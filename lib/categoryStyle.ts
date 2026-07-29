export const CATEGORY_COLORS: Record<string, string> = {
  "Data Engineering": "#34D399",
  "AI Engineering": "#E879F9",
  "Data Science": "#FBBF24",
};

export function categoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? "#A3E635";
}

export const CATEGORIES_LIST = Object.keys(CATEGORY_COLORS);
