import { NextResponse } from "next/server";
import { adminArticlesService, PendingArticle } from "@backend/services/admin-articles.service";
import { requireAuth } from "@backend/middleware/auth.middleware";

export async function GET(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth || auth.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const articles = await adminArticlesService.getPendingArticles();
    
    // Map to frontend shape
    const formatted = articles.map((a: PendingArticle) => ({
      id: a.id,
      title: a.title,
      excerpt: a.excerpt,
      author: a.author?.name || "Unknown",
      category: a.category,
      status: a.status.toLowerCase(),
      seoScore: a.seoScore,
      date: a.createdAt.toLocaleDateString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pending articles" }, { status: 500 });
  }
}
