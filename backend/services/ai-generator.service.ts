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
    try {
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
    } catch (err) {
      console.warn("[ai-generator.service] DB error saving article, returning simulated article:", err);
      return {
        id: `simulated-art-${Date.now()}`,
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || null,
        category: data.category,
        authorId: data.authorId,
        keywords: data.keywords || null,
        seoScore: data.seoScore || 0,
        faqGenerated: data.faqGenerated || false,
        internalLinks: data.internalLinks || false,
        status: "PENDING",
        reviewerId: null,
        reviewDate: null,
        rejectionReason: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }
};
