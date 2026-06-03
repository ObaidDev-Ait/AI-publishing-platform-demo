import { prisma } from "@backend/database/client";

export const aiGeneratorService = {
  async saveGeneratedArticle(data: {
    title: string;
    content: string;
    excerpt?: string;
    category: string;
    authorId: string;
    keywords?: string;
    seoScore?: number;
    faqGenerated?: boolean;
    internalLinks?: boolean;
  }) {
    return await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt,
        category: data.category,
        authorId: data.authorId,
        keywords: data.keywords,
        seoScore: data.seoScore || 0,
        faqGenerated: data.faqGenerated || false,
        internalLinks: data.internalLinks || false,
        status: "PENDING", // Automatically submitted for review
      },
    });
  }
};
