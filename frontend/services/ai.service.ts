import { apiFetch } from "./api-client";

export const aiService = {
  generate(input: {
    topic: string;
    language: string;
    tone: string;
    category: string;
    keywords: string[];
    wordCount?: number;
    generateFaq?: boolean;
    suggestLinks?: boolean;
  }) {
    return apiFetch<{ success: boolean; article: Record<string, unknown> }>(
      "/api/generate-article",
      { method: "POST", body: JSON.stringify(input) }
    );
  },
};
