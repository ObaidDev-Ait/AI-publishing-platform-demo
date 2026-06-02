export interface PromptConfig {
  topic: string;
  language: string;
  category: string;
  tone: string;
  keywords: string[];
  wordCount?: number;
}

export function buildArticlePrompt(config: PromptConfig): string {
  const { topic, language, category, tone, keywords, wordCount = 1500 } = config;
  const kwString = keywords.length > 0 ? keywords.join(", ") : "None specified";

  return `You are an expert content writer, SEO specialist, and native speaker of ${language}.

Write a high-quality, SEO-optimized article about: ${topic}

Requirements:
* Native-level ${language}
* Human-like writing
* Professional tone (${tone})
* Category of the article: ${category}
* Primary Keywords to include naturally: ${kwString}
* Detailed explanations
* SEO optimized
* Use H1, H2, H3 headings
* Include FAQs (Frequently Asked Questions) section at the end
* Include Meta Title
* Include Meta Description
* Include Conclusion
* Include Semantic Keywords (identify and naturally integrate synonyms or related terms)
* Minimum ${wordCount} words
* Original and plagiarism-free
* Suitable for Google ranking

Please return the output in a clean structured format containing:
1. Meta Title: [title]
2. Meta Description: [description]
3. H1: [main title]
4. Introduction: [intro paragraphs]
5. Body: [H2 and H3 sections]
6. FAQs: [questions and answers]
7. Conclusion: [concluding thoughts]`;
}
